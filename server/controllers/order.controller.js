const { default: mongoose } = require("mongoose");
const OrderModel = require("../models/order.model");
const UserModel = require("../models/user.model");
const CartProductModel = require("../models/cartProduct.model");
const Stripe = require("../config/stripe.js");

const PriceWithDiscount = (price, dis) => {
  const discountAmount = Math.ceil((Number(price) * Number(dis)) / 100);
  const actual = Number(price) - Number(discountAmount);

  return actual;
};
const CashOnDeliveryOrderController = async (request, response) => {
  try {
    const userId = request.userId;
    const { list_items, totalAmt, addressId, subTotalAmt, totalQty } =
      request.body;

    const payload = list_items.map((ak) => {
      return {
        userId: userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: ak.productId[0]._id,
        product_details: {
          name: ak.productId[0].name,
          image: ak.productId[0].image,
        },
        paymentId: "",
        payment_status: "CASH ON DELIVERY",
        delivery_address: addressId,
        subTotalAmt: subTotalAmt,
        totalAmt: totalAmt,
      };
    });

    const generateOrder = await OrderModel.insertMany(payload);
    // remove from the cart
    const removeCartItem = await CartProductModel.deleteMany({
      userId: userId,
    });
    const updateInUser = await UserModel.updateOne(
      { _id: userId },
      { shopping_cart: [] }
    );

    return response.json({
      message: "Order successfully",
      error: false,
      success: true,
      data: generateOrder,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};
const paymentController = async (request, response) => {
  try {
    const userId = request.userId; // auth middleware
    const { list_items, totalAmt, addressId, subTotalAmt } = request.body;

    const user = await UserModel.findById(userId);

    const line_items = list_items.map((item) => {
      return {
        price_data: {
          currency: "vnd",
          product_data: {
            name: item.productId[0].name,
            images: item.productId[0].image,
            metadata: {
              productId: item.productId[0]._id,
            },
          },
          unit_amount: PriceWithDiscount(
            item.productId[0].price,
            item.productId[0].discount
          ),
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      metadata: {
        userId: userId,
        addressId: addressId,
      },
      line_items: line_items,
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    const session = await Stripe.checkout.sessions.create(params);

    return response.status(200).json(session);
  } catch (error) {
    return response
      .status(500)
      .json({ message: error.message || error, error: true, success: false });
  }
};
const getOrderProductItems = async ({
  lineItems,
  userId,
  addressId,
  paymentId,
  payment_status,
}) => {
  const productList = [];

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await Stripe.products.retrieve(item.price.product);

      const payload = {
        userId: userId,
        orderId: `ORD-${new mongoose.Types.ObjectId()}`,
        productId: product.metadata.productId,
        product_details: {
          name: product.name,
          image: product.images,
        },
        paymentId: paymentId,
        payment_status: payment_status,
        delivery_address: addressId,
        subTotalAmt: Number(item.amount_total / 100),
        totalAmt: Number(item.amount_total / 100),
      };

      productList.push(payload);
    }
  }

  return productList;
};
const webhookStripe = async (request, response) => {
  const event = request.body;
  const endPointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const lineItems = await Stripe.checkout.sessions.listLineItems(
        session.id
      );
      const userId = session.metadata.userId;
      const orderProduct = await getOrderProductItems({
        lineItems: lineItems,
        userId: userId,
        addressId: session.metadata.addressId,
        paymentId: session.payment_intent,
        payment_status: session.payment_status,
      });

      const order = await OrderModel.insertMany(orderProduct);

      if (Boolean(order[0])) {
        const removeCartItems = await UserModel.findByIdAndUpdate(userId, {
          shopping_cart: [],
        });
        const removeCartProductDB = await CartProductModel.deleteMany({
          userId: userId,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }
};
const getOrderDetails = async (request, response) => {
  try {
    const userId = request.userId;
    const orderList = await OrderModel.find({ userId: userId })
      .sort({
        createdAt: -1,
      })
      .populate("delivery_address");

    return response.json({
      message: "Order List",
      error: false,
      success: true,
      data: orderList,
    });
  } catch (error) {
    return response.status.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = {
  CashOnDeliveryOrderController,
  paymentController,
  webhookStripe,
  getOrderDetails,
};

export const PriceWithDiscount = (price, dis) => {
  const discountAmount = Math.ceil((Number(price) * Number(dis)) / 100);
  const actual = Number(price) - Number(discountAmount);

  return actual;
};

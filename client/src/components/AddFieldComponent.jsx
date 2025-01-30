import React from "react";
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed bottom-0 top-0 right-0 left-0 bg-neutral-800 bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-white  p-4 rounded w-full max-w-md">
        <div className="flex justify-between items-center gap-3">
          <h1 className="font-semibold">Add Fields</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        <div>
          <input
            className="bg-blue-50 my-3 p-2 border outline-none focus-within:border-blue-100 rounded w-full"
            placeholder="Enter field name"
            value={value}
            onChange={onChange}
          />
          <button
            onClick={submit}
            className="bg-primary-200 px-4 py-2 rounded mx-auto w-fit block hover:bg-yellow-300"
          >
            Add Field
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddFieldComponent;

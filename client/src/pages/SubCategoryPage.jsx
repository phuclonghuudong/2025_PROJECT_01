import React, { useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";

const SubCategoryPage = () => {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Sub Category</h2>

        <button
          onClick={() => setOpenUploadSubCategory((pre) => !pre)}
          className="text-sm border border-blue-500 hover:bg-blue-700 hover:text-white px-3 py-1 rounded"
        >
          Add Sub Category
        </button>
      </div>

      {openUploadSubCategory && <UploadSubCategoryModel />}
    </section>
  );
};

export default SubCategoryPage;

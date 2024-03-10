import { useState } from "react";
import ModalContainer from "../../Component/modal-container/modal-container";

const UpdateReceipt = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleSuccess = () => {
    setShowSuccess(!showSuccess);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //    createmutation.mutate({ id: selectedCategory._id, name });
  };
  return (
    <ModalContainer close={toggleSuccess} show={showSuccess}>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">
            Update Receipt Status{" "}
          </label>
          <input
            type="text"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="flex justify-center mb-4">
          <button
            type="submit"
            className="bg-[#009B4D] text-white py-2 px-4 rounded hover:bg-[#009B4D] focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            {/* {createLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-t-2 border-[#4f7942] border-solid rounded-full animate-spin" />
              </div>
            ) : (
              <>Submit </>
            )} */}
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default UpdateReceipt;

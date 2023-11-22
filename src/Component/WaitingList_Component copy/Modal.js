import React from "react";

function Modal({ isOpen, setIsOpen }) {
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto ">
      <div className="flex items-center justify-center min-h-screen  px-4 ">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-25"></div>
        </div>
        <div className="bg-white   rounded-lg overflow-hidden w-[60%] lg:w-[40%]  shadow-xl transform transition-all ">
          <div className="border-b bord   h-[15rem]">
            <div className=" flex justify-end    px-7 py-3 items-center ">
              <div>
                <button
                  className="bg-[#B4B4B43D]  py-1 px-2 rounded-sm"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  X
                </button>
              </div>
            </div>

            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg w-full max-w-md transition-all duration-300`}
              //   style={{ opacity }}
              //   onClick={(e) => e.stopPropagation()}
            >
              <p className="text-lg font-bold mb-4 text-center">
                Thanks for joining our waiting list!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

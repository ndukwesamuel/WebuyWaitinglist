import React, { useState } from 'react';

import modalImage from '../../assets/modal-images/9848008-removebg-preview.png';

const ReferralCodeModal = ({ referralCode, onClose }) => {
  const [showAlert, setShowAlert] = useState(false);
  


  const handleShare = () => {
    const tempInput = document.createElement("input");
    tempInput.value = referralCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Show alert and start progress bar animation
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000); // Hide alert after 2 seconds
  };



  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-90">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative max-w-md mx-auto bg-white shadow-lg p-7 rounded-3xl">
          <button
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark fa-lg"></i>
          </button>
          <div className="text-center">
            <h1 className="mb-4 text-xl font-bold">Refer and earn</h1>
            <div className="w-[250px] h-[250px] flex items-center justify-center mx-auto">
              <img className="w-full h-full" src={modalImage} alt=""></img>
            </div>
            {/* <p className="mb-4 text-sm text-gray-600">
              Share your referral code with your friends!
            </p> */}
            <img src="/path/to/image.jpg" alt="" className="mx-auto mb-4" />
            <p className="mb-2 text-lg font-bold">Your referral Code:</p>
            <div className="flex items-center justify-center ">
              <div className="flex text-xl text-gray-700 border-dashed border-[2px] border-gray-700 p-5 ">
                {referralCode}
                <button
                  onClick={handleShare}
                  className="flex items-center ml-6 pl-3 text-gray-700 border-dashed border-l-[2px] border-l-gray-700 justify-center"
                >
                  <i className="fa-regular fa-copy fa-lg"></i>
                </button>
              </div>
            </div>
            <p className="text-base my-4 font-bold text-center w-full text-gray-700 max-w-[300px] mx-auto">
              Share your referral code with your friends and get benefits.
            </p>
          </div>
          {showAlert && (
            <div className="alert">Referral code copied to clipboard!</div>
          )}
        </div>
      </div>
      {/* <div
        className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
        aria-hidden="true"
      ></div> */}
    </div>
  );
}

export default ReferralCodeModal
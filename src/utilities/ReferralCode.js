// Function to generate a single referral code //
function generateReferralCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let referralCode = "";
  for (let i = 0; i < length; i++) {
    referralCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return referralCode;
}

// Function to generate multiple referral codes //
function generateReferralCodes(options) {
  const { length = 8, count = 1 } = options;
  const referralCodes = [];
  for (let i = 0; i < count; i++) {
    referralCodes.push(generateReferralCode(length));
  }
  return referralCodes;
}

export { generateReferralCode, generateReferralCodes };

const API_URL = process.env.REACT_APP_API_URL;

async function sendEmail({ to, subject, body }) {
  try {
    const response = await fetch(`${API_URL}/referral-code-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject,
        body,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    alert("Referral code sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export { sendEmail };

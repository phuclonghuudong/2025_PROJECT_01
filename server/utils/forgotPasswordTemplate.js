const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div>
        <p>Dear ${name},</p>
        <p> You're request a password reset. Please use following OTP code to reset your password:</p>
        <div style="background-color:yellow; font-size:20px; padding: 25px; text-align:center; font-weight:800">
            ${otp}
        </div>
        <p> This otp is valid for 1hour only. Enter this otp in the PHPMol website to proceed with resetting your passwords.</p>
        </br>
        <p>Thanks</p>
        <p>PHPMol.</p>
    </div>
    `;
};

module.exports = forgotPasswordTemplate;

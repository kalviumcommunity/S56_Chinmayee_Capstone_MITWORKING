import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function VerifyOTP() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post('https://your-backend-url/verify-otp', { email, otp, newPassword });
      toast.success('Password reset successful.');
    } catch (error) {
      toast.error('Failed to verify OTP. Please try again.');
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleVerifyOTP}>Reset Password</button>
    </div>
  );
}

export default VerifyOTP;

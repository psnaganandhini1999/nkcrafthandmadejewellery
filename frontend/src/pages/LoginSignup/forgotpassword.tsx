import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';

// const initialContactData = {
//     password: "",
//     email: "",
// }

// type errorIntitalData = {
//     password?: string,
//     email?: string,
// }

const ForgotPassword = () => {
  const [formData, setFormData]: any = useState({ email: '', newpassword: '', confirmpassword: "" });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [isResetPwd, setIsResetPwd] = useState(false);
  const from = location.state?.from || '/login';
  const tokenName = useParams();
  const [token] = useState(tokenName?.token)
  const [mailContent, setMailContent] = useState("");

  useEffect(() => {
    // console.log(token);
    if (token !== "" && token !== undefined) {
      setIsResetPwd(true);
    }
  }, [token])

  const handleChange = (e: any, type: any) => {
    if (type === "email") {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    } else if (type === "newpassword" || type === "confirmpassword") {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (formData?.newpassword != formData?.confirmpassword) {
          setError('Confirm Password does not match..');
          return;
      }
      const payload = { password: formData.newpassword };
      const { data } = await axios.post(`https://api.jacotail.com/api/auth/reset-password/${token}`, payload);
      if (data.message == "Password reset successful") {
        setMailContent(data.message);
        setTimeout(() => {
          navigate(from);
        }, 1500)
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  const handleEmailSubmit = async (e: any) => {
    e.preventDefault();
    console.log("test");
    try {
      const payload = { email: formData.email };
      const { data } = await axios.post(`https://api.jacotail.com/api/auth/forgot-password`, payload);
      console.log("test", data);
      if (data.message == "Reset link sent to email") {
        setMailContent(data.message); 
        // setIsResetPwd(true);
      }
    } catch (err: any) {
      // console.log("testing123");
      setError(err.response?.data?.message || 'Authentication failed');
    }
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <div className="auth-image-side"></div>
        <div className="auth-form-side">
          <h2>{isResetPwd ? "Reset Password" : "Forgot Password"}</h2>
          <p className="subtitle">
            {isResetPwd ? "Please kindly set your new password" : "Enter your e-mail address, and we'll give you reset instruction."}
          </p>
          
          {error && <p className="error-msg">{error}</p>}
          {!isResetPwd && (
            <>
                <form onSubmit={handleEmailSubmit} className="auth-form">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email address" 
                        onChange={(e) => handleChange(e, "email")} 
                        required 
                    />
                    <button type="submit" className="btn-primary mt-0">
                        Send Email
                    </button>
                </form>
                <p className="toggle-auth">
                    <Link to="/login">{"<"} Back to Login</Link>
                </p>
            </>
          )}
          {isResetPwd && (
            <form onSubmit={handleSubmit} className="auth-form">
                <input 
                    type="password" 
                    name="newpassword" 
                    placeholder="New Password" 
                    onChange={(e) => handleChange(e, "newpassword")} 
                />
                <input 
                    type="password" 
                    name="confirmpassword" 
                    placeholder="Confirm Password" 
                    onChange={(e) => handleChange(e, "confirmpassword")} 
                />
                <button type="submit" className="btn-primary mt-0">
                    Send Email
                </button>
            </form>
          )}
          {mailContent !== "" && (
            <div className='backdrop'>
              <div className="alert alert-success bg-success text-white px-3" role="alert">
                <button type="button" className="btn-close" onClick={() => {setFormData({ email: "" })}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
                </button>
                  {mailContent}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

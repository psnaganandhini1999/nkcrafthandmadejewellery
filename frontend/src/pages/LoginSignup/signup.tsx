import { Grid } from "@mui/material";
import { BannerSection, ButtonSec, Error, H1, Img, P, SuccessErrorSec } from "../../assets/css/styledcomponents";
import bgimg from "../../assets/images/bgimg.png";
import heart from "../../assets/images/icons/heart.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API, DOMAIN } from "../../helper/helper";

const initialContactData = {
    fullName: "",
    email: "",
    password: "",
    phoneNo: "",
}

type errorIntitalData = {
    fullName?: string,
    email?: string,
    password?: string,
    phoneNo?: string,
}

function Signup() {
    const [formData, setFormData ]: any = useState(initialContactData); 
    const [errorData, setErrorData ]: any = useState<errorIntitalData>({}); 
    const [formLoading, setFormLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [successMsgCtn, setSuccessMsgCtn] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onChange = (e: any) => {
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
        setErrorData({...errorData, [name]: ""})
    }

    const validation = () => {
        let formErrors: errorIntitalData = {};
        const regx = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/i); //Mail Regex
        const phoneRegx = RegExp(/^[0-9]{10}$/); //Phone Number Regex
        if ((!formData.fullName || formData.fullName.trim() === "")) {
            formErrors.fullName =  "First Name is Required"
        } else if (formData.fullName.length < 3) {
            formErrors.fullName = "Minimum atleast 3 Characters Required"
        } else if (!formData.email) {  
            formErrors.email = "Email is Required"
        } else if (!regx.test(formData.email)) {
            formErrors.email = "Invalid Email"
        } else if ((!formData.phoneNo || formData.phoneNo.trim() === "")) {
            formErrors.phoneNo = "Phone Number is Required"
        } else if (!phoneRegx.test(formData.phoneNo)) {
            formErrors.phoneNo = "Invalid Phone Number"
        } else if ((!formData.password || formData.password.trim() === "")) {
            formErrors.password = "Password is Required"
        } else if (formData.password.length < 6) {
            formErrors.password = "Password must be at least 6 characters long"
        }
        return formErrors
    }

    const onSubmit = async () => {
        const validationErrors = validation();
        setErrorData(validationErrors)
        setFormLoading(true);
        if (Object.keys(validationErrors).length === 0) {
            const form_data: any = {
                fullName: formData.fullName,
                email: formData.email,
                phoneNo: formData.phoneNo,
                password: formData.password,
                status: "Active"
            }
            try {
                const { data } = await axios.post(DOMAIN + API.SIGNUP, form_data);
                console.log(data);
                if (data) {
                    setFormLoading(false)
                    setFormData(initialContactData)
                    console.log(data);
                    setSuccessMsgCtn(data?.message);
                    setTimeout(() => {
                        setSuccessMsgCtn("");
                        navigate("/login");
                    }, 1500);
                }
            } catch (err: any) {
                setError(err.response?.data?.message || 'Registration failed');
            } finally {
                setFormLoading(false);
            }
        }
    }
    
    return (
        <div>
            <BannerSection>
                <div className="bannerImg">
                    <Img src={bgimg} alt="bannerImg" className="bgimg h-75"/>
                    <div className="box p-2 p-md-4">
                        <div className="text-center">
                            <H1 bigFt clrBrn className="px-1 px-md-5 mx-1 mx-md-5 mb-0">Create  Account</H1>
                            <Img src={heart} alt="img" className="size120pxauto" />
                            <P bigFt className="px-1 px-md-5 mx-1 mx-md-5">Sign up to start your journey with us</P>
                        </div>
                        <div className="detailsSec p-4">
                            {successMsgCtn !== "" && (
                                <Error type1 className="mt-0 pt-0 fw-bold">
                                    {successMsgCtn && successMsgCtn} 
                                </Error>
                            )}
                            {error !== "" && (
                                <Error className="mt-0 pt-0 fw-bold">
                                    {error && error}
                                </Error>
                            )}
                            <Grid container spacing={2} className="">
                                <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                    <div className="inputField">
                                        <div className="prodtFormLabel">
                                            <label htmlFor="firstname" className="form-label">Full Name <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" placeholder="Enter your full name" name="fullName" value={formData.fullName} onChange={onChange} id="firstname" className="w-100" />
                                        </div>
                                        <Error className={`${errorData.fullName ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.fullName}</Error>
                                    </div>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                    <div className="inputField">
                                        <div className="prodtFormLabel">
                                            <label htmlFor="email" className="form-label">Email Address <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" placeholder="Enter your email address" name="email" value={formData.email} onChange={onChange} className="w-100" />
                                        </div>
                                        <Error className={`${errorData.email ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.email}</Error>
                                    </div>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                    <div className="inputField w-100">
                                        <div className="prodtFormLabel">
                                            <label htmlFor="password" className="form-label">Password <span style={{ color: "red" }}>*</span></label>
                                            <input type={`${isPasswordVisible ? "text" : "password"}`} placeholder="Create a password" name="password" value={formData.password} onChange={onChange} id="password" className="w-100" />
                                            <div className="eyeIcon">
                                                {!isPasswordVisible ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <Error className={`${errorData.password ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.password}</Error>
                                    </div>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                    <div className="inputField">
                                        <div className="prodtFormLabel">
                                            <label htmlFor="phoneNo" className="form-label">Phone Number <span style={{ color: "red" }}>*</span>
                                            </label>
                                            <input type="text" placeholder="Enter your phone number" name="phoneNo" value={formData.phoneNo} onChange={onChange} id="phoneNo" className="w-100" />
                                        </div>
                                        <Error className={`${errorData.phoneNo ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.phoneNo}</Error>
                                    </div>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                    <ButtonSec className="button button-primary w-100" onClick={onSubmit} type='submit'>{formLoading ? "LOADING..." : "SIGN UP"}</ButtonSec>
                                </Grid>
                                <P smFt className="text-center d-block w-100">
                                    Already have an account?{' '}
                                    <span className="clrBrn" onClick={() => navigate("/login")}>
                                        Login
                                    </span>
                                </P>
                            </Grid>
                        </div>
                    </div>
                </div>
            </BannerSection>
        </div>
    );
}

export default Signup;
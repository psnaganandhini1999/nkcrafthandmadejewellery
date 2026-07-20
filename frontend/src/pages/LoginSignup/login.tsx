import { Grid } from "@mui/material";
import { BannerSection, ButtonSec, Error, H1, Img, P, SuccessErrorSec } from "../../assets/css/styledcomponents";
import bgimg from "../../assets/images/bgimg.png";
import heart from "../../assets/images/icons/heart.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API, DOMAIN } from "../../helper/helper";

const initialContactData = {
    email: "",
    password: "",
}

type errorIntitalData = {
    email?: string,
    password?: string,
}

function Login() {
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
        if (!formData.email) {  
            formErrors.email = "Email is Required"
        } else if (!regx.test(formData.email)) {
            formErrors.email = "Invalid Email"
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
                email: formData.email,
                password: formData.password,
            }
            // console.log(form_data, "login");
            try {
                const { data } = await axios.post(DOMAIN + API.LOGIN, form_data);
                if (data) {
                    setFormLoading(false)
                    setFormData(initialContactData)
                    console.log(data);
                    setSuccessMsgCtn(data?.message);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data?.user));
                    setTimeout(() => {
                        setSuccessMsgCtn("");
                        navigate("/");
                    }, 1500);
                }
            } catch (err: any) {
                // console.error("Error in sending message:", err);
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
                    <Img src={bgimg} alt="bannerImg" className="bgimg h-650px"/>
                    <div className="box p-2 p-md-4">
                        <div className="text-center">
                            <H1 bigFt clrBrn className="px-1 px-md-5 mx-1 mx-md-5 mb-0">Welcome Back</H1>
                            <Img src={heart} alt="img" className="size120pxauto" />
                            <P bigFt className="px-1 px-md-5 mx-1 mx-md-5">Login to continue shopping</P>
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
                                            <label htmlFor="email" className="form-label">Email Address <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" placeholder="Enter your email" name="email" value={formData.email} onChange={onChange} className="w-100" />
                                        </div>
                                        <Error className={`${errorData.email ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.email}</Error>
                                    </div>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                    <div className="inputField w-100">
                                        <div className="prodtFormLabel">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <label htmlFor="password" className="form-label">Password <span style={{ color: "red" }}>*</span></label>
                                                <P smFt className="text-center">
                                                    <span className="clrBrn" onClick={() => navigate("/forgot-password")}>
                                                        Forgot Password?
                                                    </span>
                                                </P>
                                            </div>
                                            <input type="text" placeholder="Enter your password" name="password" value={formData.password} onChange={onChange} id="password" className="w-100" />
                                        </div>
                                        <Error className={`${errorData.password ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.password}</Error>
                                    </div>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                    <ButtonSec className="button button-primary w-100" onClick={onSubmit} type='submit'>{formLoading ? "LOADING..." : "LOGIN"}</ButtonSec>
                                </Grid>
                                <P smFt className="text-center d-block w-100">
                                    Don't have an account?{' '}
                                    <span className="clrBrn" onClick={() => navigate("/signup")}>
                                        Register now
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

export default Login;
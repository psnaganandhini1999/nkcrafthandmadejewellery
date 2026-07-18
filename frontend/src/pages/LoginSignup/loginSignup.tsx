import { Grid } from "@mui/material";
import { BannerSection, ButtonSec, Error, H1, Img, P } from "../../assets/css/styledcomponents";
import bgimg from "../../assets/images/bgimg.png";
import heart from "../../assets/images/icons/heart.png";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const initialContactData = {
    password: "",
    email: "",
}

type errorIntitalData = {
    password?: string,
    email?: string,
}

function LoginSignup() {
    const [formData, setFormData ]: any = useState(initialContactData); 
    const [errorData, setErrorData ]: any = useState<errorIntitalData>({}); 
    const [formLoading, setFormLoading] = useState(true);
    const [isSignup, setIsSignup] = useState(false);
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
        // console.log(errorData, validation());
        const validationErrors = validation();
        setErrorData(validationErrors)
        // setIsOrderPlaced(true);
        if (Object.keys(validationErrors).length === 0) {
            const formDataClone = JSON.parse(JSON.stringify(formData))
            console.log("test", formDataClone);
            const form_data: any = {
                fullName: formData.fullName,
                country: "India",
                address: formData.address,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                phoneNo: formData.phoneNo,
                email: formData.email,
                orderNotes: formData.orderNotes,
           }
            try {
                const { data } = await axios.post('http://localhost:4000/api/shipping-details-post', form_data);
                if (data) {
                    setFormLoading(false)
                    setFormData(initialContactData)
                    console.log(data);
                }
            } catch (err) {
                console.error("Error in sending message:", err);
                // setError(err.response?.data?.message || 'Registration failed');
            } finally {
                setFormLoading(false);
            }
            setTimeout(() =>{
                setFormLoading(true);
            }, 1000)
        }
    }
    
    const handleClick = (type: any) => {
        if (type === "login") {
            setIsSignup(false);
            navigate("/login");
        } else if (type === "register") {
            setIsSignup(true);
            navigate("/signup");
        } else if (type === "forgot") {
            navigate("/forgot-password");
        }
    }
    return (
        <div>
            <BannerSection>
                <div className="bannerImg">
                    <Img src={bgimg} alt="bannerImg" className="bgimg vh-100"/>
                    {isSignup ? (
                        <div className="box p-2 p-md-4">
                        <div className="text-center">
                            <H1 bigFt clrBrn className="px-1 px-md-5 mx-1 mx-md-5 mb-0">Create  Account</H1>
                            <Img src={heart} alt="img" className="size120pxauto" />
                            <P bigFt className="px-1 px-md-5 mx-1 mx-md-5">Sign up to start your journey with us</P>
                        </div>
                        <div className="detailsSec p-4">
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
                                            <input type="text" placeholder="Create a password" name="password" value={formData.password} onChange={onChange} id="password" className="w-100" />
                                        </div>
                                        <Error className={`${errorData.password ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.password}</Error>
                                    </div>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                    <div className="inputField w-100">
                                        <div className="prodtFormLabel">
                                            <label htmlFor="confirmpassword" className="form-label">Confirm Password <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" placeholder="Confirm your password" name="confirmpassword" value={formData.confirmpassword} onChange={onChange} id="confirmpassword" className="w-100" />
                                        </div>
                                        <Error className={`${errorData.confirmpassword ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.confirmpassword}</Error>
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
                                    <ButtonSec className="button button-primary w-100" onClick={onSubmit} type='submit'>SIGN UP</ButtonSec>
                                </Grid>
                                <P smFt className="text-center d-block w-100">
                                    Already have an account?{' '}
                                    <span className="clrBrn" onClick={() => handleClick("login")}>
                                        Login
                                    </span>
                                </P>
                                {!formLoading && (
                                    <div className="alert alert-success bg-success text-white alert-dismissible fade show" role="alert">
                                        Mail sent Successfully...
                                    </div>
                                )}
                            </Grid>
                        </div>
                    </div>
                    ) : (
                        <div className="box p-2 p-md-4">
                            <div className="text-center">
                                <H1 bigFt clrBrn className="px-1 px-md-5 mx-1 mx-md-5 mb-0">Welcome Back</H1>
                                <Img src={heart} alt="img" className="size120pxauto" />
                                <P bigFt className="px-1 px-md-5 mx-1 mx-md-5">Login to continue shopping</P>
                            </div>
                            <div className="detailsSec p-4">
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
                                                        <span className="clrBrn" onClick={() => handleClick("forgot")}>
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
                                        <ButtonSec className="button button-primary w-100" onClick={onSubmit} type='submit'>LOGIN</ButtonSec>
                                    </Grid>
                                    <P smFt className="text-center d-block w-100">
                                        Don't have an account?{' '}
                                        <span className="clrBrn" onClick={() => handleClick("register")}>
                                            Register now
                                        </span>
                                    </P>
                                    {!formLoading && (
                                        <div className="alert alert-success bg-success text-white alert-dismissible fade show" role="alert">
                                            Mail sent Successfully...
                                        </div>
                                    )}
                                </Grid>
                            </div>
                        </div>
                    )}
                </div>
            </BannerSection>
        </div>
    );
}

export default LoginSignup;
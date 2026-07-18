import { useState } from "react";
import { ButtonSec, CartListSec, CheckoutListSec, Error, H1, H2, H3, H5, Img, P } from "../../assets/css/styledcomponents";
import silkthreadbangle from "../../assets/images/category/silkthreadbangle.jpeg";
import glassbangle from "../../assets/images/category/glassbangle.jpeg";
import silkthreadjhumka from "../../assets/images/category/silkthreadjhumka.jpeg";
import kundanstud from "../../assets/images/category/kundanstud.jpeg";
import kundanhairband from "../../assets/images/category/kundanhairband.jpeg";
import centerclip from "../../assets/images/category/centerclip.jpeg";
import { Container, Grid } from "@mui/material";
import { APICall, INR_SYMBOL } from "../helpers";
import axios from "axios";

const initialContactData = {
    fullName: "",
    country: "India",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phoneNo: "",
    email: "",
    orderNotes: "",
    landmark: ""
}

type errorIntitalData = {
    fullName?: string,
    country?: string,
    address?: string,
    city?: string,
    state?: string,
    pincode?: string,
    phoneNo?: string,
    email?: string,
    orderNotes?: string,
    landmark?: string
}

function CheckoutList() {
    const [formData, setFormData ]: any = useState(initialContactData); 
    const [errorData, setErrorData ]: any = useState<errorIntitalData>({}); 
    const [formLoading, setFormLoading] = useState(true);
    const [phone, setPhone] = useState('+1');
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    
    const productsList = [
        { pdtName: "Slik Thread Bangles", pdtPrice: "₹520", pdtImg: silkthreadbangle, catName: "Slik Thread Bangles" },
        { pdtName: "Glass Bangles", pdtPrice: "₹120", pdtImg: glassbangle, catName: "Glass Bangles" },
        { pdtName: "Slik Thread Jhumkas", pdtPrice: "₹120", pdtImg: silkthreadjhumka, catName: "Slik Thread Jhumkas" },
        { pdtName: "Kundan Studs", pdtPrice: "₹120", pdtImg: kundanstud, catName: "Kundan Studs" },
        { pdtName: "Kundan Hair Bands", pdtPrice: "₹120", pdtImg: kundanhairband, catName: "Kundan Hair Bands" },
        { pdtName: "Center Clips", pdtPrice: "₹120", pdtImg: centerclip, catName: "Center Clips", },
        { pdtName: "Slik Thread Jhumkas", pdtPrice: "₹120", pdtImg: silkthreadjhumka, catName: "Slik Thread Jhumkas" },
        { pdtName: "Kundan Studs", pdtPrice: "₹120", pdtImg: kundanstud, catName: "Kundan Studs" },
        { pdtName: "Kundan Hair Bands", pdtPrice: "₹120", pdtImg: kundanhairband, catName: "Kundan Hair Bands" },
        { pdtName: "Center Clips", pdtPrice: "₹120", pdtImg: centerclip, catName: "Center Clips", },
    ]
    
    const onChange = (e: any) => {
        const {name, value} = e.target
        setFormData({...formData, [name]:value})
        setErrorData({...errorData, [name]: ""})
    }
    
    const validation = () => {
        let formErrors: errorIntitalData = {};
        const regx = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/i); //Mail Regex
        if ((!formData.fullName || formData.fullName.trim() === "")) {
            formErrors.fullName =  "First Name is Required"
        } else if (formData.fullName.length < 3) {
            formErrors.fullName = "Minimum atleast 3 Characters Required"
        } else if ((!formData.address || formData.address.trim() === "")) {
            formErrors.address = "Street Address is Required"
        } else if ((!formData.city || formData.city.trim() === "")) {
            formErrors.city = "City is Required"
        } else if ((!formData.state || formData.state.trim() === "")) {
            formErrors.state = "State is Required"
        } else if ((!formData.pincode || formData.pincode.trim() === "")) {
            formErrors.pincode = "Pincode is Required"
        } else if ((!formData.phoneNo || formData.phoneNo.trim() === "")) {
            formErrors.phoneNo = "Phone Number is Required"
        } else if (!formData.email) {  
            formErrors.email = "Email is Required"
        } else if (!regx.test(formData.email)) {
            formErrors.email = "Invalid Email"
        } 
        // else if (!formData.feedback || formData.feedback.trim() === "") {
        //     formErrors.feedback = "Feed Back is Required"
        // } else if (formData.feedback.length < 40) {
        //     formErrors.feedback = "Atleast 40 characters Required"
        // } else if (formData.feedback.length > 3000) {
        //     formErrors.feedback = "Please enter Characters less than or equal to 3000"
        // } 
        // else if (phone.length === 0) {
        //     formErrors.phoneNo = "Enter Phone Number"
        // } else if (phone.length < 10) {
        //     formErrors.phoneNo = "Phone Number should be 10 digits"
        // }
        return formErrors
    }

    const onSubmit = async () => {
        // console.log(errorData, validation());
        const validationErrors = validation();
        setErrorData(validationErrors)
        // setIsOrderPlaced(true);
        if (Object.keys(validationErrors).length === 0) {
            const formDataClone = JSON.parse(JSON.stringify(formData))
            console.log("test", formDataClone, phone);
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
                    setPhone('+1')
                    setIsOrderPlaced(true);
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

    let address = "";
    address += `${formData.fullName}\n`
    address += `${formData.address}\n`
    address += ` ${formData.city} ${formData.pincode}\n`
    address += `${formData.state}` + "\n"
    address += `${formData.phoneNo}` + "\n"
    address += `${formData.email}` + "\n"
    return (

        <CheckoutListSec>
            <Container maxWidth="xl">
                <H2 bigFt className="text-center pt-4 mt-0">Checkout</H2>
                <Grid container spacing={2} className="" justifyContent={"space-between"} alignItems={"start"}>
                    <Grid size={{ xs:12, sm: 12, md: 6, lg: 4 }} className="sticky-top">
                        {!isOrderPlaced ? (
                            <div className="detailsSec p-4">
                                <H5 bigFt clrBrn className="mb-3">Shipping Details</H5>
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
                                                <label htmlFor="phoneNo" className="form-label">Phone Number <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <input type="text" placeholder="Enter your phone number" name="phoneNo" value={formData.phoneNo} onChange={onChange} id="phoneNo" className="w-100" />
                                            </div>
                                            <Error className={`${errorData.phoneNo ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.phoneNo}</Error>
                                        </div>
                                    </Grid>
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
                                                <label htmlFor="streetaddress" className="form-label">Address  <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <input type="text" placeholder="House no., Street name, Area" name="address" value={formData.address} onChange={onChange} id="streetaddress" className="w-100" />
                                            </div>
                                            <Error className={`${errorData.address ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.address}</Error>
                                        </div>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                        <div className="inputField w-100">
                                            <div className="prodtFormLabel">
                                                <label htmlFor="landmark" className="form-label">Landmark (Optional)</label>
                                                <input type="text" placeholder="Landmark" name="landmark" value={formData.landmark} onChange={onChange} id="landmark" className="w-100" />
                                            </div>
                                            <Error className={`${errorData.landmark ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.landmark}</Error>
                                        </div>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} className="">
                                        <div className="inputField">
                                            <div className="prodtFormLabel">
                                                <label htmlFor="country" className="form-label">Country <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <input type="text" placeholder="India" name="country" disabled className="w-100" />
                                                {/* <P smFt className="mt-0 fw-medium mb-0">India</P> */}
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} className="">
                                        <div className="inputField">
                                            <div className="prodtFormLabel">
                                                <label htmlFor="state" className="form-label">State <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <input type="text" placeholder="State" name="state" value={formData.state} onChange={onChange} id="state" className="w-100" />
                                            </div>
                                            <Error className={`${errorData.state ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.state}</Error>
                                        </div>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} className="">
                                        <div className="inputField">
                                            <div className="prodtFormLabel">
                                                <label htmlFor="city" className="form-label">Town / City <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <input type="text" placeholder="City" name="city" value={formData.city} onChange={onChange} id="city" className="w-100" />
                                            </div>
                                            <Error className={`${errorData.city ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.city}</Error>
                                        </div>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12, md: 6 }} className="">
                                        <div className="inputField">
                                            <div className="prodtFormLabel">
                                                <label htmlFor="pincode" className="form-label">PIN Code <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <input type="number" placeholder="Pincode" name="pincode" value={formData.pincode} onChange={onChange} id="pincode" className="w-100" />
                                            </div>
                                            <Error className={`${errorData.pincode ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.pincode}</Error>
                                        </div>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                        <div className="inputField h-auto">
                                            <div className="prodtFormLabel">
                                                <label htmlFor="orderNotes" className="form-label">Order notes (optional)</label>
                                                <textarea rows={5} cols={15} placeholder="Notes about your order, e.g. special notes for delivery." value={formData.orderNotes} name="orderNotes" onChange={onChange} className="w-100" id="orderNotes" />
                                            </div>
                                        </div>
                                        <Error className={`${errorData.orderNotes ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.orderNotes}</Error>
                                    </Grid>
                                    {/* <Grid size={{ xs: 12, sm: 12, md: 12 }} className="my-3">
                                        <ButtonSec className="button button-primary w-100" onClick={onSubmit} type='submit'>Submit</ButtonSec>
                                    </Grid> */}
                                    {!formLoading && (
                                        <div className="alert alert-success bg-success text-white alert-dismissible fade show" role="alert">
                                            Mail sent Successfully...
                                        </div>
                                    )}
                                </Grid>
                            </div>
                        ) : (
                            <div>
                                <H5 bigFt className="mb-3">Thank you. Your order has been received.</H5>
                                <Grid container className="border p-3">
                                    <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                        <div className="inputField">
                                            <P smFt className="mb-0">Order Number:</P>
                                            <P smFt className="fw-bolder my-0">576576</P>
                                        </div>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                        <div className="inputField">
                                            <P smFt className="mb-0">Date:</P>
                                            <P smFt className="fw-bolder my-0">March 10,2026</P>
                                        </div>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                        <div className="inputField">
                                            <P smFt className="mb-0">Total:</P>
                                            <P smFt className="fw-bolder my-0">{INR_SYMBOL}550</P>
                                        </div>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 12, md: 12 }} className="">
                                        <div className="inputField">
                                            <P smFt className="mb-0">Payment Method:</P>
                                            <P smFt className="fw-bolder my-0">Pay by Credit/Debit Card</P>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        )}
                    </Grid>
                    <Grid size={{ xs:12, sm: 12, md: 6, lg: 4 }} className="sticky-top">
                        {!isOrderPlaced ? (
                            <div className="detailsSec p-4">
                                <H5 bigFt clrBrn className="pb-3 border-bottom">Order Summary</H5>
                                <div className="">
                                    <div className="d-flex align-items-start justify-content-between my-3">
                                        <H5 smFt1 className="fw-bold">Subtotal (10 items)</H5>
                                        <P className="mt-0">₹1060</P>
                                    </div>
                                    <div className="d-flex align-items-start justify-content-between my-3">
                                        <H3 smFt1>Shipping</H3>
                                        <P className="mt-0">₹60</P>
                                    </div>
                                    <div className="d-flex align-items-start justify-content-between my-3 border-bottom">
                                        <H3 smFt1>Discount</H3>
                                        <P className="mt-0">-0.00</P>
                                    </div>
                                    <div className="d-flex align-items-start justify-content-between my-3">
                                        <H3 smFt1 className="fw-bold">Total:</H3>
                                        <P className="mt-0">₹1120</P>
                                    </div>
                                    <P smFt>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</P>
                                    <ButtonSec className="button button-primary w-100" onClick={onSubmit} type='submit'>Place Order</ButtonSec>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <H5 bigFt className="mb-3">Order Details</H5>
                                <div className="border p-3">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <H3 smFt1>Product</H3>
                                        <P smFt>Total</P>
                                    </div>
                                    <div className="mb-3">
                                        {productsList && productsList.map((item, i) => {
                                            return <div className="cartListSec d-flex align-items-start justify-content-between mb-3" key={i}>
                                                <div className="d-flex align-items-start justify-content-start">
                                                    <Img src={item.pdtImg} alt="productImage" className="size50px rounded" />
                                                    <div className="ms-3">
                                                        <H3 smFt1 className="my-0">{item.pdtName}</H3>
                                                        <P className="mt-0">{item.pdtPrice}</P>
                                                    </div>
                                                </div>
                                                <P className="mt-0">{item.pdtPrice}</P>
                                            </div>
                                        })}
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between my-3 border-bottom">
                                        <H3 smFt1>Subtotal:</H3>
                                        <P bigFt className="mt-0">{INR_SYMBOL}560</P>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between my-3 border-bottom">
                                        <H3 smFt1>Shipping:</H3>
                                        <P smFt className="mt-0">{INR_SYMBOL}60 <span>via</span> DTDC</P>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between my-3 border-bottom">
                                        <H3 smFt1>Payment Method:</H3>
                                        <P className="mt-0">Pay by Credit/Debit Card</P>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between my-3">
                                        <H3 smFt1>Total:</H3>
                                        <P className="mt-0">₹1060</P>
                                    </div>
                                    <H5 bigFt>Billing address</H5>
                                    <P smFt style={{ whiteSpace: "pre-line" }}>{address}</P>
                                </div>
                            </div>
                        )}
                    </Grid>
                    <Grid size={{ xs:12, sm: 12, md: 6, lg: 4 }} className="sticky-top">
                        {!isOrderPlaced && (
                            <div className="detailsSec p-4">
                                <H5 bigFt clrBrn className="border-bottom pb-3">Order Items</H5>
                                <div className="">
                                    <div className="">
                                        {productsList && productsList.map((item, i) => {
                                            return <div className="cartListSec d-flex align-items-start justify-content-between border-bottom pb-2 mb-2" key={i}>
                                                <div className="d-flex align-items-start justify-content-start">
                                                    <Img src={item.pdtImg} alt="productImage" className="size50px rounded" />
                                                    <div className="ms-3">
                                                        <H3 smFt1 className="my-0">{item.pdtName}</H3>
                                                        <P className="mt-0">{item.pdtPrice}</P>
                                                    </div>
                                                </div>
                                                <P className="mt-0">{item.pdtPrice}</P>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </CheckoutListSec>
    );
}

export default CheckoutList;
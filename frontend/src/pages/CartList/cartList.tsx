import { useEffect, useState } from "react";
import { ButtonSec, CartListSec, H3, H5, Img, P } from "../../assets/css/styledcomponents";
import { useLocation, useNavigate } from "react-router-dom";
import { Drawer } from "@mui/material";
import axios from "axios";
import { API, DOMAIN } from "../../helper/helper";
import { showError, showSuccess } from "../../utils/toast";

function CartList({ open, toggleDrawer }: any) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [ cartDetailsList, setCartDetailsList ]: any = useState([]);
    const [ cartSummaryList, setCartSummaryList ]: any = useState({});
    const location = useLocation();
    const [ locationName, setLocationName ] = useState("");
    useEffect(() => {
        setLocationName(location.pathname)
        console.log(locationName);
    },[locationName])
    
    useEffect(() => {
        getFetchCartData();
    },[])

    const getFetchCartData = async () => {
        const { data } = await axios.get(`${DOMAIN + API.GET_ALL_CART}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(data?.cart, "cart data");
        if (data?.success) {
            setCartDetailsList(data?.cart);
            setCartSummaryList(data?.summary);
        }
    }

    const handleClick = (data: any, type: any, id: any) => {
        if (type === "minus") {
            setCartDetailsList((prevCart: any) =>
                prevCart.map((item: any) => ({
                ...item,
                metaData: item.metaData.map((meta: any) =>
                    meta.size === data?.size
                    ? {
                        ...meta,
                        quantity: meta.quantity - 1,
                    }
                    : meta
                ),
                }))
            );
            getCartPlusMinusData(data, -1, id);
        } else if (type === "plus") {
            setCartDetailsList((prevCart: any) =>
                prevCart.map((item: any) => ({
                ...item,
                metaData: item.metaData.map((meta: any) =>
                    meta.size === data?.size
                    ? {
                        ...meta,
                        quantity: meta.quantity + 1,
                    }
                    : meta
                ),
                }))
            );
            getCartPlusMinusData(data, 1, id);
        } else if (type === "checkout") {
            navigate("/checkout")
        } else if (type === "removeCart") {
            removeCartList(data);
        } else if (type === "shopNow") {
            console.log(locationName, "text");
            toggleDrawer(false)();
            navigate(`/`);
        }
    }

    const getCartPlusMinusData = async (metaData: any, addMinusCount: any, id: any) => {
        try {
            const formData = {
                productId: id,
                metaData: [{
                    price: metaData?.price,
                    stock: metaData?.stock,
                    size: metaData?.size,
                    quantity: addMinusCount,
                }],
            }
            console.log(formData);
            const { data } = await axios.post(`${DOMAIN + API.ADD_TO_CART}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(data);
        } catch (err: any) {
            // console.error("Error in sending message:", err);
            showError(err.response?.data?.message || 'add to Cart is failed');
        }
    }

    const removeCartList =  async (cart: any) => {
        console.log(cart?._id);
        const cartId = cart?._id;
        const { data } = await axios.delete(`${DOMAIN + API.REMOVE_CART + "/" + cartId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(data, "cart data");
        if (data?.success) {
            showSuccess(data?.message);
            getFetchCartData();
        }
    }

    return (
        <CartListSec>
            {/* <a data-bs-toggle="offcanvas" data-bs-target="#cartPage" aria-controls="offcanvasRight" href="#cartPage" role="button" className="button button-dark w-100 d-inline-block text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart me-2 align-text-bottom" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                Add To Cart
            </a> */}
            <Drawer open={open} anchor={"right"} onClose={toggleDrawer(false)}>
                <div className="cart py-3">
                    <div className="offcanvas-header p-2 px-4 border-bottom">
                        <h5 className="offcanvas-title" id="cartPageLabel">
                            Shopping Cart
                        </h5>
                        <button type="button" className="btn-close" onClick={toggleDrawer(false)} ></button>
                    </div>
                    <div className="offcanvas-body">
                        {cartDetailsList && cartDetailsList.map((item: any, i: any) => {
                            return <div className="cartListSec d-flex align-items-start justify-content-start border-bottom py-3" key={i}>
                                <Img src={item?.productId?.pdtImages[0]} alt="productImage" className="size80px" />
                                <div className="ms-4">
                                    <P clrgrn className="mt-0">{"₹" + item?.metaData[0]?.price}</P>
                                    <H3 smFt1 className="mt-0">{item?.productId?.pdtName} <br/> - ({item?.metaData[0]?.size})</H3>
                                    <div className="">
                                        <div className="border px-1 me-3 d-inline-block">
                                            <span className="d-inline-block px-2 fs-5" onClick={() => handleClick(item?.metaData[0], "minus", item?.productId?._id)}>-</span>
                                                <P smFt className="d-inline-block my-0 mx-2">{item?.metaData[0]?.quantity}</P>
                                            <span className="d-inline-block px-2 fs-5" onClick={() => handleClick(item?.metaData[0], "plus", item?.productId?._id)}>+</span>
                                        </div>
                                        <ButtonSec className="button remove" onClick={() => handleClick(item, "removeCart", item?.productId?._id)}>Remove</ButtonSec>
                                    </div>
                                </div>
                            </div>
                        })}
                        {cartDetailsList.length === 0 && (
                            <div className="d-flex align-items-center justify-content-center flex-column p-5 text-center">
                                <H5 bigFt className="pt-5">Your cart is Empty. </H5>
                                <P smFt>You may check out all the available products and <br/> buy some in the shop</P>
                                <ButtonSec className="button button-dark" onClick={() => handleClick("", "shopNow", "")}>Return to Shop</ButtonSec>
                            </div>
                        )}
                    </div>
                    {cartDetailsList.length > 0 && (
                        <div className="p-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <H5 bigFt className="mt-0">
                                    Subtotal:
                                </H5>
                                <P bigFt>{"₹" + cartSummaryList?.subtotal}</P>
                            </div>
                            <div className="">
                                <ButtonSec className="button button-primary d-inline-block my-0" onClick={() => handleClick("", "checkout", "")}>
                                    Checkout
                                </ButtonSec>
                            </div>
                        </div>
                    )}
                </div>
            </Drawer>
        </CartListSec>
    );
}

export default CartList;
import { useState } from "react";
import { ButtonSec, CartListSec, H3, H5, Img, P } from "../../assets/css/styledcomponents";
import silkthreadbangle from "../../assets/images/category/silkthreadbangle.jpeg";
import glassbangle from "../../assets/images/category/glassbangle.jpeg";
import silkthreadjhumka from "../../assets/images/category/silkthreadjhumka.jpeg";
import kundanstud from "../../assets/images/category/kundanstud.jpeg";
import kundanhairband from "../../assets/images/category/kundanhairband.jpeg";
import centerclip from "../../assets/images/category/centerclip.jpeg";
import { useNavigate } from "react-router-dom";

function CartList() {
    const navigate = useNavigate();
    const [ minMaxCnt, setMinMaxCnt ] = useState(1);

    const productsList = [
        { pdtName: "Slik Thread Bangles", pdtPrice: "₹520", pdtImg: silkthreadbangle, catName: "Slik Thread Bangles" },
        { pdtName: "Glass Bangles", pdtPrice: "₹120", pdtImg: glassbangle, catName: "Glass Bangles" },
        { pdtName: "Slik Thread Jhumkas", pdtPrice: "₹120", pdtImg: silkthreadjhumka, catName: "Slik Thread Jhumkas" },
        { pdtName: "Kundan Studs", pdtPrice: "₹120", pdtImg: kundanstud, catName: "Kundan Studs" },
        { pdtName: "Kundan Hair Bands", pdtPrice: "₹120", pdtImg: kundanhairband, catName: "Kundan Hair Bands" },
        { pdtName: "Center Clips", pdtPrice: "₹120", pdtImg: centerclip, catName: "Center Clips", },
    ]
    const handleClick = (data: any, type: any) => {
        if (type === "minus") {
            console.log(data);
            if (minMaxCnt > 1) {
                setMinMaxCnt(minMaxCnt - data)
            }
        } else if (type === "plus") {
            setMinMaxCnt(minMaxCnt + data)
        } else if (type === "checkout") {
            navigate("/checkout")
        }
    }
    return (
        <CartListSec>
            <a data-bs-toggle="offcanvas" data-bs-target="#cartPage" aria-controls="offcanvasRight" href="#cartPage" role="button" className="button button-dark w-100 d-inline-block text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart me-2 align-text-bottom" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                Add To Cart
            </a>
            <div className="offcanvas offcanvas-end" tabIndex={-1} id="cartPage" aria-hidden="true" aria-labelledby="cartPageLabel">
                <div className="offcanvas-header px-2 mx-2 border-bottom">
                    <h5 className="offcanvas-title" id="cartPageLabel">
                        Shopping Cart
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {productsList && productsList.map((item, i) => {
                        return <div className="cartListSec d-flex align-items-start justify-content-start border-bottom py-3" key={i}>
                            <Img src={item.pdtImg} alt="productImage" className="size80px" />
                            <div className="ms-4">
                                <P clrgrn className="mt-0">{item.pdtPrice}</P>
                                <H3 smFt1 className="mt-0">{item.pdtName}</H3>
                                <div className="">
                                    <div className="border px-1 me-3 d-inline-block">
                                        <span className="d-inline-block px-2 fs-5" onClick={() => handleClick(1, "minus")}>-</span>
                                            <P smFt className="d-inline-block my-0 mx-2">{minMaxCnt}</P>
                                        <span className="d-inline-block px-2 fs-5" onClick={() => handleClick(1, "plus")}>+</span>
                                    </div>
                                    <ButtonSec className="button remove">Remove</ButtonSec>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <H5 bigFt className="mt-0">
                            Subtotal:
                        </H5>
                        <P bigFt>₹200</P>
                    </div>
                    <div className="">
                        <ButtonSec className="button button-primary d-inline-block my-0" onClick={() => handleClick("", "checkout")}>
                            Checkout
                        </ButtonSec>
                    </div>
                </div>
            </div>
        </CartListSec>
    );
}

export default CartList;
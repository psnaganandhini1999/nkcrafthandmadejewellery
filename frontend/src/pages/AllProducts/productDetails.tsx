import { Container, Grid } from "@mui/material";
import { ButtonSec, H3, H5, Img, P, ProductDetailsSec } from "../../assets/css/styledcomponents";
import { Link } from "react-router-dom";
import silkthreadbangle from "../../assets/images/category/silkthreadbangle.jpeg";
import { useState } from "react";
import InnerImageZoom from 'react-inner-image-zoom';
import CartList from "../CartList/cartList";

function ProductDetails() {
    const [ minMaxCnt, setMinMaxCnt ] = useState(1);
    const [ cartLoader, setCartLoader ] = useState(false);
    const [ bangleSizeName, setBangleSizeName ] = useState("");
    const [ active, setActive ] = useState(false);

    const productsDetailsList = { pdtName: "Slik Thread Bangles", pdtPrice: "₹520", pdtImg: silkthreadbangle, catName: "Slik Thread Bangles" }
    const bandlesSize = [
        { name: "1.10", size: "1.10" },
        { name: "1.12", size: "1.12" },
        { name: "1.14", size: "1.14" },
        { name: "1.18", size: "1.18" },
        { name: "2.0", size: "2.0" },
        { name: "2.2", size: "2.2" },
        { name: "2.4", size: "2.4" },
        { name: "2.6", size: "2.6" },
        { name: "2.8", size: "2.8" },
    ]

    const handleClick = (data: any, type: any) => {
        if (type === "minus") {
            console.log(data);
            if (minMaxCnt > 1) {
                setMinMaxCnt(minMaxCnt - data)
            }
        } else if (type === "plus") {
            setMinMaxCnt(minMaxCnt + data)
        } else if (type === "cart") {
            setCartLoader(true);
            setTimeout(() =>{
                setCartLoader(false);
            }, 500)
        } else if (type === "banSize") {
            setBangleSizeName(data);
            setActive(!active);
        }
    }

    return (
        <ProductDetailsSec>
            <Container>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mt-3">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/product?type=slikthreadbangles">Slik Thread Bangles</Link>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Bangles</li>
                    </ol>
                </nav>
                <div className="productDetailSec">
                    <Grid container spacing={2} className="" justifyContent={"space-between"} alignItems={"start"}>
                        <Grid size={{ xs:12, sm: 12, md: 6, lg: 6}}>
                            <div className="pdtImageSec">
                                <InnerImageZoom src={productsDetailsList.pdtImg} zoomSrc={productsDetailsList.pdtImg} />
                                {/* <Img src={productsDetailsList.pdtImg} alt="silkthreadbangle" className="size100percent" /> */}
                            </div>
                        </Grid>
                        <Grid size={{ xs:12, sm: 12, md: 6, lg: 6}}>
                            <H5 smFt>Category: {productsDetailsList.catName}</H5>
                            <H3 bigFt>{productsDetailsList.pdtName}</H3>
                            <P smFt className="border px-3 py-1 d-inline-block fw-bold:">In Stock</P>
                            <H3 bigFt>{productsDetailsList.pdtPrice}</H3>
                            <div className="sizeSec">
                                <P bigFt>Select size</P>
                                 <ul>
                                    {bandlesSize && bandlesSize?.map((item, i) => {
                                        return <li key={i} onClick={() => handleClick(i, "banSize",)}>
                                            {/* {(item.name === "Customize" && productsDetailsList?.catName === "Slik Thread Bangles")
                                             ? <P smFt className={`${(Number(bangleSizeName) === i) ? "size" : "" } border px-3 py-1`}>
                                                ""
                                            </P>
                                            : item.name !== "Customize" && <P smFt className={`${(Number(bangleSizeName) === i) ? "size" : "" } border px-3 py-1`}>
                                                {item.size}
                                            </P>
                                            } */}
                                           <P smFt className={`${(Number(bangleSizeName) === i) ? "size" : "" } border px-3 py-1`}>
                                                {item.size}
                                            </P>
                                        </li>
                                    })}
                                </ul>
                            </div>
                            <div className="quantSec">
                                <Grid container justifyContent={"center"} alignItems={"center"}>
                                    <Grid size={{ xs:12, sm:12, md: 12, lg: 12}}>
                                        {Number(bangleSizeName) === 100 ? (
                                            <div className="d-inline-block mb-3">
                                                <P smFt className="mt-0">To Add Your Customizable image.</P>
                                                <input className="form-control" type="file" id="formFile" />
                                            </div>
                                        ) : (
                                            <div className="mb-3">
                                                <P bigFt className="mt-0">Quantity</P>
                                                <div className="border px-1 pb-1 me-3 d-inline-block">
                                                    <span className="d-inline-block px-3 fs-5" onClick={() => handleClick(1, "minus")}>-</span>
                                                        <P smFt className="d-inline-block my-0">{minMaxCnt}</P>
                                                    <span className="d-inline-block px-3 fs-4" onClick={() => handleClick(1, "plus")}>+</span>
                                                </div>
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid size={{ xs:12, sm:12, md: 12, lg: 12}}>
                                        <div className="d-inline-block w-100 my-0" onClick={() => handleClick("", "cart")}>
                                            <CartList />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="quantSec">
                                <P bigFt className="border-bottom pb-2 mt-3">Product Details</P>
                                <P smFt className="d-inline-block my-0">Slik Thread Bangles available in sizes 1.10, 1.12, 1.14, 1.18, 2.0, 2.2, 2.4, 2.6 and 2.8 in most alluring colours.  </P>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </ProductDetailsSec>
    );
};

export default ProductDetails;
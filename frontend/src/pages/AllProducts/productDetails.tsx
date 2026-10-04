import { Container, Grid } from "@mui/material";
import { Error, H3, H5, P, ProductDetailsSec } from "../../assets/css/styledcomponents";
import { Link, useParams } from "react-router-dom";
import silkthreadbangle from "../../assets/images/category/silkthreadbangle.jpeg";
import { useEffect, useState } from "react";
import InnerImageZoom from 'react-inner-image-zoom';
import CartList from "../CartList/cartList";
import axios from "axios";
import { API, DOMAIN } from "../../helper/helper";
import { getAllCategories } from "../AllCategories/getCategoriesData";
import { showError, showSuccess } from "../../utils/toast";

type errorIntitalData = {
    size?: string,
}

function ProductDetails() {
    const [ minMaxCnt, setMinMaxCnt ] = useState(1);
    const [ cartLoader, setCartLoader ] = useState(false);
    const [ bangleSizeName, setBangleSizeName ] = useState(-1);
    const [ active, setActive ] = useState(false);
    const [ productDetailsList, setProductDetailsList ]: any = useState([]);
    const [ productSizes, setProductSizes ]: any = useState([]);
    const [ productTags, setProductTags ]: any = useState([]);
    const paramsData: any = useParams();
    const [ id ]: any = useState(paramsData?.id || "")
    // console.log(paramsData?.id);
    const params = {
        search: "",
        status: ""
    }
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(true);
    const [ pdtPriceStockData, SetPdtPriceStockData ]: any = useState({})
    const [ errorData, setErrorData ]: any = useState<errorIntitalData>({}); 

    useEffect(() => {
        if (id !== "") {
            getFetchEditData();
        }
    }, [id])

    const getFetchEditData = async () => {
        const { data } = await axios.get(`${DOMAIN + API.GET_PRODUCT_BY_ID + "/" + id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(data?.data);
        if (data?.success) {
            const [categoryResponse] =
            await Promise.all([
                getAllCategories(params),
            ]);

            const products = data?.data;
            const categories = categoryResponse.filter((cat: any) => cat._id === products?.category);
            const pdtData = {
                ...products,
                categoryName: categories[0]?.catName
            }
            console.log(data?.data, categories);
            setProductDetailsList(pdtData);
            setProductSizes(pdtData?.metaData);
            setProductTags(pdtData?.pdtTags?.join(", "));
            getPriceList(pdtData?.metaData);
        }
    }

    const getPriceList = (data: any) => {
        SetPdtPriceStockData({ price: data[0]?.price, stock: Number(data[0]?.stock)});
    }

    useEffect(() => {
        fetchGetAllCartData();
    }, [])

    const fetchGetAllCartData = async () => {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(DOMAIN + API.GET_ALL_CART, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        // setCategoriesList(data?.categories);
        console.log(data, "fetchGetAllCartData");
    }

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

    const handleClick = (data: any, type: any, index: any) => {
        if (type === "minus") {
            console.log(data);
            if (minMaxCnt > 1) {
                setMinMaxCnt(minMaxCnt - data)
                SetPdtPriceStockData((prev: any) => ({ ...prev, quantity: minMaxCnt - data }));
            }
        } else if (type === "plus") {
            setMinMaxCnt(minMaxCnt + data)
            SetPdtPriceStockData((prev: any) => ({ ...prev, quantity: minMaxCnt + data }));
        } else if (type === "cart") {
            addToCartList();
            console.log(minMaxCnt, "testing");
            
        } else if (type === "banSize") {
            setBangleSizeName(index);
            setActive(!active);
            console.log(data, type);
            SetPdtPriceStockData(() => ({ price: data?.price, stock: Number(data?.stock), size: data?.size, quantity: minMaxCnt }));
            console.log(pdtPriceStockData);
            
        }
    }

    const addToCartList = async () => {
        const validationErrors = validation();
        setErrorData(validationErrors);
        // console.log(formData, "login", metaData, validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setCartLoader(true);
            try {
                const formData = {
                    productId: id,
                    metaData: [{
                        price: pdtPriceStockData?.price,
                        stock: pdtPriceStockData?.stock,
                        size: pdtPriceStockData?.size,
                        quantity: pdtPriceStockData?.quantity,
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
                if (data?.success) {
                    setTimeout(() => {
                        setCartLoader(false);
                    }, 1000);
                    setTimeout(() => {
                        setOpen(true);
                    }, 1300);
                }
            } catch (err: any) {
                // console.error("Error in sending message:", err);
                showError(err.response?.data?.message || 'Registration failed');
                setCartLoader(false);
            }
        }
        
    }

    const validation = () => {
        let formErrors: errorIntitalData = {};
        if (!pdtPriceStockData.size) {  
            formErrors.size = "Please select your Size."
        }
        return formErrors
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <ProductDetailsSec>
            <Container>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb pt-3">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/product?type=${productDetailsList.category}`}>{productDetailsList.categoryName}</Link>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{productDetailsList.categoryName}</li>
                    </ol>
                </nav>
                <div className="productDetailSec">
                    <Grid container spacing={2} className="" justifyContent={"space-between"} alignItems={"start"}>
                        <Grid size={{ xs:12, sm: 12, md: 6, lg: 6}}>
                            <div className="pdtImageSec">
                                <InnerImageZoom src={silkthreadbangle} zoomSrc={productDetailsList.pdtImg} />
                                {/* <Img src={productDetailsList.pdtImg} alt="silkthreadbangle" className="size100percent" /> */}
                            </div>
                        </Grid>
                        <Grid size={{ xs:12, sm: 12, md: 6, lg: 6}}>
                            <div className="d-flex align-items-center">
                                <H5 smFt>Category: <span>{productDetailsList.categoryName}</span></H5>
                            </div>
                            <div className="pb-3">
                                <span className="me-2" style={{color: "rgb(245, 158, 11)"}}>★★★★☆</span>
                                 (25 Reviews)
                            </div>
                            <H3 bigFt className="">{productDetailsList.pdtName}</H3>
                            <P smFt className="m-0 d-inline-block fw-bold text-success">
                                {pdtPriceStockData?.stock > 0 ? "In Stock" : "Out of stock"}
                            </P>
                            <H3 bigFt>{"₹" +pdtPriceStockData?.price}</H3>
                            <div className="quantSec">
                                {/* <P bigFt className="border-bottom pb-2 mt-3">Product Details</P> */}
                                <P smFt className="d-inline-block my-0">{productDetailsList?.pdtDes}</P>
                            </div>
                            <div className="d-flex align-items-center justify-content-start border-bottom pb-2 mb-3">
                                <P smFt className="my-0">Tags:&nbsp;</P>
                                <P smFt className="d-inline-block my-0">{productTags}</P>
                            </div>
                            <H5 smFt>Color: {productDetailsList.pdtColors}</H5>
                            <div className="sizeSec">
                                <P bigFt className="mb-0">Sizes</P>
                                 <ul className="mb-0">
                                    {productSizes && productSizes?.map((item: any, i: any) => {
                                        return <li key={i} onClick={() => handleClick(item, "banSize", i)}>
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
                                <Error className={`${errorData.size ? 'mt-1 py-0' : 'm-0 p-0'}`}>{errorData.size}</Error>

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
                                                    <span className="d-inline-block px-3 fs-5" onClick={() => handleClick(1, "minus", "")}>-</span>
                                                        <P smFt className="d-inline-block my-0">{minMaxCnt}</P>
                                                    <span className="d-inline-block px-3 fs-4" onClick={() => handleClick(1, "plus", "")}>+</span>
                                                </div>
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid size={{ xs:12, sm:12, md: 12, lg: 12}}>
                                        <div className="d-inline-block w-100 my-0 mb-4" onClick={() => handleClick("", "cart", "")}>
                                             <a className="button button-dark w-100 d-inline-block text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart me-2 align-text-bottom" viewBox="0 0 16 16">
                                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                                </svg>
                                                {cartLoader ? "Loading..." : "Add To Cart"}
                                            </a>
                                        </div>
                                    </Grid>
                                    <CartList open={open} toggleDrawer={toggleDrawer} />
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </ProductDetailsSec>
    );
};

export default ProductDetails;
import { Container, Grid } from "@mui/material";
import { AllCateProductsSec, H3, H5 } from "../../assets/css/styledcomponents";
import productImage from "../../assets/images/homepage/banner/banner3.webp";
import PaginatedItems from "../Pagination/pagination";
import silkthreadbangle from "../../assets/images/category/silkthreadbangle.jpeg";
import glassbangle from "../../assets/images/category/glassbangle.jpeg";
import silkthreadjhumka from "../../assets/images/category/silkthreadjhumka.jpeg";
import kundanstud from "../../assets/images/category/kundanstud.jpeg";
import kundanhairband from "../../assets/images/category/kundanhairband.jpeg";
import centerclip from "../../assets/images/category/centerclip.jpeg";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { API, DOMAIN } from "../../helper/helper";
import { getAllCategories } from "../AllCategories/getCategoriesData";

function AllProducts() {
    const [column, setColumn] = useState(2);
    const navigate = useNavigate();
    const [ queryParams ] = useSearchParams();
    const [range, setRange] = useState({ min: 0, max: 100 });
    const [ productsList, setProductsList ] = useState([]);
    const [ allCategories, setAllCategories ] = useState([]);
    const [ catIdData, setCatIdData ]: any = useState("");
    const params = {
        search: "",
        status: ""
    }
    useEffect(() => {
        console.log(queryParams.get("type"));
        const catId = queryParams?.get("type");
        setCatIdData(catId);
        fetchGetAllProducts(params);
    }, [queryParams])

    const fetchGetAllProducts = async (params: any) => {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(DOMAIN + API.GET_ALL_PRODUCT, {
            params,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (data?.products !== "[]" || data?.products !== undefined) {
            const [categoryResponse] =
            await Promise.all([
                getAllCategories(params),
            ]);

            const products = data?.products;
            const catId = queryParams?.get("type");
            const categories = categoryResponse.filter((cat: any) => cat._id === catId);
            setAllCategories(categoryResponse);
            const pdtData = products.filter((pdt: any) => pdt?.category === categories[0]._id);
            console.log(pdtData, categories, "catData",products, categoryResponse, queryParams.get("type"));
            setProductsList(pdtData);
        } else {
            setProductsList([]);
        }
        // console.log(data);
    }

    const handleClick = (columnType: any, catType: any) => {
        if (catType === "category") {
            navigate(`/product?type=${columnType}`); 
        } else {
            const type = queryParams.get("type")
            console.log(type);
            setColumn(columnType);
            navigate(`/product/?type=${type}&column=${columnType}`)
        }
    }

    const [rangeValue, setRangeValue] = useState(50); 
    const minValue = 0;
    const maxValue = 100;

    // Handle the change event
    const handleChange = (event: any) => {
        setRangeValue(event.target.value);
    };

    if (window.matchMedia("max-width:768px").matches) {
        setColumn(0);
    }
  
    return (
        <AllCateProductsSec className="my-4">
            <div className="container-fluid">
                <H3 bigFt className="my-3 my-lg-5">All Products</H3>
                <Grid container spacing={2} className="" justifyContent={"space-between"} alignItems={"center"}>
                    <Grid size={{ xs:4, sm: 4, md: 4, lg: 1}}>
                        <H5 smFt className="text-left filter" >
                            <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" className="border p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-filter align-top me-1" viewBox="0 0 16 16">
                                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                                </svg>
                                Filter
                            </a>
                        </H5>
                        <div className="offcanvas offcanvas-start" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                            <div className="offcanvas-header px-4 mx-2">
                                <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-filter align-top me-2" viewBox="0 0 16 16">
                                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                                    </svg>
                                    Filter
                                </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <div className="accordion" id="accordionPanelsStayOpenExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                            <H3 smFt>Product Categories</H3>
                                        </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                                            <div className="accordion-body pt-0">
                                                {allCategories && allCategories.map((item: any, i: any) => {
                                                    return <div className="" onClick={() => handleClick(item.path, "category")} key={i}>
                                                        <H3 smFt1>{item.catName}</H3>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                                <H3 smFt>Availability</H3>
                                            </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                                            <div className="accordion-body pt-0">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="checkDefault" />
                                                    <label className="form-check-label" htmlFor="checkDefault">
                                                        In stock
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="checkDefault1" />
                                                    <label className="form-check-label" htmlFor="checkDefault1">
                                                        Out of stock
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                                            <H3 smFt>Price</H3>
                                        </button>
                                        </h2>
                                        <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                                            <div className="accordion-body pt-0">
                                                <label htmlFor="range-slider">Select a value between {minValue} and {maxValue}: {rangeValue}</label>
                                                <input
                                                    type="range"
                                                    id="range-slider"
                                                    min={minValue} // Set the minimum value
                                                    max={maxValue} // Set the maximum value
                                                    value={rangeValue} // Control the value with React state
                                                    onChange={handleChange} // Update the state on change
                                                    step="1" // Optional: defines the increment/decrement step (default is 1)
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={{ xs:5, sm: 5, md: 4, lg: 8}} className="text-center d-none">
                        <ul className="colIcon">
                            <li onClick={() => handleClick(12, "colType")}>
                                <svg aria-hidden="true" role="img" focusable="false" width="19" height="13" viewBox="0 0 19 13" fill="currentColor">
                                    <circle cx="2.4375" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="2.4375" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                    <rect x="7" y="2" width="12" height="1" fill="currentColor"></rect>
                                    <rect x="7" y="10" width="12" height="1" fill="currentColor"></rect>
                                </svg>
                            </li>
                            <li onClick={() => handleClick(4, "colType")}>
                                <svg aria-hidden="true" role="img" focusable="false" width="22" height="13" viewBox="0 0 22 13" fill="currentColor">
                                    <circle cx="2.4375" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="10.5625" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="18.6875" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="2.4375" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="10.5625" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="18.6875" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                </svg>
                            </li>
                            <li onClick={() => handleClick(3, "colType")} className="d-none d-lg-inline-block">
                                <svg aria-hidden="true" role="img" focusable="false" width="30" height="13" viewBox="0 0 30 13" fill="currentColor">
                                    <circle cx="2.4375" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="10.5625" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="18.6875" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="26.8125" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="2.4375" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="10.5625" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="18.6875" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="26.8125" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                </svg>
                            </li>
                            <li onClick={() => handleClick(2, "colType")} className="d-none d-lg-inline-block">
                                <svg aria-hidden="true" role="img" focusable="false" width="38" height="13" viewBox="0 0 38 13" fill="currentColor">
                                    <circle cx="2.4375" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="10.5625" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="18.6875" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="26.8125" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="35.4375" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="2.4375" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="10.5625" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="18.6875" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="26.8125" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="35.4375" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                </svg>
                            </li>
                        </ul>
                    </Grid>
                    <Grid size={{ xs:3, sm: 3, md: 4, lg: 1}} className="text-end pe-3">
                        <ul>
                            <li>
                                <svg aria-hidden="true" role="img" focusable="false" width="19" height="13" viewBox="0 0 19 13" fill="currentColor">
                                    <circle cx="2.4375" cy="2.4375" r="2.4375" fill="currentColor"></circle>
                                    <circle cx="2.4375" cy="10.5625" r="2.4375" fill="currentColor"></circle>
                                    <rect x="7" y="2" width="12" height="1" fill="currentColor"></rect>
                                    <rect x="7" y="10" width="12" height="1" fill="currentColor"></rect>
                                </svg>
                           </li>
                        </ul>
                    </Grid>
                </Grid>
                <Grid container spacing={2} className="banner-content">
                    <PaginatedItems itemsPerPage={12} data={productsList} type="product" column={column}/>
                </Grid>
            </div>
        </AllCateProductsSec>
    );
}

export default AllProducts;
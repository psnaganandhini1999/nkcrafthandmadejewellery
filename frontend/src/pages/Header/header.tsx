import { useState } from "react";
import { ButtonSec, H2, H5, HeaderMainSec, Img, P } from "../../assets/css/styledcomponents";
import { Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import headerLogo from "../../assets/images/logo2.png";
import MenuIcon from '@mui/icons-material/Menu';
import search from "../../assets/images/header/search.svg";
import heart from "../../assets/images/header/heart.svg";
import bag from "../../assets/images/header/bag.svg";
import CartList from "../CartList/cartList";

function HeaderMain() {
    const [ isExpanded, setIsExpanded ]: any = useState(false);
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ searchInput, setSearchInput ] = useState("");
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const menu = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/product?type=all" },
        { name: "Contact Us", path: "/" },
    ]
    const subMenu = [
        { icon: bag, path: "" },
        { icon: heart, path: "" },
    ]
    const handleToggle = () => {
        if (window.screen.width < 991) {
        setIsExpanded(!isExpanded)
        }
    }
    
    const handleClick = (e: any, type: any) => {
        console.log("clicked");
        if (type === "cart") {
            setOpen(true);
        }
    }

    const clearLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleSearch = () => {
        if (!searchInput.trim()) return;
        navigate(`/product?type=${encodeURIComponent(searchInput)}`);
    };
    return (
        <HeaderMainSec>
        <div className='header-section'>
            <Grid container className="header" justifyContent={"space-between"} alignItems={"center"}>
                <Grid size={1}>
                    <div className="headerLeft">
                    <Link to={"/"}>
                        <img src={headerLogo} alt="headerLogo" className="headerImg" />
                    </Link>
                    </div>
                </Grid>
                <Grid size={9} justifyContent={"center"} className="text-center">
                    <ul className="headerRight mb-0">
                    {menu.map((x, i) => {
                        return <li key={i} className={`${(x.name === "Services") ? "services" : ""} ${(x.name === "Product") ? "product " : ""}${i === activeIndex ? "active" : ""}`}>
                            {x.name === "Contact Us" ? (
                                <div className="button button-primary" onClick={() => setActiveIndex(i)}>
                                    <a href="#contactus">Contact Us</a>
                                </div>
                            ) : (
                                <Link to={x?.path} className={`${(x.name === "Services") && "services"} ${(x.name === "Product") && "product"}`} onClick={() => setActiveIndex(i)}>
                                    {x.name}
                                </Link>
                            )}                           
                        </li>
                    })}
                    </ul>

                    <div className="mobileMenu">
                    <div className="headerMenu" onClick={handleToggle}><MenuIcon className="icon" /></div>
                    {isExpanded &&
                        <div id="navMenu" className="mobileHeader isExpanded">
                        {menu.map((x, i) => {
                            return (
                            <div key={i} className={`highlight ${(x.name === "Services") ? "services" : ""} ${(x.name === "Product") ? "product" : ""}`}>
                               <Link to={x?.path} className={`${(x.name === "Services") && "services"} ${(x.name === "Product") && "product"}`}>
                                {x.name}
                                </Link>
                            </div>
                            )
                        })}
                        </div>
                    }
                    </div>
                </Grid>
                <Grid size={2} justifyContent={"end"} sx={{ textAlign: "right"}} className="headerRight pe-3">
                    <div className="d-flex align-items-center justify-content-end">
                        <div className="searchInputSec mx-2">
                            <input
                            type="text"
                            placeholder="Search"
                            name="search"
                            className="searchInput"
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch();
                                }
                            }} />
                            <div className="mx-2">
                                <Img src={search} alt="icons" className="size20px"/>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </div>
                        </div>
                        {token ? (
                            <div className="d-flex align-items-center justify-content-end">
                                <Link to={"/profile"} className="me-1 mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                    </svg>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Link to={"/login"} className="mx-2">
                                    Login
                                </Link>
                                 <Link to={"/signup"} className="mx-2">
                                    Signup
                                </Link>
                            </div>
                        )}
                        {subMenu?.map((d, j) => {
                            return <div key={j}>
                                {d.icon === bag && (
                                    <div className="mx-2" onClick={() => handleClick("","cart")}>
                                        <Img src={d.icon} alt="icons" className="size20px"/>
                                    </div>
                                )}
                                {d.icon !== bag && (
                                    <Link to={d.path} className="mx-2">
                                        <Img src={d.icon} alt="icons" className="size20px"/>
                                    </Link>
                                )}
                            </div>
                        })}
                        <CartList open={open} toggleDrawer={toggleDrawer} />
                        {token && (
                            <div className="d-flex align-items-center justify-content-end">
                                <ButtonSec onClick={() => clearLocalStorage()} className="button button-dark logout mx-2 py-1 px-3">
                                    Logout
                                </ButtonSec>
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
        </HeaderMainSec>
    );
}

export default HeaderMain;
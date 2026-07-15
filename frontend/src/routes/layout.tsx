import HeaderMain from '../pages/Header/header';
import FooterMain from '../pages/Footer/footer';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Layout = ({ children }: any) => {
    const location = useLocation();
    const [locationName, setLocationName] = useState("");

    useEffect(() => {
        console.log(location.pathname);
        if (location.pathname === "/product") {
            setLocationName("product");
        } else if (location.pathname === "/") {
            setLocationName("home");
        }
    },[location.pathname])

    return (
        <div className="app-container">
        <HeaderMain />
        {/* {locationName === "product" && (
            <div>test</div>
        )} */}
        <main>{children}</main> {/* This is where your page content will be rendered */}
        <FooterMain />
        </div>
    );
};

export default Layout;

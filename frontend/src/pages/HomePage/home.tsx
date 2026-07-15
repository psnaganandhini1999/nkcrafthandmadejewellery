import React, { useEffect, useState } from "react";
import FooterMain from "../Footer/footer";
import HeaderMain from "../Header/header";
import { BannerSection, Img } from "../../assets/css/styledcomponents";
import bannerImage from "../../assets/images/homepage/banner/banner3.webp";
import AllProducts from "../AllProducts/allProducts";
import { useLocation } from "react-router-dom";

function Home() {
    const location = useLocation();
    const [locationName, setLocationName] = useState("");
    useEffect(() => {
        setLocationName(location.pathname)
        console.log(locationName);
    },[locationName])

    return (
        <div>
            <HeaderMain />
            
            {locationName === "/product" && (
                <div>test</div>
            )}
            {locationName === "/" && (
                <BannerSection>
                    <div className="bannerImg">
                        <Img src={bannerImage} alt="bannerImg" />
                    </div>
                </BannerSection>
            )}
            <AllProducts />
            <FooterMain />
        </div>
    );
}

export default Home;
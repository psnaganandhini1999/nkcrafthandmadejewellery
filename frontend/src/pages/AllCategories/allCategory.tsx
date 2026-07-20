import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { AllCateProductsSec, BannerSection, BoxSection, ButtonSec, H1, H3, Img, P } from "../../assets/css/styledcomponents";
import silkthreadbangle from "../../assets/images/category/silkthreadbangle.jpeg";
import glassbangle from "../../assets/images/category/glassbangle.jpeg";
import silkthreadjhumka from "../../assets/images/category/silkthreadjhumka.jpeg";
import kundanstud from "../../assets/images/category/kundanstud.jpeg";
import kundanhairband from "../../assets/images/category/kundanhairband.jpeg";
import centerclip from "../../assets/images/category/centerclip.webp";
import bgimg from "../../assets/images/bgimg.png";
import handmade from "../../assets/images/icons/handmade.png";
import premium from "../../assets/images/icons/premium.png";
import unique from "../../assets/images/icons/happy.png";
import secure from "../../assets/images/icons/secure.png";
import happy from "../../assets/images/icons/happy.png";
import free from "../../assets/images/icons/freeshipping.png";
import securepayment from "../../assets/images/icons/securepayment.png";
import support from "../../assets/images/icons/support.png";
import heart from "../../assets/images/icons/heart.png";
import ItemsList from "../AllProducts/itemsList";
// import Slider from "react-slick";

function AllCategories() {
    const navigate = useNavigate();

    const allCateList = [
        { catName: "Slik Thread Bangles", catDec: "", catImg: silkthreadbangle, path: "slikthreadbangles" },
        { catName: "Glass Bangles", catDec: "", catImg: glassbangle, path: "glassbangles" },
        { catName: "Slik Thread Jhumkas", catDec: "", catImg: silkthreadjhumka, path: "slikthreadjhumkas" },
        { catName: "Kundan Studs", catDec: "", catImg: kundanstud, path: "kundanstuds" },
        { catName: "Kundan Hair Bands", catDec: "", catImg: kundanhairband, path: "kundanhairbands" },
        { catName: "Center Clips", catDec: "", catImg: centerclip, path: "centerclips" },
        // { catName: "Hair Pins", catDec: "", catImg: productImage },
        // { catName: "Kids Hair Bands", catDec: "", catImg: productImage },
        // { catName: "test", catDec: "", catImg: productImage },
        // { catName: "test", catDec: "", catImg: productImage },
    ]
    
    const allSupportList = [
        { name: "Handmade", surName: "With Love", catImg: handmade },
        { name: "Premium", surName: "Quality", catImg: premium },
        { name: "Unique", surName: "Designs", catImg: unique },
        { name: "Secure", surName: "Packing", catImg: secure },
        { name: "Happy", surName: "Customers", catImg: happy },
    ]

    const allSecureList = [
        { name: "Free Shipping", detail: "On orders above ₹999", catImg: free },
        // { name: "No Returns", detail: "No Returns", catImg: glassbangle },
        { name: "Secure Payments", detail: "100% secure checkout", catImg: securepayment },
        { name: "Support", detail: "24/7 Customer support", catImg: support },
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 2000,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };
    return (
        <AllCateProductsSec className="">
            <BannerSection>
                <div className="bannerImg">
                    {/* <Slider {...settings}>
                        {allCateList && allCateList.map((item, i): any => {
                            return <div key={i}>
                                <Img src={item.catImg} alt="bannerImg" />
                            </div>
                        })}
                    </Slider> */}
                    <div>
                        <Img src={bgimg} alt="bannerImg" className="bgimg h-550px" />
                    </div>
                    <div className="px-1 px-md-5">
                        {/* <H1 bigFt className="overlay-text px-1 px-md-5 mx-1 mx-md-5">Handmade <br/> <span>With Love</span></H1>
                        <P bigFt className="overlay-text px-1 px-md-5 mx-1 mx-md-5">Unique. Elegant. Just for you. </P> */}
                        <ButtonSec className="button button-dark shop" onClick={() => navigate(`/product?type=all`)}>
                            SHOP NOW 
                        </ButtonSec>
                    </div>
                </div>
            </BannerSection>
            <BoxSection className="box">
                <Grid container columns={{ xs: 10, sm: 12, md: 12, lg: 10 }} justifyContent={"center"} alignItems={"center"}>
                    {allSupportList && allSupportList.map((it, i) => {
                        return <Grid size={{ xs:10, sm: 4, md: 2, lg: 2 }} key={i} className="">
                           <div className="d-flex align-items-center justify-content-center">
                                <Img src={it.catImg} alt="cateImage" className="size50px" />
                                <div>
                                    <H3 smFt className="mb-1 mt-0 ps-3">{it.name}</H3>
                                    <H3 smFt className="m-0 ps-3">{it.surName}</H3>
                                </div>
                            </div>
                        </Grid>
                    })}
                </Grid>
            </BoxSection>
            <div className="container-fluid bg-white">                
                <div className="text-center">
                    <H3 bigFt className="pt-3 pt-md-4 pb-3 pb-md-2">Shop by Category</H3>
                    <Img src={heart} alt="img" className="size120pxauto" />
                </div>
                <Grid container spacing={2} className="banner-content">
                    <ItemsList currentItems={allCateList} type="category" />
                    {/* <PaginatedItems itemsPerPage={8} data={allCateList} type="category" /> */}
                </Grid>
            </div>
             <BoxSection className="box bg">
                <Grid container columns={{ xs: 10, sm: 12, md: 12, lg: 12 }} justifyContent={"space-around"} alignItems={"center"}>
                    {allSecureList && allSecureList.map((it, i) => {
                        return <Grid size={{ xs:10, sm: 4, md: 2, lg: 4 }} key={i} className="">
                           <div className={`${it.name !== "Support" ? "secureSec pe-4" : "" } d-flex align-items-center justify-content-center`}>
                                <Img src={it.catImg} alt="cateImage" className="size70px" />
                                <div>
                                    <H3 smFt className="mb-1 mt-0 ps-3">{it.name}</H3>
                                    <P smFt className="m-0 ps-3">{it.detail}</P>
                                </div>
                            </div>
                        </Grid>
                    })}
                </Grid>
            </BoxSection>
        </AllCateProductsSec>
    );
}

export default AllCategories;
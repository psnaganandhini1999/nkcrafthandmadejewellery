import { Grid } from "@mui/material";
import { AllCateProductsSec, BannerSection, H1, H3, Img, P } from "../../assets/css/styledcomponents";
import silkthreadbangle from "../../assets/images/category/silkthreadbangle.jpeg";
import glassbangle from "../../assets/images/category/glassbangle.jpeg";
import silkthreadjhumka from "../../assets/images/category/silkthreadjhumka.jpeg";
import kundanstud from "../../assets/images/category/kundanstud.jpeg";
import kundanhairband from "../../assets/images/category/kundanhairband.jpeg";
import centerclip from "../../assets/images/category/centerclip.webp";
import ItemsList from "../AllProducts/itemsList";
import Slider from "react-slick";

function AllCategories() {

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
                <Grid container spacing={2} className="banner-content">
                    <Grid size={{ xs:4, sm: 4, md: 6, lg: 6}}>
                        <div className="overlay px-1 px-md-5">
                            <H1 bigFt className="overlay-text px-1 px-md-5 mx-1 mx-md-5">Handmade <br/> <span>With Love</span></H1>
                            <P bigFt className="overlay-text px-1 px-md-5 mx-1 mx-md-5">Unique. Elegant. Just for you. </P>
                        </div>
                    </Grid>
                    <Grid size={{ xs:4, sm: 4, md: 6, lg: 6}}>
                        <div className="bannerImg">
                            {/* <Slider {...settings}>
                                {allCateList && allCateList.map((item, i): any => {
                                    return <div key={i}>
                                        <Img src={item.catImg} alt="bannerImg" />
                                    </div>
                                })}
                            </Slider> */}
                            <div>
                                <Img src={glassbangle} alt="bannerImg" />
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </BannerSection>
            <div className="container-fluid">                
                <H3 bigFt className="my-5">All Categories</H3>
                <Grid container spacing={2} className="banner-content">
                    <ItemsList currentItems={allCateList} type="category" />
                    {/* <PaginatedItems itemsPerPage={8} data={allCateList} type="category" /> */}
                </Grid>
            </div>
        </AllCateProductsSec>
    );
}

export default AllCategories;
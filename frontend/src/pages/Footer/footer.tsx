import { Grid } from "@mui/material";
import React from "react";
import { FooterSec, H3 } from "../../assets/css/styledcomponents";

function FooterMain() {
    // const allCateList = [
    //     { catName: "Slik Thread Bangles", catDec: "", catImg: silkthreadbangle, path: "slikthreadbangles" },
    //     { catName: "Glass Bangles", catDec: "", catImg: glassbangle },
    //     { catName: "Slik Thread Jhumkas", catDec: "", catImg: silkthreadjhumka },
    //     { catName: "Kundan Studs", catDec: "", catImg: kundanstud },
    //     { catName: "Kundan Hair Bands", catDec: "", catImg: kundanhairband },
    //     { catName: "Center Clips", catDec: "", catImg: centerclip },
    //     // { catName: "Hair Pins", catDec: "", catImg: productImage },
    //     // { catName: "Kids Hair Bands", catDec: "", catImg: productImage },
    //     // { catName: "test", catDec: "", catImg: productImage },
    //     // { catName: "test", catDec: "", catImg: productImage },
    // ]
    return (
        <FooterSec>
            <Grid container spacing={2} className="banner-content" justifyContent={"center"}>
                <Grid size={{ xs:12, sm: 12, md: 12, lg: 12 }}>
                    <div className="footerSec text-center">
                        <H3 smFt clrWht>
                            For More details <br/> 
                            NK Crafts, 6379313276 <br/>
                            Contact: nagaown2606@gmail.com
                        </H3>
                    </div>
                </Grid>
            </Grid>
        </FooterSec>
    );
}

export default FooterMain;
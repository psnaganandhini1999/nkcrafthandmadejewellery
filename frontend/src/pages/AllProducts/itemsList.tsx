import { Grid } from "@mui/material";
import { ButtonSec, H3, Img, P } from "../../assets/css/styledcomponents";
import { useNavigate } from 'react-router-dom';
import CartList from "../CartList/cartList";
import silkthreadbangle from "../../assets/images/category/silkthreadbangle.jpeg";
import { useEffect, useState } from "react";

const ItemsList = ({ currentItems, type, column }: any) => {
  const navigate = useNavigate();
  console.log(column);
  const [ getData, setGetData ] = useState(currentItems || []);
  const [ loading, setLoading ] = useState(false);
    const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    // console.log(currentItems, type);
    if (currentItems?.length > 0) {
      setGetData(currentItems);
      setLoading(false);
    } else if (currentItems?.length === 0 || currentItems === undefined) {
      setLoading(false);
      setGetData([]);
    }
  }, [currentItems])

  const handleClick = (path: any, type: any) => {
    if (type === "category") {
      navigate(`/product?type=${path}`); 
    } else if (type === "product") {
      navigate(`/product-details/${path}`); 
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Grid container className="banner-content w-100" columns={{ xs: 10, sm: 12, md: 12, lg: 10 }} justifyContent={`${type === "category" ? "start" : "start"}`}>
      {type === "category" && getData && getData.map((item: any, i: any) => {
        return <Grid size={{ xs:10, sm: 4, md: 2, lg: 2 }} key={i} className="">
            {type === "category" && (
              <div className="allCateSec" onClick={() => handleClick(item._id, "category")}>
                <Img src={!item.catImg.includes("blob") ? item.catImg : silkthreadbangle} alt="cateImage" className="sizeh200px" />
                <H3 smFt className="text-center">{item.catName}</H3>
                {item.catDec !== "" && <P>{item.catDec}</P>}
              </div>
            )}
          </Grid>
      })}
      {type === "product" && (
        loading ? (
          <p>Loading categories...</p>
        ) : (getData?.length === 0 ? (
          <div>No products found</div>
        ) : (getData && getData.map((item: any, i: any) => {
            return <Grid size={{ xs:10, sm: 4, md: 2, lg: 2 }} key={i} className="">
              <div className="allCateProductSec">
                  {/* <Img src={item.pdtImg} alt="productImage" className="sizeh200px" onClick={() => handleClick(item.path, "product")} /> */}
                  <Img src={silkthreadbangle} alt="productImage" className="sizeh200px" onClick={() => handleClick(item._id, "product")} />
                  <div className="p-3">
                    <H3 smFt className="mt-0">{item.pdtName}</H3>
                    <P clrgrn className="mt-0 mb-2">{"₹" + item.pdtPrice}</P>
                    <a className="button button-dark w-100 d-inline-block text-center" onClick={() => setOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart me-2 align-text-bottom" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg>
                        Add To Cart
                    </a>
                  </div>
              </div>
            </Grid>
          }))
        )
      )}
      <CartList open={open} toggleDrawer={toggleDrawer} />
    </Grid>
  );
};

export default ItemsList;

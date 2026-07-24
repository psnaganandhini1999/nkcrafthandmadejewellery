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

  return (
    <Grid container className="banner-content w-100" columns={{ xs: 10, sm: 12, md: 12, lg: 10 }} justifyContent={`${type === "category" ? "start" : "start"}`}>
      {type === "category" && getData && getData.map((item: any, i: any) => {
        return <Grid size={{ xs:10, sm: 4, md: 2, lg: 2 }} key={i} className="">
            {type === "category" && (
              <div className="allCateSec" onClick={() => handleClick(item._id, "category")}>
                <Img src={silkthreadbangle} alt="cateImage" className="sizeh200px" />
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
                    <CartList />
                  </div>
              </div>
            </Grid>
          }))
        )
      )}
    </Grid>
  );
};

export default ItemsList;

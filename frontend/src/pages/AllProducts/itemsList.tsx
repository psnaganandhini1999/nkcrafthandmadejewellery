import { Grid } from "@mui/material";
import { ButtonSec, H3, Img, P } from "../../assets/css/styledcomponents";
import { useNavigate } from 'react-router-dom';
import CartList from "../CartList/cartList";

const ItemsList = ({ currentItems, type, column }: any) => {
  const navigate = useNavigate();
  console.log(column);
  
  const handleClick = (path: any, type: any) => {
    if (type === "category") {
      navigate(`/product?type=${path}`); 
    } else if (type === "product") {
      navigate(`/product-details`); 
    }
  };

  return (
    <Grid container className="banner-content w-100" columns={{ xs: 10, sm: 12, md: 12, lg: 10 }} justifyContent={`${type === "category" ? "start" : "start"}`}>
      {type === "category" && currentItems && currentItems.map((item: any, i: any) => {
        return <Grid size={{ xs:10, sm: 4, md: 2, lg: 2 }} key={i} className="">
            {type === "category" && (
              <div className="allCateSec" onClick={() => handleClick(item.path, "category")}>
                <Img src={item.catImg} alt="cateImage" className="sizeh200px" />
                <H3 smFt className="text-center">{item.catName}</H3>
                {item.catDec !== "" && <P>{item.catDec}</P>}
              </div>
            )}
          </Grid>
      })}
      {type === "product" && currentItems && currentItems.map((item: any, i: any) => {
        return <Grid size={{ xs:10, sm: 4, md: 2, lg: 2 }} key={i} className="">
            {type === "product" && (
              <div className="allCateProductSec">
                  {column === 12 ? (
                    <div className="d-flex align-items-start justify-content-start">
                      <Img src={item.pdtImg} alt="productImage" className="size200px" onClick={() => handleClick(item.path, "product")} />
                      <div className="ms-4 p-2">
                        <H3 smFt className="mt-0">{item.pdtName}</H3>
                        <P clrgrn>{item.pdtPrice}</P>
                        <a data-bs-toggle="offcanvas" href="#cartPage" role="button" aria-controls="cartPage" className="button button-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart me-2 align-text-bottom" viewBox="0 0 16 16">
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                          </svg>
                          Add To Cart
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Img src={item.pdtImg} alt="productImage" className="sizeh200px" onClick={() => handleClick(item.path, "product")} />
                      <div className="p-3">
                        <H3 smFt className="mt-0">{item.pdtName}</H3>
                        <P clrgrn className="mt-0 mb-2">{item.pdtPrice}</P>
                        {/* <a data-bs-toggle="offcanvas" href="#cartPage" role="button" aria-controls="offcanvasRight" data-bs-target={`#cartPage-${i}`} className="button button-dark w-100 d-inline-block text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart me-2 align-text-bottom" viewBox="0 0 16 16">
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                          </svg>
                          Add To Cart
                        </a> */}
                        <CartList />
                      </div>
                  </>
                )}
              </div>
            )}
        </Grid>
      })}
    </Grid>
  );
};

export default ItemsList;

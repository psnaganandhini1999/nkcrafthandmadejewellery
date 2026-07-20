import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-inner-image-zoom/lib/styles.min.css';
import styled, { createGlobalStyle, keyframes } from "styled-components"
import { BannerSectionInter, Error1, H1Inter, H2Inter, H3Inter, H5Inter, PInter } from "../interface/interface"
// import bgimg from "../../assets/images/homepage/banner/banner2.webp";
// import bgimg2 from "../../assets/images/homepage/bgimg2.webp";
// import bgimg1 from "../../assets/images/homepage/bgimg1.webp";
// import factorImg from "../../assets/images/cryptoExchange/factorImg.png";
// import bgimg3 from "../../assets/images/cryptoExchangeScript/bgImg.png";
// import bgimg4 from "../../assets/images/cryptoExchangeScript/bgImg1.png";
// import processbg from "../../assets/images/cryptoExchange/processbg.png";
// import processSecBg from "../../assets/images/cryptoExchange/processSecBg.png";
// import aiBg from "../../assets/images/homepage/aiBg.webp";

const red = "#e7392b";
const lightGreen = "#34a853";
const lightblue = "#2563FF";
const lightblack = "#272A34";
const white = "#ffffff";
const black = "#000000";
const pink = "#d05550";
const grn = "#648034";
const brown = "#b2666c";
// const litgrn = "#1a8d61";

export default createGlobalStyle`
    *, html, body {
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Open Sans', sans-serif; 
        color: ${white};
        background-color: #fdf7f1 !important;
    }
    #root{
        margin:0 auto;
        color: ${white};
    }
    .text-white {
      color: ${white};
    } 
    .bgBlack {
      background: ${black};
    }
    .vh-100 {
      height: 100vh;
    }
    .h-650px {
      height: 650px;
    }
 `
export const H1 = styled.h1<H1Inter>`
  ${(props: H1Inter) => props.bigFt &&
    `font-size: 40px;
    line-height: 68px;
    font-family: "BoldBricolageGrotesque";
  `}
  ${(props: H1Inter) => props.clrBrn &&
      `color: #c77f82;
  `}
    @media (max-width: 767px){
      ${(props: H1Inter) => props.bigFt &&
          `font-size: 23px;
        line-height: 35px;
        letter-spacing: 1px;
      `}
    }
`;

export const H2 = styled.h2<H2Inter>`
  margin: 20px 0;
  ${(props: H2Inter) => props.bigFt &&
    `font-size: 42px;
    line-height: 68px;
    font-family: "MediumHellix";
    &.lineht {
      line-height: 52px;
      margin: 10px 0;
    }
  `}
  ${(props: H2Inter) => props.smFt &&
    `font-size: 32px;
    font-family: "SemiBoldHellix";
  `}
  ${(props: H2Inter) => props.smFt1 &&
    `font-size: 25px;
    font-family: "SemiBoldHellix";
  `}
  ${(props: H2Inter) => props.clrWht &&
      `color: #ffffff;
  `}
  @media (max-width: 767px){
    ${(props: H2Inter) => props.bigFt &&
        `font-size: 25px;
      line-height: 28px;
    `}
    ${(props: H2Inter) => props.smFt &&
      `font-size: 20px;
    `}
    ${(props: H2Inter) => props.smFt1 &&
      `font-size: 22px;
    `}
  }
`;

export const H3 = styled.h3<H3Inter>`
  ${(props: H3Inter) => props.bigFt &&
    `font-size: 26px;
    font-family: "SemiBoldHellix";
    &.lineht {
      line-height: 32px;
      margin: 10px 0;
    }
  `}
  ${(props: H3Inter) => props.smFt &&
    `font-size: 18px;
    font-family: "SemiBoldHellix";
    margin: 15px 0 5px;
  `}
  ${(props: H3Inter) => props.smFt1 &&
    `font-size: 16px;
    font-family: "MediumHellix";
  `}
  ${(props: H3Inter) => props.clrWht &&
      `color: #ffffff;
  `}
  @media (max-width: 767px){
    ${(props: H3Inter) => props.bigFt &&
        `font-size: 22px;
      line-height: 28px;
    `}
    ${(props: H3Inter) => props.smFt &&
      `font-size: 18px;
    `}
    ${(props: H3Inter) => props.smFt1 &&
      `font-size: 18px;
    `}
  }
`;

export const H5 = styled.h5<H5Inter>`
  ${(props: H5Inter) => props.bigFt &&
    `font-size: 20px;
    line-height: 24px;
    font-family: "MediumHellix";
  `}
  ${(props: H5Inter) => props.smFt &&
    `font-size: 18px;
  `}
  ${(props: H5Inter) => props.smFt1 &&
    `font-size: 16px;
  `}
  ${(props: H5Inter) => props.clrWht &&
      `color: #ffffff;
  `}
  ${(props: H5Inter) => props.clrBrn &&
      `color: #c77f82;
  `}
  @media (max-width: 767px){
    ${(props: H5Inter) => props.bigFt &&
        `font-size: 18px;
    `}
  }
`;

export const Error = styled.p<Error1>`
  margin: 5px 0;
  padding: 10px 0;
  font-size: .9em;
  ${(props): any => (!props.type1) &&
  `color: ${red};`}
  ${(props): any => props.type1 &&
  `color: ${lightGreen};`}
`
export const Hr = styled.hr`
  border-top: 1px solid rgb(51 51 51);
`;
export const P = styled.p<PInter>`
  margin: 10px 0;
  ${(props: PInter) => props.bigFt &&
      `font-size: 18px;
    line-height: 28px;
      a {
        color: ${black};
      }
  `}
  ${(props: PInter) => props.smFt &&
      `font-size: 16px;
    line-height: 28px;
    & span.clrBrn {
      color: ${brown} !important;
      font-weight: 800;
    }
  `}
  ${(props: PInter) => props.clrWht &&
      `color: #ffffff;
  `}
  ${(props: PInter) => props.clrgrn &&
      `color: ${brown};
      font-weight: 800;
      margin: 10px 0 0;
  `}
  span {
    cursor: pointer;
  }
  @media (max-width: 767px){
    ${(props: PInter) => props.bigFt &&
        `font-size: 16px;
    `}
    ${(props: PInter) => props.smFt &&
      `font-size: 14px;
    `}
  }
`;

export const BannerSection = styled.div<BannerSectionInter>`
  & .bannerImg {
    position: relative;
    .bgimg  {
      &.h-650px {
        height: 650px;
      }
      &.h-550px {
        height: 550px;
      }
      width: 100%;
      object-fit: cover;
      object-position: center;
      border-bottom: 1px solid #f9d5ac;
      @media (max-width: 767px){
        height: auto;
      }
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4); /* Semi-transparent black background */
      z-index: 10; /* Ensures the overlay is above the image */
      /* Center the text within the overlay */
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1; /* Make it visible by default */
      flex-direction: column;
    }
    .overlay-text {
      color: white;
    }
    .box {
      background-color: #fcfaf8;
      box-shadow: 0 1rem 3rem #a0a0a02b;
      position: absolute;
      top: 50px;
      left: 100px;
      border-radius: 10px;
      color: ${black};
      width: 40%;
      & .inputField {
        position: relative;
        input, textarea {
          border: 1px solid #d7d7d7;
          padding: 5px 10px;
          &:focus-visible {
            outline: none !important;
          }
        }
        label {
          font-weight: 500;
        }
        .eyeIcon {
          position: absolute;
          right: 10px;
          top: 50%;
          cursor: pointer;
        }
      }
      .detailsSec {
        // border: 1px solid #dcadad;
        border-radius: 10px;
      }
    }
  }
`;

export const Img = styled.img`
  &.size100percent {
    width: 100%;
    height: 100%;
  }
  &.sizeh200px{
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  &.size20px {
    width: 20px;
    height: 20px;
  }
  &.size40px {
    width: 40px;
    height: 40px;
  }
  &.size30px {
    width: 30px;
    height: 30px;
  }
  &.size50px {
    width: 50px;
    height: 50px;
  }
  &.size75px {
    width: 75px;
    height: 75px;
  }
  &.size80px {
    width: 80px;
    height: 80px;
  }
  &.size120px {
    width: 120px;
    height: 120px;
  }
  &.size120pxauto {
    width: 120px;
    height: auto;
  }
  &.size200px {
    width: 200px;
    height: 200px;
    @media (max-width: 767px){
      width: 150px;
      height: 150px;
    }
  }
  &.size300px {
    width: auto;
    height: 300px;
  }
  &.size350px {
    width: auto;
    height: 350px;
    @media (max-width: 992px) {
      width: 350px;
      height: 350px;
    }
  }
  &.size25px {
    width: 25px;
    height: 25px;
  }
  &.ftImg {
    width: auto;
    height: 25px;
  }
  &.carouselImg {
    width: 135px;
    height: 50px;
  }
`;

const pulseMe = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.8);
  }
`;

export const ButtonSec = styled.button`
  &.button {
    font-size: 16px;
    line-height: 28px;
    outline: none;
    /* box-shadow: 0 1rem 3rem rgba(60, 60, 65, 0.911); */
    cursor: pointer;
    &.button-primary, &.button-primary a {
      background-color: ${brown};
      border: 1px solid ${brown};
      color: ${white};
      text-decoration: none;
      padding: 5px 24px;
      border-radius: 5px;
      width: 100%;
      margin: 10px 0;
    }
    &.button-dark, &.button-dark a {
      padding: 10px 24px;
      margin: 6px;
      border-radius: 42px;
      background-color: ${brown};
      border: 1px solid ${brown};
      color: ${white};
      text-decoration: none;
      &.phone {
        padding: 5px 10px 8px 10px;
        line-height: 25px;
        position: relative;
        &::before {
          content: "";
          padding: 10px 15px;
          border-radius: 50px;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: #ffffff38;
          margin: auto;
          transform: scale(0.3);
          transform-origin: center center;
          animation: ${pulseMe} 1s linear infinite;
        }
      }
      &.shop {
        position: absolute;
        bottom: 100px;
        left: 115px;
        font-family: 'SemiBoldHellix';
        border-radius: 3px;
        padding: 10px 35px;
        @media (max-width: 767px){
          padding: 0px 10px !important;
          margin: 0;
          bottom: 50px;
          left: 28px;
          font-size: 10px;
        }
      }
    }
    &.remove {
      border: none;
      background: ${white};
      text-decoration: underline;
    }
  }
`;

export const BoxSection = styled.div`
  &.box {
    background-color: #ffffff;
    margin: 0px;
    border-radius: 15px;
    padding: 30px;
    border: 1px solid #ffffff30;
    height: 100%;
    &.bg {
      // background-color: #fdf7f1;
      .secureSec {
        border-right: 1px solid ${brown};
      }
    }
  }
  &.socialMediaSec {
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    z-index: 1000;
    height: auto;
    padding: 15px 15px 5px;
    background-color: #60606052 !important;
    .icons {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin-bottom: 10px;
      cursor: pointer;
      padding: 8px 10px 0;
      svg {
        width: 20px;
        height: 23px;
        fill: ${white};
        color: ${white};
      }
    }
    @media (max-width: 767px){
      padding: 10px 10px 2px;
      .icons {
        width: 30px;
        height: 30px;
        padding: 5px 8px 0;
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
    .whatsapp {
      background: #25D366; 
    }
    .telegram {
      background: #0088cc; 
    }
    .teams {
      background: #6264A7;  
    }
    .mail {
      background: #fb4232; 
    }
    .line {
      background: #00c300; 
      padding: 4px 10px 0;
      img {
        width: 20px;
        height: 20px;
      }
      @media (max-width: 767px){
        padding: 0px;
        img {
          width: 15px;
          height: 15px;
        }
      }
    }
    .calendly {
      background: #00a2ff; 
      padding: 4px 10px 0;
      img {
        width: 20px;
        height: 20px;
      }
      @media (max-width: 767px){
        padding: 0px;
        img {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
  &.processSec {
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 24px 50px;
    color: ${white};
    &.box .box {
      background-image: none !important;
      padding: 5px 15px;
    }
    & .box.ai{
      padding: 24px 30px;
    }
    & .overflow {
      max-height: 600px;
      overflow-y: scroll;
    }
    @media (max-width: 992px) {
      padding: 0px;
      background-image: none;
    }
  }
`;

export const HeaderMainSec = styled.div`
    .headerRight, .mobileMenu {
      .services, .product {
        position: relative;
      }
      a {
        color: ${black};
      }
      .headerSerSubMenu, .headerProSubMenu {
        display: none;
        .nav.nav-tabs {
          cursor: pointer;
          width: 100%;
          height: 550px;
          padding: 0;
          flex-direction: column;
          .nav-item {
            width: 100%;
            text-align: left;
            position: relative;
            // transition: all 0.5s;
            button {
              width: 100%;
              padding: 10px 20px;
              border-radius: 0px;
              font-size: 16px;
              font-weight: 600;
              border: 1px solid black;
              background: transparent;
              color: ${black};
              // transition: all 0.5s;
              &:hover {
                color: ${lightblue};
                // transition: all 0.5s;
              }
              &.active {
                color: ${white};
                background: ${black};
                // transition: all 0.5s;
                &::after {
                  content: "";
                  display: block;
                  width: 0; 
                  height: 0; 
                  border-top: 10px solid transparent;
                  border-bottom: 10px solid transparent; 
                  border-left:10px solid black;
                  position: absolute;
                  right: -10px;
                  top: 50%;
                  transform: translateY(-50%);
                  // transition: all 0.5s;
                  @media (max-width: 767px){
                    display: none;    
                  }
                  @media (max-width: 992px){
                    display: block;
                  }
                }
              }
            }
          }
        }
      }  
      .services {
        &:hover {
          .headerSerSubMenu {
            display: block;
          }
          .headerProSubMenu {
            display: none;
          }
        }
      }
      .product {
        &:hover {
          .headerProSubMenu {
            display: block;
          }
          .headerSerSubMenu {
            display: none;
          }
        }
      }
      .headerSerSubMenu {
        left: 10%;
        width: 350px;
      }
      .headerProSubMenu {
        left: -30%;
        width: 350px;
      }
      .headerSerSubMenu, .headerProSubMenu {
        position: absolute;
        background: ${white};
        color: ${black};
        top: 40px;
        z-index: 1000;
        border-radius: 10px;
        box-shadow: 0 1rem 3rem rgba(60, 60, 65, 0.911);
        // padding: 10px 0;
        text-align: left;
        // display: inline-block;
        a {
          color: ${black};
          margin: 5px;
          display: block;
          text-decoration: none;
          position: relative;
          transition: all 0.5s;
          z-index: 1;
          &:hover {
            // background: ${lightblue};
            color: ${white};
            box-shadow: 1px 1px 10px 3px rgba(235, 235, 235, 0.91);
            transition: all 0.5s;
            &:after {
              visibility: visible;
              opacity: 1;
              height: 100%;
              transition: all 0.5s;
            }
          }
          &:after {
            display: block;
            transition: all 0.5s;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            width: 100%;
            height: 1px;
            content: '.';
            color: transparent;
            background: ${lightblue};
            visibility: none;
            opacity: 0;
            z-index: -1;
          }
        }
        @media (max-width: 767px){
          & {
            position: static;
            padding: 0px;
            box-shadow: none;
            background: transparent;
            a {
              color: ${white};
              text-align: left;
            }
          }
        }
      }
    }
`;

export const AllCateProductsSec = styled.div`
  & .allCateProductSec {
    // box-shadow: 1px 1px 15px 0px #e1e1e1;
    border: 1px solid #dcadad8a;
    padding: 0px;
    border-radius: 10px;
    width: 85%;
    margin: 20px auto;
    img, .button {
      cursor: pointer;
      border-radius: 10px;
    }
  }
  h5.filter {
    cursor: pointer;
    a {
      color: ${black};
      text-decoration: none;
    }
  }
  .accordion .accordion-item {
    border-bottom: 1px solid #d9d9d9 !important;
    border: none;
    .accordion-button,.accordion-button:focus {
      background-color: #ffffff;
      outline: none !important;
      box-shadow: none;
    }
  }
  .colIcon {
      li {
        padding: 10px;
      }
  }
  & .allCateSec {
    width: 85%;
    margin: 20px auto;
    img, .button {
      cursor: pointer;
      border-radius: 5px;
    }
  }
  & .button-dark {
    padding: 10px 24px;
    border-radius: 5px !important;
    background-color: ${brown};
    border: 1px solid ${brown};
    color: ${white};
    text-decoration: none;
  }
`;
export const FooterSec = styled.div`
  & {
    background-color: ${pink};
    // margin-top: 50px;
    padding: 50px;
  }
`;

export const ProductDetailsSec = styled.div`
  & .breadcrumb {
    background-color: white;
    .breadcrumb-item {
      padding: 10px;
      svg {
        vertical-align: -.125em;
        fill: currentColor;
        display: inline-block;
        margin: 0 5px;
      }
      &::before {
        display: none;
      }
      a {
        color: ${black};
        &:hover {
          text-decoration: none;
          color: ${pink};
        }
      }
      @media (max-width: 767px){
        padding: 0;
      }
    }
  }
  & .productDetailSec {
    .sizeSec {
      ul li {
        margin: 0 20px 0 0;
        cursor: pointer;
        p:hover, p.size {
          border: 1px solid ${pink} !important;
        }
        p.size {
          color: ${pink}
        }
      }
    }
    .quantSec {
      span {
        cursor: pointer;
      }
    }
    .pdtImageSec {
      &, .iiz .iiz__img {
        width: 100%;
        height: 500px;
        border-radius: 5px;
        object-fit: cover;
        @media (max-width: 767px){
          height: auto;
        }
      }
    }
  }
`;

export const CartListSec = styled.div`
  & .offcanvas-body {
    height: 500px;
    max-height: 500px;
    overflow-y: scroll;
  }
  & .button-dark {
    padding: 10px 24px;
    border-radius: 5px !important;
    background-color: ${brown};
    border: 1px solid ${brown};
    color: ${white};
    text-decoration: none;
  }
`;

export const CheckoutListSec = styled.div`
  background-color: #ffffff;
  & .inputField {
    input, textarea {
      border: 1px solid #d7d7d7;
      padding: 5px 10px;
      &:focus-visible {
        outline: none !important;
      }
    }
    label {
      font-weight: 500;
    }
  }
  .detailsSec {
    border: 1px solid #dcadad;
    border-radius: 10px;
  }
`;

const myAnimation = keyframes`
  from {right: 0; opacity: 0;}
  to {right: 30px; opacity: 1;}
`;

export const SuccessErrorSec = styled.div`
  margin: 5px 0;
  padding: 10px 0;
  font-size: .9em;
  color: ${lightGreen};
  animation-duration: 1s;
  animation-delay: 0.2s;
  position: fixed;
  width: 20%;
  z-index: 1;
  left: 10%;
  top: 15%;
  text-align: center;
`;
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from '../pages/HomePage/home';
// import CryptocurrencyExchangePage from '../pages/CryptocurrencyExchangeDevelopment/cryptocurrencyExchangePage';
// import BinanceClonePage from '../pages/BinanceCloneScript/binanceClonePage';
// import CryptocurrencyExchangeScriptPage from '../pages/CryptocurrencyExchangeScript/cryptocurrencyExchangeScriptPage';
// import NftMarketplaceScriptPage from '../pages/NftMarketplaceScript/NftMarketplaceScriptPage';
// import UniswapCloneScriptPage from '../pages/UniswapCloneScript/uniswapCloneScriptPage';
// import DAOMakerLaunchpadCloneScriptPage from '../pages/DAOMakerLaunchpadCloneScript/daoMakerLaunchpadCloneScriptPage';
// import HyperledgerFabricCloneScriptPage from '../pages/HyperledgerFabricCloneScript/hyperledgerFabricCloneScript';
// import CryptoLotteryCloneScriptPage from '../pages/CryptoLotteryCloneScript/cryptoLotteryCloneScriptPage';
// import AboutUsPage from '../pages/AboutUs/aboutUs';
// import RealWorldAssetTokenization from '../pages/RealWorldAssetTokenization/realWorldAssetTokenization';
import loader from "../assets/images/Loading_icon.gif";
import Layout from './layout';
import AllProducts from '../pages/AllProducts/allProducts';
import AllCategories from '../pages/AllCategories/allCategory';
import ProductDetails from '../pages/AllProducts/productDetails';
import CheckoutList from '../pages/CheckoutList/checkoutList';
// const Home = lazy(() => import('../pages/HomePage/home'));

const RouterFile: React.FC = () => {
  return (
    <Suspense fallback={
      <div className='hv-100 w-100 d-flex align-items-center justify-content-center'>
          <img src={loader} className='m-auto' />
      </div>
    }>
      <Router>
        <Layout>
          <Routes>
              <Route path="/" element={<AllCategories />} />
              <Route path="/product" element={<AllProducts />} />
              <Route path="/product/:type" element={<AllProducts />} />
              <Route path="/product-details" element={<ProductDetails />} />
              <Route path="/checkout" element={<CheckoutList />} />
          </Routes>
        </Layout>
      </Router>
    </Suspense>
  );
};

export default RouterFile;
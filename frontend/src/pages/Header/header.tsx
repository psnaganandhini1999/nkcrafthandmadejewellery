import React, { useState } from "react";
import { ButtonSec, H2, H5, HeaderMainSec, Img, P } from "../../assets/css/styledcomponents";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import headerLogo from "../../assets/images/nklogo.png";
import MenuIcon from '@mui/icons-material/Menu';
import search from "../../assets/images/header/search.svg";
import heart from "../../assets/images/header/heart.svg";
import bag from "../../assets/images/header/bag.svg";

function HeaderMain() {
    const [ isExpanded, setIsExpanded ]: any = useState(false);
    const [ activeMenu, setActiveMenu ]: any = useState(false);
    const [ isOpen, setIsOpen ]: any = useState(false);
    const [ serOpen, setSerOpen ]: any = useState(false);
    const [ proOpen, setProOpen ]: any = useState(false);
    const [ activeTab, setActiveTab ] = useState("tab1");
    const [ activeSerTab, setActiveSerTab ] = useState("tab8");

    const menu = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/product?type=all" },
        { name: "Product", path: "",
            icon: "bi bi-chevron-down",
            value: [
                { name: "Binance Clone", path: "/binance-clone" },
                { name: "Crypto Exchange Script", path: "/crypto-exchange-script" },
                { name: "NFT Marketplace Script", path: "/nft-marketplace-script" },
                { name: "Uniswap Clone Script", path: "/uniswap-clone-script" },
                { name: "DAO Maker Launchpad Clone Script", path: "/dao-maker-launchpad-clone-script" },
                { name: "Hyperledger Fabric Clone Script", path: "/hyperledger-fabric-clone-script" },
                { name: "Crypto Lottery Clone Script", path: "/crypto-lottery-clone-script" },
            ],
            cryptoExchange : [
                { name: "Cryptocurrency Exchange Script", path: "/crypto-exchange-script" },
                { name: "Binance Clone", path: "/binance-clone" },
                { name: "Hyperledger Fabric Clone", path: "/hyperledger-fabric-clone-script" },
                { name: "Real World Asset Tokenization", path: "/real-world-asset-tokenization" },
                { name: "NFT Marketplace Script", path: "/nft-marketplace-development" },
                { name: "Uniswap Clone Script", path: "/uniswap-clone-script" },
                { name: "DAO Maker Launchpad Clone Script", path: "/dao-maker-launchpad-clone-script" },
                { name: "Crypto Lottery Clone Script", path: "/crypto-lottery-clone-script" },
            ],
            // cryptoExchange : [
            //     { name: "Binance Clone Script", path: "/binance-clone" },
            //     { name: "WazirX Clone Script", path: "/blog/wazrix-clone-script" },
            //     { name: "KuCoin Clone Script", path: "/blog/kucoin-clone-script" },
            //     { name: "Coinbase Clone Script", path: "/blog/coinbase-clone-script" },
            //     { name: "Kraken Clone Script", path: "/blog/kraken-clone-script" },
            //     { name: "Gate.io Clone Script", path: "/blog/gateio-clone-script" },
            //     { name: "Centralized Exchange Clone Script (CEX)", path: "/" },
            //     { name: "Decentralized Exchange Clone Script (DEX)", path: "/blog/decentralized-exchange-clone-script" },               
            // ],
            cryptoExchange1 : [
                { name: "Hybrid Exchange Script", path: "/crypto-exchange-script" },
                { name: "P2P Crypto Exchange Script", path: "/blog/p2p-exchange-clone-script" },
                { name: "Crypto Futures & Derivatives Exchange Clone", path: "/blog/futures-derivatives-exchange-clone-script" },
                { name: "Margin Trading Platform Clone", path: "/blog/margin-trading-exchange-clone-script" },
                { name: "Copy Trading Exchange Clone", path: "/" },
                { name: "Cross-chain Exchange Clone", path: "/blog/cross-chain-exchange-clone-script" },
                { name: "OTC Crypto Exchange Clone", path: "/" },
                { name: "White-label Exchange SaaS Platform", path: "/blog/white-label-crypto-exchange-saas" },                
            ],
            nft : [
                { name: "OpenSea Clone Script", path: "/blog/opensea-clone-script" },
                { name: "Rarible Clone Script", path: "/blog/rarible-clone-script" },
                { name: "SuperRare Clone Script", path: "/blog/superrare-clone-script" },
                { name: "NBA Top Shot Clone Script", path: "/blog/nba-top-shot-clone-script" },
                { name: "Foundation Clone Script", path: "/blog/foundation-clone-script" },
                { name: "NFT Minting Platform Script", path: "/blog/nft-minting-platform-clone-script" },
                { name: "NFT Auction Platform Script", path: "/blog/nft-auction-platform-clone-script" },
            ],
            nft1 : [
                { name: "Fractional NFT Marketplace Script", path: "/nft-marketplace-development" },
                { name: "NFT Gaming Marketplace Clone", path: "/blog/nft-gaming-marketplace-clone-script" },
                { name: "NFT Lending & Borrowing Platform Clone", path: "/blog/nft-lending-borrowing-platform-clone-script" },
                { name: "NFT Aggregator Platform Clone", path: "/" },
                { name: "NFT Social Media Platform Clone", path: "/blog/nft-social-plaftform-clone-script" },
                { name: "NFT Launchpad Clone", path: "/" },
            ],
            defi : [
                { name: "Compound Clone Script", path: "/blog/compound-clone-script" },
                { name: "Aave Clone Script", path: "/blog/aave-clone-script" },
                { name: "MakerDAO Clone Script", path: "/blog/makerdao-clone-script" },
                { name: "Uniswap Clone Script", path: "/uniswap-clone-script" },
                { name: "Yearn.Finance Clone Script", path: "/blog/yearn-finance-clone-script" },
                { name: "DeFi Lending Platform Clone", path: "/" },
            ],
            defi1 : [
                { name: "Yield Farming Platform Clone", path: "/blog/yield-farming-plaftform-clone-script" },
                { name: "DeFi Staking Platform Clone", path: "/blog/defi-staking-plaftform-clone-script" },
                { name: "Liquidity Pool Management Clone", path: "/blog/liquidity-pool-management-clone-script" },
                { name: "DeFi Insurance Protocol Clone", path: "/blog/defi-insurance-plaftform-clone-script" },
                { name: "Synthetic Assets Platform Clone", path: "/" },
            ],
            wallet : [
                { name: "Trust Wallet Clone Script", path: "/" },
                { name: "MetaMask Clone Script", path: "/" },
                { name: "NFT Wallet Clone Script", path: "/blog/nft-wallet-clone-script" },
                { name: "Multi-Currency Mobile Clone", path: "/blog/multi-currency-mobile-wallet-clone-script" },
                { name: "Multi-Signature Wallet Clone", path: "/blog/multi-signature-wallet-clone-script" },
                { name: "Hardware Wallet Interface Clone", path: "/blog/hardware-wallet-interface-clone-script" },
                { name: "Web/Desktop Wallet Clone", path: "/blog/web-desktop-wallet-clone-script" },
                { name: "Cold Storage Wallet Clone", path: "/blog/cold-storage-wallet-clone-script" },
            ],
            launchpad : [
                { name: "DAO Maker Clone Script", path: "/dao-maker-clone-script" },
                { name: "IDO Launchpad Clone", path: "/blog/ido-launchpad-clone-script" },
                { name: "IEO/ICO Launchpad Clone", path: "/blog/ieo-ico-launchpad-clone-script" },
                { name: "STO Platform Clone", path: "/blog/sto-launchpad-clone-script" },
                { name: "NFT Launchpad Clone", path: "/blog/nft-launchpad-clone-script" },
                { name: "Cross-chain Launchpad Clone", path: "/blog/cross-chain-launchpad-clone-script" },
                { name: "Community Voting Launchpad Clone", path: "/blog/community-launchpad-clone-script" },
            ],
            token : [
                { name: "ERC-20 Token Clone Script", path: "/blog/erc20-token-clone-script" },
                { name: "BEP-20 Token Clone Script", path: "/blog/bep20-token-clone-script" },
                { name: "TRC-20 Token Clone Script", path: "/" },
                { name: "Stablecoin Clone", path: "/blog/stablecoin-clone-script" },
                { name: "Security Token (STO) Clone", path: "/blog/security-token-clone-script" },
            ],
            token1 : [
                { name: "Utility Token Clone", path: "/blog/utility-token-clone-script" },
                { name: "Governance Token Clone", path: "/blog/governance-token-clone-script" },
                { name: "Reflection/Meme Token Clone", path: "/" },
                { name: "Token Vesting Dashboard", path: "/" },
            ],
            web3 : [
                { name: "Web3 Social Media Clone", path: "/blog/web3-social-media-platform-clone-script" },
                { name: "Web3 Messaging App Clone", path: "/blog/web3-messaging-communication-clone-script" },
                { name: "Web3 Gaming Platform Clone", path: "/blog/web3-gaming-platform-clone-script" },
                { name: "Web3 Real Estate Platform Clone", path: "/" },
                { name: "Web3 Crowdfunding Platform Clone", path: "/" },
            ],
            web31 : [
                { name: "Web3 eCommerce Clone", path: "/" },
                { name: "Decentralized Identity (DID) Platform Clone", path: "/blog/decentralized-identity-did-platform-clone-script" },
                { name: "Cross-chain Interoperability Platform Clone", path: "/blog/cross-chain-interoperability-platform-clone-script" },
                { name: "Hyperledger Fabric Clone Script", path: "/hyperledger-fabric-clone-script" },
            ],
        },
        { name: "Services", path: "",
            icon: "bi bi-chevron-down",
            blockchain : [
                { name: "AI Development", path: "/" },
                { name: "Blockchain Development", path: "/" },
                { name: "Cryptocurrency Exchange Development ", path: "/crypto-exchange-development-company" },
                { name: "Cryptocurrency Wallet Development", path: "/" },
                { name: "DeFi Development", path: "/" },
                { name: "NFT Development", path: "/" },
                { name: "Web3 Development", path: "/" },
            ],
            // blockchain : [
            //     { name: "Custom Blockchain Architecture", path: "/" },
            //     { name: "Private/Public Blockchain Development", path: "/" },
            //     { name: "Smart Contract Development (Solidity, Rust, Vyper)", path: "/" },
            //     { name: "Smart Contract Auditing", path: "/" },
            //     { name: "DAO Development & Governance Setup", path: "/" },
            //     { name: "Tokenomics Consulting & Whitepaper Drafting", path: "/" },
            //     { name: "Blockchain Security Consulting", path: "/" },
            // ],
            cryptoExchange : [
                { name: "Full-cycle Exchange Platform Development", path: "/" },
                { name: "Backend/Frontend from Scratch", path: "/" },
                { name: "Liquidity API Integration", path: "/" },
                { name: "KYC/AML Module Development", path: "/" },
                { name: "Crypto Wallet Integration", path: "/crypto-exchange-development-company" },
                { name: "Trade Engine Optimization", path: "/" },
            ],
            nft : [
                { name: "NFT Marketplace Development (Custom)", path: "/" },
                { name: "NFT Minting DApp Development", path: "/" },
                { name: "NFT Aggregator Platform Development", path: "/" },
                { name: "NFT Lending Platform Setup", path: "/" },
                { name: "NFT Game Integration", path: "/" },
                { name: "NFT IPFS/Storage & Metadata Management", path: "/" },
            ],
            defi : [
                { name: "DeFi Lending/Borrowing Protocol Development", path: "/" },
                { name: "Staking & Farming Platform Development", path: "/" },
                { name: "Liquidity Pool Engineering", path: "/" },
                { name: "DeFi Robo-advisor System", path: "/" },
                { name: "DeFi Insurance Smart Contract Development", path: "/" },
                { name: "Cross-chain DeFi Apps", path: "/" },
            ],
            wallet : [
                { name: "iOS & Android Wallet App Development", path: "/" },
                { name: "NFT Wallet Setup", path: "/" },
                { name: "Multi-chain Wallet Integration", path: "/" },
                { name: "WalletConnect, MetaMask, Trust Integration", path: "/" },
                { name: "Hardware Wallet (Ledger, Trezor) API Integration", path: "/" },
            ],
            launchpad : [
                { name: "Multi-chain Launchpad Development", path: "/" },
                { name: "KYC-compliant Fundraising Setup", path: "/" },
                { name: "Token Allocation/Vesting Dashboard", path: "/" },
                { name: "Investor Dashboard + Tier System", path: "/" },
                { name: "Cross-chain Bridge Integration", path: "/" },
            ],
            web3 : [
                { name: "Web3-enabled dApp Creation", path: "/" },
                { name: "Metamask & WalletConnect Integration", path: "/" },
                { name: "Real-time dApp Analytics Dashboard", path: "/" },
                { name: "Web3 Social Network & Messenger Setup", path: "/" },
                { name: "Decentralized File Storage (IPFS/Filecoin)", path: "/" },
                { name: "DID & Credential Management Systems", path: "/" },
                { name: "Cross-chain Smart Contract Execution", path: "/" },
            ],
            solution : [
                { name: "Hyperledger Fabric Development", path: "/" },
                { name: "Blockchain for Healthcare, Supply Chain, Education", path: "/" },
                { name: "Blockchain eVoting Systems", path: "/" },
                { name: "Digital Document Verification", path: "/" },
                { name: "Corporate Identity & Credentialing", path: "/" },
                { name: "Private Blockchain Deployment & Governance", path: "/" },
            ],
            devops : [
                { name: "Web3 UI/UX Design (React, Next.js, Tailwind)", path: "/" },
                { name: "API Development & Third-party Integration", path: "/" },
                { name: "DevOps for Blockchain Apps (CI/CD, Docker, Kubernetes)", path: "/" },
                { name: "AWS, GCP, and decentralized hosting setup", path: "/" },
                { name: "Performance Testing & Load Balancing", path: "/" },
                { name: "Ongoing Support & Maintenance (SLA-based)", path: "/" },
            ],
        },
        // { name: "Case Studies", path: "/" },
        { name: "Contact Us", path: "/" },
    ]
    const subMenu = [ 
        { icon: search, path: "" },
        { icon: bag, path: "" },
        { icon: heart, path: "" },
    ]
    const handleToggle = () => {
        if (window.screen.width < 991) {
        setIsExpanded(!isExpanded)
        }
    }

    const handleTabClick = (tabId: any) => {
        setActiveTab(tabId);
    };
    
    const handleSerTabClick = (tabId: any) => {
        setActiveSerTab(tabId);
    };
  
    const handleChange = (i: Number, name: String) => {
        setActiveMenu(i)
        if (name === "Services") {
            setSerOpen(true);
            setProOpen(false);
        } else if (name === "Product") {
            setProOpen(true);
            setSerOpen(false);
        }
    }
    
    const handleClick = () => {
        console.log("clicked");
        setIsOpen(!isOpen);
    }
    return (
        <HeaderMainSec>
        <div className='header-section'>
            <Grid container className="header" justifyContent={"space-between"} alignItems={"center"}>
                <Grid size={1}>
                    <div className="headerLeft">
                    <Link to={"/"}>
                        <img src={headerLogo} alt="headerLogo" className="headerImg" />
                    </Link>
                    </div>
                </Grid>
                <Grid size={9} justifyContent={"center"} className="text-center">
                    <ul className="headerRight mb-0">
                    {menu.map((x, i) => {
                        return <li key={i} className={`${(x.name === "Services") ? "services" : ""} ${(x.name === "Product") ? "product" : ""}`} onMouseOver={() => handleChange(i, x.name)}>
                            {x.name === "Contact Us" ? (
                                <div className="button button-primary">
                                    <a href="#contactus">Contact Us</a>
                                </div>
                            ) : (
                                <Link to={x?.path} className={`${(x.name === "Services") && "services"} ${(x.name === "Product") && "product"}`}>
                                    {x.name}
                                    <span><i className={x.icon}></i></span>
                                </Link>
                            )}
                            {(activeMenu === 1 && serOpen) &&
                                <div className="headerSerSubMenu" onMouseOver={() => setSerOpen(true)}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="tab-content mt-3">
                                                <div className="tab-pane active">
                                                    {x.blockchain?.map((d, j) => {
                                                        return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {(activeMenu === 0 && proOpen) &&
                                <div className="headerProSubMenu">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="tab-content mt-3">
                                                {x.cryptoExchange?.map((d, j) => {
                                                    return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }                            
                            {/* {(activeMenu === 1 && serOpen) &&
                                <div className="headerSerSubMenu" onMouseOver={() => setSerOpen(true)}>
                                    <div className="row">
                                        <div className="col-5">
                                            <ul className="nav nav-tabs" aria-orientation="vertical">
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeSerTab === "tab8" ? "active" : ""}`}
                                                    onClick={() => handleSerTabClick("tab8")}
                                                    >
                                                    Blockchain Development Services
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeSerTab === "tab9" ? "active" : ""}`}
                                                    onClick={() => handleSerTabClick("tab9")}
                                                    >
                                                    Crypto Exchange Development Services
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeSerTab === "tab10" ? "active" : ""}`}
                                                    onClick={() => handleSerTabClick("tab10")}
                                                    >
                                                    NFT Development Services
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeSerTab === "tab11" ? "active" : ""}`}
                                                    onClick={() => handleSerTabClick("tab11")}
                                                    >
                                                    DeFi Development Services
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeSerTab === "tab12" ? "active" : ""}`}
                                                    onClick={() => handleSerTabClick("tab12")}
                                                    >
                                                    Launchpad & Fundraising Services
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeSerTab === "tab13" ? "active" : ""}`}
                                                    onClick={() => handleSerTabClick("tab13")}
                                                    >
                                                    Crypto Wallet Development Services
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeSerTab === "tab14" ? "active" : ""}`}
                                                    onClick={() => handleSerTabClick("tab14")}
                                                    >
                                                    Web3 & dApp Development Services
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeSerTab === "tab15" ? "active" : ""}`}
                                                    onClick={() => handleSerTabClick("tab15")}
                                                    >
                                                    Enterprise Blockchain Solutions
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeSerTab === "tab16" ? "active" : ""}`}
                                                    onClick={() => handleSerTabClick("tab16")}
                                                    >
                                                    Technology & DevOps Services
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-7">
                                            <div className="tab-content mt-3">
                                                {activeSerTab === "tab8" && (
                                                    <div className="tab-pane active">
                                                        {x.blockchain?.map((d, j) => {
                                                            return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                        })}
                                                    </div>
                                                )}
                                                {activeSerTab === "tab9" && (
                                                    <div className="tab-pane active">
                                                        {x.cryptoExchange?.map((d, j) => {
                                                            return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                        })}
                                                    </div>
                                                )}
                                                {activeSerTab === "tab10" && (
                                                    <div className="tab-pane active">
                                                        {x.nft?.map((d, j) => {
                                                            return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                        })}
                                                    </div>
                                                )}
                                                {activeSerTab === "tab11" && (
                                                    <div className="tab-pane active">
                                                        {x.defi?.map((d, j) => {
                                                            return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                        })}
                                                    </div>
                                                )}
                                                {activeSerTab === "tab12" && (
                                                    <div className="tab-pane active">
                                                        {x.launchpad?.map((d, j) => {
                                                            return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                        })}
                                                    </div>
                                                )}
                                                {activeSerTab === "tab13" && (
                                                    <div className="tab-pane active">
                                                        {x.wallet?.map((d, j) => {
                                                            return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                        })}
                                                    </div>
                                                )}
                                                {activeSerTab === "tab14" && (
                                                    <div className="tab-pane active">
                                                        {x.web3?.map((d, j) => {
                                                            return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                        })}
                                                    </div>
                                                )}
                                                {activeSerTab === "tab15" && (
                                                    <div className="tab-pane active">
                                                        {x.solution?.map((d, j) => {
                                                            return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                        })}
                                                    </div>
                                                )}
                                                {activeSerTab === "tab16" && (
                                                    <div className="tab-pane active">
                                                        {x.devops?.map((d, j) => {
                                                            return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {(activeMenu === 0 && proOpen) &&
                                <div className="headerProSubMenu">
                                    <div className="row">
                                        <div className="col-4">
                                            <ul className="nav nav-tabs" aria-orientation="vertical">
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                                                    onClick={() => handleTabClick("tab1")}
                                                    >
                                                    Crypto Exchange Clone Scripts
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                                                    onClick={() => handleTabClick("tab2")}
                                                    >
                                                    NFT Marketplace Clone Scripts
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
                                                    onClick={() => handleTabClick("tab3")}
                                                    >
                                                    DeFi Clone Scripts
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeTab === "tab4" ? "active" : ""}`}
                                                    onClick={() => handleTabClick("tab4")}
                                                    >
                                                    Wallet Clone Scripts
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeTab === "tab5" ? "active" : ""}`}
                                                    onClick={() => handleTabClick("tab5")}
                                                    >
                                                    Launchpad Clone Scripts
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeTab === "tab6" ? "active" : ""}`}
                                                    onClick={() => handleTabClick("tab6")}
                                                    >
                                                    Token Clone Scripts
                                                    </button>
                                                </li>
                                                <li className="nav-item">
                                                    <button
                                                    className={`nav-link ${activeTab === "tab7" ? "active" : ""}`}
                                                    onClick={() => handleTabClick("tab7")}
                                                    >
                                                    Web3 Platform Clones
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-8">
                                            <div className="tab-content mt-3">
                                                {activeTab === "tab1" && (
                                                    <div className="tab-pane active">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                {x.cryptoExchange?.map((d, j) => {
                                                                    return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                })}
                                                            </div>
                                                            <div className="col-6">
                                                                {x.cryptoExchange1?.map((d, j) => {
                                                                    return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {activeTab === "tab2" && (
                                                    <div className="tab-pane active">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                {x.nft?.map((d, j) => {
                                                                    return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                })}
                                                            </div>
                                                            <div className="col-6">
                                                                {x.nft1?.map((d, j) => {
                                                                    return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {activeTab === "tab3" && (
                                                    <div className="tab-pane active">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                {x.defi?.map((d, j) => {
                                                                    return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                })}
                                                            </div>
                                                            <div className="col-6">
                                                                {x.defi1?.map((d, j) => {
                                                                    return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {activeTab === "tab4" && (
                                                    <div className="tab-pane active">
                                                        {x.wallet?.map((d, j) => {
                                                            return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                        })}
                                                    </div>
                                                )}
                                                {activeTab === "tab5" && (
                                                    <div className="tab-pane active">
                                                        {x.launchpad?.map((d, j) => {
                                                            return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                        })}
                                                    </div>
                                                )}
                                                {activeTab === "tab6" && (
                                                    <div className="tab-pane active">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                {x.token?.map((d, j) => {
                                                                    return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                })}
                                                            </div>
                                                            <div className="col-6">
                                                                {x.token1?.map((d, j) => {
                                                                    return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {activeTab === "tab7" && (
                                                    <div className="tab-pane active">
                                                        <div className="row">
                                                            <div className="col-6">
                                                                {x.web3?.map((d, j) => {
                                                                    return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                })}
                                                            </div>
                                                            <div className="col-6">
                                                                {x.web31?.map((d, j) => {
                                                                    return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            } */}
                        </li>
                    })}
                    </ul>

                    <div className="mobileMenu">
                    <div className="headerMenu" onClick={handleToggle}><MenuIcon className="icon" /></div>
                    {isExpanded &&
                        <div id="navMenu" className="mobileHeader isExpanded">
                        {menu.map((x, i) => {
                            return (
                            <div key={i} className={`highlight ${(x.name === "Services") ? "services" : ""} ${(x.name === "Product") ? "product" : ""}`} onMouseOver={() => handleChange(i, x.name)}>
                               <Link to={x?.path} className={`${(x.name === "Services") && "services"} ${(x.name === "Product") && "product"}`}>
                                {x.name}
                                    <span><i className={x.icon}></i></span>
                                </Link>
                                {(activeMenu === 1 && serOpen) &&
                                    <div className="headerSerSubMenu" onMouseOver={() => setSerOpen(true)}>
                                        <div className="row">
                                            <div className="col-5">
                                                <ul className="nav nav-tabs" aria-orientation="vertical">
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeSerTab === "tab8" ? "active" : ""}`}
                                                        onClick={() => handleSerTabClick("tab8")}
                                                        >
                                                        Blockchain Development Services
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeSerTab === "tab9" ? "active" : ""}`}
                                                        onClick={() => handleSerTabClick("tab9")}
                                                        >
                                                        Crypto Exchange Development Services
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeSerTab === "tab10" ? "active" : ""}`}
                                                        onClick={() => handleSerTabClick("tab10")}
                                                        >
                                                        NFT Development Services
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeSerTab === "tab11" ? "active" : ""}`}
                                                        onClick={() => handleSerTabClick("tab11")}
                                                        >
                                                        DeFi Development Services
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeSerTab === "tab12" ? "active" : ""}`}
                                                        onClick={() => handleSerTabClick("tab12")}
                                                        >
                                                        Launchpad & Fundraising Services
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeSerTab === "tab13" ? "active" : ""}`}
                                                        onClick={() => handleSerTabClick("tab13")}
                                                        >
                                                        Crypto Wallet Development Services
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeSerTab === "tab14" ? "active" : ""}`}
                                                        onClick={() => handleSerTabClick("tab14")}
                                                        >
                                                        Web3 & dApp Development Services
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeSerTab === "tab15" ? "active" : ""}`}
                                                        onClick={() => handleSerTabClick("tab15")}
                                                        >
                                                        Enterprise Blockchain Solutions
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeSerTab === "tab16" ? "active" : ""}`}
                                                        onClick={() => handleSerTabClick("tab16")}
                                                        >
                                                        Technology & DevOps Services
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-7">
                                                <div className="tab-content mt-3">
                                                    {activeSerTab === "tab8" && (
                                                        <div className="tab-pane active">
                                                            {x.blockchain?.map((d, j) => {
                                                                return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                            })}
                                                        </div>
                                                    )}
                                                    {activeSerTab === "tab9" && (
                                                        <div className="tab-pane active">
                                                            {x.cryptoExchange?.map((d, j) => {
                                                                return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                            })}
                                                        </div>
                                                    )}
                                                    {activeSerTab === "tab10" && (
                                                        <div className="tab-pane active">
                                                            {x.nft?.map((d, j) => {
                                                                return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                            })}
                                                        </div>
                                                    )}
                                                    {activeSerTab === "tab11" && (
                                                        <div className="tab-pane active">
                                                            {x.defi?.map((d, j) => {
                                                                return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                            })}
                                                        </div>
                                                    )}
                                                    {activeSerTab === "tab12" && (
                                                        <div className="tab-pane active">
                                                            {x.launchpad?.map((d, j) => {
                                                                return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                            })}
                                                        </div>
                                                    )}
                                                    {activeSerTab === "tab13" && (
                                                        <div className="tab-pane active">
                                                            {x.wallet?.map((d, j) => {
                                                                return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                            })}
                                                        </div>
                                                    )}
                                                    {activeSerTab === "tab14" && (
                                                        <div className="tab-pane active">
                                                            {x.web3?.map((d, j) => {
                                                                return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                            })}
                                                        </div>
                                                    )}
                                                    {activeSerTab === "tab15" && (
                                                        <div className="tab-pane active">
                                                            {x.solution?.map((d, j) => {
                                                                return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                            })}
                                                        </div>
                                                    )}
                                                    {activeSerTab === "tab16" && (
                                                        <div className="tab-pane active">
                                                            {x.devops?.map((d, j) => {
                                                                return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {(activeMenu === 2 && proOpen) &&
                                    <div className="headerProSubMenu">
                                        <div className="row">
                                            <div className="col-4">
                                                <ul className="nav nav-tabs" aria-orientation="vertical">
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                                                        onClick={() => handleTabClick("tab1")}
                                                        >
                                                        Crypto Exchange Clone Scripts
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                                                        onClick={() => handleTabClick("tab2")}
                                                        >
                                                        NFT Marketplace Clone Scripts
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeTab === "tab3" ? "active" : ""}`}
                                                        onClick={() => handleTabClick("tab3")}
                                                        >
                                                        DeFi Clone Scripts
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeTab === "tab4" ? "active" : ""}`}
                                                        onClick={() => handleTabClick("tab4")}
                                                        >
                                                        Wallet Clone Scripts
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeTab === "tab5" ? "active" : ""}`}
                                                        onClick={() => handleTabClick("tab5")}
                                                        >
                                                        Launchpad Clone Scripts
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeTab === "tab6" ? "active" : ""}`}
                                                        onClick={() => handleTabClick("tab6")}
                                                        >
                                                        Token Clone Scripts
                                                        </button>
                                                    </li>
                                                    <li className="nav-item">
                                                        <button
                                                        className={`nav-link ${activeTab === "tab7" ? "active" : ""}`}
                                                        onClick={() => handleTabClick("tab7")}
                                                        >
                                                        Web3 Platform Clones
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-8">
                                                <div className="tab-content mt-3">
                                                    {activeTab === "tab1" && (
                                                        <div className="tab-pane active">
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    {x.cryptoExchange?.map((d, j) => {
                                                                        return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                    })}
                                                                </div>
                                                                <div className="col-6">
                                                                    {x.cryptoExchange1?.map((d, j) => {
                                                                        return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {activeTab === "tab2" && (
                                                        <div className="tab-pane active">
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    {x.nft?.map((d, j) => {
                                                                        return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                    })}
                                                                </div>
                                                                <div className="col-6">
                                                                    {x.nft1?.map((d, j) => {
                                                                        return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {activeTab === "tab3" && (
                                                        <div className="tab-pane active">
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    {x.defi?.map((d, j) => {
                                                                        return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                    })}
                                                                </div>
                                                                <div className="col-6">
                                                                    {x.defi1?.map((d, j) => {
                                                                        return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {activeTab === "tab4" && (
                                                        <div className="tab-pane active">
                                                            {x.wallet?.map((d, j) => {
                                                                return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                            })}
                                                        </div>
                                                    )}
                                                    {activeTab === "tab5" && (
                                                        <div className="tab-pane active">
                                                            {x.launchpad?.map((d, j) => {
                                                                return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                            })}
                                                        </div>
                                                    )}
                                                    {activeTab === "tab6" && (
                                                        <div className="tab-pane active">
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    {x.token?.map((d, j) => {
                                                                        return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                    })}
                                                                </div>
                                                                <div className="col-6">
                                                                    {x.token1?.map((d, j) => {
                                                                        return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {activeTab === "tab7" && (
                                                        <div className="tab-pane active">
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    {x.web3?.map((d, j) => {
                                                                        return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                    })}
                                                                </div>
                                                                <div className="col-6">
                                                                    {x.web31?.map((d, j) => {
                                                                        return <Link key={j} to={d.path} onClick={() => setProOpen(false)}>{d.name}</Link>
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            )
                        })}
                        </div>
                    }
                    </div>
                </Grid>
                <Grid size={2} justifyContent={"end"} sx={{ textAlign: "right"}} className="headerRight pe-3">
                    <div className="">
                        {subMenu?.map((d, j) => {
                            return <Link key={j} to={d.path} className="mx-2">
                                <Img src={d.icon} alt="icons" className="size20px"/>
                            </Link>
                        })}
                        <ButtonSec className="button button-dark phone" onClick={handleClick}> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                            </svg>
                        </ButtonSec>
                        {isOpen && 
                            <div className="contactList">
                                <H2 smFt1 className="m-0">Let's Connect</H2>
                                <hr />
                                <div>
                                    <H5 smFt className="m-0">For Sales Inquiry</H5>
                                    <div className="d-flex align-items-center mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope me-1" viewBox="0 0 16 16">
                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                                        </svg>
                                        <P bigFt className="mb-2">
                                            <a href="mailto:nagaown2606@gmail.com">nagaown2606@gmail.com</a>
                                        </P>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp me-1" viewBox="0 0 16 16">
                                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                        </svg>
                                        <P bigFt className="mb-1 ms-1">
                                            <a href="tel:+916379313276">+91 6379313276</a>
                                        </P>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </Grid>
            </Grid>
        </div>
        </HeaderMainSec>
    );
}

export default HeaderMain;
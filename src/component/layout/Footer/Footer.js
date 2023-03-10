import React from 'react'
import playstore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
    <div className='leftFooter'>
    <h4>DOWNLOAD OUR APP</h4>
    <p>Download Our App for Androids and IOS Mobiles</p>
    <img src={playstore} alt="playStore"/>
    <img src={appStore} alt="AppStore"/>
    </div>

    <div className='midFooter'>
        <h1> Ecommerce </h1>
        <p>High Quality is Our first Priority</p>
        <p>Copyrights 2021 &copy; MeM.WaseemKiani</p>
    </div>

    <div className='rightFooter'>
    <h4>Follow Us</h4>
        <a href="#">Instagram</a>
        <a href="#">Youtube</a>
        <a href="#">Facebook</a>
    </div>

    </footer>

  )
  
}

export default Footer
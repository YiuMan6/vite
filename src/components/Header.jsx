import React from "react";
import duckImg from "images/download.jpg";
import appleIcon from 'svgs/apple.svg'

const Header = () => {
    console.log('header')
  return (
    <header>
      Header
      <img src={duckImg} />
      <img src={appleIcon} />
    </header>
  );
};

export default Header;

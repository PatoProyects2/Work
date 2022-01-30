import React, { useState } from 'react'

import NavLinks from './components/NavLinks'
import MenuButton from './components/MenuButton'
import Toggle from "./components/Toggle";

import { HeaderWrapper } from "./Styles/HeaderStyles"

import ConnectWallet from '../Buttons/ConnectWallet'
import ConnectChain from '../Buttons/ConnectChain'

function Header() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <HeaderWrapper>
      <NavLinks open={open} />
      <MenuButton open={open} handleClick={handleClick} />
      <Toggle />
      <ConnectChain />
      <ConnectWallet />
    </HeaderWrapper>
  );
}

export default Header;

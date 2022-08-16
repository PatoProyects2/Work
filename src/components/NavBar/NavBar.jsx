import { useState, useContext } from "react";
import { Nav, Navbar, Offcanvas, OffcanvasBody } from "reactstrap";
import styled from "styled-components";
import { Context } from "../../context/Context";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import { useLogin } from "../../hooks/useLogin";
import { useSocket } from "../../hooks/socket/useSocket";
import { useWeb3 } from "../../hooks/useWeb3";
import {
  NavLeft,
  NavCenter,
  NavRight,
  NavMenu,
  NavFooter,
} from "./components/Modals";

const StyledNavbar = styled.div`
  .Main-Menu {
    border-bottom: 1px solid #2c2640;
    background-color: #3d3657;
    padding-top: 10px;
    padding-bottom: 9px;
    z-index: 9999;
  }

  .Menu {
    align-items: center;
  }

  .GamesText {
    color: #ffe869;
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 0;
    margin-right: 1rem;
  }
`;

function NavBar() {
  const { readBlockchainData } = useWeb3();
  useSocket();
  const { user } = useLogin();
  const { web3Data } = useContext(Context);
  const [showOffcanvas, setShowOffCanvas] = useState(false);
  const isMobileResolution = useMatchMedia("(max-width:770px)", false);
  return (
    <StyledNavbar>
      <Navbar className="Main-Menu fixed-top">
        <Offcanvas
          direction="start"
          isOpen={showOffcanvas}
          className="oc-menu"
          toggle={() => setShowOffCanvas(false)}
        >
          <OffcanvasBody className="d-flex flex-column">
            <Nav className="d-flex flex-column flex-grow-1">
              <NavMenu setShowOffCanvas={setShowOffCanvas} />
            </Nav>
            <NavFooter
              user={user}
              account={web3Data.account}
              isMobileResolution={isMobileResolution}
              setShowOffCanvas={setShowOffCanvas}
            />
          </OffcanvasBody>
        </Offcanvas>
        <NavLeft
          setShowOffCanvas={setShowOffCanvas}
          showOffcanvas={showOffcanvas}
          isMobileResolution={isMobileResolution}
        />
        <NavCenter isMobileResolution={isMobileResolution} />
        <NavRight
          user={user}
          account={web3Data.account}
          readBlockchainData={readBlockchainData}
        />
      </Navbar>
    </StyledNavbar>
  );
}

export default NavBar;

import React, { useState } from 'react';
import { NavbarDesktop } from './NavbarDesktop';
import { FAQ } from '../modals/FAQ';
import { HowToPlay } from '../modals/HowToPlay';
import { RPSResponsibly } from '../modals/RPSResponsibly';

export const Navbar = ({ navType }) => {

    const [faqModalShow, setFaqModalShow] = useState(false);
    const [htpModalShow, setHtpModalShow] = useState(false);
    const [rpsModalShow, setRpsModalShow] = useState(false);

    return (
        <>
            <NavbarDesktop       
                navType={navType}      
                handleFaqModal={setFaqModalShow}
                handleHtpModal={setHtpModalShow} 
                handleRpsModal={setRpsModalShow} />

            <FAQ show={faqModalShow} onHide={() => setFaqModalShow(false)} />
            <HowToPlay show={htpModalShow} onHide={() => setHtpModalShow(false)} />
            <RPSResponsibly show={rpsModalShow} onHide={() => setRpsModalShow(false)} />
        </>
    );
};

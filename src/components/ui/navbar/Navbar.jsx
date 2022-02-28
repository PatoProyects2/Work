import React, { useState } from 'react';
import { NavbarDesktop } from './NavbarDesktop';
import { FAQ } from '../modals/FAQ';
import { HowToPlay } from '../modals/HowToPlay';

export const Navbar = ({ navType }) => {

    const [faqModalShow, setFaqModalShow] = useState(false);
    const [htpModalShow, setHtpModalShow] = useState(false);

    return (
        <>
            <NavbarDesktop       
                navType={navType}      
                handleFaqModal={setFaqModalShow}
                handleHtpModal={setHtpModalShow} />

            <FAQ show={faqModalShow} onHide={() => setFaqModalShow(false)} />
            <HowToPlay show={htpModalShow} onHide={() => setHtpModalShow(false)} />

        </>
    );
};

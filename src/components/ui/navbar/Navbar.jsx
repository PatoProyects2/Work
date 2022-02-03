import React, { useState } from 'react';
import { useMatchMedia } from '../../../hooks/useMatchMedia';
import { NavbarMobile } from './NavbarMobile';
import { NavbarDesktop } from './NavbarDesktop';
import { FAQ } from '../modals/FAQ';
import { HowToPlay } from '../modals/HowToPlay';

export const Navbar = ({ theme, setTheme }) => {

    const isMobileResolution = useMatchMedia('(max-width:992px)', false);
    const [ faqModalShow, setFaqModalShow ] = useState(false);
    const [ htpModalShow, setHtpModalShow ] = useState(false);

    const handleThemeChange = () => {
        setTheme( theme === 'light' ? 'dark' : 'light');        
    };

    return (
        <>
            {
                isMobileResolution
                    ? <NavbarMobile 
                        theme={theme} 
                        handleThemeChange={handleThemeChange} 
                        handleFaqModal={setFaqModalShow} 
                        handleHtpModal={setHtpModalShow} />
                    : <NavbarDesktop 
                        theme={theme} 
                        handleThemeChange={handleThemeChange} 
                        handleFaqModal={setFaqModalShow} 
                        handleHtpModal={setHtpModalShow} />
            }
            
            <FAQ theme={theme} show={faqModalShow} onHide={() => setFaqModalShow(false)} />
            <HowToPlay theme={theme} show={htpModalShow} onHide={() => setHtpModalShow(false)} />

        </>
    );
};

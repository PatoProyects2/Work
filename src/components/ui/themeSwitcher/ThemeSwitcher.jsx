import React, { useState, useEffect } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

const currentTheme = () => {
    return localStorage.getItem('theme') || 'dark';
}

export const ThemeSwitcher = () => {

    const [theme, setTheme] = useState(currentTheme());
    const [open, setOpen] = useState(false);
    const themeSwitch = document.getElementById('theme-switcher-id');
    const toggleBtn = document.querySelector('.dd-toggle');

    const getThemeIcon = () => {       
        if(toggleBtn) {
            switch (theme) {
                case 'light':
                    toggleBtn.innerHTML = "<i class='fa-solid fa-sun'></i>";
                    break;
                default:
                    toggleBtn.innerHTML = "<i class='fa-solid fa-moon'></i>";
                    break;
            }
        }        
    }

    useEffect(() => {
        if (!theme) return;        

        switch (theme) {
            case 'light':
                themeSwitch.href = '/Work/themes/light.css';
                break;
            default:
                themeSwitch.href = '/Work/themes/dark.css';
                break;
        }
        getThemeIcon();
    }, [theme]);    

    const toggleMenu = () => {
        setOpen(!open);
    }

    const handleThemeChange = ( newTheme ) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    return (
        <Dropdown isOpen={open} toggle={toggleMenu}>
            <DropdownToggle caret className='dd-toggle'>
                { theme === "light" ? <i className='fa-solid fa-sun'></i> : <i className='fa-solid fa-moon'></i>}
            </DropdownToggle>
            <DropdownMenu className='dd-menu'>
                <DropdownItem className='dd-menu-item' onClick={() => handleThemeChange('light')}>
                    <i className="fa-solid fa-sun"></i>&nbsp;Light 
                </DropdownItem>
                <DropdownItem className='dd-menu-item' onClick={() => handleThemeChange('dark')}>
                    <i className="fa-solid fa-moon"></i>&nbsp;Dark
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
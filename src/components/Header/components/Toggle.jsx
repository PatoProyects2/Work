import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import Switch from "react-ios-switch";

import { setTheme } from "../../../themes/Themes";

const ThemeButton = styled.div`

`

export default function Toggle() {
    const [checked, setChecked] = useState(true);
    const handleOnClick = () => {
        if (localStorage.getItem("theme") === "theme-dark") {
            setTheme("theme-light");
            setChecked(false);
        } else {
            setTheme("theme-dark");
            setChecked(true);
        }
    };
    useEffect(() => {
        if (localStorage.getItem("theme")) {
            if (localStorage.getItem("theme") === "theme-dark") {
                setChecked(true);
            } else {
                setChecked(false);
            }
        } else {
            setChecked(true);
        }
    }, []);

    return (
        <ThemeButton>
            <Switch
                onColor="#ffffff"
                offColor="#000000"
                checked={checked}
                onChange={handleOnClick}
                handleColor="silver"
            />
        </ThemeButton>
    );
}

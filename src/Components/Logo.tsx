import React from "react";
// import logoDark from "./logo_dark.svg";
// import iconImg from "./icon.svg";
import styled from "styled-components";
import LogoDark from "@/Components/assets/icons/logoDark";

export const Logo = () => {
    return (
        <LogoWrapper>
            <LogoDark/>
        </LogoWrapper>
    );
};


const LogoWrapper = styled.div`
  width: 450px;
  margin: 0 auto;
`

import React from 'react';
import Auth from "@/Components/Auth";
import LoginFooter from "@/Components/common/icons/LoginFooter";
import styled from "styled-components";
const LoginPage = () => {
    return (
        <>
            <Wrapper>
                <Auth/>
                <LoginFooter/>
            </Wrapper>
        </>

    );
};

export default LoginPage;


const Wrapper = styled.div`
  background-color: rgb(64, 169, 255);
`
import React from "react";
import {Logo} from "@/Components/Logo";
import styled from "styled-components";
import LogoIcon from "@/Components/common/icons/LogoIcon";
import useWindowDimensions from "@/Components/utils/hooks/useWindowDimensions";
import {useHistory} from "react-router-dom";


const authScreenLabels = {
    en: {
        "Enter your username": "Email",
        "Enter your password": "Password",
        "Sign in to your account": " ",
    },
};

// I18n.setLanguage("en");
// I18n.putVocabularies(authScreenLabels);





export default () => {
    let history = useHistory();
    const goToDashboard = () => {
        history.push("/dashboard");
    }

    const { height, width } = useWindowDimensions();
    return (
        <Wrapper>
            <WhiteWrapper>
                {
                    width > 1280 ? (
                        <Logo/>
                    ) : (
                        <LogoWrapper>
                            <LogoIcon width={'450'} height={'338'}/>
                        </LogoWrapper>
                    )
                }
                <Inputs>
                <Input type="text" placeholder='Email'/>
                <Input type="text" placeholder='Password'/>
                </Inputs>
                <Utils>
                <ForgotPassword>
                    Forgot your password?
                </ForgotPassword>
                <ResetPassword>
                    Reset password
                </ResetPassword>
                </Utils>
                <SignInWrapper>
                    <SignIn onClick={goToDashboard}>
                        Sign in
                    </SignIn>
                </SignInWrapper>
            </WhiteWrapper>
        </Wrapper>
    );
};


const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogoWrapper = styled.div`

`


const SignInWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 24px;
  margin-top: 20px;
`

const SignIn = styled.div`
  cursor: pointer;
  background-color:#1890ff;
  color: white;
  max-width: 75px;
  padding: 7px 15px;
  white-space: nowrap;
  border-radius: 5px;
`

const Utils = styled.div`
    display: flex;
  justify-content: space-between;
  width: 400px;
  align-items: center;
  margin: 0 auto;
 `

const ForgotPassword = styled.div`
  font-size: 15px;
`

const ResetPassword = styled.div`
  font-size: 15px;
  color: #1890ff;
  cursor: pointer;
`

const Input = styled.input`
  border: 1px solid whitesmoke;
  padding: 5px;
  border-radius: 4px;
  width: 400px;
  margin-bottom: 15px;
  &::placeholder{
    font-size: 15px;
  }
`

const WhiteWrapper = styled.div`
    background-color: #fff;
    border-radius: 7px;
    width: 500px;
    padding: 24px;
`

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
`
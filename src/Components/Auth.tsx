import React from "react";
import {Logo} from "@/Components/Logo";
import styled from "styled-components";
import LogoIcon from "@/Components/common/icons/LogoIcon";
import useWindowDimensions from "@/Components/utils/hooks/useWindowDimensions";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "@/store/actions/login";
import useInput from "@/Components/utils/hooks/useInput";

export default () => {
    const dispatch = useDispatch<AppDispatch>();
    let history = useHistory();
    const [email, setEmail] = useInput()
    const [password, setPassword] = useInput()
    const goToDashboard = () => {
        dispatch(login(email, password))
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
                <Input type="text" placeholder='Email' onChange={setEmail}/>
                <Input type="password" placeholder='Password' onChange={setPassword}/>
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
                    <SignIn onClick={goToDashboard} disabled={!email || !password}>
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
  padding: 0 24px 0 24px;
  margin-top: 20px;
`

const SignIn = styled.button`
  cursor: pointer;
  background-color:#1890ff;
  color: white;
  max-width: 75px;
  padding: 9px 15px;
  white-space: nowrap;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 12px;
  &:disabled {
    background-color: #999999;
  }
`

const Utils = styled.div`
    display: flex;
  justify-content: space-between;
  width: 400px;
  align-items: center;
  margin: 0 auto;
 `

const ForgotPassword = styled.div`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
`

const ResetPassword = styled.div`
  font-size: 14px;
  color: #1890ff;
  cursor: pointer;
`

const Input = styled.input`
  border: 1px solid whitesmoke;
  padding: 6px;
  border-radius: 4px;
  width: 400px;
  margin-bottom: 15px;
  &::placeholder{
    font-size: 14px;
  }
`

const WhiteWrapper = styled.div`
    background-color: #fff;
  box-shadow: rgb(0 0 0 / 25%) 0px 5px 10px;
    border-radius: 7px;
    width: 500px;
    padding: 24px;
`

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 28px;
`
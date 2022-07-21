import React, {useState} from 'react';
import styled from "styled-components";

const SettingsOrganizationPage = () => {
    return (
        <Wrapper>
            <HeaderUser>
                <HeaderTitle>
                    Organization
                </HeaderTitle>
                <HeaderButton>
                    Save settings
                </HeaderButton>
            </HeaderUser>
            <LogoWrapper>
                <LogoTitle>
                    Logo:
                </LogoTitle>
                <LogoImage>

                </LogoImage>
            </LogoWrapper>
        </Wrapper>
    );
};

export default SettingsOrganizationPage;

const LogoWrapper = styled.div`
  display: flex;
  padding: 15px;
`

const LogoTitle = styled.div`

`

const LogoImage = styled.div`
    width: 100px;
  height: 100px;
  background-color: #fff;
  margin-left: 10px;
  border: 1px dashed #d9d9d9;

`



const Wrapper = styled.div`
`

const HeaderButton = styled.div`
  color: #fff;
  background-color: #1890ff;
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  padding: 9px 15px;
  border-radius: 2px;
  cursor: pointer;
`

const HeaderTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`

const HeaderUser = styled.div`
    display: flex;
    align-items: center;
  padding: 24px 24px;
  background-color: #fff;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
`
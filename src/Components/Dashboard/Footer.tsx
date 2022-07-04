import React from 'react';
import styled from "styled-components";

const Footer = () => {
    return (
        <Wrapper>
            <TopText>
                <TopItem>
                    Terms of Service
                </TopItem>
                &nbsp; • &nbsp;
                <TopItem>
                    Privacy
                </TopItem>
                &nbsp; • &nbsp;
                <TopItem>
                    Contact Us
                </TopItem>
            </TopText>
            <BottomText>
                Industrial Technology Group, LLC © 2022
            </BottomText>
        </Wrapper>
    );
};

export default Footer


const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: whitesmoke;
  padding: 10px 0;
`

const BottomText = styled.div`
  display: flex;
  align-items: center;
  color: #8C8C8C;
  font-size: 16px;
  justify-content: center;
  padding: 5px 0;
`

const TopText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const TopItem = styled.div`
  color: #8C8C8C;
    font-size: 16px;
`
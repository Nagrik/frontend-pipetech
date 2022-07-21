import React from 'react';
import styled, {keyframes} from "styled-components";

const Loader = () => {
    return (
        <LoaderWrapp>

        </LoaderWrapp>
    );
};



export default Loader;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;


const LoaderWrapp = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  :after{
    content: " ";
    display: block;
    width: 34px;
    height: 34px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #1890ff;
    border-color: #1890ff transparent #1890ff transparent;
    animation: ${rotate} 1.2s linear infinite;
  }
`





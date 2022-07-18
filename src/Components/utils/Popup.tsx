import React, {FC} from 'react';
import styled from "styled-components";

export type Props = {
    text: string;
    status: 'success' | 'error';
}

const Popup:FC<Props> = ({text, status}) => {
    return (
        <Wrapper status={status}>
            {text}
        </Wrapper>
    );
};

export default Popup;

const Wrapper = styled.div<{status:string}>`

  padding: 20px 50px;
  z-index: 3;
  background-color: ${({status}) => status === 'success' ? '#398e39' : '#9d1a29'} ;
  border-radius: 10px;
  position: absolute;
  color: white;
  font-size: 14px;
  top: 10px;
  width: 200px;
  text-align: center;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);

`
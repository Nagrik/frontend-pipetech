import React from 'react';
import styled from "styled-components";
import Cubes from "@/Components/common/icons/Cubes";
import Folder from "@/Components/common/icons/Folder";
import TreeIcon from "@/Components/common/icons/TreeIcon";

const Assets = () => {
    return (
        <Wrapper>
            <AssetsHeader>
                <AssetsHeaderTitle>
                    <IconWrapp>
                        <Cubes/>
                    </IconWrapp>
                    Assets
                </AssetsHeaderTitle>
            </AssetsHeader>
            <AssetsBody>
                <AssetsItem>
            <IconWrapp>
                <Folder color='#1890ff'/>
            </IconWrapp>
                <AssetsBodyTitle>
                    12-19-O0+32-23-F0
                </AssetsBodyTitle>
                <IconWrapp style={{paddingLeft: '10px'}}>
                    <TreeIcon/>
                </IconWrapp>
                </AssetsItem>
            </AssetsBody>
        </Wrapper>
    );
};

export default Assets;


const Wrapper = styled.div`
  background-color: #fff;
`

const AssetsItem = styled.div`
  padding: 12px 0 12px 10px;
  display: flex;
  align-items: center;
`

const AssetsBody = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
`

const AssetsBodyTitle = styled.div`
  color: #1890ff;
  cursor: pointer;
  font-size: 14px;
`

const IconWrapp = styled.div`
  padding: 0 10px 0 0;
`

const AssetsHeader = styled.div`
  border-bottom: 1px solid #f0f0f0;

`

const AssetsHeaderTitle = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 16px;
  padding: 19.5px 24px;
`
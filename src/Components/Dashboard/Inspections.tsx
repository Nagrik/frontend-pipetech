import React from 'react';
import styled from "styled-components";
import Cubes from "@/Components/common/icons/Cubes";
import Folder from "@/Components/common/icons/Folder";
import TreeIcon from "@/Components/common/icons/TreeIcon";
import SearchIcon from "@/Components/common/icons/SearchIcon";

const Inspection = () => {
    return (
        <Wrapper>
            <AssetsHeader>
                <AssetsHeaderTitle>
                    <IconSearchWrapp>
                        <SearchIcon color='#000'/>
                    </IconSearchWrapp>
                    Inspections
                </AssetsHeaderTitle>
            </AssetsHeader>
            <AssetsBody>
                <AssetsItem>
                    <IconWrapp>
                        <Folder color='#1890ff'/>
                    </IconWrapp>
                    <AssetsBodyTitle>
                        Copy of Test Inspections
                    </AssetsBodyTitle>
                    <IconWrapp>
                        <TreeIcon/>
                    </IconWrapp>
                </AssetsItem>
                <AssetsItem>
                    <IconWrapp>
                        <Folder color='#1890ff'/>
                    </IconWrapp>
                    <AssetsBodyTitle>
                        Copy of Test Inspections
                    </AssetsBodyTitle>
                    <IconWrapp>
                        <TreeIcon/>
                    </IconWrapp>
                </AssetsItem><AssetsItem>
                    <IconWrapp>
                        <Folder color='#1890ff'/>
                    </IconWrapp>
                    <AssetsBodyTitle>
                        Copy of Test Inspections
                    </AssetsBodyTitle>
                    <IconWrapp>
                        <TreeIcon/>
                    </IconWrapp>
                </AssetsItem>
            </AssetsBody>
        </Wrapper>
    );
};

export default Inspection;


const Wrapper = styled.div`
  background-color: #fff;
  margin-top: 15px;
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
  padding: 0 10px;
`

const IconSearchWrapp = styled.div`
  padding: 2px 10px 0px 10px;
`

const AssetsHeader = styled.div`
  border-bottom: 1px solid #f0f0f0;

`

const AssetsHeaderTitle = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 18px;
  padding: 16px 24px;
`
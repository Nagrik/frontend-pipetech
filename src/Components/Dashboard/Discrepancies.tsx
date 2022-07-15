import React, {useState} from 'react';
import EmailBoxIcon from "@/Components/common/icons/EmailBoxIcon";
import styled from "styled-components";
import DiscrepanciesIcon from "@/Components/common/icons/DiscrepanciesIcon";
import Cubes from "@/Components/common/icons/Cubes";
import SearchBookIcon from "@/Components/common/icons/SearchBookIcon";

const Discrepancies = () => {
    const [showMore, setShowMore] = useState<boolean>(false)
    return (
        <Inspections>
            <InspectionHeader>
                <DiscrepanciesIcon/>
                <InspectionHeaderTitle>
                    Discrepancies
                </InspectionHeaderTitle>
                <NumberWrapper>
                    2
                </NumberWrapper>
            </InspectionHeader>
            <ItemsWrapper>
            <InspectionItem>
                <Left>
                    <InspectionItemTitle>
                        43-15-X0 · 43-15-W0
                    </InspectionItemTitle>
                    <IconWrapp>
                        <Cubes/>
                    </IconWrapp>
                    <Height1>
                        Height: 1.0
                    </Height1>
                    <IconWrapp>
                        <SearchBookIcon/>
                    </IconWrapp>
                    <Height2>
                        Height: 1.0
                    </Height2>
                    <More>
                        1 more
                    </More>
                </Left>
                <Right>
                    View
                </Right>
            </InspectionItem>
            </ItemsWrapper>
            <InspectionFooter onClick={() => setShowMore(!showMore)}>
                {
                    showMore ? 'Show Less' : 'Show More'
                }
            </InspectionFooter>
        </Inspections>

    );
};

export default Discrepancies;


const InspectionFooter = styled.div`
  position: absolute;
  bottom: 0;
  color: #1890ff;
  width: 100%;
  height: 57px;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #f0f0f0;
  cursor: pointer;
`

const Left = styled.div`
  display: flex;
  align-items: center;
`
const Right = styled.div`
    color: #1890ff;
  font-size: 14px;
  display: flex;
  align-items: center;
cursor: pointer;
`

const More = styled.div`
  font-size: 14px;
  padding: 0 8px;
  white-space: nowrap;
`

const IconWrapp = styled.div`
  padding: 0 8px;
`

const Height1 = styled.div`
  color: rgb(140, 140, 140);
  font-size: 14px;
  white-space: nowrap;
`

const Height2 = styled.div`
  color: rgb(250, 140, 22);
  font-size: 14px;
  white-space: nowrap;
`

const ItemsWrapper = styled.div`
  padding: 0 24px;
  margin-bottom: 8px;
`


const InspectionItem = styled.div`
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-y: scroll;
  border: 1px solid #f0f0f0;
  &:hover {
    box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%);
  }
`

const InspectionItemTitle = styled.div`
  background-color: #fafafa;
  width: 181px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 4px 7px;
  font-size: 14px;
  font-weight: 500;
`

const InspectionItemDate = styled.div`
    color: #c0c7db;

`

const NumberWrapper = styled.div`
  background-color: #ff4d4f;
  width: 20px;
  display: flex;
  justify-content: center;
    align-items: center;
  height: 20px;
  font-size: 12px;
  border-radius: 50%;
  color: #fff;
`

const InspectionHeader = styled.div`
  display: flex;
    align-items: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 24px;


  padding: 16px 24px;
`

const InspectionHeaderTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: 400;
  font-size: 16px;
  margin-left: 10px;
  margin-right: 10px;

`


const Inspections = styled.div`
    //width: 50%;
  margin-top: 16px;
  //height: 434px;
  padding-bottom: 74px;
  background-color: white;
  position: relative;
`
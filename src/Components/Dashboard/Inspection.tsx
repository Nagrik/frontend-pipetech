import React, {useState} from 'react';
import EmailBoxIcon from "@/Components/common/icons/EmailBoxIcon";
import styled from "styled-components";

const Inspection = () => {
    const [showMore, setShowMore] = useState<boolean>(false)
    return (
        <Inspections>
            <InspectionHeader>
                <EmailBoxIcon/>
                <InspectionHeaderTitle>
                    Unfinished Inspections
                </InspectionHeaderTitle>
                <NumberWrapper>
                    1,2345
                </NumberWrapper>
            </InspectionHeader>

            <InspectionItemWrapper>
                <InspectionItem>
                    <InspectionItemTitle>
                        43-15-X0 · 43-15-W0
                    </InspectionItemTitle>
                    <InspectionItemDate>
                        10/10/2001
                    </InspectionItemDate>
                </InspectionItem>
            </InspectionItemWrapper>
            <InspectionItemWrapper>
                <InspectionItem>
                    <InspectionItemTitle>
                        43-15-X0 · 43-15-W0
                    </InspectionItemTitle>
                    <InspectionItemDate>
                        10/10/2001
                    </InspectionItemDate>
                </InspectionItem>
            </InspectionItemWrapper>
            <InspectionFooter onClick={() => setShowMore(!showMore)}>
                {
                    showMore ? 'Show Less' : 'Show More'
                }
            </InspectionFooter>
        </Inspections>

    );
};

export default Inspection;


const InspectionFooter = styled.div`
  position: absolute;
  bottom: 0;
  color: #1890ff;
  width: 100%;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #f0f0f0;
  cursor: pointer;
`

const InspectionItemWrapper = styled.div`
    margin-bottom: 8px;
  padding: 0 24px;
`

const InspectionItem = styled.div`
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  background-color: #c0c7db;
  transform-origin: 50% 50%;
  padding: 3px 8px;
  font-size: 14px;
  border-radius: 10px;
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
  font-size: 18px;
  margin-left: 10px;
  margin-right: 10px;

`


const Inspections = styled.div`
    //width: 50%;
  //height: 434px;
  padding-bottom: 74px;
  background-color: white;
  position: relative;
`
import React, {useState} from 'react';
import styled from "styled-components";
import EmailBoxIcon from "@/Components/common/icons/EmailBoxIcon";
import Inspection from "@/Components/Dashboard/Inspection";
import Discrepancies from "@/Components/Dashboard/Discrepancies";
import UpdatedProjects from "@/Components/Dashboard/UpdatedProjects";
import Assets from "@/Components/Dashboard/Assets";
import Inspections from "@/Components/Dashboard/Inspections";
import Footer from "@/Components/Dashboard/Footer";

const Dashboard = () => {
    return (
        <>
            <Wrapper>
            <LeftSide>
                <LeftSideHeader>
                    <LeftSideHeaderTitle>
                        Activity
                    </LeftSideHeaderTitle>
                </LeftSideHeader>
                <Inspection/>
                <Discrepancies/>
                <UpdatedProjects/>
            </LeftSide>
            <RightSide>
                <RightSideHeader>
                    <RightSideHeaderTitle>
                        Collections
                    </RightSideHeaderTitle>
                </RightSideHeader>
                <Assets/>
                <Inspections/>
            </RightSide>
        </Wrapper>
            <Footer/>
        </>
);
};

export default Dashboard;


const Wrapper = styled.div`
    padding: 35px 178px;
    display: flex;
`


const LeftSide = styled.div`
    width: 49%;
  padding-bottom: 50px;
`;

const RightSide = styled.div`
    width: 49%;
  margin-left: 16px;
`;


const LeftSideHeader = styled.div``;

const RightSideHeader = styled.div``;

const LeftSideHeaderTitle = styled.div`
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  padding: 6px 24px 21px 23px;
`;

const RightSideHeaderTitle = styled.div`
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  padding: 6px 24px 21px 23px;

`;
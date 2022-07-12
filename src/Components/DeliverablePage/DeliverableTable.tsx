import React from 'react';
import styled from "styled-components";
import TableDeliverableContent from "@/Components/DeliverablePage/TableDeliverableContent";


const DeliverableTable = () => {
    const tableHeaders = [
        "checkbox",
        "name",
        "project",
        "Inspection #",
        "Create On",
        "Share",
        "Downloads #",
        "Actions",
    ];

    return (
        <div>
            <TableWrapper>
                <TableDeliverableContent
                    headers={tableHeaders}
                    minCellWidth={120}
                />
            </TableWrapper>
        </div>
    );
};

export default DeliverableTable;


const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  padding: 0 24px 24px 24px;
  background-color: white;
  border-bottom: 1px solid rgb(217,217,217);
`

const Settings = styled.div`
    background-color: white;
  padding: 5px 5px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
`

const ViewWrapper = styled.div`
  display: flex;
  border: 1px solid #ccc;
  padding: 4px 5px;
  align-items: center;
  background-color: #fff;
  cursor: pointer;
`

const View = styled.div`
    font-size: 14px;
  display: flex;
  align-items: center;
`

const FilterTitle = styled.div`
  padding: 0 5px;
`

const Number = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #ccc;
  padding: 5px 7px;
`

const FilterWrapper = styled.div`
    display: flex;
    align-items: center;
  background-color: white;
  font-size: 14px;
  border: 1px solid #ccc;
  padding-left: 5px;
  cursor: pointer;
`

const AddToCollection = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-right: 15px;
`

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`

const RightSide = styled.div`
    display: flex;
    align-items: center;
  justify-content: space-between;
  width: 365px;
`

const Assets = styled.div`
  font-size: 14px;
  padding: 0px 5px;
`

const IconWrapper = styled.div`
  padding: 0 5px;
  display: flex;
  align-items: center;
`

const Collection = styled.div`
    display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 3px 10px;
  font-size: 14px;
`

const TableUtils = styled.div`
  padding: 10px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TableWrapper = styled.div`
  height: calc(100vh - 45px - 118px);
  background-color: whitesmoke;
`
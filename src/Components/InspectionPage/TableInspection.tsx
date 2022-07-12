import React, {useState} from 'react';
import styled from "styled-components";
import TableContent from "@/Components/AssetsPage/TableContent";
import Folder from "@/Components/common/icons/Folder";
import FolderPlus from "@/Components/common/icons/AssetsPageIcons/FolderPlus";
import Filter from "@/Components/common/icons/AssetsPageIcons/Filter";
import EyeIcon from "@/Components/common/icons/AssetsPageIcons/EyeIcon";
import SettingsIcon from "@/Components/common/icons/SettingsIcon";
import TableInspectionContent from "@/Components/InspectionPage/TableInspectionContent";
import CreateProjectModal from "@/Components/ProjectsPage/CreateProjectModal";
import CreateInspectionModal from "@/Components/InspectionPage/CreateInspectionModal";

const TableInspection = () => {
    const [modal, setModal] = useState(false)
    const tableHeaders = [
        "checkbox",
        "Items",
        "Order #",
        "Amount",
        "Status",
        "test",
        "tes2",
        "tes3",
    ];

    return (
        <div>
            <TitleWrapperContent>

            <Title>Inspections</Title>
            <Button onClick={() => {
                setTimeout(() => {
                    setModal(!modal)

                }, 0.1)
            }}>
                        <span
                            style={{fontSize: '20px', paddingBottom: '3px', paddingRight: '10px'}}>+</span> {' '} Add Inspection
            </Button>
            </TitleWrapperContent>
            <TableWrapper>
                <TableUtils>
                    <LeftSide>
                        <Collection>
                            <IconWrapper>
                                <Folder color='#000'/>
                            </IconWrapper>
                            Collection
                        </Collection>
                        <Assets>
                            651 Inspections
                        </Assets>
                    </LeftSide>
                    <RightSide>
                        <AddToCollection>
                            <IconWrapper>
                                <FolderPlus/>
                            </IconWrapper>
                            Add to collection
                        </AddToCollection>
                        <FilterWrapper>
                            <IconWrapper>
                                <Filter/>
                            </IconWrapper>
                            <FilterTitle>
                                Filter
                            </FilterTitle>
                            <Number>
                                0
                            </Number>
                        </FilterWrapper>
                        <ViewWrapper>
                            <IconWrapper>
                                <EyeIcon/>
                            </IconWrapper>
                            <View>
                                View
                            </View>
                        </ViewWrapper>
                        <Settings>
                            <SettingsIcon color='#000' width={14} height={14}/>
                        </Settings>
                    </RightSide>
                </TableUtils>
                <TableInspectionContent
                    headers={tableHeaders}
                    minCellWidth={120}
                />
            </TableWrapper>
            {
                modal && (
                    <div >
                        <CreateInspectionModal
                            setModal={setModal}
                            modal={modal}
                        />
                    </div>
                )
            }
        </div>
    );
};

export default TableInspection;


const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  padding: 0 24px 24px 0px;
  background-color: white;
  border-bottom: 1px solid rgb(217,217,217);
`


const Button = styled.div`
  background-color: #1890ff;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 27px;
  margin-right: 20px;
  cursor: pointer;
  height: 33px;
`

const TitleWrapperContent = styled.div`
  width: 100%;
  display: flex;
  padding: 0px 24px 0 24px;
  justify-content: space-between;
  background-color: white;
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
import React, {useEffect, useState} from 'react';
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
import useOnClickOutside from "@/Components/utils/hooks/useOnClickOutside";
import TableFilter from "@/Components/TableUtils/Filter";
import SettingsModal from "@/Components/TableUtils/SettingsModal";
import {getOrganizationInspections} from "@/store/actions/organization";
import {useDispatch, useSelector} from "react-redux";
import {selectOrganizationInspections} from "@/store/selectors/organization";

const TableInspection = () => {
    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)
    const [modal, setModal] = useState(false)
    const [isOpenSettings, setIsOpenSettings] = useState<boolean>(false)
    const [columns, setColumns] = useState<any>()

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getOrganizationInspections('1', '1', '50'))
    }, [])

    const inspections = useSelector(selectOrganizationInspections)
//54



    const filterRef = useOnClickOutside(() => {
        setIsOpenFilter(false);
    });

    const settingsRef = useOnClickOutside(() => {
        setIsOpenSettings(false);
    });

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
                            <HoverWrapper>
                                <TextHover>
                                    Collections are like folders that store assets or inspections.
                                </TextHover>
                                <HoverItem>
                                    12-19-O0+32-23-F0
                                </HoverItem>
                                <HoverItem>
                                    12-19-O0+32-23-F0
                                </HoverItem>
                            </HoverWrapper>
                        </Collection>
                        <Assets>
                            {inspections && inspections.values.data.length} Inspections
                        </Assets>
                    </LeftSide>
                    <RightSide>
                        <AddToCollection>
                            <IconWrapper>
                                <FolderPlus/>
                            </IconWrapper>
                            Add to collection
                        </AddToCollection>
                        <FilterWrapper onClick={() => setIsOpenFilter(true)} ref={filterRef}>
                            <IconWrapper>
                                <Filter/>
                            </IconWrapper>
                            <FilterTitle>
                                Filter
                            </FilterTitle>
                            <Number>
                                0
                            </Number>
                            {
                                isOpenFilter && (
                                    <TableFilter/>
                                )
                            }
                        </FilterWrapper>
                        <ViewWrapper>
                            <IconWrapper>
                                <EyeIcon/>
                            </IconWrapper>
                            <View>
                                View
                            </View>
                        </ViewWrapper>
                        <Settings onClick={() => {
                            setTimeout(() => {
                                setIsOpenSettings(true);
                            }, 0.1)
                        }}>
                            <SettingsIcon color='#000' width={14} height={14}/>
                        </Settings>
                        {
                            isOpenSettings && (
                                <SettingsModal settingsRef={settingsRef} setIsOpenSettings={setIsOpenSettings}/>
                            )
                        }
                    </RightSide>
                </TableUtils>
                <TableInspectionContent
                    headers={inspections?.columns}
                    data={inspections}
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




const HoverItem = styled.div`
  padding: 10px 7px;
  color: black;
  font-size: 14px;

  &:hover {
    background-color: rgb(217, 217, 217);
  }


`
const Collection = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 3px 10px;
  font-size: 14px;

  &:hover {
    border: 1px solid #40a9ff;
  }
`
const TextHover = styled.div`
  font-size: 14px;
  padding: 10px 7px;
  cursor: not-allowed;
`

const HoverWrapper = styled.div`
  position: absolute;
  top: 204px;
  z-index: 999;
  left: 24px;
  display: none;
  width: 200px;
  background-color: white;
  border: 1px solid #ccc;
  color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);

  ${Collection}:hover & {
    display: block;
  }
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  padding: 0 24px 24px 0px;
  background-color: white;
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
  border-bottom: 1px solid rgb(217,217,217);
`


const Settings = styled.div`
    background-color: white;
  padding: 5px 5px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    border: 1px solid #40a9ff;
  }
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
  position: relative;
  &:hover {
    border: 1px solid #40a9ff;
  }
`

const AddToCollection = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-right: 15px;
  cursor: pointer;
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


const TableUtils = styled.div`
  padding: 10px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const TableWrapper = styled.div`
  height: calc(100vh - 70px - 118px);
  background-color: whitesmoke;
`
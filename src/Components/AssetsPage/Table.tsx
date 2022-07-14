import React, {useState} from 'react';
import styled from "styled-components";
import TableContent from "@/Components/AssetsPage/TableContent";
import Folder from "@/Components/common/icons/Folder";
import FolderPlus from "@/Components/common/icons/AssetsPageIcons/FolderPlus";
import Filter from "@/Components/common/icons/AssetsPageIcons/Filter";
import EyeIcon from "@/Components/common/icons/AssetsPageIcons/EyeIcon";
import SettingsIcon from "@/Components/common/icons/SettingsIcon";
import ArrowDownIcon from "@/Components/common/icons/AssetsPageIcons/ArrowDownIcon";
import useOnClickOutside from "@/Components/utils/hooks/useOnClickOutside";

const Table = () => {
    const [filters, setFilters] = useState<Array<any>>([])
    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false)
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

    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    const handleCheckboxs = (e: any, item: number) => {
        if (e.target.checked) {
            setFilters([...filters, item])
        }else{
            setFilters(filters.filter(i => i !== item))
        }
    }

    const filterRef = useOnClickOutside(() => {
        setIsOpenFilter(false);
    });

    const handleDeleteFilter = (item: number) => {
        setFilters(filter => filter.filter(filter => filter !== item));
    }

    const handleClear = (e: any) => {
        setFilters([])
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            //@ts-ignore
            checkbox.checked = false;
        })
    }
    return (
        <div>
            <Title>Assets</Title>
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
                            651 Assets
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
                                    <ClickFilterWrapper>
                                        <FilterHeader>
                                            <HeaderItem>
                                                <Clear onClick={handleClear} active={Boolean(filters.length >= 1)}>
                                                    Clear
                                                </Clear>
                                            </HeaderItem>
                                            <HeaderItem>
                                                <FilterTitle>
                                                    Filters
                                                </FilterTitle>
                                            </HeaderItem>
                                            <HeaderItem>
                                                <Apply active={Boolean(filters.length >= 1)}>
                                                    Apply
                                                </Apply>
                                            </HeaderItem>
                                        </FilterHeader>
                                        <FilterBody>
                                            {
                                                filters.map((item: number, index: number) => (
                                                    <FilterInputsWrapper>
                                                        <FilterInputs>
                                                            <FilterInputTitle>
                                                                {item} :
                                                            </FilterInputTitle>
                                                            <FilterInput/>
                                                            <Cross onClick={() => handleDeleteFilter(item)}>
                                                                Х
                                                            </Cross>
                                                        </FilterInputs>
                                                    </FilterInputsWrapper>
                                                ))
                                            }
                                            <BodyItem>
                                                <Left>
                                                    <Plus>
                                                        +
                                                    </Plus>
                                                    <BodyTitle>
                                                        Add filter
                                                    </BodyTitle>
                                                </Left>
                                                <Rigth>
                                                    <ArrowDownIcon/>
                                                </Rigth>

                                                <HoverFilterWrapper>
                                                    {
                                                        arr.map((item, index) => (
                                                            <HoverFilter key={index}>
                                                                <HoverFilterItem onClick={(e) => handleCheckboxs(e, item)}>
                                                                    <Checkbox>
                                                                        <input type='checkbox' id={`checkbox${item}`}/>
                                                                    </Checkbox>
                                                                    <Label htmlFor={`checkbox${item}`}>{item}</Label>
                                                                </HoverFilterItem>
                                                            </HoverFilter>
                                                        ))
                                                    }
                                                </HoverFilterWrapper>

                                            </BodyItem>
                                        </FilterBody>
                                    </ClickFilterWrapper>

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
                        <Settings>
                            <SettingsIcon color='#000' width={14} height={14}/>
                        </Settings>
                    </RightSide>
                </TableUtils>
                <TableContent
                    headers={tableHeaders}
                    minCellWidth={120}
                />
            </TableWrapper>
        </div>
    );
};

export default Table;


const Cross = styled.div`
  font-size: 16px;
  color: #000;
  padding: 0px 15px;
`


const FilterInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 2px;
  padding: 1px 10px;
  width: 300px;
  font-size: 14px;
  color: #000;

  &:focus {
    outline: none;
    border: 1px solid #40a9ff;
  }

  &:hover {
    border: 1px solid #40a9ff;
  }
`

const FilterInputTitle = styled.div`
  padding: 0px 10px;
  color: #000;
`

const FilterInputs = styled.div`
  display: flex;
  align-items: center;
`

const FilterInputsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 5px 0px 5px 10px;
  border-bottom: 1px solid #f0f0f0;
`

const Label = styled.label`
  width: 100%;
  cursor: pointer;
  height: 30px;
  display: flex;
  align-items: center;
  color: #000;
`

const HoverFilterItem = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    background-color: #f0f0f0;
  }
`

const HoverFilter = styled.div`
  
`
const Checkbox = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  ${HoverFilter}:hover & {
    //outline: 1px solid  #3b99fc;
  }
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

const FilterBody = styled.div`

`


const BodyItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;

  &:hover {
    background-color: rgb(217, 217, 217);
  }
`
const HoverFilterWrapper = styled.div`
  position: absolute;
  top: 0;
  left: -201px;
  width: 200px;
  max-height: 510px;
  overflow-y: scroll;
  padding: 5px;
  background-color: #fff;
  display: none;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);

  ${BodyItem}:hover & {
    display: block;
  }
`

const Rigth = styled.div`
  transform: rotate(270deg);
  color: #000;
`

const BodyTitle = styled.div`
  font-size: 16px;
  color: #000;

`


const Plus = styled.div`
  padding: 0px 5px 2px 5px;
  font-size: 16px;
  color: #000;
`

const Left = styled.div`
  display: flex;
  align-items: center;
`


const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  border-bottom: 1px solid #f0f0f0;
`

const HeaderItem = styled.div`
  font-size: 16px;
`

const Clear = styled.div<{active:boolean}>`
  font-size: 16px;
  border: 1px solid #d9d9d9;
  padding: 5px;
  border-radius: 2px;
  color: ${({active}) => active ? '#000' : 'rgba(0, 0, 0, 0.25)'};
  background: ${({active}) => active ? '#fff' : '#f5f5f5'};

`

const Apply = styled.div<{active:boolean}>`
  border: 1px solid #d9d9d9;
  font-size: 16px;
  padding: 5px;
  border-radius: 2px;
  color: ${({active}) => active ? '#000' : 'rgba(0, 0, 0, 0.25)'};
  background: ${({active}) => active ? '#fff' : '#f5f5f5'};
`

const HoverFilterTitle = styled.div`
  font-size: 16px;
  color: #000;
  font-weight: 500;
`


const ClickFilterWrapper = styled.div`
  position: absolute;
  top: 25px;
  z-index: 3;
  right: -2px;
  display: block;
  width: 500px;
  background-color: white;
  border: 1px solid #ccc;
  color: rgba(0, 0, 0, 0.25);
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  padding: 0 24px 24px 24px;
  background-color: white;
  border-bottom: 1px solid rgb(217, 217, 217);
`

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
  top: 205px;
  z-index: 3;
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
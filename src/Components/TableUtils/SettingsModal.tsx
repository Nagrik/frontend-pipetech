import React, {useState} from 'react';
import styled from "styled-components";
import {SubTitle} from "chart.js";
import EyeIcon from "@/Components/common/icons/AssetsPageIcons/EyeIcon";
import CloseEyeIcon from "@/Components/common/icons/CloseEyeIcon";
import PinIcon from "@/Components/common/icons/PinIcon";
import ArrowDownIcon from "@/Components/common/icons/AssetsPageIcons/ArrowDownIcon";
import SaveIcon from "@/Components/common/icons/SaveIcon";

const SettingsModal = ({setIsOpenSettings, settingsRef}:any) => {
    const arr = [
        {
            id: 1,
            name: 'Last Inspected',
            isChecked: false,
            isPinned: false,
        },
        {
            id: 2,
            name: 'Projects',
            isChecked: false,
            isPinned: false,
            filter: {
                checked: false,
                value: null
            }
        },
        {
            id: 3,
            name: 'City',
            isChecked: false,
            isPinned: false,
        }
    ]
    const [newArr, setNewArr] = useState<any>(arr)

    const handlePinAction = (id: any) => {
        setNewArr(newArr.map((item: any) => {
            if (item.id === id) {
                item.isPinned = !item.isPinned
            }
            return item
        }))
    }
    const handleSeeAction = (id: any) => {
        setNewArr(newArr.map((item: any) => {
            if (item.id === id) {
                item.isChecked = !item.isChecked
            }
            return item
        }))
    }

    const handleOpenSelect = (id: any) => {
        setNewArr(newArr.map((item: any) => {
            if (item.id === id) {
                item.filter.checked = !item.filter.checked
            }
            return item
        }))
    }

    const handleChangeSelectValue = (id: number, value: string) => {
        setNewArr(newArr.map((item: any) => {
            if (item.id === id) {
                item.filter.value = value
            }
            return item
        }))
    }
    console.log(newArr)
    return (
        <ContainerModal>
            <Wrapper ref={settingsRef}>
                <ModalHeader>
                    <ModalTitle>
                        Column Settings
                    </ModalTitle>
                    <ModalClose>
                        ☓
                    </ModalClose>
                </ModalHeader>
                <SecondaryHeader>
                    <Subtitle>
                        Reorder elements by dragging and dropping.
                    </Subtitle>
                </SecondaryHeader>
                <ColumnsHeader>
                    <ColumnHeaderTitle style={{width: '50%'}}>
                        Name
                    </ColumnHeaderTitle>
                    <ColumnHeaderTitle
                        style={{borderLeft: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0', width: '25%'}}>
                        Action
                    </ColumnHeaderTitle>
                    <ColumnHeaderTitle>
                        Function
                    </ColumnHeaderTitle>
                </ColumnsHeader>
                <Columns>
                    {
                        newArr.map((item: any, index: number) => (
                            <Column key={index}>
                                <ColumnTitle>
                                    {item.name}
                                </ColumnTitle>
                                <ColumnActions>
                                    <IconWrappPin
                                        onClick={() => handlePinAction(item.id)}
                                        active={item.isPinned}>
                                        <PinIcon/>
                                    </IconWrappPin>
                                    <IconWrappEye
                                        onClick={() => handleSeeAction(item.id)}
                                        active={item.isChecked}
                                        style={{marginLeft: '10px'}}>
                                        {
                                            item.isChecked ? <CloseEyeIcon/> : <EyeIcon/>
                                        }
                                    </IconWrappEye>
                                </ColumnActions>
                                <ColumnFunction>
                                    {
                                        item.filter && (
                                            <SelectItem onClick={() => handleOpenSelect(item.id)}>
                                                <SelectItemText active={item.filter.value}>
                                                    {
                                                        item.filter.value ? item.filter.value : 'Select a ...'
                                                    }
                                                </SelectItemText>
                                                <div style={{padding: '0px 7px', display: 'flex', alignItems: 'center'}}>
                                                    <ArrowDownIcon/>
                                                </div>
                                                {
                                                    item.filter.checked && (
                                                        <SelectItemList>

                                                            <SelectItemListItem
                                                                onClick={() => handleChangeSelectValue(item.id, 'Sum')}
                                                            >
                                                                <SelectItemListItemText>
                                                                    Sum
                                                                </SelectItemListItemText>
                                                            </SelectItemListItem>

                                                            <SelectItemListItem
                                                                onClick={() => handleChangeSelectValue(item.id, 'Min')}
                                                            >
                                                                <SelectItemListItemText>
                                                                    Min
                                                                </SelectItemListItemText>
                                                            </SelectItemListItem>

                                                            <SelectItemListItem
                                                                onClick={() => handleChangeSelectValue(item.id, 'Max')}
                                                            >
                                                                <SelectItemListItemText>
                                                                    Max
                                                                </SelectItemListItemText>
                                                            </SelectItemListItem>

                                                            <SelectItemListItem
                                                                onClick={() => handleChangeSelectValue(item.id, 'Average')}
                                                            >
                                                                <SelectItemListItemText>
                                                                    Average
                                                                </SelectItemListItemText>
                                                            </SelectItemListItem>
                                                        </SelectItemList>
                                                    )
                                                }
                                            </SelectItem>
                                        )
                                    }

                                </ColumnFunction>
                            </Column>
                        ))
                    }
                </Columns>
                <ModalFooter>

                    <ModalButton onClick={() => setIsOpenSettings(false)}>
                        <SaveIconWrapp>
                            <SaveIcon/>
                        </SaveIconWrapp>
                        Save
                    </ModalButton>
                </ModalFooter>
            </Wrapper>
        </ContainerModal>
    );
};

export default SettingsModal;

const SelectItemList = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  background-color: #fff;
  z-index: 2;
  width: 120px;
  border: 1px solid;
`

const SaveIconWrapp = styled.div`
  padding: 2px 7px 0px 7px;
`

const ModalButton = styled.div`
  display: flex;
  align-items: center;
  color: white;
  background-color: #1890ff;
  padding: 10px 15px 10px 10px;
  font-size: 18px;
  cursor: pointer;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: #fafafa;
  padding: 7px 10px;

`

const SelectItemListItem = styled.div`
  padding: 10px 10px;

  &:hover {
    background: #f0f0f0;
  }
`

const SelectItemListItemText = styled.div`
  color: black;
  font-size: 14px;
`

const SelectItem = styled.div`
  display: flex;
  align-items: center;
  color: #ccc;
  border: 1px solid #f0f0f0;
  padding: 7px 10px;
  cursor: pointer;
  position: relative;

  &:focus {
    border: 1px solid #40a9ff;
  }

  &:hover {
    border: 1px solid #40a9ff;
  }
`

const SelectItemText = styled.div<{ active: boolean }>`
  color: ${props => props.active ? '#000' : '#ccc'};
`

const Columns = styled.div`
  display: flex;
  flex-direction: column;
`

const IconWrappPin = styled.div<{ active: boolean }>`
  border: 1px solid #ccc;
  padding: 7px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  color: ${({active}) => active ? '#fff' : '#000'};
  background: ${({active}) => active ? '#40a9ff' : '#fff'};
  cursor: pointer;

  &:hover {
    border: 1px solid #40a9ff;
    color: ${({active}) => active ? '#fff' : '#40a9ff'};
  }
`
const IconWrappEye = styled.div<{ active: boolean }>`
  border: 1px solid #ccc;
  padding: 7px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  color: ${({active}) => active ? '#fff' : '#000'};
  background: ${({active}) => active ? '#40a9ff' : '#fff'};

  &:hover {
    border: 1px solid #40a9ff;
    color: ${({active}) => active ? '#fff' : '#40a9ff'};
  }
`

const Column = styled.div`
  display: flex;
  border-bottom: 1px solid #f0f0f0;

`

const ColumnTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 15px;
  width: 50%;

`

const ColumnActions = styled.div`
  display: flex;
  padding: 10px 15px;
  width: 25%;
  border-left: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
`

const ColumnFunction = styled.div`
  padding: 10px 15px;
  display: flex;
  align-items: center;

`

const ColumnsHeader = styled.div`
  display: flex;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
`

const Subtitle = styled.div`
  font-size: 14px;
  padding: 5px 10px;
`

const ColumnHeaderTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  padding: 10px 15px;
`

const Wrapper = styled.div`
  background-color: #fff;
  width: 640px;
  position: relative;
`

const SecondaryHeader = styled.div`
  padding: 8px;
  font-size: 14px;
`

const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`

const ModalClose = styled.div`
  cursor: pointer;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
`

const ContainerModal = styled.div`
  min-height: 100%;
  min-width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`
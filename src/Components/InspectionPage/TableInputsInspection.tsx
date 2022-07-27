import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import ArrowDownIcon from "@/Components/common/icons/AssetsPageIcons/ArrowDownIcon";
import {useSelector} from "react-redux";
import {selectInspectionModalHeader} from "@/store/selectors/organization";
import EmptyTableIcon from "@/Components/common/icons/EmptyTableIcon";
import useOnClickOutside from "@/Components/utils/hooks/useOnClickOutside";

const TableInputsInspection = () => {
    const headers = useSelector(selectInspectionModalHeader)
    const [popup, setPopup] = useState(false)
    const [changedHeaders, setChangedHeaders] = useState<any>(headers)
    const [indexPopup, setIndexPopup] = useState<number | null>(null)
    const [usedValue, setUsedValue] = useState<any>([])
    const [value, setValue] = useState<any>([])


    const handleOpenPopup = (index: number) => {
        setIndexPopup(index)
        setPopup(true)
    }


    useEffect(() => {
        setChangedHeaders(headers)
    }, [headers])
    const popupRef = useOnClickOutside(() => {
        setPopup(false);
    });

    const handleChooseItem = (itemValue:any, i:any) => {
        setValue((prevValue:any) => {
            return [...prevValue, itemValue]
        })
        if(headers){
           headers.map((item:any, index:any) => {
                if (index === i) {
                    return setChangedHeaders((prevState: any) => {
                        return [...prevState.slice(0, index), {...item, value: itemValue}, ...prevState.slice(index + 1)]
                    })
                }
                return {...changedHeaders}
            })
        }

        // console.log(qwe)
    }


    const arr = ['UA', 'EN', 'FR', 'PL']
    return (
        <Wrapper>
            <Table>
                <TableHead>
                    <TableRow>
                        {changedHeaders?.map((header: any, index: number) => {
                            if (index > 3) {
                                return (
                                    <div style={{position: 'relative'}} ref={popupRef}>
                                        <TableCell key={index}>
                                            <CellName>
                                                {header.title}
                                            </CellName>

                                            <TableInput onClick={() => {
                                                setTimeout(() => {
                                                    handleOpenPopup(index)
                                                }, 0.1)
                                            }
                                            }>
                                                <Input type="text" value={header.value!}/>
                                                <Arrow>
                                                    <ArrowDownIcon/>
                                                </Arrow>

                                            </TableInput>

                                        </TableCell>
                                        <Popup>
                                            {
                                                popup && indexPopup === index ? (
                                                    arr.map((item: string, i: number) => {
                                                        return (
                                                            <PopupItem
                                                                key={i}
                                                                disabled={value.includes(item) ? true : false}
                                                                isActive={value.includes(item) ? true : false}
                                                                onClick={() => {
                                                                    if(value.includes(item)){
                                                                        return
                                                                    }
                                                                    handleChooseItem(item, index )
                                                                }}>
                                                                <PopupItemName>
                                                                    {item}
                                                                </PopupItemName>
                                                            </PopupItem>

                                                        )
                                                    })

                                                ) : null
                                            }
                                        </Popup>
                                    </div>
                                )
                            } else {
                                return (
                                    <TableCell style={{justifyContent: 'center'}}>
                                        <CellName style={{borderBottom: 'unset', whiteSpace: 'nowrap'}}>
                                            {header.title}
                                        </CellName>
                                    </TableCell>
                                )
                            }
                        })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRowEmpty>
                        <TableCellBodyEmpty>
                            <EmptyTableIcon/>
                            <EmptyText>
                                No Data.
                            </EmptyText>
                        </TableCellBodyEmpty>
                    </TableRowEmpty>
                </TableBody>
            </Table>
        </Wrapper>
    );
};

export default TableInputsInspection;

const Popup = styled.div`
  width: 150px;
  position: absolute;
  top: 78px;
  left: 8px;
  z-index: 9999;
  background-color: white;

`

const PopupItem = styled.div<{ isActive?: boolean, disabled?:boolean }>`
  border-right: 1px solid #ccc;
  border-left: 1px solid #cccc;
  padding: 10px 10px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  background-color: ${props => props.isActive ? '#f5f5f5' : '#fff'};
  &:nth-last-child(1){
    border-bottom: 1px solid #ccc;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`

const PopupItemName = styled.div`
`

const TableBody = styled.div`
`

const TableRowEmpty = styled.div`
  padding-top: 80px;
  width: 720px;
  padding-bottom: 135px;
`

const TableCellBodyEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  margin-left: 215px;
  position: fixed;
  flex-direction: column;
`
const EmptyText = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.25);;
  text-align: center;
  padding-top: 10px;
`

const Wrapper = styled.div`
  overflow: scroll;
  border-left: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;


`

const Arrow = styled.div`
  position: absolute;
  top: 9px;
  right: 7px;
  cursor: pointer;
`

const CellName = styled.div`
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
  padding: 10px 0;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`

const Table = styled.table`
  height: 300px;

`

const TableHead = styled.thead`
  display: flex;
  //overflow-x: scroll;
`

const TableRow = styled.tr`

`

const TableCell = styled.td`
  display: flex;
  flex-direction: column;
  height: 85px;
  background-color: #fafafa;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  padding: 0px 8px;
  width: unset;

`

const TableInput = styled.div`
  position: relative;
`

const Input = styled.input`
  padding: 6px 10px;
  margin-bottom: 8px;
  border: 1px solid #d9d9d9;
  width: 150px;
`
import React, {useCallback, useEffect, useRef, useState} from 'react';
import '../AssetsPage/table.css'
import styled from "styled-components";
import TableArrowBottom from "@/Components/common/icons/AssetsPageIcons/TableArrowBottom";
import TableArrowTop from "@/Components/common/icons/AssetsPageIcons/TableArrowTop";
import {SortOrder, SortType, sortUtil} from "@/Components/utils/sortUtil";
import {useDispatch, useSelector} from "react-redux";
import {
    selectInspectionHeader,
    selectOrganizationInspections,
    selectOrganizationsInspection
} from "@/store/selectors/organization";
import {
    changeOrganisationArray,
    changeOrganisationInspectionArray,
    getOrganizationInspections
} from "@/store/actions/organization";
import Loader from "@/Components/TableUtils/Loader";


const createHeaders = (headers: any) => {

        return headers && headers.map((item: any) => ({
            text: item.title,
            ref: null
        }));
};

const TableInspectionContent = ({minCellWidth, data}: any) => {


    const [tableHeight, setTableHeight] = useState("auto");
    const [activeIndex, setActiveIndex] = useState(null);
    const [arrayCheckboxes, setArrayCheckboxes] = useState<any | null>(null);
    // const [tableDataState, setTableDataState] = useState(tableData);
    const [activeFilter, setActiveFilter] = useState(false)
    const [hover, setHover] = useState<boolean>(false)
    const [downstreamId, setDownstreamId] = useState<any>(null)
    const [activeFilterN, setActiveFilterN] = useState<number[]>([])


    const inspections = useSelector(selectOrganizationsInspection)
    const inspectionHeaders = useSelector(selectInspectionHeader)
    const dispatch = useDispatch<AppDispatch>();
    const tableElement = useRef(null);
   const columns = createHeaders(inspectionHeaders);



    useEffect(() => {
        // @ts-ignore
        // setTableHeight(tableElement.current.offsetHeight);
    }, []);

    const mouseDown = (index: any) => {
        setActiveIndex(index);
    };


    const mouseMove = useCallback(
        (e: any) => {
            const gridColumns = columns.map((col: any, i: any) => {
                if (i === activeIndex) {
                    const width = e.clientX - col.ref.current.offsetLeft;

                    if (width >= minCellWidth) {
                        return `${width}px`;
                    }
                }
                return `${col.ref.current.offsetWidth}px`;
            });

            // @ts-ignore
            tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
                " "
            )}`;
        },
        [activeIndex, columns, minCellWidth]
    );


    const removeListeners = useCallback(() => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", removeListeners);
    }, [mouseMove]);

    const mouseUp = useCallback(() => {
        setActiveIndex(null);
        removeListeners();
    }, [setActiveIndex, removeListeners]);



    useEffect(() => {
        if (activeIndex !== null) {
            window.addEventListener("mousemove", mouseMove);
            window.addEventListener("mouseup", mouseUp);
        }

        return () => {
            removeListeners();
        };
    }, [activeIndex, mouseMove, mouseUp, removeListeners]);


    function test() {
        let index: any
        if (columns) {
            columns.map((item: any, i: any) => {
                if (item.text === 'Downstream Manhole') {
                    index = i
                }
            })
        }
        return index
    }

    const handleCheckCheckboxes = (e: any) => {
        const target = e.target.checked
        const newOrganisation = inspections.map((item: any) => {
            if (target === false) {
                return {...item, checkbox: false}
            } else {
                return {...item, checkbox: true}
            }
        })
        const arr = newOrganisation.filter((item: any) => item.checkbox === true)
        setArrayCheckboxes(arr)
        dispatch(changeOrganisationInspectionArray(newOrganisation))
    }


    const handleCheckCheckbox = (e: any, id: string) => {
        e.target.checked
        const newOrganisation = inspections.map((item: any) => {
            if (item.id === id) {
                return {...item, checkbox: !item.checkbox}
            }
            return item
        })
        const arr = newOrganisation.filter((item: any) => item.checkbox === true)
        setArrayCheckboxes(arr)
        dispatch(changeOrganisationInspectionArray(newOrganisation))
    }

    const isHovered = (id: string) => {
        const newOrganisation = inspections.map((item: any) => {
            if (item.id === id) {
                return {...item, hover: true}
            } else {
                return {...item, hover: false}
            }
        })
        dispatch(changeOrganisationInspectionArray(newOrganisation))
    }

    return (
        <div style={{position: 'relative'}}>
            <div className="container">
                <div className="table-wrapper">
                    {
                        columns ? (
                            <>
                                <ResizableTableInspection arr={columns} ref={tableElement}>
                                    <thead>
                                    <tr>
                                        {columns.map(({ref, text}: any, i: number) => {
                                                if (text === 'checkbox') {
                                                    return (
                                                        <>
                                                            <th ref={ref} className='checkbox' key={i}>
                                                        <span>
                                                             <label className="container" style={{
                                                                 fontFamily: 'Verdana, sans-serif',
                                                                 fontSize: '12px'
                                                             }}>
                                                            <input type="checkbox" onClick={(e) => handleCheckCheckboxes(e)}/>
                                                                <span className="checkmark-header"></span>
                                                        </label>
                                                        </span>
                                                            </th>
                                                        </>
                                                    )
                                                } else if (text === 'Assets') {
                                                    return (
                                                        <>
                                                            <th ref={ref} className='id' key={i}>
                                                                <span>
                                                                   Assets
                                                                </span>
                                                                <div
                                                                    onMouseDown={() => mouseDown(i)}
                                                                    className={`resize-handle ${
                                                                        activeIndex === i ? "active" : "idle"
                                                                    }`}
                                                                />
                                                            </th>
                                                        </>
                                                    )
                                                } else {
                                                    return (
                                                        <>
                                                            <th
                                                                ref={ref}
                                                                key={i}
                                                                className={i === 1 ? 'first' : 'tableHeaders'}
                                                            >
                                                                <span style={{fontWeight: '500'}}>{text}</span>
                                                                <div
                                                                    onMouseDown={() => mouseDown(i)}
                                                                    className={`resize-handle ${
                                                                        activeIndex === i ? "active" : "idle"
                                                                    }`}
                                                                />
                                                            </th>
                                                        </>
                                                    )
                                                }

                                            }
                                        )}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/*{tableDataState.values.map((item: any, i: number) => (*/}
                                    {/*    <tr key={item.id}>*/}
                                    {/*        <td>*/}
                                    {/*            <span><input type='checkbox'*/}
                                    {/*                            onClick={(e) => handleCheckCheckbox(e, item.id)}/></span>*/}
                                    {/*        </td>*/}
                                    {/*        <td>{item.id}</td>*/}
                                    {/*        <td>{item.name}</td>*/}
                                    {/*        <td>{item.description}</td>*/}
                                    {/*    </tr>*/}
                                    {/*))}*/}

                                    {inspections.map((item: any, i: number) => {
                                            return (
                                                <tr>
                                                    <Td style={{position: 'sticky', left: '0px'}}
                                                        isActive={item.checkbox}
                                                        isHovered={item.hover}
                                                        key={i}

                                                    >
                                                <span >
                                                       <label className="container" style={{
                                                           fontFamily: 'Verdana, sans-serif',
                                                           fontSize: '12px'
                                                       }}>
                                                            <input type="checkbox" checked={item.checkbox} onClick={(e) => handleCheckCheckbox(e, item.id)}/>
                                                                <span className="checkmark"></span>
                                                        </label>
                                                    {/*                                        <input type='checkbox'*/}
                                                    {/*                                               checked={item.checkbox}*/}
                                                    {/*                                               onClick={(e) => handleCheckCheckbox(e, item.id)}/>*/}
                                                </span>

                                                    </Td>
                                                    <Td style={{position: 'sticky', left: '55px'}}
                                                        isActive={item.checkbox}
                                                        isHovered={item.hover}
                                                        onMouseEnter={() => isHovered(item.id)}
                                                        onMouseLeave={() => isHovered(item.id)}
                                                    >
                                                        <IdWrapper>
                                                            {item.arr[test() - 2]} * {item.arr[test() - 1]}
                                                        </IdWrapper>
                                                    </Td>

                                                    {item.arr.map((item2: any, i: number) => (
                                                        <Td
                                                            isActive={item.checkbox}
                                                            onMouseEnter={() => isHovered(item.id)}
                                                            onMouseLeave={() => isHovered(item.id)}
                                                            key={i}
                                                            isHovered={item.hover}
                                                        >
                                                            {item2}
                                                        </Td>
                                                    ))}
                                                </tr>
                                            )
                                        }
                                    )}

                                    </tbody>

                                </ResizableTableInspection>
                                <TableFooter>
                                    {
                                        arrayCheckboxes?.length > 0 && (
                                            <TableCheckboxSelectionWrapp>
                                                <TableCheckboxSelection>
                                                    <TableCheckboxSelectionItem>
                                                        {arrayCheckboxes?.length} inspections selected
                                                    </TableCheckboxSelectionItem>
                                                    <span style={{padding: '0px 10px'}}>|</span>
                                                    <TableCheckboxSelectionItem>
                                                        Avg of Pipe Joint Length: 0 m
                                                    </TableCheckboxSelectionItem>
                                                </TableCheckboxSelection>
                                            </TableCheckboxSelectionWrapp>
                                        )
                                    }
                                </TableFooter>

                            </>
                        ) : <LoaderWrapp>
                            <Loader/>
                        </LoaderWrapp>
                    }
                </div>
            </div>
        </div>
    );
};

export default TableInspectionContent;

const TableCheckboxSelection = styled.div`
  height: 34px;
  border: 1px solid #1890ff;
  margin: 5px 10px;
  display: flex;
  align-items: center;
  padding-left: 15px;
`

const TableCheckboxSelectionItem = styled.div`
  font-size: 14px;
  color: #1890ff;
`

const TableCheckboxSelectionWrapp = styled.div`

`

const LoaderWrapp = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TableFooter = styled.div`
  background-color: #fafafa;
  margin: 0px 24px;
  padding: 10px 0;
  border: 1px solid #f0f0f0;
`


const Td = styled.td<{ isActive: boolean, isHovered?: boolean, isSticky?: boolean }>`
  text-align: left;
  width: 100%;
  background-color: ${({isActive, isHovered}) => isActive ? '#e6f7ff' : isHovered ? '#fafafa' : 'white'};
  position: ${({isSticky}) => isSticky ? 'sticky' : 'unset'};
  left: 55px;
`

const ResizableTableInspection = styled.table<{ arr: any }>`
  display: grid;
  max-height: 450px;
  overflow-x: scroll;
  overflow-y: scroll;
  background-color: whitesmoke;
  padding-right: 24px;
  margin-right: 24px;
  margin-left: 24px;
  grid-auto-columns: calc(25% - 30px);
  grid-template-columns: ${({arr}: any) => arr.map((item: any, index: number) => index === 0 ? 'minmax(55px, 0.1fr)' : index === 1 ? 'minmax(200px, 1fr)' : 'minmax(155px, 1fr)').join(' ')};

`


const IdWrapper = styled.div`
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  padding: 5px 10px;
  white-space: nowrap;
`


const Checkboxs = styled.div`
  position: absolute;
  top: 8px;
  left: 23px;
`

const IconWrapper = styled.div`
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;

`



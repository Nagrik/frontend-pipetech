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


const TableInspectionContent = ({headers, minCellWidth, data}: any) => {


    const createHeaders = (headers: any) => {
        return headers && headers.map((item: any) => ({
            text: item.title,
            // ref: useRef()
        }));
    };


    const [tableHeight, setTableHeight] = useState("auto");
    const [activeIndex, setActiveIndex] = useState(null);
    // const [tableDataState, setTableDataState] = useState(tableData);
    const [activeFilter, setActiveFilter] = useState(false)
    const [hover, setHover] = useState<boolean>(false)
    const [activeFilterN, setActiveFilterN] = useState<number[]>([])

    const dispatch = useDispatch<AppDispatch>();


    const inspections = useSelector(selectOrganizationsInspection)
    const inspectionHeaders = useSelector(selectInspectionHeader)



    const tableElement = useRef(null);

    const columns = createHeaders(inspectionHeaders);


    useEffect(() => {
        // @ts-ignore
        // setTableHeight(tableElement && tableElement.current.offsetHeight);
        // @ts-ignore
        setTableHeight(tableElement.current && tableElement.current.offsetHeight)
    }, [tableElement, columns]);
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

    const handleCheckCheckboxes = (e: any) => {
        const target = e.target.checked
        const newOrganisation = inspections.map((item: any) => {
            if (target === false) {
                return {...item, checkbox: false}
            } else {
                return {...item, checkbox: true}
            }
        })
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





    const handleFilterColumn = (index: number) => {

        // const newArray = inspections.sort(function(a:any, b:any) {
        //     return b[index] - a[index];
        // });
        // console.log(newArray)

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
                                                            <th ref={ref} key={text} className='checkbox'>
                                                        <span><input type='checkbox'
                                                                     onClick={(e) => handleCheckCheckboxes(e)}/></span>
                                                            </th>
                                                        </>
                                                    )
                                                }else if(text === 'Assets'){
                                                    return (
                                                        <>
                                                            <th ref={ref} key={text} className='id' >
                                                                <span>
                                                                   Assets
                                                                </span>
                                                                <div
                                                                    style={{height: tableHeight}}
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
                                                            <th style={{borderRight: '1px solid #ccc'}}
                                                                ref={ref} key={text}
                                                                className={i === 1 ? 'first' : 'tableHeaders'}
                                                                onClick={() => handleFilterColumn(i)}
                                                            >
                                                                <span style={{fontWeight: '500'}}>{text}</span>
                                                                <div
                                                                    style={{height: tableHeight}}
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
                                                <tr key={item.id}>
                                                    <Td style={{position: 'sticky', left: '0px'}}
                                                        isActive={item.checkbox}
                                                        isHovered={item.hover} key={i}

                                                    >
                                                <span>
                                                    <input type='checkbox'
                                                           checked={item.checkbox}
                                                           onClick={(e) => handleCheckCheckbox(e, item.id)}/>
                                                </span>

                                                    </Td>
                                                    <Td  style={{position: 'sticky', left: '55px'}}
                                                        isActive={item.checkbox}
                                                         isHovered={item.hover} key={i}

                                                    >
                                                <IdWrapper>
                                                    <span>{item.id}</span>
                                                </IdWrapper>
                                                    </Td>

                                                    {item.arr.map((item2: any, i: number) => (
                                                        <Td
                                                            isActive={item.checkbox}
                                                            onMouseEnter={() => isHovered(item.id)}
                                                            onMouseLeave={() => isHovered(item.id)}
                                                            isHovered={item.hover} key={i}>
                                                            {item2}
                                                        </Td>
                                                    ))}
                                                </tr>
                                            )
                                        }
                                    )}

                                    </tbody>

                                </ResizableTableInspection>
                                <TableFooter/>
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

const LoaderWrapp = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TableFooter = styled.div`
  background-color: #fafafa;
  width: 100%;
  height: 20px;
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



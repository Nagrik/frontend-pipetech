import React, {useCallback, useEffect, useRef, useState} from 'react';
import '../AssetsPage/table.css'
import styled from "styled-components";
import TableArrowBottom from "@/Components/common/icons/AssetsPageIcons/TableArrowBottom";
import TableArrowTop from "@/Components/common/icons/AssetsPageIcons/TableArrowTop";
import {SortOrder, SortType, sortUtil} from "@/Components/utils/sortUtil";


const createHeaders = (headers: any) => {
    return headers.map((item: any) => ({
        text: item,
        ref: useRef()
    }));
};


const TableInspectionContent = ({headers, minCellWidth}: any) => {



    const tableData = [
        {
            id: 1,
            checkbox: false,
            AssetsId: 'assetsId',
            Projects: 'Large Detroit Style Pizza',
            inspection: 32134,
        },
        {
            id: 2,
            checkbox: false,
            AssetsId: 'assetsId',
            Projects: 'Large Detroit Style Pizza',
            inspection: 321345,
        },
        {
            id: 3,
            checkbox: false,
            AssetsId: 'assetsId',
            Projects: 'Large Detroit Style Pizza',
            inspection: 32134567,
        },
        {
            id: 4,
            checkbox: false,
            AssetsId: 'assetsId',
            Projects: 'Large Detroit Style Pizza',
            inspection: 321345675,
        },
        {
            id: 5,
            checkbox: false,
            AssetsId: 'assetsId',
            Projects: 'Large Detroit Style Pizza',
            inspection: 3213456785,
        },
        {
            id: 6,
            checkbox: false,
            AssetsId: 'assetsId',
            Projects: 'Large Detroit Style Pizza',
            inspection: 3213456785,
        },
    ]



    const [tableHeight, setTableHeight] = useState("auto");
    const [activeIndex, setActiveIndex] = useState(null);
    const [tableDataState, setTableDataState] = useState(tableData);
    const [activeFilter, setActiveFilter] = useState(false)
    const [activeFilterN, setActiveFilterN] = useState<number[]>([])

    const tableElement = useRef(null);
    const columns = createHeaders(headers);
    useEffect(() => {
        // @ts-ignore
        setTableHeight(tableElement.current.offsetHeight);
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

    const handleCheckCheckboxes = (e: any) => {
        const target = e.target.checked
        const arr = tableDataState.map((item) => {
            return (
                {...item, checkbox: target}
            )
        });
        setTableDataState(arr)
        console.log(arr, 'arr')
    }




    const handleCheckCheckbox = (e: any, id: number) => {
        const arr = tableDataState.map((item) => {
            if (item.id === id) {
                return (
                    {...item, checkbox: e.target.checked}
                )
            } else {
                return item
            }
        })
        console.log('arr', arr)
        setTableDataState(arr)
    }

    const handleFilterColumn = () => {
        const withoutNone: any = [];
        tableData?.forEach((item) => {
            if (item) withoutNone.push(item);
        });
        // @ts-ignore
        const sorted = sortUtil(withoutNone!, ((item) => item.inspection), SortOrder.DESCENDING, SortType.Number);
        setActiveFilter(!activeFilter)
        console.log(sorted, 'sorted')

    }



    return (
        <div style={{position: 'relative'}}>
            <div className="container">
                <div className="table-wrapper">
                    <table className="resizeable-table-inspection" ref={tableElement}>
                        <thead>
                        <tr>
                            {columns.map(({ref, text}: any, i: number) => (
                                text === 'checkbox' ? (
                                    <>
                                        <th ref={ref} key={text} className='checkbox'>
                                            <span><input type='checkbox'
                                                         onClick={(e) => handleCheckCheckboxes(e)}/></span>
                                        </th>
                                    </>
                                ) : text === 'Amount' ? (
                                    <>
                                        <th ref={ref} key={text}>
                                            <FilterWrapper onClick={handleFilterColumn}>
                                                <span>{text}</span>
                                                <IconWrapper>
                                                    <TableArrowTop color={activeFilter ? '#276FB2' : '#ccc'}/>
                                                    <TableArrowBottom color={!activeFilter ? '#276FB2' : '#ccc'}/>
                                                </IconWrapper>
                                            </FilterWrapper>
                                            <div
                                                style={{height: tableHeight}}
                                                onMouseDown={() => mouseDown(i)}
                                                className={`resize-handle ${
                                                    activeIndex === i ? "active" : "idle"
                                                }`}
                                            />
                                        </th>
                                    </>
                                ) : text === 'Items' ? (
                                    <>
                                        <th ref={ref} key={text} className='Items'>
                                            <span>{text}</span>
                                            <div
                                                style={{height: tableHeight}}
                                                onMouseDown={() => mouseDown(i)}
                                                className={`resize-handle ${
                                                    activeIndex === i ? "active" : "idle"
                                                }`}
                                            />
                                        </th>
                                    </>
                                ) : (
                                    <>
                                        <th ref={ref} key={text}>
                                            <span>{text}</span>
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
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {tableDataState.map((item) => {
                            return (
                                <>
                                    {
                                        <tr>
                                            <td className='checkbox'>
                                                <input type='checkbox' checked={item.checkbox}
                                                       onClick={(e) => handleCheckCheckbox(e, item.id)}/>
                                            </td>
                                        </tr>
                                    }
                                    <tr >
                                        <td className='Items'>
                                        <span>
                                            {item.AssetsId}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>
                                                {item.Projects}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                            {item.inspection}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                            {item.inspection}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                            {item.inspection}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                            {item.inspection}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                            {item.inspection}
                                        </span>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default TableInspectionContent;


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



import React, {useCallback, useEffect, useRef, useState} from 'react';
import './table.css'
import ArrowDownIcon from "@/Components/common/icons/AssetsPageIcons/ArrowDownIcon";
import styled from "styled-components";


const createHeaders = (headers: any) => {
    return headers.map((item: any) => ({
        text: item,
        ref: useRef()
    }));
};


const TableContent = ({headers, minCellWidth, tableContent}: any) => {


    const tableData = [
        {
            id: 1,
            checkbox: false,
            AssetsId: 'assetsId',
            Projects: 'Large Detroit Style Pizza',
            inspection: '3213456785',
        },
        {
            id: 2,
            checkbox: false,
            AssetsId: 'assetsId',
            Projects: 'Large Detroit Style Pizza',
            inspection: '3213456785',
        },
        {
            id: 3,
            checkbox: false,
            AssetsId: 'assetsId',
            Projects: 'Large Detroit Style Pizza',
            inspection: '3213456785',
        },
        {
            id: 4,
            checkbox: false,
            AssetsId: 'assetsId',
            Projects: 'Large Detroit Style Pizza',
            inspection: '3213456785',
        },
        {
            id: 5,
            checkbox: false,
            AssetsId: 'assetsId',
            Projects: 'Large Detroit Style Pizza',
            inspection: '3213456785',
        },

    ]


    const [tableHeight, setTableHeight] = useState("auto");
    const [activeIndex, setActiveIndex] = useState(null);
    const [tableDataState, setTableDataState] = useState(tableData);

    console.log(tableData)

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


    return (
        <div style={{position: 'relative'}}>
            <div className="container">
                <div className="table-wrapper">
                    <table className="resizeable-table" ref={tableElement}>
                        <thead>
                        <tr>
                            {columns.map(({ref, text}: any, i: number) => (
                                // <th ref={ref} key={text} >
                                //     {
                                //         text === 'checkbox' ? (
                                //             <span className='checkbox'><input type='checkbox'  onClick={(e) => handleCheckCheckboxes(e)}/></span>
                                //         ) : (
                                //             <span>{text}</span>
                                //         )
                                //     }
                                //     <div
                                //         style={{height: tableHeight}}
                                //         onMouseDown={() => mouseDown(i)}
                                //         className={`resize-handle ${
                                //             activeIndex === i ? "active" : "idle"
                                //         }`}
                                //     />
                                // </th>
                                text === 'checkbox' ? (
                                    <>
                                        <th ref={ref} key={text} className='checkbox'>
                                            <span><input type='checkbox'
                                                                              onClick={(e) => handleCheckCheckboxes(e)}/></span>
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
                                    <tr>
                                        <td>
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

export default TableContent;


const Checkboxs = styled.div`
  position: absolute;
  top: 8px;
  left: 23px;
`
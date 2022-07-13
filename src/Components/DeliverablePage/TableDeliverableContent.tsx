import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import TableArrowBottom from "@/Components/common/icons/AssetsPageIcons/TableArrowBottom";
import TableArrowTop from "@/Components/common/icons/AssetsPageIcons/TableArrowTop";
import {SortOrder, SortType, sortUtil} from "@/Components/utils/sortUtil";
import '../ProjectsPage/table.css'
import CopyIcon from "@/Components/common/icons/DeliverableIcons/CopyIcon";
import RegenerateIcon from "@/Components/common/icons/DeliverableIcons/RegenerateIcon";
import DownloadIcon from "@/Components/common/icons/DeliverableIcons/DownloadIcon";
import ArchiveIcon from "@/Components/common/icons/DeliverableIcons/ArchiveIcon";


const createHeaders = (headers: any) => {
    return headers.map((item: any) => ({
        text: item,
        ref: useRef()
    }));
};

export type TableDataType = {
    id: number;
    checkbox: boolean;
    name: {
        value: string;
        width: string;
    };
    project: {
        value: string;
        width: string;
    };
    inspection: {
        value: string;
        width: string;
    };
    create_on: {
        value: string;
        width: string;
    };
    share: {
        value: string;
        width: string;
    };
    downloads: {
        value: string;
        width: string;
    };
    actions: {
        value: string;
        width: string;
    };
}


const TableDeliverableContent = ({headers, minCellWidth}: any) => {


    const tableData = [
        {
            id: 1,
            checkbox: false,
            name: 'SpringField',
            project: ' ',
            inspection: 32134,
            create_on: '10-10-2001',
            share: 'Copy Link',
            downloads: {
                value: 2,
                width: '30px'
            },
            actions: {
                generate: 'Re-generage',
                download: 'Download',
                archive: 'Archive'
            },
        },
        {
            id: 1,
            checkbox: false,
            name: '66Q41 · 66N41',
            project: ' ',
            inspection: 32134,
            create_on: '10-10-2001',
            share: 'Copy Link',
            downloads: {
                value: 2,
                width: '30px'
            },
            actions: {
                generate: 'Re-generage',
                download: 'Download',
                archive: 'Archive'
            },
        },
    ]


    const [tableHeight, setTableHeight] = useState("auto");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [tableDataState, setTableDataState] = useState(tableData);
    const [activeFilter, setActiveFilter] = useState(false)
    const [activeFilterN, setActiveFilterN] = useState<number[]>([])

    const tableElement = useRef(null);
    const columns = createHeaders(headers);
    useEffect(() => {
        // @ts-ignore
        setTableHeight(tableElement.current.offsetHeight);
    }, []);

    const mouseDown = (index: number) => {
        setActiveIndex(index);
    };


    // useEffect(() => {
    //     const gridColumns = columns.map((col: TableDataType, i: any) => {
    //             // @ts-ignore
    //         const width =  col.ref.current.offsetLeft;
    //
    //             if (i >= 1) {
    //                 return '100px'
    //             }
    //         return `60px`;
    //     });
    //
    //     // @ts-ignore
    //     tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
    //         " "
    //     )}`;
    // }, [])


    const handleCheckCheckboxes = (e: any) => {
        const target = e.target.checked
        const arr = tableDataState.map((item) => {
            return (
                {...item, checkbox: target}
            )
        });
        setTableDataState(arr)
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

    }


    return (
        <div style={{position: 'relative'}}>
            <div className="container">
                <div className="table-wrapper">
                    <table className="deliverables-table" ref={tableElement}>
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
                                    <tr>
                                        <td className='Items'>
                                        <span>
                                            {item.name}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>
                                                {item.project}
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
                                            {item.create_on}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span style={{color: '#1890FF', display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                            <div style={{padding: '0px 7px'}}>
                                                <CopyIcon/>
                                            </div>
                                            {item.share}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                            {item.downloads.value}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='Many-Items'>
                                        <span>
                                            <div style={{padding: '0px 7px'}}>
                                                <RegenerateIcon/>
                                            </div>
                                            {item.actions.generate}
                                        </span>
                                            <span>
                                                <div style={{padding: '0px 7px'}}>
                                                    <DownloadIcon/>
                                                </div>
                                                {item.actions.download}
                                        </span>
                                            <span>
                                                <div style={{padding: '0px 7px'}}>
                                                    <ArchiveIcon/>
                                                </div>
                                                {item.actions.archive}
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

export default TableDeliverableContent;


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



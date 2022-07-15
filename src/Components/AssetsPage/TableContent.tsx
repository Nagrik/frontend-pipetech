import React, {useCallback, useEffect, useRef, useState} from 'react';
import './table.css'
import styled from "styled-components";
import TableArrowBottom from "@/Components/common/icons/AssetsPageIcons/TableArrowBottom";
import TableArrowTop from "@/Components/common/icons/AssetsPageIcons/TableArrowTop";
import {SortOrder, SortType, sortUtil} from "@/Components/utils/sortUtil";
import useOnClickOutside from "@/Components/utils/hooks/useOnClickOutside";


const createHeaders = (headers: any) => {
    return headers.map((item: any) => ({
        text: item,
        ref: useRef()
    }));
};


const TableContent = ({headers, minCellWidth}: any) => {


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
    const [activeTab, setActiveTab] = useState<string>('Details')
    const [detailsOpen, setDetailsOpen] = useState<boolean>(false)

    const tableElement = useRef(null);
    const columns = createHeaders(headers);

    useEffect(() => {
        // @ts-ignore
        setTableHeight(tableElement.current.offsetHeight);
    }, []);

    const detailsRef = useOnClickOutside(() => {
        setDetailsOpen(false);
    });

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
                    <table className="resizeable-table" ref={tableElement}
                        //@ts-ignore
                           style={{'grid-template-columns': "55px 191px 128px 191px 191px 191px 191px 191px"}}>
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
                                        <td className='Items'
                                            style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <span>
                                            {item.AssetsId}
                                        </span>
                                            <span className='Details' onClick={() => {
                                                setTimeout(() => {
                                                    setDetailsOpen(true)
                                            }, 0.1)}}>
                                                Details {'>'}
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
                    {
                        detailsOpen && (
                            <DetailsModal>
                                <Wrapper ref={detailsRef}>
                                    <DetailsHeader>
                                        <Cross onClick={() => setDetailsOpen(false)}>
                                            X
                                        </Cross>
                                        <HeaderName>
                                            qewrty
                                        </HeaderName>
                                    </DetailsHeader>
                                    <Tabs>
                                        <Tab>
                                            <Span
                                                active={activeTab === 'Details'}
                                                onClick={() => setActiveTab('Details')}
                                            >
                                                Details
                                            </Span>
                                        </Tab>
                                        <Tab>
                                            <Span
                                                active={activeTab === 'Inspections'}
                                                style={{marginLeft: '20px'}}
                                                onClick={() => setActiveTab('Inspections')}
                                            >
                                                Inspections
                                            </Span>
                                        </Tab>
                                    </Tabs>
                                    <DetailsContent>
                                        {
                                            activeTab === 'Details' ? (<DetailsContentWrapper>
                                                    <Row>
                                                        <Key>
                                                            Key
                                                        </Key>
                                                        <Value>
                                                            Value
                                                        </Value>
                                                    </Row>

                                                    <Row>
                                                        <Key>
                                                            Key
                                                        </Key>
                                                        <Value>
                                                            Value
                                                        </Value>
                                                    </Row>

                                                    <Row>
                                                        <Key>
                                                            Key
                                                        </Key>
                                                        <Value>
                                                            Value
                                                        </Value>
                                                    </Row>

                                                    <Row>
                                                        <Key>
                                                            Key
                                                        </Key>
                                                        <Value>
                                                            Value
                                                        </Value>
                                                    </Row>

                                                    <Row>
                                                        <Key>
                                                            Key
                                                        </Key>
                                                        <Value>
                                                            Value
                                                        </Value>
                                                    </Row>
                                                </DetailsContentWrapper>
                                            ) : (
                                                <InspectionTab>
                                                    <InspectionContent>
                                                        <InspectionRow>
                                                            Jan 4, 2018, 5:03 PM
                                                        </InspectionRow>
                                                    </InspectionContent>
                                                </InspectionTab>
                                            )
                                        }
                                    </DetailsContent>
                                </Wrapper>
                            </DetailsModal>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default TableContent;

const InspectionRow = styled.div`
  color: #1890ff;
`

const InspectionContent = styled.div`

`

const InspectionTab = styled.div`
  padding: 15px;
`

const DetailsContent = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
`

const DetailsContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Key = styled.div`
  width: 50%;
  display: flex;
  font-weight: 500;
  justify-content: flex-start;
`

const Value = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
`

const Tabs = styled.div`
  display: flex;
  padding: 15px 15px 15px 15px;
  border-bottom: 1px solid #f0f0f0;
`

const Tab = styled.div`

`

const Span = styled.span<{ active: boolean }>`
  color: ${({active}) => active ? '#1890ff' : '#000'};
  cursor: pointer;
  padding-bottom: 11px;
  border-bottom: ${({active}) => active ? '1px solid #1890ff' : '1px solid #f0f0f0'};
`

const HeaderName = styled.div`
  font-size: 18px;
  white-space: nowrap;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 5px 10px;
`

const DetailsHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
`

const Cross = styled.div`
  color: #ccc;
  padding: 0 15px;
  cursor: pointer;
`


const Checkboxs = styled.div`
  position: absolute;
  top: 8px;
  left: 23px;
`

const Wrapper = styled.div`
  position: absolute;
  width: 400px;
  height: 100%;
  right: 0;
  top: 0;
  background-color: white;
`

const DetailsModal = styled.div`
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



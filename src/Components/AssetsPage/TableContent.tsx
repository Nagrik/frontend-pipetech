import React, {useCallback, useEffect, useRef, useState} from 'react';
import './table.css'
import styled from "styled-components";
import TableArrowBottom from "@/Components/common/icons/AssetsPageIcons/TableArrowBottom";
import TableArrowTop from "@/Components/common/icons/AssetsPageIcons/TableArrowTop";
import {SortOrder, SortType, sortUtil} from "@/Components/utils/sortUtil";
import useOnClickOutside from "@/Components/utils/hooks/useOnClickOutside";
import {useDispatch, useSelector} from "react-redux";
import {selectOrganizationAssets, selectOrganizations} from "@/store/selectors/organization";
import format from "date-fns/format";
import {parseISO} from "date-fns";
import {changeOrganisationArray} from "@/store/actions/organization";
import ArrowDownIcon from "@/Components/common/icons/AssetsPageIcons/ArrowDownIcon";


const createHeaders = (headers: any) => {
    return headers.map((item: any) => ({
        text: item,
        // ref: useRef()
    }));
};


const TableContent = ({headers, minCellWidth}: any) => {

    const data = useSelector(selectOrganizationAssets)
    const organisations = useSelector(selectOrganizations)

    const dispatch = useDispatch<AppDispatch>()

    const [id, setId] = useState<string | null>(null)
    const [tableHeight, setTableHeight] = useState("auto");
    const [activeIndex, setActiveIndex] = useState(null);
    const [tableDataState, setTableDataState] = useState(data?.assets?.data);
    const [activeFilter, setActiveFilter] = useState(false)
    const [activePage, setActivePage] = useState<number>(6)
    const [activeTab, setActiveTab] = useState<string>('Details')
    const [detailsOpen, setDetailsOpen] = useState<boolean>(false)
    const [openSelect, setOpenSelect] = useState<boolean>(false)
    const [activePaginate, setActivePaginate] = useState<number>(50)


    const selectRef = useOnClickOutside(() => {
        setOpenSelect(false);
    });
    const tableElement = useRef(null);

    const tableHeaders = [
        "checkbox",
        "Assets ID",
        "Projects",
        "# of Inspections",
        "Last Inspected",
        "Material",
        "Comments",
        "City",
        "Coordinate system",
        "Downstream Manhole Grade to Invert (mm)",
        "Downstream Manhole Rim to Grade (mm)",
        "Downstream Manhole Rim to Invert (mm)",
        "Downstream Manhole",
        "Drainage area",
        "Easting",
        "Elevation",
        "GPS Accuracy",
        "Height (mm)",
        "Lining method",
        "Location code",
        "Location Details",
        "Northing",
        "Owner",
        "Pipe Joint Length (mm)",
        "Pipe Segment Reference",
        "Sewer Category",
        "Sewer Use",
        "Shape",
        "Street",
        "Total Length (mm)",
        "Upstream Manhole Grade to Invert (mm)",
        "Upstream Manhole Rim to Grade (mm)",
        "Upstream Manhole Rim to Invert (mm)",
        "Upstream Manhole",
        "Width (mm)",
        "Year Laid",
        "Year Renewed",
    ];
    const columns = createHeaders(tableHeaders);

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
        const newOrganisation = organisations.map((item: any) => {
            if (target === false) {
                return {...item, checkbox: false}
            } else {
                return {...item, checkbox: true}
            }
        })
        dispatch(changeOrganisationArray(newOrganisation))
    }


    const handleCheckCheckbox = (e: any, id: string) => {
        e.target.checked
        setId(id.toString())
        const newOrganisation = organisations.map((item: any) => {
            if (item.id === id) {
                return {...item, checkbox: !item.checkbox}
            }
            return item
        })
        dispatch(changeOrganisationArray(newOrganisation))
    }

    const handleFilterColumn = () => {
        const withoutNone: any = [];
        data?.assets.data.forEach((item: any) => {
            if (item) withoutNone.push(item);
        });
        // @ts-ignore
        const sorted = sortUtil(withoutNone!, ((item) => item.inspection), SortOrder.DESCENDING, SortType.Number);
        setActiveFilter(!activeFilter)
    }

    const paginateArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]

    paginateArr.slice(5, 8).map((item) => console.log(item))

    return (
        <div style={{position: 'relative'}}>
            <div className="container">
                <TableWrapper className="table-wrapper" style={{marginRight: '25px'}}>
                    <ResizableTable arr={paginateArr} className="resizeable-table" ref={tableElement}>
                        <thead style={{marginLeft: 12 * paginateArr.length + 'px'}}>
                        <tr>
                            {columns.map(({ref, text}: any, i: number) => (
                                text === 'checkbox' ? (
                                    <>
                                        <th ref={ref} key={i} className={i === 0 ? 'checkboxHeader' : 'checkbox'}>
                                            <span><input type='checkbox' style={{cursor: 'pointer'}}
                                                         onClick={(e) => handleCheckCheckboxes(e)}/></span>
                                        </th>
                                    </>
                                ) : (
                                    <>
                                        <th ref={ref} key={text} className={i === 1 ? 'first' : 'tableHeaders'}>
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
                        {organisations && organisations.map((item: any, index: number) => {
                            return (
                                <>
                                    {
                                        <tr key={index}>
                                            <Td className='checkbox' isActive={item.checkbox}>
                                                <input type='checkbox'
                                                       style={{cursor: 'pointer'}}
                                                       checked={item.checkbox}
                                                       onClick={(e) => handleCheckCheckbox(e, item.id)}/>
                                            </Td>
                                        </tr>
                                    }
                                    <tr>
                                        <Td className='Items' isActive={item.checkbox}
                                            style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <IdWrapper>
                                                {item.systemIndexId.upstream_ap} * {item.systemIndexId.downstream_ap}
                                            </IdWrapper>
                                            <span className='Details' onClick={() => {
                                                setTimeout(() => {
                                                    setDetailsOpen(true)
                                                }, 0.1)
                                            }}>
                                                {/*Details {'>'}*/}
                                            </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                            <span>
                                                {/*1*/}
                                                {/*{item.Projects}*/}
                                            </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                          {/*2*/}
                                            {item.inspectionCount}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*3*/}
                                            {item.lastInspected ? format(parseISO(item.lastInspected), 'dd/MM/yyyy') : null}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*4*/}
                                            {item.source.material}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*5*/}
                                            {/*{item.inspections[0].source.comments}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*6*/}
                                            {item.source.city}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*7*/}
                                            {/*{item.inspections[0].source.coordinate_system}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*8*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*9*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*10*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                            <span>
                                                {/*11*/}
                                                {item.systemIndexId.downstream_ap}
                                            </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                          {/*12*/}
                                            {/*  {item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*13*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*14*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*15*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*16*/}
                                            {/*{item.inspections[0].source.height}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*17*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*18*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*19*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*20*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>

                                    <tr>
                                        <Td isActive={item.checkbox}>
                                            <span>
                                                {/*21*/}
                                                {item.source.owner}
                                            </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                          {/*22*/}
                                            {/*  {item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*23*/}
                                            {item.systemIndexId.upstream_ap}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*24*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*25*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*26*/}
                                            Circular
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*27*/}
                                            {item.source.street}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*28*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*29*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*30*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>

                                    <tr>
                                        <Td isActive={item.checkbox}>
                                            <span>
                                                {/*31*/}
                                                {/*{item.Projects}*/}
                                            </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                          {/*32*/}
                                            {item.systemIndexId.upstream_ap}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*33*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*34*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                    <tr>
                                        <Td isActive={item.checkbox}>
                                        <span>
                                             {/*35*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </Td>
                                    </tr>
                                </>
                            )
                        })}
                        </tbody>
                    </ResizableTable>
                    <TableFooter/>
                    <PaginationWrapp>

                        <Pagination>
                            <PaginationIconLeft>
                                <ArrowDownIcon/>
                            </PaginationIconLeft>
                            <PaginationItemsWrapp>

                                <PaginationItem isActive={activePage === 1} onClick={() => setActivePage(1)}>
                                    {paginateArr[0]}
                                </PaginationItem>
                                {
                                    activePage < 5 && (
                                        paginateArr.map((item, index) => {
                                            if (index > 4 || index === 0) {
                                                return null
                                            } else {
                                                return <PaginationItem onClick={() => setActivePage(item)}
                                                                       key={index} isActive={activePage === item}>{item}
                                                </PaginationItem>
                                            }
                                        })
                                    )
                                }
                                <Dots>
                                    ...
                                </Dots>
                                {
                                    activePage >= 5 && (
                                        paginateArr.slice(activePage - 2, activePage + 1).map((item, index) => {
                                            if (item === paginateArr[paginateArr.length - 1]) {
                                                return
                                            }
                                            return (
                                                <>

                                                <PaginationItem isActive={activePage === item}
                                                                onClick={() => setActivePage(item)}>
                                                    {item}
                                                </PaginationItem>

                                                </>
                                            )
                                        })
                                    )
                                }
                                <Dots>
                                    ...
                                </Dots>
                                <PaginationItem
                                    onClick={() => setActivePage(paginateArr[paginateArr.length - 1])}
                                isActive={activePage === paginateArr[paginateArr.length - 1]} >
                                    {paginateArr[paginateArr.length - 1]}
                                </PaginationItem>
                            </PaginationItemsWrapp>
                            <PaginationIconRight>
                                <ArrowDownIcon/>
                            </PaginationIconRight>
                        </Pagination>
                        <SelectCountPage onClick={() => {
                            setTimeout(() => {
                                setOpenSelect(true)
                            }, 0.1)
                        }}>
                            <SelectCountPageItem>
                                {activePaginate} / page
                            </SelectCountPageItem>
                            {
                                openSelect && (
                                    <SelectPopup ref={selectRef}>
                                        <SelectPopupItem
                                            onClick={() => {
                                                setActivePaginate(10);
                                            }}
                                            isActive={activePaginate === 10}>
                                            10 / page
                                        </SelectPopupItem>
                                        <SelectPopupItem
                                            onClick={() => {
                                                setActivePaginate(20);
                                            }}
                                            isActive={activePaginate === 20}>
                                            20 / page
                                        </SelectPopupItem>
                                        <SelectPopupItem
                                            onClick={() => {
                                                setActivePaginate(50);
                                            }}
                                            isActive={activePaginate === 50}>
                                            50 / page
                                        </SelectPopupItem>
                                        <SelectPopupItem
                                            onClick={() => {
                                                setActivePaginate(100);
                                            }}
                                            isActive={activePaginate === 100}>
                                            100 / page
                                        </SelectPopupItem>
                                    </SelectPopup>
                                )
                            }
                        </SelectCountPage>

                    </PaginationWrapp>

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
                </TableWrapper>
            </div>
        </div>
    );
};

export default TableContent;

const Dots = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  padding: 0px 0px 0px 0px;
`

const ResizableTable = styled.table<{ arr: number[] }>`
  display: grid;
  max-height: 450px;
  overflow-x: scroll;
  overflow-y: scroll;
  background-color: whitesmoke;
  padding-right: 24px;
  margin-left: 24px;
  border-left: 1px solid #f0f0f0;
  grid-auto-columns: calc(25% - 30px);
  grid-template-columns: ${({arr}: any) => arr.map((item: any, index: number) => index === 0 ? 'minmax(55px, 0.1fr)' : index === 1 ? 'minmax(200px, 1fr)' : 'minmax(155px, 1fr)').join(' ')};

`

const TableWrapper = styled.div`
  margin-bottom: 25px;
  border-radius: 6px;
  background: whitesmoke;
  overflow: hidden; /* Clip any scrollbars that appear */
`

const SelectCountPage = styled.div`
  padding: 5px 21px 5px 10px;
  border: 1px solid #ccc;
  border-radius: 2px;
  cursor: pointer;
  position: relative;

  &:hover {
    border: 1px solid #1890ff;
  }
`

const SelectPopup = styled.div`
  position: absolute;
  top: -110px;
  left: -1px;
  border: 1px solid #ccc;
`

const SelectPopupItem = styled.div<{ isActive: boolean }>`
  background-color: ${({isActive}) => isActive ? '#e6f7ff' : '#fff'};
  font-weight: ${({isActive}) => isActive ? 'bold' : 'normal'};
  padding: 6px 15px 6px 10px;
  white-space: nowrap;

  &:hover {
    background-color: #e6f7ff;
  }
`

const SelectCountPageItem = styled.div`

`

const PaginationItemsWrapp = styled.div`
  display: flex;
  padding: 0px 10px;
`

const PaginationIconLeft = styled.div`
  transform: rotate(90deg);
  color: #ccc;
  cursor: pointer;
  top: 5px;
  right: 185px;
  margin-right: 15px;
`

const PaginationIconRight = styled.div`
  transform: rotate(270deg);
  color: #ccc;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: -10px;
`

const PaginationWrapp = styled.div`
  padding-top: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
`

const Pagination = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  margin-right: 35px;
`

const PaginationItem = styled.div<{ isActive: boolean }>`
  padding: 5px 9px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.isActive ? '#1890ff' : '#000'};
  border: ${props => props.isActive ? '1px solid #1890ff' : 'none'};
  margin-left: ${props => props.isActive ? '6px' : '0px'};
`

const Td = styled.td<{ isActive: boolean }>`
  text-align: left;
  width: 100%;
  background-color: ${({isActive}) => isActive ? '#e6f7ff' : 'white'};
`

const TableFooter = styled.div`
  background-color: #fafafa;
  width: 100%;
  height: 20px;
  border: 1px solid #f0f0f0;
`

const IdWrapper = styled.div`
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  padding: 5px 10px;
  white-space: nowrap;
`

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



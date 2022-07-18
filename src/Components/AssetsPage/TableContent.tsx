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


const createHeaders = (headers: any) => {
    return headers.map((item: any) => ({
        text: item,
        ref: useRef()
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
    const [activeTab, setActiveTab] = useState<string>('Details')
    const [detailsOpen, setDetailsOpen] = useState<boolean>(false)

    const tableElement = useRef(null);
    const columns = createHeaders(headers);
    console.log(organisations)

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
        const arr = tableDataState?.map((item: any) => {
            return (
                {...item, checkbox: target}
            )
        });
        setTableDataState(arr)
        console.log(arr, 'arr')
    }


    const handleCheckCheckbox = (e: any, id: string) => {
        e.target.checked
        setId(id.toString())
        const newOrganisation = organisations.filter((item:any) => {
            if(item.id === id) {
                return {...item, checkbox: true}
            }
            return item
        })
        console.log(newOrganisation, 'newOrganisation')
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
        console.log(sorted, 'sorted')

    }


    return (
        <div style={{position: 'relative'}}>
            <div className="container">
                <div className="table-wrapper" style={{marginRight: '25px', borderRight: '1px solid #ccc'}}>
                    <table className="resizeable-table" ref={tableElement}>
                        <thead>
                        <tr>
                            {columns.map(({ref, text}: any, i: number) => (
                                text === 'checkbox' ? (
                                    <>
                                        <th ref={ref} key={i} className={i === 0 ? 'checkboxHeader' : 'checkbox'}>
                                            <span><input type='checkbox'
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
                        {organisations && organisations.map((item:any, index: number) => {
                            return (
                                <>
                                    {
                                        <tr key={index}>
                                            <Td className='checkbox' isActive={item.checkbox}>
                                                <input type='checkbox'
                                                       checked={item.checkbox}
                                                       onClick={(e) => handleCheckCheckbox(e, item.id)}/>
                                            </Td>
                                        </tr>
                                    }
                                    <tr>
                                        <Td className='Items'  isActive={item.checkbox}
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
                                        <td>
                                            <span>
                                                {/*1*/}
                                                {/*{item.Projects}*/}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                          {/*2*/}
                                            {item.inspectionCount}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*3*/}
                                            {item.lastInspected ? format(parseISO(item.lastInspected), 'dd/MM/yyyy') : null}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*4*/}
                                            {item.source.material}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*5*/}
                                            {/*{item.inspections[0].source.comments}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*6*/}
                                            {item.source.city}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*7*/}
                                            {/*{item.inspections[0].source.coordinate_system}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*8*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*9*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*10*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span>
                                                {/*11*/}
                                                {item.systemIndexId.downstream_ap}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                          {/*12*/}
                                            {/*  {item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*13*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*14*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*15*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*16*/}
                                            {/*{item.inspections[0].source.height}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*17*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*18*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*19*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*20*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span>
                                                {/*21*/}
                                                {item.source.owner}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                          {/*22*/}
                                            {/*  {item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*23*/}
                                            {item.systemIndexId.upstream_ap}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*24*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*25*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*26*/}
                                            Circular
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*27*/}
                                            {item.source.street}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*28*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*29*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*30*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <span>
                                                {/*31*/}
                                                {/*{item.Projects}*/}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                          {/*32*/}
                                            {item.systemIndexId.upstream_ap}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*33*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*34*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <span>
                                             {/*35*/}
                                            {/*{item.inspection}*/}
                                        </span>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                        </tbody>
                    </table>
                    <TableFooter/>

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



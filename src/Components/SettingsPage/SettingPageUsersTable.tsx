import React, {useCallback, useEffect, useRef, useState} from 'react';
import './table.css'
import styled from "styled-components";
import TableArrowBottom from "@/Components/common/icons/AssetsPageIcons/TableArrowBottom";
import TableArrowTop from "@/Components/common/icons/AssetsPageIcons/TableArrowTop";
import {SortOrder, SortType, sortUtil} from "@/Components/utils/sortUtil";
import useOnClickOutside from "@/Components/utils/hooks/useOnClickOutside";
import Loader from "@/Components/TableUtils/Loader";
import Popup from "@/Components/utils/Popup";


const createHeaders = (headers: any) => {
    return headers.map((item: any) => ({
        text: item,
        ref: useRef()
    }));
};


const SettingsPageUsersTable = ({minCellWidth, organizationInfo}: any) => {

    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Roles', 'Actions'];



    const [tableHeight, setTableHeight] = useState("auto");
    const [activeIndex, setActiveIndex] = useState(null);
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


    return (
        <div style={{position: 'relative', padding: '24px 24px '}}>

            <div className="container">
                <div className="table-wrapper">
                    <table className="resizeable-table-settings" ref={tableElement}>
                        <thead>
                        <tr>
                            {columns.map(({ref, text}: any, i: number) => (
                                    <>
                                        <th ref={ref} key={text}>
                                            <span style={{fontSize: '12px'}}>{text}</span>
                                            <Head
                                                style={{height: tableHeight}}
                                                onMouseDown={() => mouseDown(i)}
                                            />
                                        </th>
                                    </>
                                )
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {organizationInfo && organizationInfo.users ? (
                            organizationInfo.users.map((item: any, index: number) => {
                                return (
                                    <>
                                        <tr>
                                            <td style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <span style={{fontSize: '12px'}}>
                                            {item.firstName}
                                        </span>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <span style={{fontSize: '12px'}}>
                                                {item.lastName}
                                            </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                        <span style={{fontSize: '12px'}}>
                                            {item.email}
                                        </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                        <span style={{fontSize: '12px'}}>
                                            {item.phone}
                                        </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                        <span style={{fontSize: '12px'}}>
                                            {item.roles}
                                        </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                        <span style={{fontSize: '12px'}}>
                                            {item.actions}
                                        </span>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        ) : (
                            <LoaderWrapper>
                                <Loader/>
                            </LoaderWrapper>)}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default SettingsPageUsersTable;

const Head = styled.div`
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  background-color: #fafafa;
`

const LoaderWrapper = styled.div`
  width: 75vw;
  display: flex;
  align-items: center;
  justify-content: center;
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



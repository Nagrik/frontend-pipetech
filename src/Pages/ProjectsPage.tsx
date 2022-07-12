import React, {useRef, useState} from 'react'
import Header from "@/Components/Header";
import ProjectsSelects from "@/Components/ProjectsPage/ProjectsSelects";
import styled from "styled-components";
import '../Components/ProjectsPage/Projects.css'
import {Doughnut} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import TableArrowTop from "@/Components/common/icons/AssetsPageIcons/TableArrowTop";
import TableArrowBottom from "@/Components/common/icons/AssetsPageIcons/TableArrowBottom";
import {SortOrder, SortType, sortUtil} from "@/Components/utils/sortUtil";
import '../Components/ProjectsPage/table.css'
import {useHistory} from "react-router-dom";
import {Calendar, dateFnsLocalizer} from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import "react-big-calendar/lib/css/react-big-calendar.css";
import useOnClickOutside from "@/Components/utils/hooks/useOnClickOutside";
import {DateRange, DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {addDays} from 'date-fns';
import CreateProjectModal from "@/Components/ProjectsPage/CreateProjectModal";


const ProjectsPage = () => {

    const locales = {
        'en-US': enUS,
    }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })

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
            inspection: 32134,
        },
        {
            id: 2,
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
            inspection: 32134,
        },

    ]

    const [activeTab, setActiveTab] = useState(window.location.pathname.split('-')[1])
    const [tableHeight, setTableHeight] = useState("auto");
    const [activeIndex, setActiveIndex] = useState(null);



    const [state, setState] = useState<any>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }
    ]);

    const [modal, setModal] = useState(false)

    const history = useHistory();




    const tableElement = useRef(null);
    const [tableDataState, setTableDataState] = useState(tableData);
    const [activeFilter, setActiveFilter] = useState(false)

    const createHeaders = (headers: any) => {
        return headers.map((item: any) => ({
            text: item,
            ref: useRef()
        }));
    };

    const tableHeaders = [
        "checkbox",
        "Items",
        "Order #",
        "Amount",
        "Status", ,
    ];

    const columns = createHeaders(tableHeaders);


    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: ['No stage', 'On truck', 'On truck'],
        datasets: [
            {
                label: '# of Votes',
                data: [3, 2, 1],
                backgroundColor: [
                    'rgb(255, 218, 98)',
                    'rgb(23, 143, 255)',
                    'rgba(0, 0, 0)',
                ],
                borderColor: [
                    'rgb(255, 218, 98)',
                    'rgb(23, 143, 255)',
                    'rgba(0, 0, 0)',
                ],
                borderWidth: 1,
            },
        ],
    };
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

    const mouseDown = (index: any) => {
        setActiveIndex(index);
    };

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

    const events = [
        {
            title: "02:00-06:59",
            start: "2022-07-03 02:00",
            end: "2022-07-03 06:59",
            up_down_ind: "N"
        },
        {
            title: "07:00-23:59",
            start: "2022-07-03 07:00",
            end: "2022-07-05 23:59",
            up_down_ind: "Y"
        },
        {
            title: "00:00-01:59",
            start: "2022-07-04 00:00",
            end: "2022-07-04 01:59",
            up_down_ind: "Y"
        },
        {
            title: "02:00-06:59",
            start: "2022-07-04 02:00",
            end: "2022-07-04 06:59",
            up_down_ind: "N"
        },
        {
            title: "07:00-23:59",
            start: "2022-07-04 07:00",
            end: "2022-07-04 23:59",
            up_down_ind: "Y"
        },
        {
            title: "00:00-01:59",
            start: "2022-07-05 00:00",
            end: "2022-07-05 01:59",
            up_down_ind: "Y"
        },
        {
            title: "02:00-06:59",
            start: "2022-07-05 02:00",
            end: "2022-07-05 06:59",
            up_down_ind: "N"
        },
        {
            title: "07:00-23:59",
            start: "2022-07-05 07:00",
            end: "2022-07-05 23:59",
            up_down_ind: "Y"
        },
        {
            title: "00:00-01:59",
            start: "2022-07-06 00:00",
            end: "2022-07-06 01:59",
            up_down_ind: "Y"
        }
    ];



    return (
        <>
            <div>
                <Header/>
                <ProjectsSelects/>
                <TitleWrapperContent>
                    <Title>
                        Projects
                    </Title>
                    <Button onClick={() => {
                        setTimeout(() => {
                            setModal(!modal)

                        }, 0.1)
                    }}>
                        <span
                            style={{fontSize: '20px', paddingBottom: '3px', paddingRight: '10px'}}>+</span> {' '} Create
                        Project
                    </Button>
                </TitleWrapperContent>
                <Tabs>
                    <Tab onClick={() => {
                        setActiveTab('card')
                        history.push('/projects-card')
                    }}>
                        <span className={activeTab === 'card' ? 'Active' : 'UnActive'}>Cards</span>
                    </Tab>
                    <Tab onClick={() => {
                        setActiveTab('list')
                        history.push('/projects-list')
                    }}>
                        <span className={activeTab === 'list' ? 'Active' : 'UnActive'}>List</span>
                    </Tab>
                    <Tab onClick={() => {
                        setActiveTab('calendar')
                        history.push('/projects-calendar')
                    }}>
                        <span className={activeTab === 'calendar' ? 'Active' : 'UnActive'}>Calendar</span>
                    </Tab>
                </Tabs>
                <ProjectCount>
                    1 Project
                </ProjectCount>
                {
                    activeTab === 'card' && (
                        <ProjectsWrapper>
                            <ProjectsHeader>
                                Springfield I&I
                            </ProjectsHeader>
                            <ProjectsContent>
                                <Donut>
                                    <Doughnut data={data}/>
                                </Donut>
                                <Wrap>
                                    <Test>
                                        <Assets>
                                            <ContentTitleAssets>
                                                Assets
                                            </ContentTitleAssets>
                                            <Number>
                                                1
                                            </Number>
                                        </Assets>
                                        <Assigned>
                                            <ContentTitleAssets>
                                                Assigned
                                            </ContentTitleAssets>
                                            <Number>
                                                0
                                            </Number>
                                        </Assigned>
                                    </Test>
                                    <Distanse>
                                        <ContentTitleAssets>
                                            Total Distance Remaining
                                        </ContentTitleAssets>
                                        <Number>
                                            0
                                        </Number>
                                    </Distanse>
                                </Wrap>

                            </ProjectsContent>
                        </ProjectsWrapper>
                    )
                }
                {
                    activeTab === 'list' && (
                        <div>
                            <div style={{position: 'relative'}}>
                                <div className="container">
                                    <div className="table-wrapper">
                                        <table className="resizeable-table-project" ref={tableElement}>
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
                                                                        <TableArrowTop
                                                                            color={activeFilter ? '#276FB2' : '#ccc'}/>
                                                                        <TableArrowBottom
                                                                            color={!activeFilter ? '#276FB2' : '#ccc'}/>
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
                                                                    {item.AssetsId}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='Items'>
                                                                <span>
                                                                    {item.AssetsId}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='Items'>
                                                                <span>
                                                                    {item.AssetsId}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='Items'>
                                                                <span>
                                                                    {item.AssetsId}
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

                        </div>
                    )
                }
                {
                    activeTab === 'calendar' && (
                        <CalendarWrapp>
                            <Calendar
                                localizer={localizer}
                                events={events}
                                views={["month"]}
                                defaultDate={new Date(2022, 7, 8)}
                            />
                        </CalendarWrapp>

                    )
                }
                {
                    modal && (
                        <div >
                            <CreateProjectModal
                                setModal={setModal}
                                modal={modal}
                            />
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default ProjectsPage;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
`




const CalendarWrapp = styled.div`
  height: 500px;
  width: 100%;
  padding: 36px;
`

const IconWrapper = styled.div`
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Test = styled.div`
  display: flex;
  justify-content: space-between;
`

const Distanse = styled.div`

`

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  height: 125px;
  flex-direction: column;
  padding-right: 100px;
`

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;

`

const Assigned = styled.div`

`

const Donut = styled.div`
  display: flex;
  width: 200px;
  height: 250px;
`

const Assets = styled.div`
  display: flex;
  flex-direction: column;
`
const ContentTitleAssets = styled.div`
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
`

const Number = styled.div`
  font-size: 24px;
  padding: 10px 0;
`


const ProjectsContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 245px;
  padding: 24px;
`

const ProjectsWrapper = styled.div`
  margin: 36px;
  background-color: white;

`

const ProjectsHeader = styled.div`
  color: #1890ff;
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;

`

const ProjectCount = styled.div`
  font-size: 14px;
  padding: 16px 24px;
`

const Tabs = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
  background-color: white;
  border-bottom: 1px solid rgb(217, 217, 217);;
`

const Tab = styled.div`
  font-size: 16px;
  padding: 0 15px;

  &:hover {
    color: #1890ff;
  }

`

const Button = styled.div`
  background-color: #1890ff;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 27px;
  margin-right: 20px;
  cursor: pointer;
`

const TitleWrapperContent = styled.div`
  width: 100%;
  display: flex;
  padding: 0px 24px 0 24px;
  justify-content: space-between;
  background-color: white;
`


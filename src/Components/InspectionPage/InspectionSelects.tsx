import React, {useEffect, useState} from 'react';
import ArrowDownIcon from "@/Components/common/icons/AssetsPageIcons/ArrowDownIcon";
import styled from "styled-components";
import {useHover} from "@/Components/utils/hooks/UseHover";
import {setFilters} from "@/store/actions/inspection";
import {useDispatch} from "react-redux";

const InspectionSelects = () => {
    const [select1, setSelect1] = useState<string>('Springfield Storm')
    const [select2, setSelect2] = useState<string>('Mainlines')
    const [select3, setSelect3] = useState<string>('NASSCO v6 Springfield')

    const [hoverRef, isHovered] = useHover<HTMLDivElement>();
    const [hoverRef2, isHovered2] = useHover<HTMLDivElement>();
    const [hoverRef3, isHovered3] = useHover<HTMLDivElement>();

    const [hover_1, setHover_1] = useState(false)
    const [hover_2, setHover_2] = useState(false)
    const [hover_3, setHover_3] = useState(false)




    const HandleMouseEnter_1 = () => {
        setHover_1(true)
    }

    const HandleMouseLeave_1 = () => {
        setHover_1(false)
    }

    const HandleMouseEnter_2 = () => {
        setHover_2(true)
    }

    const HandleMouseLeave_2 = () => {
        setHover_2(false)
    }

    const HandleMouseEnter_3 = () => {
        setHover_3(true)
    }

    const HandleMouseLeave_3 = () => {
        setHover_3(false)
    }


    return (
        <Wrapper>
            <Select1 onMouseEnter={HandleMouseEnter_1} onMouseLeave={HandleMouseLeave_1}>
                <SelectItem>{select1}</SelectItem>
                <IconWrapp>
                    <ArrowDownIcon/>
                </IconWrapp>
                {
                    hover_1 &&
                        <HoverItemWrapper >
                            <HoverItem onClick={() => setSelect1('All systems')} isActive={select1 === 'All systems'}>
                                All systems
                            </HoverItem>
                            <HoverItem onClick={() => setSelect1('Springfield Storm')} isActive={select1 === 'Springfield Storm'}>
                                Springfield Storm
                            </HoverItem>
                            <HoverItem onClick={() => setSelect1('Springfield Sanitary')} isActive={select1 === 'Springfield Sanitary'}>
                                Springfield Sanitary
                            </HoverItem>
                        </HoverItemWrapper>
                }
            </Select1 >

            <Slash>
                /
            </Slash>
            <Select2 onMouseEnter={HandleMouseEnter_2} onMouseLeave={HandleMouseLeave_2}>
                <SelectItem>{select2}</SelectItem>
                <IconWrapp>
                    <ArrowDownIcon/>
                </IconWrapp>
                {
                    hover_2 &&
                        <HoverItemWrapper2 >
                            <HoverItem onClick={() => setSelect2('All assets types')} isActive={select2 === 'All assets types'}>
                                All assets types
                            </HoverItem>
                            <HoverItem onClick={() => setSelect2('Mainlines')} isActive={select2 === 'Mainlines'}>
                                Mainlines
                            </HoverItem>
                        </HoverItemWrapper2>

                }
            </Select2>

            <Slash>
                /
            </Slash>
            <Select3 onMouseEnter={HandleMouseEnter_3} onMouseLeave={HandleMouseLeave_3}>
                <SelectItem>{select3}</SelectItem>
                <IconWrapp>
                    <ArrowDownIcon/>
                </IconWrapp>
                {
                    hover_3 &&
                        <HoverItemWrapper3 >
                            <HoverItem onClick={() => setSelect3('All templates')} isActive={select3 === 'All templates'}>
                                All templates
                            </HoverItem>
                            <HoverItem onClick={() => setSelect3('NASSCO v6 Springfield')} isActive={select3 === 'NASSCO v6 Springfield'}>
                                NASSCO v6 Springfield
                            </HoverItem>
                        </HoverItemWrapper3>

                }
            </Select3>
        </Wrapper>
    );
};

export default InspectionSelects;

const Wrapper = styled.div`
    display: flex;
  align-items: flex-start;
  position: relative;
  padding: 16px 24px 0px 24px;
  background-color: white;
`

const HoverItem = styled.div<{isActive:boolean}>`
  padding: 7px 12px;
  font-size: 14px;
  white-space: nowrap;
  background-color: ${props => props.isActive ? '#e6f7ff' : '#fff'};
  color: ${props => props.isActive ? '#0070f3' : '#000'};
  &:hover {
    background-color: whitesmoke;
  }
`
const HoverItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  top: 40px;
  left: 15px;
  font-size: 14px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
&::before{
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 18px 9px 0;
  border-color: transparent #fff transparent transparent;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  position: absolute;
  top: -10px;
  left: 62px;
  transform: rotate(-27deg);
},
`

const HoverItemWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  font-size: 14px;
  top: 24px;
  left: -21px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
&::before{
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 18px 9px 0;
  border-color: transparent #fff transparent transparent;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  position: absolute;
  top: -10px;
  left: 52px;
  transform: rotate(-27deg);
},
`

const HoverItemWrapper3 = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: white;
  font-size: 14px;
  top: 24px;
  left: -5px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
&::before{
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 18px 9px 0;
  border-color: transparent #fff transparent transparent;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
  position: absolute;
  top: -10px;
  left: 75px;
  transform: rotate(-27deg);
},
`

const Select1 = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
padding-bottom: 25px; 

`

const Select2 = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-bottom: 25px;
  position: relative;
`

const Select3 = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-bottom: 25px;
  position: relative;


`

const Slash = styled.div`
  padding: 0 5px;
`

const IconWrapp = styled.div`
    padding: 0 5px;
`

const SelectItem = styled.div`
  font-size: 14px;
  display: flex;
  align-items: flex-start;
`
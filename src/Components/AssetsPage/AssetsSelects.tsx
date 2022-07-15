import React, {useState} from 'react';
import ArrowDownIcon from "@/Components/common/icons/AssetsPageIcons/ArrowDownIcon";
import styled from "styled-components";
import {useHover} from "@/Components/utils/hooks/UseHover";

const AssetsSelects = () => {
    const [select1, setSelect1] = useState<string>('Springfield Storm')
    const [select2, setSelect2] = useState<string>('Mainlines')

    return (
        <Wrapper>
            <Select1>
                <SelectItem>{select1}</SelectItem>
                <IconWrapp>
                    <ArrowDownIcon/>
                </IconWrapp>

                <HoverItemWrapper>
                    <HoverItem onClick={() => setSelect1('All systems')}>
                        All systems
                    </HoverItem>
                    <HoverItem onClick={() => setSelect1('Springfield Storm')}>
                        Springfield Storm
                    </HoverItem>
                    <HoverItem onClick={() => setSelect1('Springfield Sanitary')}>
                        Springfield Sanitary
                    </HoverItem>
                </HoverItemWrapper>

            </Select1>
            <Slash>
                /
            </Slash>
            <Select2>
                <SelectItem>{select2}</SelectItem>
                <IconWrapp>
                    <ArrowDownIcon/>
                </IconWrapp>

                <HoverItemWrapper2>
                    <HoverItem onClick={() => setSelect2('All assets types')}>
                        All assets types
                    </HoverItem>
                    <HoverItem onClick={() => setSelect2('Mainlines')}>
                        Mainlines
                    </HoverItem>
                </HoverItemWrapper2>

            </Select2>
        </Wrapper>
    );
};

export default AssetsSelects;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  padding: 16px 24px 0px 24px;
  background-color: white;
`

const HoverItem = styled.div`
  padding: 7px 12px;
  font-size: 16px;

  &:hover {
    background-color: whitesmoke;
  }
`


const Select1 = styled.div`
  display: flex;
  align-items: flex-start;
  cursor: pointer;

`

const Select2 = styled.div`
  display: flex;
  align-items: flex-start;
  cursor: pointer;

`

const HoverItemWrapper = styled.div`
  flex-direction: column;
  position: absolute;
  background-color: white;
  top: 50px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
  display: none;
  &::before {
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
    top: -20px;
    left: 62px;
    transform: rotate(-27deg);
  }

  ${Select1}:hover & {
  display: flex;
  }

,
`

const HoverItemWrapper2 = styled.div`
  display: none;
  flex-direction: column;
  position: absolute;
  background-color: white;
  top: 50px;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);

  &::before {
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
  }

  ${Select2}:hover & {
    display: flex;
  }
,
`


const Slash = styled.div`
  padding: 0 5px;
`

const IconWrapp = styled.div`
  padding: 0 5px;
`

const SelectItem = styled.div`
  font-size: 16px;
  display: flex;
  align-items: flex-start;
  height: 42px;
`
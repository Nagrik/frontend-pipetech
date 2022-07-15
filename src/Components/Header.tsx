import React, {FC, useState} from 'react';

import styled from "styled-components";
import LogoWhite from "@/Components/common/icons/LogoWhite";
import UploadIcon from "@/Components/common/icons/UploadIcon";
import SettingsIcon from "@/Components/common/icons/SettingsIcon";
import DashboardIcon from "@/Components/common/icons/DashboardIcon";
import AssetsIcon from "@/Components/common/icons/AssetsIcon";
import InspectionIcon from "@/Components/common/icons/InspectionIcon";
import ProjectsIcon from "@/Components/common/icons/ProjectsIcon";
import DeliverablesIcon from "@/Components/common/icons/DeliverablesIcon";
import {useHover} from "@/Components/utils/hooks/UseHover";
import OrganizationIcon from "@/Components/common/icons/SettingsIcons/OrganizationIcon";
import SystemsIcon from "@/Components/common/icons/SettingsIcons/SystemsIcon";
import TemplatesIcon from "@/Components/common/icons/SettingsIcons/TemplatesIcon";
import UsersIcon from "@/Components/common/icons/SettingsIcons/UsersIcon";
import EquipmentIcon from "@/Components/common/icons/SettingsIcons/EquipmentIcon";
import Integrations from "@/Components/common/icons/SettingsIcons/integrations";
import LogoutIcon from "@/Components/common/icons/ProfileIcons/LogoutIcon";
import {useHistory} from "react-router-dom";
import './header.css'
import SearchIcon from "@/Components/common/icons/SearchIcon";


const Header = () => {


    const history = useHistory();


    return (
        <Wrapper>
            <LeftSideMenu>
                <LogoWrapper onClick={() => history.push('/dashboard')}>
                    <LogoWhite height={'40'} width={'148'}/>
                </LogoWrapper>
                <MenuItem
                    active={window.location.pathname === '/dashboard'}
                    onClick={() => history.push('/dashboard')}>
                    <IconWrapper>
                        <DashboardIcon/>
                    </IconWrapper>
                    Dashboard
                </MenuItem>
                <MenuItem
                    active={window.location.pathname === '/assets'}
                    onClick={() => history.push('/assets')}
                >
                    <IconWrapper>
                        <AssetsIcon/>
                    </IconWrapper>
                    Assets
                </MenuItem>
                <MenuItem
                    active={window.location.pathname === '/inspections'}
                    onClick={() => history.push('/inspections')}
                >
                    <IconWrapper>
                        <InspectionIcon/>
                    </IconWrapper>
                    Inspections
                </MenuItem>
                <MenuItem
                    active={window.location.pathname === '/projects-card' || window.location.pathname === '/projects-list' || window.location.pathname === '/projects-calendar'}
                    onClick={() => history.push('/projects-card')}
                >
                    <IconWrapper>
                        <ProjectsIcon/>
                    </IconWrapper>
                    Projects
                </MenuItem>
                <MenuItem
                    active={window.location.pathname === '/deliverables'}
                    onClick={() => history.push('/deliverables')}
                >
                    <IconWrapper>
                        <DeliverablesIcon/>
                    </IconWrapper>
                    Deliverables
                </MenuItem>
            </LeftSideMenu>
            <RightSideMenu>
                <InputWrapper>
                    <Input placeholder='Search'/>
                    <IconWrapper>
                        <SearchIcon color='#ccc'/>
                    </IconWrapper>
                </InputWrapper>
                <UploadIconWrapper>
                    <UploadIcon/>
                </UploadIconWrapper>
                <Setting>
                    <div className='SettingsIconWrapper'>
                        <SettingsIcon color='#fff' width={21} height={21}/>
                        <div className='SettingsMenu'>
                            <SettingsMenuItem onClick={() => history.push('/settings-organization')}>
                                <IconWrapper>
                                    <OrganizationIcon/>
                                </IconWrapper>
                                Organization
                            </SettingsMenuItem>
                            <SettingsMenuItem onClick={() => history.push('/settings-systems')}>
                                <IconWrapper>
                                    <SystemsIcon/>
                                </IconWrapper>
                                Systems
                            </SettingsMenuItem>
                            <SettingsMenuItem onClick={() => history.push('/settings-templates')}>
                                <IconWrapper>
                                    <TemplatesIcon/>
                                </IconWrapper>
                                Templates
                            </SettingsMenuItem>
                            <SettingsMenuItem onClick={() => history.push('/settings-users')}>
                                <IconWrapper>
                                    <UsersIcon/>
                                </IconWrapper>
                                Users
                            </SettingsMenuItem>
                            <SettingsMenuItem onClick={() => history.push('/settings-equipment')}>
                                <IconWrapper>
                                    <EquipmentIcon/>
                                </IconWrapper>
                                Equipment
                            </SettingsMenuItem>
                            <SettingsMenuItem onClick={() => history.push('/settings-integrations')}>
                                <IconWrapper>
                                    <Integrations/>
                                </IconWrapper>
                                Integrations
                            </SettingsMenuItem>
                        </div>
                    </div>
                </Setting>
                <div className="CircleWrapper">
                    <Circle>
                        <CircleWrapper>
                            RN
                            <div className='ProfileMenu'>
                                <ProfileMenuItem onClick={() => history.push('/profile')}>
                                    <IconWrapper>
                                        <ProjectsIcon/>
                                    </IconWrapper>
                                    My Profile
                                </ProfileMenuItem>
                                <ProfileMenuItem>
                                    <IconWrapper>
                                        <LogoutIcon/>
                                    </IconWrapper>
                                    Logout
                                </ProfileMenuItem>
                            </div>
                        </CircleWrapper>
                    </Circle>
                </div>
            </RightSideMenu>
        </Wrapper>
    );
};

export default Header;


const MenuItem = styled.div<{ active: boolean }>`
  color: ${({active}) => (active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.65)')};
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  padding: 21px 18px;
  opacity: 0.8;
  display: flex;
  align-items: center;

  &:hover {
    color: rgba(255, 255, 255, 1)
  }
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid rgb(217, 217, 217);
`

const Circle = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`

const ProfileMenu = styled.div`
  right: -6px;
  top: 50px;
  position: absolute;
  z-index: 2;
  background-color: #1C5180;
`

const ProfileMenuItem = styled.div`
  padding: 20px 50px 20px 10px;
  color: rgba(255, 255, 255, 0.65);
  display: flex;
  align-items: center;
  white-space: nowrap;

  &:hover {
    background-color: #276FB2;
  }
`

const SettingsMenu = styled.div`
  background-color: #1C5180;
  z-index: 2;


  position: absolute;
  right: 41px;
  top: 65px;
  width: 200px;
  //cursor: pointer;
  //position: absolute;
  //right: 70px;
  //top: 21px;
  //width: 55px;
  //display: flex;
  //justify-content: center;

`

const SettingsMenuItem = styled.div`
  padding: 20px 50px 20px 10px;
  color: rgba(255, 255, 255, 0.65);
  display: flex;
  font-size: 14px;
  align-items: center;

  &:hover {
    background-color: #276FB2;
  }
`


const IconWrapper = styled.div`
  padding: 0 10px;
  margin-top: 3px;
`

const LogoWrapper = styled.div`
  cursor: pointer;
  margin-top: 3px;
  margin-left: 5px;
`

const SettingsIconWrapper = styled.div`
  cursor: pointer;
  padding: 0 20px 0 10px;
`

const Setting = styled.div`

`

const UploadIconWrapper = styled.div`
  padding: 0 15px 0 20px;
  cursor: pointer;
  position: relative;
`

const CircleWrapper = styled.div`
  width: 32px;
  height: 32px;
  padding: 0 10px;
  background: #ccc;
  border-radius: 50%;
  color: #ffffff;
  border: 2px solid rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
`

const RightSideMenu = styled.div`
  display: flex;
  align-items: center;
  padding-right: 30px;
`

const Input = styled.input`
  //padding: 3px 50px 3px 10px;
  padding: 6px 11px;
  background: rgb(255, 255, 255);
  max-width: 180px;

  outline: 0px;
  color: rgb(140, 140, 140);

  &::placeholder {
    color: rgb(140, 140, 140);
    font-size: 14px;
  }
`

const LeftSideMenu = styled.div`
  display: flex;
  align-items: center;
`

const Wrapper = styled.div`
  background-color: #276FB2;
  overflow: hidden;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
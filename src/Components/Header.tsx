import React, {FC} from 'react';

import styled from "styled-components";
import LogoWhite from "@/Components/assets/icons/LogoWhite";
import UploadIcon from "@/Components/assets/icons/UploadIcon";
import SettingsIcon from "@/Components/assets/icons/SettingsIcon";
import DashboardIcon from "@/Components/assets/icons/DashboardIcon";
import AssetsIcon from "@/Components/assets/icons/AssetsIcon";
import InspectionIcon from "@/Components/assets/icons/InspectionIcon";
import ProjectsIcon from "@/Components/assets/icons/ProjectsIcon";
import DeliverablesIcon from "@/Components/assets/icons/DeliverablesIcon";
import {useHover} from "@/Components/utils/hooks/UseHover";
import OrganizationIcon from "@/Components/assets/icons/SettingsIcons/OrganizationIcon";
import SystemsIcon from "@/Components/assets/icons/SettingsIcons/SystemsIcon";
import TemplatesIcon from "@/Components/assets/icons/SettingsIcons/TemplatesIcon";
import UsersIcon from "@/Components/assets/icons/SettingsIcons/UsersIcon";
import EquipmentIcon from "@/Components/assets/icons/SettingsIcons/EquipmentIcon";
import Integrations from "@/Components/assets/icons/SettingsIcons/integrations";
import LogoutIcon from "@/Components/assets/icons/ProfileIcons/LogoutIcon";


const Header = () => {
    const [hoverRef, isHovered] = useHover<HTMLDivElement>();
    const [hoverRefProfile, isHoveredProfile] = useHover<HTMLDivElement>();
    console.log(isHoveredProfile)
    return (
        <Wrapper>
            <LeftSideMenu>
                <LogoWrapper>
                    <LogoWhite height={'40'} width={'148'}/>
                </LogoWrapper>
                <MenuItem active={window.location.pathname === '/dashboard'}>
                    <IconWrapper>
                        <DashboardIcon/>
                    </IconWrapper>
                    Dashboard
                </MenuItem>
                <MenuItem active={window.location.pathname === '/assets'}>
                    <IconWrapper>
                        <AssetsIcon/>
                    </IconWrapper>
                    Assets
                </MenuItem>
                <MenuItem active={window.location.pathname === '/inspections'}>
                    <IconWrapper>
                        <InspectionIcon/>
                    </IconWrapper>
                    Inspections
                </MenuItem>
                <MenuItem active={window.location.pathname === '/projects'}>
                    <IconWrapper>
                        <ProjectsIcon/>
                    </IconWrapper>
                    Projects
                </MenuItem>
                <MenuItem active={window.location.pathname === '/deliverables'}>
                    <IconWrapper>
                        <DeliverablesIcon/>
                    </IconWrapper>
                    Deliverables
                </MenuItem>
            </LeftSideMenu>
            <RightSideMenu>
                <Input placeholder='Search'/>
                <UploadIconWrapper>
                    <UploadIcon/>
                </UploadIconWrapper>
                <SettingsIconWrapper ref={hoverRef}>
                    <SettingsIcon/>
                    {
                        isHovered && (
                            <SettingsMenu>
                                <SettingsMenuItem>
                                    <IconWrapper>
                                        <OrganizationIcon/>
                                    </IconWrapper>
                                    Organization
                                </SettingsMenuItem>
                                <SettingsMenuItem>
                                    <IconWrapper>
                                        <SystemsIcon/>
                                    </IconWrapper>
                                    System
                                </SettingsMenuItem>
                                <SettingsMenuItem>
                                    <IconWrapper>
                                        <TemplatesIcon/>
                                    </IconWrapper>
                                    Templates
                                </SettingsMenuItem>
                                <SettingsMenuItem>
                                    <IconWrapper>
                                        <UsersIcon/>
                                    </IconWrapper>
                                    Users
                                </SettingsMenuItem>
                                <SettingsMenuItem>
                                    <IconWrapper>
                                        <EquipmentIcon/>
                                    </IconWrapper>
                                    Equipment
                                </SettingsMenuItem>
                                <SettingsMenuItem>
                                    <IconWrapper>
                                        <Integrations/>
                                    </IconWrapper>
                                    Integrations
                                </SettingsMenuItem>
                            </SettingsMenu>
                        )
                    }
                </SettingsIconWrapper>
                <Circle ref={hoverRefProfile} >
                <CircleWrapper >
                    RN
                    {
                        isHoveredProfile && (
                            <ProfileMenu>
                                <ProfileMenuItem>
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
                            </ProfileMenu>
                        )
                    }
                </CircleWrapper>
                </Circle>

            </RightSideMenu>
        </Wrapper>
    );
};

export default Header;



const MenuItem = styled.div<{active:boolean}>`
  color: rgba(255, 255, 255, 0.65);
  color:  ${({ active }) => (active ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.65)')};
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  padding: 23px 18px;
  opacity: 0.8;
  display: flex;
  align-items: center;
  &:hover {
    color: rgba(255, 255, 255, 1)
  }
`

const Circle = styled.div`
  display: flex;
  height: 60px;
  width: 47px;
  position: absolute;
  right: 20px;
  justify-content: center;
  top: 16px;
`

const ProfileMenu = styled.div`
  right: -6px;
  top: 50px;
  position: absolute;
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
  left: -130px;
  top: 45px;
  position: absolute;
  background-color: #1C5180;
`

const SettingsMenuItem = styled.div`
  padding: 20px 50px 20px 10px;
  color: rgba(255, 255, 255, 0.65);
  display: flex;
  align-items: center;
  &:hover {
    background-color: #276FB2;
  }
`



const IconWrapper = styled.div`
  padding: 0 7px;
`

const LogoWrapper = styled.div`
  cursor: pointer;
`

const SettingsIconWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  height: 50px;
  right: 70px;
  top: 21px;
  width: 55px;
  display: flex;
  justify-content: center;
`

const UploadIconWrapper = styled.div`
  padding: 0 65px 0 15px;
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
`

const RightSideMenu = styled.div`
  display: flex;
  align-items: center;
  padding-right: 50px;
`

const Input = styled.input`
  padding: 3px 50px 3px 10px;
  background: rgb(255, 255, 255);
  border-radius: 4px;
  outline: 0px;
  border: 1px solid rgb(217, 217, 217);
  color: rgb(140, 140, 140);
  &::placeholder{
    color: rgb(140, 140, 140);
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
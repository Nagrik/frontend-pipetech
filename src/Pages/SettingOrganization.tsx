import React, {useEffect} from 'react';
import Header from "@/Components/Header";
import styled from "styled-components";
import OrganizationIcon from "@/Components/common/icons/SettingsIcons/OrganizationIcon";
import {useHistory} from "react-router-dom";
import SystemsIcon from "@/Components/common/icons/SettingsIcons/SystemsIcon";
import TemplatesIcon from "@/Components/common/icons/SettingsIcons/TemplatesIcon";
import UsersIcon from "@/Components/common/icons/SettingsIcons/UsersIcon";
import EquipmentIcon from "@/Components/common/icons/SettingsIcons/EquipmentIcon";
import IntegrationIcon from "@/Components/common/icons/IntegrationIcon";
import SettingsPageUsers from "@/Components/SettingsPage/SettingsPageUsers";
import Footer from "@/Components/Dashboard/Footer";
import {useDispatch, useSelector} from "react-redux";
import {getOrganizationInfo} from "@/store/actions/organization";
import {selectOrganizationInfo} from "@/store/selectors/organization";
import SettingsOrganizationPage from "@/Components/SettingsPage/SettingsOrganizationPage";

const SettingsOrganization = () => {
    const history = useHistory();

    return (
        <div>
            <Header/>
            <Wrapper>
                <LeftMenu>

                    <MenuItem
                        active={window.location.pathname === '/settings-organization'}
                        onClick={() => history.push('/settings-organization')}
                    >
                        <IconWrapper>
                            <OrganizationIcon/>
                        </IconWrapper>
                        Organization
                    </MenuItem>

                    <MenuItem
                        active={window.location.pathname === '/settings-systems'}
                        onClick={() => history.push('/settings-systems')}>
                        <IconWrapper>
                            <SystemsIcon/>
                        </IconWrapper>
                        Systems
                    </MenuItem>
                    <MenuItem
                        active={window.location.pathname === '/settings-templates'}
                        onClick={() => history.push('/settings-templates')}>
                        <IconWrapper>
                            <TemplatesIcon/>
                        </IconWrapper>
                        Templates
                    </MenuItem>
                    <MenuItem
                        active={window.location.pathname === '/settings-users'}
                        onClick={() => history.push('/settings-users')}>
                        <IconWrapper>
                            <UsersIcon/>
                        </IconWrapper>
                        Users
                    </MenuItem>
                    <MenuItem
                        active={window.location.pathname === '/settings-equipment'}
                        onClick={() => history.push('/settings-equipment')}>
                        <IconWrapper>
                            <EquipmentIcon/>
                        </IconWrapper>
                        Equipment
                    </MenuItem>
                    <MenuItem
                        active={window.location.pathname === '/settings-integrations'}
                        onClick={() => history.push('/settings-integrations')}>
                        <IconWrapper>
                            <IntegrationIcon/>
                        </IconWrapper>
                        Integrations
                    </MenuItem>
                </LeftMenu>
                <RightSide>
                {
                    window.location.pathname === '/settings-users' && (
                        <SettingsPageUsers />
                    )
                }
                {
                    window.location.pathname === '/settings-organization' && (
                        <SettingsOrganizationPage />
                    )
                }
                </RightSide>
            </Wrapper>
            <Footer/>

        </div>
    );
};

export default SettingsOrganization;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 200px);
`

const Wrapper = styled.div`
  display: flex;
`

const MenuItem = styled.div<{active:boolean}>`
  display: flex;
  padding: 10px 5px;
  cursor: pointer;
  color: ${({active}) => active ? '#1890ff' : '#000' } ;
  background-color:${({active}) => active ? '#e6f7ff' : "#fff"} ;
  margin-bottom: 10px;
`

const IconWrapper = styled.div`
  padding: 0 10px;
`

const LeftMenu = styled.div`
  width: 200px ;
  padding-top: 10px;
  z-index: 2;
  height: 100vh;
  border-right: 1px solid #ccc;
  background-color: white;

`
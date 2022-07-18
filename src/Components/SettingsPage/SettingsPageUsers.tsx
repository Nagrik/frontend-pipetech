import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import SettingsPageUsersTable from "@/Components/SettingsPage/SettingPageUsersTable";
import Footer from "@/Components/Dashboard/Footer";
import AddUserModal from "@/Components/SettingsPage/AddUserModal";
import {useDispatch, useSelector} from "react-redux";
import {selectOrganizationInfo} from "@/store/selectors/organization";
import {getOrganizationInfo} from "@/store/actions/organization";
import Popup from "@/Components/utils/Popup";
import {selectIsInvalidData, selectIsInvalidDataMessage, selectIsValidData} from "@/store/selectors/auth";
import {invalidDataClear} from "@/store/actions/login";

const SettingsPageUsers = () => {
    const [modal, setModal] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>();
    const organizationInfo = useSelector(selectOrganizationInfo);

    const [popup, setPopup] = useState(false);


    const isInvalidData = useSelector(selectIsInvalidData)
    const isValidData = useSelector(selectIsValidData)
    const isInvalidDataMessage = useSelector(selectIsInvalidDataMessage)

    useEffect(() => {
        if (isInvalidData) setPopup(true);
        if (isValidData) setPopup(true);
    }, [isInvalidData, isValidData]);

    useEffect(() => {
        let timer: any;

        if (popup) {
            timer = setTimeout(() => {
                setPopup(false);
                dispatch(invalidDataClear());
            }, 3000);
        }

        return () => clearTimeout(timer);
    }, [popup]);

    useEffect(() => {
        dispatch(getOrganizationInfo())
    }, [])
    return (
        <>
        <Wrapper>
            {
              isInvalidData && <Popup text={isInvalidDataMessage!} status={'error'}/>
            }
            {
                isValidData && <Popup text={'User was created'} status={'success'}/>
            }
            <HeaderUser>
                <HeaderTitle>
                    Users
                </HeaderTitle>
                <HeaderButton onClick={() => {
                    setTimeout(() => {
                        setModal(true)
                    }, 0.1)
                }}>
                    Add User
                </HeaderButton>
            </HeaderUser>
            <SettingsPageUsersTable organizationInfo={organizationInfo}/>
            {
                modal && <AddUserModal setModal={setModal} organizationInfo={organizationInfo}/>
            }
        </Wrapper>
        </>
);
};

export default SettingsPageUsers;

const Wrapper = styled.div`
`

const HeaderButton = styled.div`
  color: #fff;
  background-color: #1890ff;
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
  padding: 9px 15px;
  border-radius: 2px;
  cursor: pointer;
`

const HeaderTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`

const HeaderUser = styled.div`
    display: flex;
    align-items: center;
  padding: 24px 24px;
  background-color: #fff;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
`
import React, {useEffect, useState} from 'react';
import Auth from "@/Components/Auth";
import LoginFooter from "@/Components/common/icons/LoginFooter";
import styled from "styled-components";
import Popup from "@/Components/utils/Popup";
import {useDispatch, useSelector} from "react-redux";
import {selectIsInvalidData, selectIsInvalidDataMessage} from "@/store/selectors/auth";
import {invalidDataClear} from "@/store/actions/login";
const LoginPage = () => {
    const [popup, setPopup] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const isInvalidData = useSelector(selectIsInvalidData)
    const isInvalidDataMessage = useSelector(selectIsInvalidDataMessage)


    useEffect(() => {
        if (isInvalidData) setPopup(true);
    }, [isInvalidData]);

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
    return (
        <>
            {
               isInvalidData && <Popup text={isInvalidDataMessage!} status={'error'}/>
            }
            <Wrapper>
                <Auth/>
                <LoginFooter/>
            </Wrapper>
        </>

    );
};

export default LoginPage;


const Wrapper = styled.div`
  background-color: rgb(64, 169, 255);
`
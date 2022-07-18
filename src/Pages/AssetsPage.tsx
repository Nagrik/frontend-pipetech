import React, {useEffect} from 'react';
import Table from "@/Components/AssetsPage/Table";
import Header from "@/Components/Header";
import AssetsSelects from "@/Components/AssetsPage/AssetsSelects";
import {useDispatch, useSelector} from "react-redux";
import {getOrganizationAssets, getUserInfo} from "@/store/actions/organization";
import {selectUserResponse} from "@/store/selectors/auth";

const AssetsPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getOrganizationAssets('1', '1', '50'))
    }, [])

    return (
        <div>
            <Header/>
            <AssetsSelects/>
            <Table/>
        </div>
    );
};

export default AssetsPage;
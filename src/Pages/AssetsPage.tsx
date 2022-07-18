import React, {useEffect} from 'react';
import Table from "@/Components/AssetsPage/Table";
import Header from "@/Components/Header";
import AssetsSelects from "@/Components/AssetsPage/AssetsSelects";
import {useDispatch} from "react-redux";
import {getOrganizationAssets} from "@/store/actions/organization";

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
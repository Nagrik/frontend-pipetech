import React from 'react';
import Table from "@/Components/AssetsPage/Table";
import Header from "@/Components/Header";
import AssetsSelects from "@/Components/AssetsPage/AssetsSelects";

const AssetsPage = () => {
    return (
        <div>
            <Header/>
            <AssetsSelects/>
            <Table/>
        </div>
    );
};

export default AssetsPage;
import React from 'react';
import Header from "@/Components/Header";
import InspectionSelects from "@/Components/InspectionPage/InspectionSelects";
import Table from "@/Components/AssetsPage/Table";
import TableInspection from "@/Components/InspectionPage/TableInspection";

const InspectionPage = () => {
    return (
        <div>
            <Header/>
            <InspectionSelects/>
            <TableInspection/>
        </div>
    );
};

export default InspectionPage;
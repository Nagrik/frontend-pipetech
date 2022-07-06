import React from 'react';
import { Row, Col, Layout } from "antd";
import { blue } from "@ant-design/colors";
import Auth from "@/Components/Auth";
import {Logo} from "@/Components/Logo";
import LoginFooter from "@/Components/common/icons/LoginFooter";
const LoginPage = () => {
    return (
        <>
            <Row
                justify="center"
                align="middle"
                style={{
                    minHeight: "100vh",
                    position: "relative",
                    zIndex: 100,
                    backgroundColor: blue[4],
                }}
            >
                <Col>
                    <Auth/>
                </Col>
                <LoginFooter/>
            </Row>
        </>

    );
};

export default LoginPage;
import Header from '@/Components/Header';
import React, {useState} from 'react';
import styled from "styled-components";
import DeliverableTable from "@/Components/DeliverablePage/DeliverableTable";

const DeliverablesPage = () => {
    const [modal, setModal] = useState<boolean>(false)
    return (
        <div>
            <Header/>
            <TitleWrapperContent>

                <Title>Deliverables</Title>
                <Button onClick={() => {
                    setTimeout(() => {
                        setModal(!modal)

                    }, 0.1)
                }}>
                        <span
                            style={{fontSize: '20px', paddingBottom: '3px', paddingRight: '10px'}}>+</span> {' '} Create Deliverables
                </Button>
            </TitleWrapperContent>
            <DeliverableTable/>
        </div>
    );
};

export default DeliverablesPage;

const Button = styled.div`
  background-color: #1890ff;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 27px;
  margin-right: 20px;
  cursor: pointer;
  height: 33px;
`

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  padding: 0 24px 0px 24px;
`

const TitleWrapperContent = styled.div`
  padding: 24px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  //background-color: white;
`
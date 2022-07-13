import React, {useState} from 'react';
import styled from "styled-components";
import useOnClickOutside from "@/Components/utils/hooks/useOnClickOutside";

const CreateDeliverableModal = ({setModal, modal}: any) => {

    const modalRef = useOnClickOutside(() => {
        setModal(false);
    });

    return (
        <>
            <ContainerModal>
                <ModalWrapp ref={modalRef}>
                    <ModalHeader>
                        <ModalTitle>
                            Create Project
                        </ModalTitle>
                        <ModalClose onClick={() => setModal(false)}>
                            ☓
                        </ModalClose>
                    </ModalHeader>
                    <ModalBody>
                        <ModalBodyContent>
                            <ModalRow>
                                <ModalRowTitle>
                                    Name: &nbsp;
                                </ModalRowTitle>
                                <ModalInput>
                                    <Input type='text' placeholder='Deliverable name'/>
                                </ModalInput>
                            </ModalRow>
                            <Subtitle>Inspections are pre-selected, please proceed to the next step.</Subtitle>
                        </ModalBodyContent>
                        <Buttons>
                            <ButtonSave onClick={() => setModal(false)}>
                                Cancel
                            </ButtonSave>
                            <ButtonCreate disabled>
                               Next
                            </ButtonCreate>
                        </Buttons>
                    </ModalBody>
                </ModalWrapp>
            </ContainerModal>
        </>
    );
};

export default CreateDeliverableModal;

const ArctiveModalColumnTitle = styled.div<{ active: boolean }>`
  font-size: 16px;
  padding: 10px 15px;
  cursor: pointer;
  color: black;
  background-color: ${({active}) => active ? 'rgba(125,194,251,0.74)' : '#fff'};

  &:hover {
    background-color: ${({active}) => active ? 'rgba(125,194,251,0.74)' : '#f5f5f5'};
  }
`

const Subtitle = styled.div`
    font-size: 14px;
  font-weight: 400;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px 10px 16px;
  border-top: 1px solid #e6e6e6;
`


const ButtonSave = styled.div`
  padding: 7px 22px;
  border: 1px solid #ccc;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    border: 1px solid #00a8ff;
    color: #00a8ff;
  }
`

const ButtonCreate = styled.button`
  padding: 7px 22px;
  border: 1px solid #ccc;
  outline: none;
  cursor: pointer;
  color: #fff;
  background-color: #1890ff;
`

const ModalWrapp = styled.div`
  background-color: #fff;
  width: 640px;
  padding: 8px 0 0 0;
  position: relative;
`

const ContainerModal = styled.div`
  min-height: 100%;
  min-width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ActiveModalColumn = styled.div`
  height: 100%;
  border-right: 1px solid #ccc;
`

const ActiveModalWrapper = styled.div`
  height: 150px;
  background-color: white;
  border: 1px solid #e6e6e6;
  position: absolute;
  top: 234px;
  left: 100px;
  display: flex;
`

const ModalTabs = styled.div<{ active: boolean }>`
  border: ${({active}) => active ? '1px solid #1890ff' : '1px solid #ccc'};
  width: 500px;
  height: 33px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px 11px;
  color: ${({active}) => active ? '#ccc' : 'black'};

  &:focus {
    border: 1px solid #1890ff;
  }

  &:hover {
    border: 1px solid #1890ff;
  }
`


const ModalTabTitle = styled.div`
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
`

const InputsWrapp = styled.div`
  display: flex;
`

const DateWrapp = styled.div`

`

const InputDate = styled.input`
  padding: 4px 11px;
  border: 1px solid #d9d9d9;
  margin-right: 20px;

  &:focus {
    border: 1px solid #1890ff;
  }

  &:hover {
    border: 1px solid #1890ff;
  }

  &::placeholder {
    font-size: 14px;
  }
`

const Input = styled.input`
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  padding: 4px 11px;
  width: 500px;

  &:focus {
    border: 1px solid #1890ff;
  }

  &:hover {
    border: 1px solid #1890ff;
  }

  &::placeholder {
    font-size: 14px;
  }
`

const ModalInput = styled.div`

`

const ModalRowTitle = styled.div`
  font-weight: 500;
  width: 75px;
  display: flex;
  justify-content: flex-start;
`

const ModalRow = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`

const ModalBody = styled.div`
  padding: 24px 0px 0px 0px;
`

const ModalBodyContent = styled.div`
  padding: 0px 24px 24px 24px;
`

const ModalClose = styled.div`
  font-size: 20px;
  cursor: pointer;
`

const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
`

const ModalHeader = styled.div`
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
`

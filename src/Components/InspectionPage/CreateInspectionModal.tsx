import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import useOnClickOutside from "@/Components/utils/hooks/useOnClickOutside";
import {useDispatch, useSelector} from "react-redux";
import {selectHeaderFilters_1} from "@/store/selectors/inspection";
import {setFilters} from "@/store/actions/inspection";

const CreateInspectionModal = ({setModal, modal}: any) => {
    const [activeModalTab, setActiveModalTab] = useState<boolean>(false)

    const [firstColumn, setFirstColumn] = useState<string >('Springfield Storm1');
    const [secondColumn, setSecondColumn] = useState<string>('Mainline')
    const [thirdColumn, setThirdColumn] = useState<string>('NASSCO v6 Springfield')

    const dispatch = useDispatch<AppDispatch>();


    const filter_1 = useSelector(selectHeaderFilters_1);

    const modalTabsRef = useOnClickOutside(() => {
        setActiveModalTab(false);
    });
    const modalRef = useOnClickOutside(() => {
        setModal(false);
    });

    useEffect(() => {
        dispatch(setFilters(firstColumn, secondColumn, thirdColumn))
    }, [filter_1])



    const chooseTab = (firstColumn: string, secondColumn:string, thirdColumn:string) => {
        setFirstColumn(firstColumn)
        setSecondColumn(secondColumn)
        setThirdColumn(thirdColumn)
        dispatch(setFilters(firstColumn, secondColumn, thirdColumn))
    }

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
                                <ModalTabs ref={modalTabsRef} active={activeModalTab}
                                           onClick={() => setActiveModalTab(true)}>
                                    {firstColumn || 'Springfield Storm1'} / {secondColumn || 'Mainline'} / {thirdColumn || 'NASSCO v6 Springfield'}
                                    {
                                        activeModalTab && (
                                            <ActiveModalWrapper>

                                                <ActiveModalColumn>
                                                    <ArctiveModalColumnTitle
                                                        active={firstColumn === 'Springfield Storm1'}
                                                        onClick={() => chooseTab('Springfield Storm1', secondColumn, thirdColumn)}
                                                    >
                                                        Springfield Storm1
                                                    </ArctiveModalColumnTitle>
                                                    <ArctiveModalColumnTitle
                                                        onClick={() => chooseTab('Springfield Storm2', secondColumn, thirdColumn)}
                                                        active={firstColumn === 'Springfield Storm2'}
                                                    >
                                                        Springfield Storm2
                                                    </ArctiveModalColumnTitle>
                                                    <ArctiveModalColumnTitle
                                                        onClick={() => chooseTab('Springfield Storm3', secondColumn, thirdColumn)}
                                                        active={firstColumn === 'Springfield Storm3'}
                                                    >
                                                        Springfield Storm3
                                                    </ArctiveModalColumnTitle>
                                                </ActiveModalColumn>


                                                <ActiveModalColumn>
                                                    <ArctiveModalColumnTitle
                                                        onClick={() => chooseTab(firstColumn,'Mainline', thirdColumn)}
                                                        active={secondColumn === 'Mainline'}
                                                    >
                                                        Mainline
                                                    </ArctiveModalColumnTitle>
                                                </ActiveModalColumn>
                                                {
                                                    secondColumn !== '' && (
                                                        <ActiveModalColumn>
                                                            <ArctiveModalColumnTitle
                                                                onClick={() => chooseTab(firstColumn,secondColumn,'NASSCO v6 Springfield')}
                                                                active={thirdColumn === 'NASSCO v6 Springfield'}
                                                            >
                                                                NASSCO
                                                            </ArctiveModalColumnTitle>
                                                        </ActiveModalColumn>
                                                    )

                                                }

                                            </ActiveModalWrapper>
                                        )
                                    }
                                </ModalTabs>
                            </ModalRow>
                        </ModalBodyContent>
                        <Buttons>
                            <ButtonSave>
                                Cancel
                            </ButtonSave>
                            <ButtonCreate>
                                Next
                            </ButtonCreate>
                        </Buttons>
                    </ModalBody>
                </ModalWrapp>
            </ContainerModal>
        </>
    );
};

export default CreateInspectionModal;

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

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid #f0f0f0;
  padding-top: 15px;
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

const ButtonCreate = styled.div`
  padding: 7px 22px;
  border: 1px solid #ccc;
  cursor: pointer;
  color: #fff;
    background-color: #1890ff;
`

const ModalWrapp = styled.div`
  background-color: #fff;
  width: 640px;
  padding: 8px 0 16px 0;
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
  top: 118px;
  left: 24px;
  display: flex;
`

const ModalTabs = styled.div<{ active: boolean }>`
  border: ${({active}) => active ? '1px solid #1890ff' : '1px solid #ccc'};
  width: 100%;
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
  padding: 24px 24px 0 24px;
`

const ModalBodyContent = styled.div`

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

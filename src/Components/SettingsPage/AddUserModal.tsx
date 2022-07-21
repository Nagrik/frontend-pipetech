import React, {useState} from 'react';
import styled from "styled-components";
import useOnClickOutside from "@/Components/utils/hooks/useOnClickOutside";
import useInput from "@/Components/utils/hooks/useInput";
import {addUserToOrganization, createUser} from "@/store/actions/login";
import {useDispatch, useSelector} from "react-redux";
import {selectUserResponse} from "@/store/selectors/auth";

const AddUserModal = ({setModal}: any) => {
    const [activeRoles, setActiveRoles] = useState<string[]>([])
    const [selectRolesActive, setSelectRolesActive] = useState<boolean>(false)
    const [email, setEmail] = useInput();
    const [phone, setPhone] = useInput();
    const [lastName, setLastName] = useInput();
    const [firstName, setFirstName] = useInput();

    const dispatch = useDispatch<AppDispatch>()
    const userResponse = useSelector(selectUserResponse);


    const modalRef = useOnClickOutside(() => {
        setModal(false);
    });
    const selectsRef = useOnClickOutside(() => {
        setSelectRolesActive(false);
    });

    const handleSelectRoles = (role:string) => {
        setSelectRolesActive(false)
        //add role to activeRoles
        if(activeRoles.includes(role)){
            setActiveRoles(activeRoles.filter(item => item !== role))
        }
        else{
            setActiveRoles([...activeRoles, role])
        }
    }
    const handleAddUser = () => {
        dispatch(createUser(email, firstName, lastName, phone, activeRoles))
        setModal(false)
        // dispatch(addUserToOrganization(userResponse!.id.toString(), activeRoles))
    }
    return (
        <ContainerModal>
            <ModalWrapp>
                <ModalWrappHeader>
                    <ModalTitle>Add User</ModalTitle>
                    <ModalClose onClick={() => {
                        setModal(false);
                    }}>
                        X
                    </ModalClose>
                </ModalWrappHeader>
                <ModalWrappBody>
                    <ModalBody>
                        <Row>
                            <InputTitle>
                                Email: &nbsp;
                            </InputTitle>
                            <Input onChange={setEmail}/>
                        </Row>
                        <RowSelect>
                            <InputTitle>
                                Roles: &nbsp;
                            </InputTitle>
                            <SelectWrapper  onClick={() => {
                                setTimeout(() => {
                                    setSelectRolesActive(true)
                                }, 0.1)
                            }}>
                                {
                                    activeRoles.length >= 1 ? (
                                        activeRoles.map((item: string, index: number) => {
                                            return (
                                                item !== '' ? (
                                                    <Span key={index}>
                                                        {item}
                                                        <div style={{fontSize: '9px', paddingLeft: '5px'}} onClick={() => handleSelectRoles(item)}>
                                                            X
                                                        </div>
                                                    </Span>
                                                ) : null

                                            )
                                        }
                                    )) : ''
                                }
                            </SelectWrapper>
                            {
                                selectRolesActive && (
                                    <Selects ref={selectsRef}>
                                        <Select onClick={() => handleSelectRoles('OWNER')}>
                                            OWNER
                                        </Select>
                                        <Select onClick={() => handleSelectRoles('MEMBER')}>
                                            MEMBER
                                        </Select>
                                        <Select onClick={() => handleSelectRoles('GUEST')}>
                                            GUEST
                                        </Select>
                                    </Selects>

                                )
                            }
                        </RowSelect>
                        <Row>
                            <InputTitle>
                                First Name: &nbsp;
                            </InputTitle>
                            <Input onChange={setFirstName}/>
                        </Row>
                        <Row>
                            <InputTitle>
                                Last Name: &nbsp;
                            </InputTitle>
                            <Input onChange={setLastName}/>
                        </Row>
                        <Row>
                            <InputTitle>
                                Phone: &nbsp;
                            </InputTitle>
                            <Input onChange={setPhone}/>
                        </Row>
                    </ModalBody>
                </ModalWrappBody>
                <Button onClick={handleAddUser} disabled={!firstName || !lastName || !phone || !email || !activeRoles}>
                    Add New User
                </Button>
            </ModalWrapp>
        </ContainerModal>
    );
};

export default AddUserModal;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const Button = styled.button`
    background-color: #00a8ff;
  color: white;
  font-size: 16px;
  margin: 0px 48px;
  width: 430px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:disabled {
    background-color: #999999;
  }
`

const Span = styled.span`
    background-color: #f5f5f5;
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 5px;
`

const RowSelect = styled(Row)`
  position: relative;
`

const Selects = styled.div`
  position: absolute;
  top: 35px;
  left: 137px;
  width: 275px;
  background-color: white;
  border: 1px solid #ccc;
`

const SelectWrapper = styled.div`
  padding: 0px 5px;
  height: 32px;
  width: 275px;
  min-height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Select = styled.div`
  padding: 10px 10px;
  &:hover {
      background-color: #e6f7ff;
    font-weight: 500;
  }
`

const InputTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
`

const Input = styled.input`
  padding: 6.5px 11px;
  width: 275px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
`

const ModalBody = styled.div`
  padding: 0px 30px;
`

const ModalWrappBody = styled.div`
  padding: 24px;
`

const ModalWrappHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;
`

const ModalTitle = styled.div`

`

const ModalClose = styled.div`
  cursor: pointer;
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

const ModalWrapp = styled.div`
  background-color: #fff;
  width: 520px;
  padding: 8px 0 16px 0;
  position: relative;
`
import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import useOnClickOutside from "@/Components/utils/hooks/useOnClickOutside";
import {useDispatch, useSelector} from "react-redux";
import {selectHeaderFilters_1} from "@/store/selectors/inspection";
import {setFilters} from "@/store/actions/inspection";
import CreateFileIcon from "@/Components/common/icons/CreateFileIcon";
import UploadIcon from "@/Components/common/icons/UploadIcon";
import UploadFileIcon from "@/Components/common/icons/UploadFileIcon";
import AddFileIcon from "@/Components/common/icons/addFileIcon";
import AddFolder from "@/Components/common/icons/addFolder";
import AddFileTable from "@/Components/InspectionPage/AddFileTable";
import ArrowDownIcon from "@/Components/common/icons/AssetsPageIcons/ArrowDownIcon";
import { v4 as uuidv4 } from 'uuid';
import CrossIcon from "@/Components/common/icons/CrossIcon";
import TableInputsInspection from "@/Components/InspectionPage/TableInputsInspection";


const CreateInspectionModal = ({setModal, modal}: any) => {
    const [activeModalTab, setActiveModalTab] = useState<boolean>(false)

    const [firstColumn, setFirstColumn] = useState<string>('Springfield Storm1');
    const [secondColumn, setSecondColumn] = useState<string>('Mainline')
    const [thirdColumn, setThirdColumn] = useState<string>('NASSCO v6 Springfield')
    const [step, setStep] = useState<number>(1)
    const [choose, setChoose] = useState<string | null>(null)
    const [files, setFiles] = useState<string[] | null>([])
    const [folderFiles, setFolderFiles] = useState<string[] | null>([])
    const [folderName, setFolderName] = useState<string>('')
    const [finished, setFinished] = useState<boolean | null>(null)

    const dispatch = useDispatch<AppDispatch>();


    const filter_1 = useSelector(selectHeaderFilters_1);

    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const hiddenFileInputFolder = useRef<HTMLInputElement>(null);


    const modalTabsRef = useOnClickOutside(() => {
        setActiveModalTab(false);
    });
    const modalRef = useOnClickOutside(() => {
        setModal(false);
    });

    useEffect(() => {
        dispatch(setFilters(firstColumn, secondColumn, thirdColumn))
    }, [filter_1])


    const chooseTab = (firstColumn: string, secondColumn: string, thirdColumn: string) => {
        setFirstColumn(firstColumn)
        setSecondColumn(secondColumn)
        setThirdColumn(thirdColumn)
        dispatch(setFilters(firstColumn, secondColumn, thirdColumn))
    }

    const onUploadChange = async (e: any) => {
        const file = e.target.files[0];
        const fileUrl = URL.createObjectURL(file)
        // @ts-ignore
        setFiles([...files, {file, id: uuidv4()}])
    }

    const onUploadChangeFolder = async (e: any) => {
        const folder = e.target.files
        const folerArr = Array.from(folder)
        setFolderFiles([...folderFiles, {...folerArr, id: uuidv4(), folderName: folder[0].webkitRelativePath.split('/')[0] }])
    }

    const onAddClick = () => {
        hiddenFileInput.current!.click();
    }
    const onAddClickFolder = () => {
        hiddenFileInputFolder.current!.click();
        hiddenFileInputFolder.current!.webkitdirectory = true;
    }
    const handleImport = () => {
        console.log('13')
    }

    return (
        <>
            <ContainerModal>
                <ModalWrapp>
                    <ModalHeader>
                        <ModalTitle>
                            Add Inspection
                        </ModalTitle>
                        <ModalClose onClick={() => setModal(false)}>
                            <CrossIcon/>
                        </ModalClose>
                    </ModalHeader>
                    <Wrapp>
                        <ModalBody>

                            {
                                step === 1 && (<ModalBodyContent>
                                    <ModalBodyDescription>
                                        Add inspections to the following system:
                                    </ModalBodyDescription>
                                    <ModalRow>
                                        <ModalTabs ref={modalTabsRef} active={activeModalTab}
                                                   onClick={() => setActiveModalTab(true)}>
                                            {firstColumn || 'Springfield Storm1'} / {secondColumn || 'Mainline'} / {thirdColumn || 'NASSCO v6 Springfield'}
                                            <Arrow active={activeModalTab}>
                                                <ArrowDownIcon/>
                                            </Arrow>
                                            {
                                                activeModalTab && (
                                                    <ActiveModalWrapper>

                                                        <ActiveModalColumn>
                                                            <ArctiveModalColumnTitle
                                                                active={firstColumn === 'Springfield Storm1'}
                                                                onClick={() => chooseTab('Springfield Storm1', secondColumn, thirdColumn)}
                                                            >
                                                                Springfield Storm1
                                                                <ArrowWrapper>
                                                                    <ArrowDownIcon/>
                                                                </ArrowWrapper>
                                                            </ArctiveModalColumnTitle>
                                                            <ArctiveModalColumnTitle
                                                                onClick={() => chooseTab('Springfield Storm2', secondColumn, thirdColumn)}
                                                                active={firstColumn === 'Springfield Storm2'}
                                                            >
                                                                Springfield Storm2
                                                                <ArrowWrapper>
                                                                    <ArrowDownIcon/>
                                                                </ArrowWrapper>
                                                            </ArctiveModalColumnTitle>
                                                            <ArctiveModalColumnTitle
                                                                onClick={() => chooseTab('Springfield Storm3', secondColumn, thirdColumn)}
                                                                active={firstColumn === 'Springfield Storm3'}
                                                            >
                                                                Springfield Storm3
                                                                <ArrowWrapper>
                                                                    <ArrowDownIcon/>
                                                                </ArrowWrapper>
                                                            </ArctiveModalColumnTitle>
                                                        </ActiveModalColumn>


                                                        <ActiveModalColumn style={{
                                                            borderLeft: '1px solid #f0f0f0',
                                                            borderRight: '1px solid #f0f0f0'
                                                        }}>
                                                            <ArctiveModalColumnTitle
                                                                onClick={() => chooseTab(firstColumn, 'Mainline', thirdColumn)}
                                                                active={secondColumn === 'Mainline'}
                                                            >
                                                                Mainline
                                                                <ArrowWrapper>
                                                                    <ArrowDownIcon/>
                                                                </ArrowWrapper>
                                                            </ArctiveModalColumnTitle>
                                                            <ArctiveModalColumnTitle
                                                                onClick={() => chooseTab(firstColumn, 'Lateral', thirdColumn)}
                                                                active={secondColumn === 'Lateral'}
                                                            >
                                                                Lateral
                                                                <ArrowWrapper>
                                                                    <ArrowDownIcon/>
                                                                </ArrowWrapper>
                                                            </ArctiveModalColumnTitle>
                                                        </ActiveModalColumn>

                                                        <ActiveModalColumn>
                                                            <ArctiveModalColumnTitle
                                                                onClick={() => chooseTab(firstColumn, secondColumn, 'NASSCO v6 Springfield')}
                                                                active={thirdColumn === 'NASSCO v6 Springfield'}
                                                                style={{paddingRight: '15px'}}
                                                            >
                                                                NASSCO
                                                            </ArctiveModalColumnTitle>
                                                        </ActiveModalColumn>
                                                    </ActiveModalWrapper>
                                                )
                                            }
                                        </ModalTabs>
                                    </ModalRow>
                                </ModalBodyContent>)
                            }
                            {
                                step === 2 && (
                                    <ModalBodyContent>
                                        <ModalBodyHeader>
                                            <ModalBodyHeaderTitle>
                                                Do you want to upload inspection data (and/or media)?
                                            </ModalBodyHeaderTitle>
                                            <ModalBodyContent2>

                                                <UploadMedia
                                                    active={choose === 'Upload'}
                                                    onClick={() => setChoose('Upload')}
                                                >
                                                    <CreateIcon>
                                                        <UploadFileIcon/>
                                                    </CreateIcon>
                                                    <CreateTitle>
                                                        I want to upload data/media
                                                    </CreateTitle>
                                                    <CreateSubtitle>
                                                        Create inspections from your uploaded data
                                                        and/or media
                                                    </CreateSubtitle>
                                                </UploadMedia>

                                                <JustCreate
                                                    active={choose === 'Create'}
                                                    onClick={() => setChoose('Create')}
                                                >
                                                    <CreateIcon>
                                                        <CreateFileIcon/>
                                                    </CreateIcon>
                                                    <CreateTitle>
                                                        I don't want to upload anything, just
                                                        create inspections
                                                    </CreateTitle>
                                                    <CreateSubtitle>
                                                        Create inspections by selecting assets
                                                    </CreateSubtitle>
                                                </JustCreate>

                                            </ModalBodyContent2>
                                        </ModalBodyHeader>
                                    </ModalBodyContent>
                                )
                            }
                            {
                                step === 3 && (
                                    <ModalBodyContent>
                                        <ModalBodyHeader>
                                            <div>
                                                <ModalBodyHeaderTitle style={{display: 'flex', alignItems: 'center'}}>
                                                    Select files or folders to import.
                                                    <div style={{
                                                        paddingLeft: '20px',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}>
                                                        <AddFileWrapper onClick={onAddClick}>
                                                            <ChooseFile>
                                                                <InputHidden type="file" ref={hiddenFileInput}
                                                                             onChange={onUploadChange} id="file"
                                                                             name="file"/>
                                                            </ChooseFile>
                                                            <AddFileIcon/>
                                                            <div style={{padding: '0px 7px'}}>
                                                                Add File
                                                            </div>
                                                        </AddFileWrapper>
                                                        <AddFolderWrapper onClick={onAddClickFolder}>
                                                            <ChooseFile>
                                                                <InputHidden
                                                                    type="file"
                                                                    ref={hiddenFileInputFolder}
                                                                    onChange={onUploadChangeFolder}
                                                                    /*@ts-ignore*/
                                                                    webkitdirectory="true"
                                                                    />
                                                            </ChooseFile>
                                                            <AddFolder/>
                                                            <div style={{padding: '0px 7px'}}>
                                                                Add Folder
                                                            </div>
                                                        </AddFolderWrapper>

                                                    </div>
                                                </ModalBodyHeaderTitle>
                                            </div>
                                            <AddFileTable files={files} folderFiles={folderFiles} />
                                        </ModalBodyHeader>
                                    </ModalBodyContent>
                                )
                            }
                            {
                                step === 4 && (
                                    <ModalBodyContent>
                                        <ModalBodyHeader>
                                            <ModalBodyHeaderTitle>
                                                <span style={{paddingRight: '5px'}}> System: </span>
                                                <span style={{color: 'rgba(0, 0, 0, 0.45)', fontSize: '14px'}}>
                                                    {firstColumn} <span style={{padding: '0px 7px 0px 5px'}}>/</span>
                                                </span>
                                                <span style={{color: 'rgba(0, 0, 0, 0.45)', fontSize: '14px'}}>
                                                    {secondColumn} <span style={{padding: '0px 7px 0px 5px'}}>/</span>
                                                </span>
                                                {thirdColumn}
                                            </ModalBodyHeaderTitle>
                                        </ModalBodyHeader>
                                        <TableInputsInspection/>
                                    </ModalBodyContent>
                                )
                            }
                            {
                                step === 5 && (
                                    <ModalBodyContent>
                                        <ModalBodyHeader>
                                            <TextWrapper>
                                                <Text>
                                                    0 inspection(s) are the be created.
                                                </Text>
                                                <Text>
                                                    No inspection(s) have names.
                                                </Text>
                                            </TextWrapper>
                                        </ModalBodyHeader>
                                    </ModalBodyContent>
                                )
                            }
                            {
                                step === 6 && (
                                    <ModalBodyContent>
                                        <ModalBodyHeader>
                                            <TextWrapperFinished>
                                                <Text>
                                                    For all 1 inspection(s)...
                                                </Text>
                                            </TextWrapperFinished>
                                            <MarkWrapper>
                                                Mark as:
                                                <MarkButtons>
                                                    <MarkButton
                                                        isActive={finished === true}
                                                        onClick={() => setFinished(true)}>Finished</MarkButton>
                                                    <MarkButton
                                                        isActive={finished === false}
                                                        onClick={() => setFinished(false)}>Not finished</MarkButton>
                                                </MarkButtons>
                                            </MarkWrapper>
                                        </ModalBodyHeader>
                                    </ModalBodyContent>
                                )
                            }
                        </ModalBody>
                        <Buttons>
                            <ButtonSave onClick={() => {
                                setStep(1)
                                setModal(false)
                            }}>
                                Cancel
                            </ButtonSave>
                            <div style={{display: 'flex'}}>
                                {
                                    step > 1 && (
                                        <ButtonCreate
                                            style={{marginRight: '5px', backgroundColor: 'white', color: '#000'}}
                                            onClick={() => setStep(step - 1)}>
                                            Back
                                        </ButtonCreate>
                                    )
                                }
                                <ButtonCreate onClick={() => {
                                    step < 6 ? setStep(step + 1) : handleImport()
                                }} disabled={step == 2 && !choose}>
                                    {step < 6 ? 'Next' : 'Import'}
                                </ButtonCreate>

                            </div>
                        </Buttons>
                    </Wrapp>
                </ModalWrapp>
            </ContainerModal>
        </>
    );
};

export default CreateInspectionModal;

const TextWrapperFinished = styled.div`
  padding-bottom: 10px;
`

const MarkWrapper = styled.div`
  display: flex;
  align-items: center;
`

const MarkButtons = styled.div`
    display: flex;
  align-items: center;
  padding-left: 10px;
`

const MarkButton = styled.div<{isActive:boolean}>`
  height: 32px;
  display: flex;
  align-items: center;
  color: ${props => props.isActive ? '#fff' : '#000'};
  justify-content: center;
  background-color: ${props => props.isActive ? '#1890ff' : '#fff'};
  border: 1px solid #d9d9d9;
  cursor: pointer;
  padding: 10px 15px;
  white-space: nowrap;
  transition: color 0.3s, background 0.3s, border-color 0.3s, box-shadow 0.3s;
    &:hover {
        color: ${props => props.isActive ? '#fff' : '#1890ff'};
    }
`

const Arrow = styled.div<{active:boolean}>`
    position: absolute;
  right: 8px;
  top: ${({active}) => active ? '8px' : '9px'};
  transform: ${props => props.active ? 'rotate(180deg)' : 'rotate(0deg)'};
  
`

const ArrowWrapper = styled.div`
  transform: rotate(270deg);
  padding: 0px 15px;
`

const InputHidden = styled.input`
  display: none;
`

const ChooseFile = styled.div`

`

const AddFolderWrapper = styled.div`
  color: #1890ff;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const AddFileWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #1890ff;
  cursor: pointer;
`

const Wrapp = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 53px);
  position: relative;
`


const ModalBodyDescription = styled.div`
  padding: 0px 0px 16px 0px;
`


const TextWrapper = styled.div`
  padding-bottom: 50px;
`
const Text = styled.div`
  font-size: 14px;
  padding: 10px 0;
`

const CreateIcon = styled.div`
  padding: 20px 0;
`

const CreateTitle = styled.div`
  text-align: center;
  color: #000;
  font-size: 14px;
  line-height: 30px;
`

const CreateSubtitle = styled.div`
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  padding-top: 10px;
  text-align: center;
  line-height: 30px;

`

const UploadMedia = styled.div<{ active: boolean }>`
  width: 348px;
  height: 276px;
  min-height: 250px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 20px 10px 20px;
  cursor: pointer;
  border: ${({active}) => active ? '1px solid #00a8ff' : '1px solid #ccc'};
`

const JustCreate = styled.div<{ active: boolean }>`
  width: 348px;
  height: 276px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 20px 10px 20px;
  border: ${({active}) => active ? '1px solid #00a8ff' : '1px solid #ccc'};
  cursor: pointer;

`

const ModalBodyHeader = styled.div`

`

const ModalBodyContent2 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const ModalBodyHeaderTitle = styled.div`
  font-size: 14px;
  padding-bottom: 24px;
`

const ArctiveModalColumnTitle = styled.div<{ active: boolean }>`
  font-size: 14px;
  padding: 10px 0px 10px 15px;
  cursor: pointer;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({active}) => active ? 'rgba(125,194,251,0.74)' : '#fff'};

  &:hover {
    background-color: ${({active}) => active ? 'rgba(125,194,251,0.74)' : '#f5f5f5'};
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 768px;
  border-top: 1px solid #f0f0f0;
  padding: 10px 16px;
  position: absolute;
  bottom: 0px;
`


const ButtonSave = styled.div`
  padding: 7px 22px;
  border: 1px solid #D9D9D9;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 6px;
  border-radius: 2px;

  &:hover {
    border: 1px solid #00a8ff;
    color: #00a8ff;
  }
`

const ButtonCreate = styled.button`
  padding: 7px 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #fff;
  border-radius: 2px;
  font-size: 14px;
  background-color: #1890ff;
  border: 1px solid #D9D9D9;

  &:disabled {
    background-color: #ccc;
    border: 1px solid #ccc;
  }
`

const ModalWrapp = styled.div`
  background-color: #fff;
  height: 480px;
  width: 768px;
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
`

const ActiveModalWrapper = styled.div`
  height: 150px;
  background-color: white;
  box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
  position: absolute;
  top: 35px;
  left: 0px;
  display: flex;
`

const ModalTabs = styled.div<{ active: boolean }>`
  border: ${({active}) => active ? '1px solid #1890ff' : '1px solid #ccc'};
  width: 100%;
  height: 33px;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 11px;
  color: black;
  position: relative;

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
  color: rgba(0, 0, 0, 0.85);
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
  padding: 17px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
`

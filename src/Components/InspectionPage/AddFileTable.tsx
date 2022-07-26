import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import EmptyTableIcon from "@/Components/common/icons/EmptyTableIcon";
import AddFileIcon from "@/Components/common/icons/addFileIcon";
import SuccessIcon from "@/Components/common/icons/SuccessIcon";
import DeleteIcon from "@/Components/common/icons/DeleteIcon";
import Folder from "@/Components/common/icons/Folder";
import FolderTableIcon from "@/Components/common/icons/folderTableIcon";
import FileTableIcon from "@/Components/common/icons/FileTableIcon";

const AddFileTable = ({files, folderFiles}: any) => {
    const Headers = ['', 'Name', '', 'Details', '']

    const [folderFilesList, setFolderFilesList] = useState(folderFiles)
    const [fileList, setFileList] = useState(files)

    const handleDeleteFolder = (id: number) => {
        //delete item from id in folderFiles
        const newFolderFiles = folderFilesList.filter((item: any) => item.id !== id)
        setFolderFilesList(newFolderFiles)
    }
    const handleDeleteFile = (id: number) => {
        //delete item from id in files
        const newFiles = fileList.filter((item: any) => item.id !== id)
        setFileList(newFiles)
        console.log(newFiles)
    }
    useEffect(() => {
        setFolderFilesList(folderFiles)
        setFileList(files)
    }, [folderFiles, files])
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        {Headers.map((header, index) => {
                                if (header === '') {
                                    return <TableCell key={index}
                                                      style={{maxWidth: '32px', width: '100%'}}>{header}</TableCell>
                                }
                                return (
                                    <TableCell key={index}>{header}</TableCell>
                                )
                            }
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        folderFilesList.length === 0 && files.length === 0 ? (
                            <TableRowEmpty>
                                <TableCellBodyEmpty>
                                    <EmptyTableIcon/>
                                    <EmptyText>
                                        No Data. <br/>
                                        Add files or folders first.
                                    </EmptyText>
                                </TableCellBodyEmpty>
                            </TableRowEmpty>
                        ) : null
                    }
                    {
                        folderFilesList.length > 0 ? (
                            folderFilesList.map((file: any, index: number) => {
                                let size = Object.keys(file).length - 2;
                                return (
                                    <TableRow>
                                        <TableCellBody>
                                            <Icon>
                                                <FolderTableIcon/>
                                            </Icon>
                                            <DetailsText>
                                                {file.folderName}
                                            </DetailsText>
                                            <Icon>
                                                <SuccessIcon/>
                                            </Icon>
                                            <DetailsText>
                                                {size} record(s) found.
                                            </DetailsText>
                                            <Icon style={{cursor: 'pointer'}} onClick={() => handleDeleteFolder(file.id)}>
                                                <DeleteIcon/>
                                            </Icon>
                                        </TableCellBody>
                                    </TableRow>
                                )
                            })

                        ) : null
                    }
                    {
                        fileList.length > 0 && (
                            fileList.map((file: any) => (
                                <TableRow>
                                    <TableCellBody>
                                        <Icon>
                                            <FileTableIcon/>
                                        </Icon>
                                        <DetailsText>
                                            {file.file.name}
                                        </DetailsText>
                                        <Icon>
                                            <SuccessIcon/>
                                        </Icon>
                                        <DetailsText>
                                            1 record(s) found.
                                        </DetailsText>
                                        <Icon style={{cursor: 'pointer'}} onClick={() => handleDeleteFile(file.id)}>
                                            <DeleteIcon/>
                                        </Icon>
                                    </TableCellBody>
                                </TableRow>
                            )
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    );
};

export default AddFileTable;

const FolderName = styled.div``;

const FolderDetails = styled.div``;

const Icon = styled.div`
  max-width: 32px;
  width: 100%;
  text-align: center;
  border-right: 1px solid #F0F0F0;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid #F0F0F0;
`


const DetailsText = styled.div`
  max-width: 312px;
  width: 100%;
  padding: 0px 8px;
`

const EmptyText = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #8C8C8C;
  text-align: center;
  padding-top: 10px;
`

const TableRowEmpty = styled.div`
  padding-top: 80px;
  border: 1px solid #f0f0f0;
  padding-bottom: 80px;
`

const TableBody = styled.div`

`

const TableCellBody = styled.td`
  padding: 0 0 !important;
  height: 40px;

`

const TableCellBodyEmpty = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-radius: 2px;
  display: flex;
  background-color: #fff;
  margin-bottom: 20px;
  overflow: hidden;
  flex-direction: column;
`

const TableHead = styled.thead`
  display: flex;
  align-items: center;
`

const TableRow = styled.tr`

`

const TableCell = styled.td`
  height: 38px;
  background-color: #FAFAFA;
  font-weight: 500;

`
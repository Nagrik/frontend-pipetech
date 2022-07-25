import React, {useState} from 'react';
import styled from "styled-components";
import EmptyTableIcon from "@/Components/common/icons/EmptyTableIcon";
import AddFileIcon from "@/Components/common/icons/addFileIcon";
import SuccessIcon from "@/Components/common/icons/SuccessIcon";
import DeleteIcon from "@/Components/common/icons/DeleteIcon";
import Folder from "@/Components/common/icons/Folder";
import FolderTableIcon from "@/Components/common/icons/folderTableIcon";

const AddFileTable = ({file}: any) => {
    const Headers = ['', 'Name', '', 'Details', '']
    const [empty, setEmpty] = useState(false)

    const data = [
        {
            id: 1,
            type: 'folder',
            name: 'Folder 1',
            status: 'OK',
            Details: '12 record(s), 4 media file(s) found.'
        },
        {
            id: 2,
            type: 'xlsx',
            name: 'xsx.xlsx',
            status: 'question',
            Details: '12 record(s), 4 media file(s) found.'
        },
    ]
    const name = 'Lorem ipsum dolor sit.'
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
                        empty ? (
                                <TableRowEmpty>
                                    <TableCellBodyEmpty>
                                        <EmptyTableIcon/>
                                        <EmptyText>
                                            No Data. <br/>
                                            Add files or folders first.
                                        </EmptyText>
                                    </TableCellBodyEmpty>
                                </TableRowEmpty>
                            ) :
                            (
                                <TableRow>
                                    <TableCellBody>
                                        <Icon>
                                          <FolderTableIcon/>
                                        </Icon>
                                        <DetailsText>
                                            {name}
                                        </DetailsText>
                                        <Icon>
                                            <SuccessIcon/>
                                        </Icon>
                                        <DetailsText>
                                            12 record(s), 4 media file(s) found.
                                        </DetailsText>
                                        <Icon style={{cursor: 'pointer'}}>
                                            <DeleteIcon/>
                                        </Icon>
                                    </TableCellBody>
                                </TableRow>
                            )
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default AddFileTable;

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
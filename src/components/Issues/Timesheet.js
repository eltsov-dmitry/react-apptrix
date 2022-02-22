import React, {useEffect, useState} from 'react';
import {Dialog, DialogTitle} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {DataGrid} from '@mui/x-data-grid';
import {getIssueTimesheet} from '../../use/getters';
import PDFComponent from './PDFComponent';

const Timesheet = ({id}) => {
  const [timesheets, setTimesheets] = useState([]);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const columns = [
    {field: 'author', headerName: 'AUTHOR', width: 150},
    {field: 'duration', headerName: 'TIME', width: 150},
  ];

  const closeHandler = () => {
    setOpen(false);
    navigate('/issues');
  };

  useEffect(() => {
    (async () => {
      const timesheet = await getIssueTimesheet(id);
      setTimesheets(timesheet);
    })();
  }, []);

  return (
    <Dialog
      onClose={closeHandler}
      open={open}
      fullWidth
    >
      <DialogTitle>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          Timesheet for {id}
          {timesheets.length && (
            <PDFComponent timesheets={timesheets}/>
          )}
        </div>
      </DialogTitle>
      <div style={{height: '400px', width: '100%'}}>
        <DataGrid
          rows={timesheets}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Dialog>
  );
};

export default Timesheet;

import React, {useEffect, useState} from 'react';
import AppBarCustom from '../AppBarCustom';
import {getIssues} from '../../use/getters';
import {DataGrid} from '@mui/x-data-grid';
import {TextField, Autocomplete, Button} from '@mui/material';
import {Link, useParams} from 'react-router-dom';
import Timesheet from './Timesheet';

const Issues = () => {
  const {timesheetsID} = useParams();
  const [issues, setIssues] = useState([]);
  const [issuesOptions, setIssuesOptions] = useState([]);
  const columns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'summary', headerName: 'SUMMARY', width: 600},
    {field: 'project', headerName: 'PROJECT NAME', width: 150},
    {
      field: 'action',
      headerName: 'TIMESHEETS',
      width: 150,
      sortable: false,
      renderCell: (params) =>
        <Link to={`/issues/${params.id}`}>Timesheet</Link>,
    },
  ];

  const getIssuesHandler = async (search = null) => {
    const issuesData = await getIssues(search);
    setIssues(issuesData);
  };
  const onSearch = async (value) => {
    (value.length >= 3 || !value.length || !value) &&
    await getIssuesHandler(`#Unresolved ${value}`);
  };


  useEffect(() => {
    (async () => {
      await getIssuesHandler();
      const issuesData = await getIssues();
      setIssuesOptions([...new Set(issuesData.map((i) => i.project))]);
    })();
  }, []);
  return (
    <>
      <AppBarCustom/>
      {timesheetsID && <Timesheet id={timesheetsID}/>}
      <div className="container">
        <div style={{padding: '20px'}}>
          <h1>Issues</h1>
          <Autocomplete
            disablePortal
            options={issuesOptions}
            sx={{width: 300}}
            onInputChange={(event, value) => onSearch(value)}
            renderInput={(params) =>
              <TextField {...params} label="Project"/>
            }
          />
          <div style={{height: 400, width: '100%'}}>
            <DataGrid
              rows={issues}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Issues;

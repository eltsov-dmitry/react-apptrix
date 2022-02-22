import React, {useEffect, useState} from 'react';
import AppBarCustom from '../AppBarCustom';
import {DataGrid} from '@mui/x-data-grid';
import {
  Drawer, List, ListItem, ListItemText} from '@mui/material';
import {getUser, getUsers} from '../../use/getters';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [drawerState, setDrawerState] = useState(false);
  const columns = [
    {field: 'id', headerName: 'ID', width: 70},
    {field: 'name', headerName: 'NAME', width: 150},
    {field: 'login', headerName: 'LOGIN', width: 150},
    {field: 'email', headerName: 'EMAIL', width: 250},
  ];
  const onRowClick = async (e) => {
    const usersData = await getUser(e.id);
    setUserDetail(usersData.payload);
    setDrawerState(true);
  };
  const closeDrawer = () => {
    setDrawerState(false);
  };

  useEffect(() => {
    (async () => {
      const usersData = await getUsers();
      setUsers([...usersData.payload]);
    })();
  }, []);
  return (
    <>
      <AppBarCustom/>
      <div className="container">
        <div style={{padding: '20px'}}>
          <h1>Users</h1>
          <div style={{height: 400, width: '100%'}}>
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onRowClick={onRowClick}
            />
          </div>
        </div>
        <Drawer
          open={drawerState}
          onClose={closeDrawer}
        >
          <List>
            <ListItem>
              <ListItemText primary={`ID: ${userDetail.id}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`NAME: ${userDetail.name}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`LOGIN: ${userDetail.login}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`EMAIL: ${userDetail.email}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`TYPE: ${userDetail.$type}`} />
            </ListItem>
          </List>
        </Drawer>
      </div>
    </>
  );
};

export default Users;

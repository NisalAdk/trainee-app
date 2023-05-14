import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
    .then(response => response.json())
    .then(data => setTrainings(data));
   
}

const deleteTraining = id => {
  if (window.confirm("Are you sure to delete?")) {
    console.log(`https://traineeapp.azurewebsites.net/api/trainings/${id}`) ;
    fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        fetchData();
        if (res.status >= 200 && res.status < 300) {
          alert("Training deleted successfully");
        } else {
          alert("Error. Try again.");
        }
      })
      .catch(err => console.error(err));
  }
};

  const columns = [
    {
      headerName: 'Date',
      field: 'date',
      sortable: true,
      filter: true,
      floatingFilter: true,
      valueFormatter: (params) => dayjs(params.value).format('DD.MM.YYYY HH:mm'),
      margin: '5px',
    },
    {
      headerName: 'Duration',
      field: 'duration',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Activity',
      field: 'activity',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Customer',
      field: 'customer.firstname',
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {headerName: '', cellRendererFramework: (params) => {
      const onClick = () => {
           deleteTraining(params.data.id);
      };
      return (
          <Button color="primary" onClick={onClick} >
              Delete Training
          </Button>
      );
  },

}


  ];

  return (
    <div className="ag-theme-material" style={{ height: '700px', width: '90%', margin: 'auto' }}>
      <AgGridReact rowSelection="single" rowData={trainings} columnDefs={columns} animatedRows={true} />
    </div>
  );
}

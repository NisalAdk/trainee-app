import React, { useState, useEffect, Component} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Addcustomer from './AddCustomer';
import Updatecustomer from './UpdateCustomer';
import AddTraining from './AddTraining';

export default function Userlist() {
    const [user, setUser] = useState([]);
    useEffect(() => fetchData, []);
    
    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setUser(data.content));
       
    }
    const addCustomer = (customer) => {
        fetch('https://traineeapp.azurewebsites.net/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => fetchData())
            .catch(err => console.error(err))
      }
     
      const updateCustomer = (customer, link)=>{
        fetch(link, {
          method:'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(customer)
        })
          .then (res => fetchData())
          .catch (err => console.error(err))
      }
      const saveTraining = training => {
		fetch("https://traineeapp.azurewebsites.net/api/trainings", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(training)
		})
			.then(res => {
				fetchData();
				if (res.status >= 200 && res.status < 300) {
					alert("Training added successfully" );
				} else {
					alert( "Error. Try again." );
				}
			})
			.catch(err => console.error(err));
	};
    const deleteCustomer = id => {
        if (window.confirm('Are you sure to delete customer?')) {
          console.log(`https://traineeapp.azurewebsites.net/api/customers/${id}`);
          fetch(`https://traineeapp.azurewebsites.net/api/customers/${id}`, {
            method: 'DELETE'
          })
            .then(res => {
              fetchData();
              if (res.status >= 200 && res.status < 300) {
                alert('Customer deleted successfully');
              } else {
                alert('Error. Try again.');
              }
            })
            .catch(err => console.error(err));
        }
      };
    

    const columns = [
        { headerName: 'Firstname', field: 'firstname', sortable: true, filter: true, floatingFilter: true, margin: '5px' },
        { headerName: 'Lastname', field: 'lastname', sortable: true, filter: true, floatingFilter: true },
        { headerName: 'Streetaddress', field: 'streetaddress', sortable: true, filter: true, floatingFilter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true, floatingFilter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true, floatingFilter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true, floatingFilter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true, floatingFilter: true },
        { headerName: '', cellRendererFramework: (params) =>  <Updatecustomer updateCustomer={updateCustomer} customer={params.data}/>},
        { headerName: '', cellRendererFramework: (trainingRow) =>  <AddTraining saveTraining={saveTraining} customerId={trainingRow.links?.[0]?.href} />   },
        {headerName: '', cellRendererFramework: (customer) => {
            const onClick = () => {
               deleteCustomer(customer.data.id);
            };
            return (
                <Button color="primary" onClick={onClick} >
                    Delete Customer
                </Button>
            );
        },
    }
    ]
    
        return (
        <div className="ag-theme-material" style={{ height: '700px', width: '90%', margin: 'auto' }} >
            
            <Addcustomer addCustomer={addCustomer} />
            <AgGridReact rowSelection="single" rowData={user} columnDefs={columns} animatedRows={true}  ></AgGridReact>
        </div>
    )
    
}
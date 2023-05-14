
import React, { useState, useEffect, Component} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: '',
    activity: '',
    duration: '',
    customer: props.customerId
  });

  const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleInputChange = event => {
   
   		setTraining({ ...training, [event.target.name]: event.target.value });
	};


  const dateChanged = (date) => {
    const isoDate = date.toISOString();
    const day = isoDate.slice(8, 10);
    const month = isoDate.slice(5, 7);
    const year = isoDate.slice(0, 4);
    const formattedDate = `${year}-${month}-${day}`;
    setTraining({ ...training, date: formattedDate });
    

  };
	const addTraining = () => {
		props.saveTraining(training);
		handleClose();
	};


  return (
    <div>
        <Button onClick={handleClickOpen}>
            Add Training
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Training</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" name="activity"  value={training.activity} onChange={e => handleInputChange(e)} label="Activity" fullWidth />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Date" value={training.date}  />
         
        </LocalizationProvider>
              
                <TextField margin="dense" name="duration" value={training.duration} onChange={e => handleInputChange(e)} label="Duration" fullWidth />
                

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={addTraining} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </div>
)
}
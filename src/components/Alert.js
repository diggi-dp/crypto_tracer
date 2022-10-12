import { Snackbar } from '@mui/material'
import React from 'react'
import { connect } from 'react-redux';
import { setAlertAction } from '../redux/actions/currencyActions';
import MuiAlert from '@mui/material/Alert';

const Alert = ({ alert, setAlert }) => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ open: false });
    };
   
    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={2000}
            onClose={handleClose}
        >
            <MuiAlert onClose={handleClose} elevation={10} severity={alert.type} variant='filled'>
                {alert.message}  
            </MuiAlert>
        </Snackbar>

    )
}

const mapStateToProps = states => {
    return {
        alert: states.currencies.alert,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAlert: (value) => { dispatch(setAlertAction(value)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);

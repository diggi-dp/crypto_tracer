import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { setAlertAction } from '../../redux/actions/currencyActions';
import { auth } from '../../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth'

const SignUp = ({ setAlert, handleClose }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = async () => {
        if (password !== confirmPass) {
            setAlert({
                open: true,
                message: 'password do not match',
                type: 'error'
            })
            return;
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            setAlert({
                open: true,
                message: `Sign Up Successful. Welcome ${result.user.email}`,
                type: 'success'
            })
            handleClose();

        }
        catch (error) {
            console.log(error)
            setAlert({
                open: true,
                message: error.message,
                type: 'error'
            })
        }
    }


    return (
        <Box p={3} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <TextField
                varient='outlined'
                type='email'
                label='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
            />
            <TextField
                varient='outlined'
                type='password'
                label='Enter Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
            />
            <TextField
                varient='outlined'
                type='password'
                label='Confirm Password'
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                fullWidth
            />

            <Button varient='contained' size='large'
                sx={{ backgroundColor: '#EEBC1D' }}
                onClick={() => handleSubmit()}
            >
                Sign Up
            </Button>

        </Box>
    )
}

const mapStateToProps = states => {
    return {
        alert: states.currencies.alert,
    }
}

const mapDispatchToProps = dispatch => ({
    setAlert: (obj) => dispatch(setAlertAction(obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

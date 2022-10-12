import { Box, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { setAlertAction } from '../../redux/actions/currencyActions';
import { auth } from '../../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { setUserAction } from '../../redux/actions/authActions';



const Login = ({ alert, setAlert, handleClose,user,setUser}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //handle submit
    const handleSubmit = async () => {
        if (!email || !password) {
            setAlert({
                open: true,
                message: 'Please fill all the fields',
                type: 'error'
            })
            return;
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setAlert({
                open: true,
                message: `Login Successful. Welcome ${result.user.email}`,
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

    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            if(user) setUser(user)
            else setUser(null)
        })
    })

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

            <Button varient='contained' size='large'
                sx={{ backgroundColor: '#EEBC1D' }}
                onClick={handleSubmit}
            >
                Login
            </Button>

        </Box>
    )
}

const mapStateToProps = states => {
    return {
        alert: states.currencies.alert,
        user: states.authentication.user,
    }
}

const mapDispatchToProps = dispatch => ({
    setAlert: (obj) => dispatch(setAlertAction(obj)),
    setUser: (user) => dispatch(setUserAction(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);

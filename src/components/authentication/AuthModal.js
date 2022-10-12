import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Tab, Tabs } from '@mui/material';
import Login from './Login';
import SignUp from './SignUp';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { connect } from 'react-redux';
import { setAlertAction } from '../../redux/actions/currencyActions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: 5,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  color: 'white',
  display: 'flex',
  flexDirection: 'column'
};



function AuthModal({ setAlert }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();
  const SignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
      setAlert({
        open: true,
        message: `Sign Up Successful. Welcome ${res.user.email}`,
        type: 'success'
      })
      handleClose();
    })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: 'error'
        })
      }
      )
  };


  return (
    <div>
      <Button variant='contained'
        sx={{ width: 80, height: 38, marginLeft: 2, backgroundColor: '#EEBC1D' }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box sx={style}>
            <Box sx={{ backgroundColor: 'transparent', color: 'white', display: 'flex', justifyContent: 'center' }}>
              <Tabs value={value} onChange={handleChange} sx={{ borderRadius: 10 }}>
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </Tabs>
            </Box>

            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <SignUp handleClose={handleClose} />}

            <Box sx={{ fontSize: '20px', padding: '24px', paddingTop: 0, display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <span>OR</span>
              <GoogleButton
                style={{ width: '100%', outline: 'none' }}
                onClick={SignInWithGoogle}
              />

            </Box>
          </Box>
        </>
      </Modal>
    </div>
  );
}

const mapStateToProps = states => {
  return {
    alert: states.currencies.alert,
  }
}

const mapDispatchToProps = dispatch => ({
  setAlert: (obj) => dispatch(setAlertAction(obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);

import { AppBar, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { setCurrency, setSymbol } from '../../redux/actions/currencyActions';
import AuthModal from '../authentication/AuthModal';
import UserSidebar from '../authentication/UserSidebar';

const Header = (props) => {
    const navigate = useNavigate();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            mode: "dark"
        },
    });

    const onSelectChange = (e) => {
        props.setCurrency(e.target.value)
    }

    useEffect(() => {
        if (props.currency === 'INR') {
            props.setSymbol('₹')
        }
        else if (props.currency === 'USD') {
            props.setSymbol('$')
        }
          //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currency])

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography onClick={() => navigate('/')}
                            sx={{ flex: 1, color: 'gold', fontFamily: 'Montserrat', fontWeight: 'bold', cursor: 'pointer' }}
                            varient='h6'>
                            crpto tracer
                        </Typography>

                        <Select
                            varient="outlined"

                            sx={{ width: 100, height: 40, marginLeft: 15 }}
                            value={props.currency}
                            onChange={(e) => onSelectChange(e)}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'INR'}>INR</MenuItem>
                        </Select>

                        {props.user? <UserSidebar/> :<AuthModal/>}

                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

const mapStateToProps = states => {
    return {
        currency: states.currencies.currency,
        symbol: states.currencies.symbol,
        user: states.authentication.user,
    }

}

const mapDispatchToProps = dispatch => ({
    setCurrency: (value) => dispatch(setCurrency(value)),
    setSymbol: (value) => dispatch(setSymbol(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
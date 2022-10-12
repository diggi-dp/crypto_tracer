import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { connect } from 'react-redux';
import { Avatar, Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { setAlertAction } from '../../redux/actions/currencyActions';
import { numberwithcommas } from '../banner/Carousel';
import { AiFillDelete } from 'react-icons/ai'
import { doc, setDoc } from 'firebase/firestore';



function UserSidebar({ user, setAlert, coins, watchlist, symbol }) {
    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    // for remove watchlist 
    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, 'watchlist', user.uid);
        try {
            await setDoc(coinRef, {
                coins: watchlist.filter(watch => watch !== coin?.id),
            },
                { merge: true }
            )


            setAlert({
                open: true,
                message: `${coin?.name} Removed from watchlist !! `,
                type: 'success',
            })
        }
        catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: 'error',
            })
        }
    }

//  for logout user
    const logout = () => {
        signOut(auth);
        setAlert({
            open: true,
            type: 'success',
            message: 'Logout Successful !!!',
        })
    }

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar onClick={toggleDrawer(anchor, true)}
                        sx={{ height: 38, width: 38, marginLeft: 2, cursor: 'pointer', backgroundColor: '#EEBC1D' }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div
                            style={{ width: 350, padding: 25, fontFamily: 'monserrat', height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <div
                                style={{ flex: 1, height: '92%', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}
                            >
                                <Avatar
                                    sx={{ height: 200, width: 200, cursor: 'pointer', backgroundColor: '#EEBC1D', objectFit: 'contain' }}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    style={{ width: '100%', fontSize: 25, textAlign: 'center', fontWeight: 'bolder', wordWrap: 'break-word' }}
                                >
                                    {user.displayName || user.email}
                                </span>

                                {/* div for watchlist items  */}
                                <div
                                    style={{
                                        flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: 'gray',
                                        alignItems: 'center', borderRadius: '10px', padding: '15px', paddingTop: '10px', overflowY: 'auto'
                                    }}
                                >
                                    <span style={{ fontSize: '15px', textShadow: '0 0 5px black' }}>
                                        WatchList
                                    </span>

                                    {coins.map((coin) => {
                                        if (watchlist.includes(coin.id)) {
                                            return (
                                                <div style={{
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EEBC1D',
                                                    width: '100%', color: 'black', padding: '10px', borderRadius: '5px', boxShadow: '0 0 3px black'
                                                }}>
                                                    <span>{coin.name}</span>
                                                    <span style={{ display: 'flex', gap: '8px' }}>
                                                        {symbol}
                                                        {numberwithcommas(coin.current_price.toFixed(2))}
                                                        <AiFillDelete
                                                            style={{ cursor: 'pointer', fontSixe: '16px' }}
                                                            onClick={() => removeFromWatchlist(coin)}
                                                        />
                                                    </span>
                                                </div>
                                            )
                                        }
                                    })
                                    }

                                </div>
                            </div>

                            <Button
                                variant='contained'
                                sx={{ height: '8%', width: '100%', backgroundColor: '#EEBC1D', marginTop: '20px' }}
                                onClick={logout}
                            >
                                Log Out
                            </Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

const mapStateToProps = (states) => {
    return {
        user: states.authentication.user,
        alert: states.currencies.alert,
        symbol: states.currencies.symbol,
        coins: states.currencies.coins,
        watchlist: states.authentication.watchlist,
    }
}
const mapDispatchToProps = dispatch => ({
    setAlert: (value) => dispatch(setAlertAction(value)),
})
export default connect(mapStateToProps, mapDispatchToProps)(UserSidebar)
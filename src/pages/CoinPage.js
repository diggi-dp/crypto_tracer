import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import CoinInfo from '../components/CoinInfo';
import { Button, LinearProgress, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { numberwithcommas } from '../components/banner/Carousel';
import styles from '../pages/coinpage.module.css'
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { setAlertAction } from '../redux/actions/currencyActions';
import { setWatchlistAction } from '../redux/actions/authActions'


const CoinPage = (props) => {

  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  // fetch data 
  const fetchApiData = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data);
  }

  useEffect(() => {
    fetchApiData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currency])

  useEffect(() => {
    if (props.user) {
      const coinRef = doc(db, 'watchlist', props.user.uid);

      var unsubscribe = onSnapshot(coinRef, coin => {
        if (coin.exists()) {
          props.setWatchlist(coin.data().coins)
        } else {
          console.log('no items in watchlist')
        }
      })
      return () => {
        unsubscribe();
      }
    }

    // eslint-disable-next-line
  }, [props.user])



  const inWatchList = props.watchlist.includes(coin?.id)

  // for add coins in watchlist 
  const addtowatchlist = async () => {
    const coinRef = doc(db, 'watchlist', props.user.uid);
    try {
      await setDoc(coinRef, {
        coins: props.watchlist ? [...props.watchlist, coin?.id] : [coin?.id],
      })

      props.setAlert({
        open: true,
        message: `${coin?.name} Added to watchlist !`,
        type: 'success',
      })
    }
    catch (error) {
      props.setAlert({
        open: true,
        message: error.message,
        type: 'error',
      })
    }
  }


  // for remove coins in watchlist 

  const removefromwatchlist = async () => {
    const coinRef = doc(db, 'watchlist', props.user.uid);
    try {
      await setDoc(coinRef, {
        coins: props.watchlist.filter(watch => watch !== coin?.id),
      },
        { merge: true }
      )


      props.setAlert({
        open: true,
        message: `${coin?.name} Removed from watchlist !! `,
        type: 'success',
      })
    }
    catch (error) {
      props.setAlert({
        open: true,
        message: error.message,
        type: 'error',
      })
    }
  }




  if (!coin) {
    return <LinearProgress sx={{ backgroundColor: 'gold' }} />
  }
  return (
    <div className={styles.container}>

      {/* sidebar  */}

      <div className={styles.sidebar}>

        <img src={coin?.image?.large} alt={coin?.name} height='200' style={{ marginBottom: 20, }} />

        <Typography varient='h3' sx={{ fontWeight: 'bold', marginBottom: 2, fontFamily: 'monserrat', fontSize: '2rem' }}>
          {coin?.name}
        </Typography>

        <Typography varient='subtitle1' sx={{ width: '100%', fontFamilt: 'monserrat', padding: 4, paddingBottom: 2, paddingTop: 2 }}>
          {parse(`${coin?.description?.en.split(". ")[0]}`)}
        </Typography>

        <div
          className={styles.info}
        >
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' sx={{ fontFamily: 'monserrat' }}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' sx={{ fontFamily: 'monserrat' }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>

          <span style={{ display: 'flex' }}>
            <Typography variant='h5' sx={{ fontFamily: 'monserrat' }}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' sx={{ fontFamily: 'monserrat' }}>
              {props.symbol} {" "}
              {numberwithcommas(coin.market_data.current_price[props.currency.toLowerCase()])}
            </Typography>
          </span>

          <span style={{ display: 'flex' }}>
            <Typography variant='h5' sx={{ fontFamily: 'monserrat' }}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant='h5' sx={{ fontFamily: 'monserrat' }}>
              {props.symbol} {" "}
              {numberwithcommas(coin.market_data.market_cap[props.currency.toLowerCase()]
                .toString()
                .slice(0, -6)
              )}
            </Typography>
          </span>

          {props.user && (
            <Button
              variant='contained'
              sx={{ width: '100%', height: '40px', marginTop: '20px', backgroundColor: inWatchList ? '#ff0000' : '#EEBC1D' }}
              onClick={inWatchList ? removefromwatchlist : addtowatchlist}
            >
              {inWatchList ? 'REMOVE FROM WATCHLIST' : 'ADD TO WATCHLIST'}
            </Button>
          )}

        </div>
      </div>


      {/* chart  */}
      <CoinInfo coin={coin} />
    </div>
  )
}


const mapStateToProps = (states) => {
  return {
    currency: states.currencies.currency,
    symbol: states.currencies.symbol,
    user: states.authentication.user,
    watchlist: states.authentication.watchlist,
  }
}
const mapDispatchToProps = dispatch => ({
  setAlert: (obj) => dispatch(setAlertAction(obj)),
  setWatchlist: (val) => dispatch(setWatchlistAction(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CoinPage);

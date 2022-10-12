import React, { useState, useEffect } from 'react'
import { TrendingCoins } from '../../config/api'
import axios from 'axios'
import { connect } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

// function for comma in price 
export function numberwithcommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = (props) => {

    const [trending, setTrending] = useState([]);

    // api call 
    const fetchingTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(props.currency))
        setTrending(data)
    }

    useEffect(() => {
        fetchingTrendingCoins();
          //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.currency])

    const responsive =
    {
        0: {
            items: 2,
        },
        512: {
            items: 4
        }
    }



    const items = trending?.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', textTransform: 'uppercase', color: 'white' }}
                to={`./coin/${coin.id}`}
            >
                <img src={coin?.image} alt={coin?.name} height={80} style={{ marginBottom: 10 }} />
                <span>
                    {coin?.symbol}
                    &nbsp;

                    <span style={{ color: profit > 0 ? 'rgb(14,203,129)' : 'red', fontWeight: 500 }}>
                        {profit && "+"} {coin?.price_change_percentage_24h.toFixed(2)}%
                    </span>
                </span>

                <span style={{ fontSize: 21, fontweight: 500 }}>
                    {props.symbol} {numberwithcommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })


    return (
        <div style={{ height: '50%', display: 'flex', alignItems: "center" }}>
            <AliceCarousel
                animationDuration={1500}
                responsive={responsive}
                mouseTracking
                infinite
                autoPlayInterval={1000}
                disableDotsControls
                disableButtonsControls
                autoPlay
                items={items}
            />
        </div>
    )
}

const mapStateToProps = states => {
    return {
        currency: states.currencies.currency,
        symbol: states.currencies.symbol
    }
}

export default connect(mapStateToProps)(Carousel);

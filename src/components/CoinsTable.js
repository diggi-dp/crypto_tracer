import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CoinList } from '../config/api'
import { connect } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CircularProgress, createTheme, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { numberwithcommas } from './banner/Carousel';
import { setCoinsAction, setLoadingAction } from '../redux/actions/currencyActions';

const CoinsTable = ({ currency, symbol, coins, loading, setCoins, setLoading}) => {

    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const fetchcoindata = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency))
        setCoins(data);
        setLoading(false);
    }


    useEffect(() => {
        fetchcoindata();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    // for dark theme create theme
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            mode: 'dark',
        },
    })

    // for coin search 
    const handleSearch = () => {
        if(coins){
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        ))}
    }


    return (
        <ThemeProvider theme={darkTheme}>
            <Container sx={{ textAlign: 'center' }}>

                <Typography
                    variant='h4'
                    sx={{ margin: 5, fontFamily: 'montserrat' }}
                >
                    Cryptocurrency prices by market Cap
                </Typography>

                <TextField
                    variant='outlined'
                    label='search for a CryptoCurrency...'
                    sx={{ width: '100%', marginBottom: 5 }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer>
                    {
                        loading ? (<CircularProgress
                            sx={{ color: 'gold' }}
                            size={250}
                            thickness={1}
                        />)
                            :
                            (
                                <Table>

                                    <TableHead sx={{ backgroundColor: '#EEBC1D' }}>
                                        <TableRow>
                                            {
                                                ["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                                    <TableCell
                                                        sx={{ color: 'black', fontWeight: '700', fontFamily: 'montserrat' }}
                                                        key={head}
                                                        align={head === 'Coin' ? 'left' : 'right'}
                                                    >
                                                        {head}
                                                    </TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {
                                            coins && handleSearch()
                                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                                .map((row) => {
                                                    let profit = row.price_change_percentage_24h > 0;
                                                    return (
                                                        <TableRow
                                                            key={row.name}
                                                            onClick={() => navigate(`./coin/${row.id}`)}
                                                            sx={{ backgroundColor: '#16171a', cursor: 'pointer', fontFamily: 'monserrat', "&:hover": { backgroundColor: '#131111' } }}
                                                        >

                                                            <TableCell
                                                                component="th"
                                                                scope="row"
                                                                sx={{ display: 'flex', gap: 5 }}
                                                            >
                                                                <img src={row?.image} alt={row.name} height='50' style={{ marginBottom: 10 }} />
                                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    <span style={{ fontSize: 22, textTransform: 'uppercase' }}>{row.symbol}</span>
                                                                    <span style={{ color: 'darkgray' }}>{row.name}</span>
                                                                </div>
                                                            </TableCell>

                                                            <TableCell align='right'>
                                                                {symbol} {" "}
                                                                {numberwithcommas(row.current_price.toFixed(2))}
                                                            </TableCell>

                                                            <TableCell align='right'
                                                                sx={{ color: profit > 0 ? 'rgb(14,203,129)' : 'red', fontWeight: 500 }}
                                                            >
                                                                {profit && "+"} {row?.price_change_percentage_24h.toFixed(2)}%
                                                            </TableCell>

                                                            <TableCell align='right'>
                                                                {symbol} {" "}
                                                                {numberwithcommas(row.market_cap.toString().slice(0, -6))}
                                                                M
                                                            </TableCell>

                                                        </TableRow>
                                                    )
                                                })
                                        }
                                    </TableBody>

                                </Table>
                            )
                    }
                </TableContainer>

                {/* for pagination  */}
                <Pagination
                    sx={{
                        display: 'flex', justifyContent: 'center', width: '100%',
                        padding: 7, ul: { "& .MuiPaginationItem-root": { color: "gold" } }
                    }}
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    onChange={(e) => {
                        setPage(+(e.target.innerText)); 
                        window.scroll(0, 450);
                    }}

                />

            </Container>

        </ThemeProvider>
    )
}

const mapStateToProps = (states) => {
    return {
        currency: states.currencies.currency,
        symbol: states.currencies.symbol,
        loading: states.currencies.loading,
        coins: states.currencies.coins
    }
}
const mapDispatchToProps = dispatch => ({
    setCoins: (value) => dispatch(setCoinsAction(value)),
    setLoading: (value) => dispatch(setLoadingAction(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CoinsTable);

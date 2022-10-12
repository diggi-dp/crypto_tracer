import { ThemeProvider } from '@emotion/react'
import { CircularProgress, createTheme } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { HistoricalChart } from '../config/api'
import styles from '../pages/coinpage.module.css'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { chartDays } from '../config/btnData'
import SelectBtn from './SelectBtn';
ChartJS.register(
  Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement
)




const CoinInfo = ({ coin, currency }) => {

  const [historicalData, setHistoricalData] = useState(null)
  const [days, setDays] = useState(1)

  // for fetch api data
  const fetchData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    setHistoricalData(data.prices)
  }

  useEffect(() => {
    fetchData();
        //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days])

  // for dark theme 
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark',
    },
  })


  return (
    <ThemeProvider theme={darkTheme}>
      <div className={styles.chart_container}>

        {
          !historicalData ? (
            <CircularProgress
              sx={{ color: 'gold' }}
              size={250}
              thickness={1}
            />)
            :
            (
              <>
                <Line data={{

                  labels: historicalData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time = date.getHours() > 12
                      ?
                      `${date.getHours() - 12}: ${date.getMinutes()} PM`
                      :
                      `${date.getHours()}: ${date.getMinutes()} AM`

                    return days === 1 ? time : date.toLocaleDateString()
                  }),

                  datasets: [{
                    data: historicalData.map((coin) => coin[1]),
                    label: `price (Past ${days} Days) in ${currency}`,
                    borderColor: '#EEBC1D',
                    tension: 0.7,
                  }]
                }}

                  options={{
                    elements: {
                      point: {
                        radius: 1,
                      }
                    },
                    plugins: {
                      title: {
                        display: true,
                        text: ' Current Price',
                        position: 'left',
                        color: "gold",
                      }
                    },
                  }}
                />

                <div className={styles.btnDays}>
                  {chartDays.map(day => (
                    <SelectBtn
                      key={day.value}
                      onClick={() => setDays(day.value)}
                      selected={day.value === days}
                    >
                      {day.label}
                    </SelectBtn>
                  ))}
                </div>
              </>
            )
        }

      </div>
    </ThemeProvider>
  )
}
const mapStateToProps = (states) => {
  return {
    currency: states.currencies.currency
  }
}

export default connect(mapStateToProps)(CoinInfo);

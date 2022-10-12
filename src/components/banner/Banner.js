import { Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {


    return (
        <div style={{ backgroundImage: 'url(./banner2.jpg)' }}>
            <Container
                sx={{ height: 400, display: 'flex', flexDirection: 'column', paddingTop: 12, justifyContent: "space-around" }}
            >
                <div style={{display:'flex', height:'40%',flexDirection:'column',justifyContent:'center',textAlign:"center"}}>
                    <Typography
                        variant='h2'
                        sx={{ fontWeight: "bold", marginBottom: 0, fontFamily: "monserrat" }}
                    >
                        Crypto Tracer
                    </Typography>

                    <Typography
                        variant='subtitle2'
                        sx={{ color: "darkgray", textTransform: 'capitalize', fontFamily: "monserrat" }}
                    >
                        Get all the Info regarding your favorite Crypto Currency
                    </Typography>
                </div>

                <Carousel/>
                
            </Container>
        </div>
    )
}

export default Banner

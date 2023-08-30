import React, { useEffect, useState } from 'react';
import Extras from '../Components/Extras';
import { AppBar, Box, Button, CircularProgress, Toolbar, Typography, createTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowBack } from '@mui/icons-material';

const Read = () => {
  const [mode, setmode ] = useState(localStorage.getItem('mode') === null ? 'light' : localStorage.getItem('mode') === 'light' ? 'light' : 'dark')

  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
      ? {
          body: {
            main: '#FFC107'
          } ,
          nav: {
            main: '#7F3CFF',
            text: '#F2E8CF'
          } ,
          red: {
            main: '#F44336',
            text: '#F2E8CF'
          } ,
          blue: {
            main: '#00A8E8',
            text: '#F2E8CF'
          } ,
          purple: {
            main: '#7F3CFF',
            text: '#F2E8CF'
          } ,
          white: {
            main: '#f5f5f5',
            text: '#0069aa' ,
            coral : 'coral',
          } ,
          search: {
            main: '#0A2A3A',
            text: '#fff',
          } ,
          gray: {
            main: 'gray',
            text: 'gainsboro',
          } ,
        }
      : {
          body: {
            main: '#0A2A3A'
          } ,
          nav: {
            main: "#272727",
            text: '#A9A9A9'
          },
          red: {
            main: '#2196F3',
            text: '#F2E8CF'
          } ,
          blue: {
            main: '#7F3CFF',
            text: '#F2E8CF'
          } ,
          purple: {
            main: '#D0021B',
            text: '#F2E8CF'
          } ,
          white: {
            main: '#272625',
            text: '#fff',
            coral: 'gold'
          } ,
          search: {
            main: '#0A2A3A',
            text: '#fff',
          } ,
          gray: {
            main: 'gainsboro',
            text: 'gray',
          } ,
        }),
    },
  });

  const navi = useNavigate()
  const location = useLocation()

  const url = 'https://api.quran.com/api/v4/chapters'
  const [surahNames, setsurahNames] = useState([])

  const [loading , setloading] = useState(false)

  const apiSurah = async () => {
    setloading(false)
    const apiA = await axios.get(url)
    console.log(apiA.data.chapters)
    setsurahNames(apiA.data.chapters)
    setloading(true)
  }

  useEffect(()=>{
    apiSurah()
  },[])

  return (
    <div style={{
      backgroundColor: theme.palette.white.main ,
    }}>
      <AppBar className='header'>
        <Toolbar className='readHeader' sx={{
          display: 'flex',
          justifyContent: 'center',
          bgcolor: theme.palette.nav.main,
        }}>
          <Button size='large' variant='outlined'
            sx={{
              bgcolor: theme.palette.purple.main ,
              color: theme.palette.purple.text ,
              borderColor: theme.palette.purple.text ,
              position: 'fixed' ,
              left: '10px' ,
              '&:hover' : {
                bgcolor: theme.palette.purple.text ,
                color: theme.palette.purple.main ,
              }
            }}
            onClick={()=>{
              navi('/')
            }}
          >
            <ArrowBack />
          </Button>
          <Typography variant='h4' sx={{
            color: theme.palette.nav.text,
            textShadow: '0 0 10px black',
          }} className='readTitle' >
            أسماء السور
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    
    <div style={{
      backgroundColor: theme.palette.white.main
    }} className='headReadPage'>
        {
          loading === true ?
          (
            <div className='readPage' 
            style={{
              direction: 'rtl',
            }}>
              {
                surahNames.map((e,k)=>{
                  return (
                    <div key={k}
                    className='namesShowing'>
                      <Button 
                      variant='outlined'
                      onClick={()=>{
                        let id = e.id
                        const names = document.querySelectorAll('.namesShowing')
      
                        names.forEach((ele)=>{
                          ele.classList.add('namesHidding')
                        })
      
                        setTimeout(() => {
                          navi('surah', {state: {id}})
                        }, 500);
                        console.log(location)
                      }}
                      style={{
                        display: 'flex' ,
                        gap: '10px' ,
                        fontSize: '25px' ,
                        color: theme.palette.gray.main ,
                        border: `2px solid ${theme.palette.gray.text} `,
                        minWidth: '300px',
                      }}
                      className='names'
                      >
                        <p>[{e.id}]</p> <p style={{
                          fontSize: '30px',
                          fontFamily: 'hafs' ,
                          fontWeight: 'bold'
                        }}> {e.name_arabic} </p>
                        
                      </Button>
                    </div>  
                  )
                })
              }
          </div>
          )
          :
          (
      
              <Box sx={{ position: 'fixed' , top: '50%' , left: '50%' , transform: 'translate(-50%,-50%)' }}>
                <CircularProgress style={{
                  color: theme.palette.gray.main
                  }} />
              </Box>
          )
        }
    </div>
    
      <Extras setmode={setmode} theme={theme}/>
    </div>
  );
}

export default Read;

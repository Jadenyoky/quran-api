import { ArrowBack } from '@mui/icons-material';
import { AppBar, Box, Button, CircularProgress, Toolbar, Typography, createTheme } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Extras from '../Components/Extras';

const Listen = () => {

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

  const [recNames, setrecNames] = useState([]);
  const [recNamesR, setrecNamesR] = useState([]);
  const [loading , setloading] = useState(false)

  const apiNames = async () => {
    setloading(false)

    const apiA = await axios.get(
      "https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/quran/get-category/364764/ar/json"
    );

    setrecNames(apiA.data.recitations);

    const apiT = await axios.get(
      "https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/quran/get-category/364774/ar/json"
    )

    setrecNamesR(apiT.data.recitations)
    console.log(apiT.data.recitations)
    
    const fd = apiT.data.recitations[3].title.slice(20)
    console.log(fd)

    setloading(true)
  };

  useEffect(() => {
    apiNames();
  }, []);
  return (
    <div style={{
      backgroundColor: theme.palette.white.main
    }}>
    <AppBar className='header'>
        <Toolbar className='listenHeader' sx={{
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
          }} className='listenTitle' >
            أسماء القراء
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>
    
      <div className='listenPage' 
      style={{
        direction: 'rtl',
        backgroundColor: theme.palette.white.main
      }}>
      {
        loading === true ?
        (
          <>
            {
              recNames.slice(5, 58).map((e,k)=>{
                return (
                  <div key={k}
                  className='namesShowing'
                  >
                    <Button 
                    variant='outlined'
                    style={{
                      fontSize: '20px' ,
                      fontFamily: 'hafs',
                      color: theme.palette.gray.main ,
                      border: `2px solid ${theme.palette.gray.text}` ,
                      minWidth: '500px'
                    }}
                    onClick={()=>{
                      
                      let urlSurah = e.api_url 
            
                      let recTitle = e.title.slice(13)
            
                      const names = document.querySelectorAll('.namesShowing')
            
                      names.forEach((ele)=>{
                        ele.classList.add('namesHidding')
                      })
            
                      setTimeout(() => {
                        navi('surah',{state: { urlSurah , recTitle }})
                      }, 500);
            
                    }}
                    >
                      {e.title.slice(13)}
                    </Button>
                  </div>
                )
              })
            }
            {
              recNamesR.slice(1,31).map((e,k)=>{
                return (
                  <div key={k}
                  className='namesShowing'
                  >
                    <Button 
                    variant='outlined'
                    style={{
                      fontSize: '20px' ,
                      fontFamily: 'hafs',
                      color: theme.palette.gray.main ,
                      border: `2px solid ${theme.palette.gray.text}` ,
                      minWidth: '500px'
                    }}
                    onClick={()=>{
                      
                      let urlSurah = e.api_url 
            
                      let recTitle = e.title.slice(13)
            
                      const names = document.querySelectorAll('.namesShowing')
            
                      names.forEach((ele)=>{
                        ele.classList.add('namesHidding')
                      })
            
                      setTimeout(() => {
                        navi('surah',{state: { urlSurah , recTitle }})
                      }, 500);
            
                    }}
                    >
                      {e.title.slice(13)}
                    </Button>
                  </div>
                )
              })
            }
          </>
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

export default Listen;

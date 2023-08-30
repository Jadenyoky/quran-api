import { AppBar, Button, Paper, Toolbar, Typography, createTheme } from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Extras from '../Components/Extras';

const Home = () => {
  
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

  const options = [
    {
      text: 'قراءة' ,
      link: '/read' ,
      bgColor: theme.palette.red.main ,
      textColor: theme.palette.red.text ,
      func: () => {
        console.log()
      }  
    } ,
    {
      text: 'إستماع' ,
      link: '/listen' ,
      bgColor: theme.palette.blue.main ,
      textColor: theme.palette.blue.text ,
      func: () => {
        console.log()
      }  
    } ,
    {
      text: 'بحث' ,
      link: '/search' ,
      bgColor: theme.palette.purple.main ,
      textColor: theme.palette.purple.text ,
      func: () => {
        console.log()
      }  
    } ,
  ]

  return (
    <div className='homePage' style={{
      backgroundColor: theme.palette.body.main
    }}>
        <AppBar className='header'>
          <Toolbar sx={{
            display: 'flex',
            justifyContent: 'center',
            bgcolor: theme.palette.nav.main,
            
          }}>
            <Typography variant='h4' sx={{
              color: theme.palette.nav.text,
              textShadow: '0 0 10px black',
            }} >
              موقع القرآن الكريم
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
    
      <div className='homeContent'>
        <div style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px )',
          flexWrap: 'wrap' ,
          direction: 'rtl' ,
        }}>
        
          {
            options.map((e,k)=>{
              return (
                <Button key={k} 
                onClick={()=>{
                  e.func()
                }} 
                component={NavLink} 
                to={e.link} >
                  <Paper elevation={3} sx={{
                    height: '200px',
                    width: '200px' ,
                    bgcolor: e.bgColor ,
                    color: e.textColor ,
                    textShadow: '0 0 10px lightcoral' ,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '50px'
                  }}>
                    <p>
                      {e.text}
                    </p>
                  </Paper>
                </Button>
              )
            })
          }
          
        </div>
      </div>
    
      <Extras setmode={setmode} theme={theme}/>
    </div>
  );
}

export default Home;

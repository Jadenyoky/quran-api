import { ArrowBack } from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography, createTheme } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Extras from '../../Components/Extras';

const ListenSurah = () => {

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

  const [order, setorder] = useState(0);
  const location = useLocation()
  const url = location.state.urlSurah

  const [surahNames, setsurahNames] = useState([]);
  const [surahAudio, setsurahAudio] = useState([]);

  const [loading, setloading] = useState(false);

  const apiSurah = async () => {

    const apiA = await axios.get(url);
    setsurahNames(apiA.data.attachments)
    console.log(apiA.data.attachments);

  };

  const apiAudio = async (urlAudio) => {
    const apiA = await axios.get(urlAudio)

    setsurahAudio(apiA.data)
    console.log(apiA.data)
  }

  console.log(location)

  useEffect(()=>{
    apiSurah()
  },[])


  return (
    <div style={{
      direction: 'rtl' ,
      backgroundColor: theme.palette.white.main ,
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
              navi('/listen')
            }}
          >
            <ArrowBack />
          </Button>
          <Typography noWrap variant='h4' sx={{
            color: theme.palette.nav.text,
            textShadow: '0 0 10px black',
            marginLeft: '70px'
          }} className='listenTitle'>
            {location.state.recTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>

      <div className='listenPage' 
          style={{
            direction: 'rtl',
      }}>
        {
          surahNames.map((e,k)=> {
            return (
              <div key={k}>
                <Button
                variant='outlined'
                onClick={()=>{
                  apiAudio(e.api_url)
                  setloading(true)
                  setorder(e.order)
                }}
                style={{
                  display: 'flex' ,
                  gap: '10px' ,
                  fontSize: '25px' ,
                  color: theme.palette.gray.main ,
                  border: `2px solid ${theme.palette.gray.text} `,
                  minWidth: '300px',
                }}
                className='names namesShowing'
                >
                  <p>[{e.order}]</p>
                  <p style={{
                    fontSize: '30px',
                    fontFamily: 'hafs' ,
                    fontWeight: 'bold'
                  }}> {e.title} </p>
                </Button> 
              </div>
            )
          })
        }
      </div>
      {
        loading === true ?
        <div>
          <div className='highlightAudio'
          onClick={()=>{
            setloading(false)
          }}
          ></div>
          <div className='audioSection'
          style={{
            background: theme.palette.nav.main ,
            boxShadow: `0 0 20px ${theme.palette.nav.main}`
          }}
          >
            <p style={{
              // paddingBottom: '20px',
              // direction: 'rtl',
              // fontSize: '25px',
              // color: theme.palette.nav.text 
              display: 'flex' ,
              gap: '10px' ,
              fontSize: '25px' ,
              color: theme.palette.gray.text ,
              justifyContent: 'center',
              alignItems: 'center' ,
              paddingBottom: '20px'
            }}>
              [{order}] <span style={{
                    fontSize: '30px',
                    fontFamily: 'hafs' ,
                    fontWeight: 'bold'
                  }}>{surahAudio.title}</span>
            </p>
            <audio controls autoPlay src={surahAudio.url}
            onPlay={()=>{
              console.log('playing')
            }}
            onPause={()=>{
              console.log('pausing')
            }}
            onEnded={()=>{
              console.log('Finishing')
            }}
            />
          </div>
        </div>  
        :
        ''
      }

      <Extras setmode={setmode} theme={theme}/>
    </div>
  );
}

export default ListenSurah;

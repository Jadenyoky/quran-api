import { ArrowBack } from '@mui/icons-material';
import { AppBar, Button, Toolbar, createTheme } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Extras from '../../Components/Extras';

const ReadSurah = () => {

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

  const location = useLocation()

  const navi = useNavigate()

  console.log(location)

  const urlSurahData = `https://api.quran.com/api/v4/chapters/${location.state.id}`
  const [surahData, setsurahData] = useState([])

  const [about, setabout] = useState(false)
  const [ayat , setayat] = useState([])

  // let count = 1 

  const apiSurahData = async () => {
    const apiA = await axios.get(urlSurahData)
    setsurahData(apiA.data.chapter)
    console.log(apiA.data.chapter)

    const apiAyat = async (id) => {

      const apiA = await axios.get(`https://raw.githubusercontent.com/risan/quran-json/main/dist/chapters/${id}.json`)
      setayat(apiA.data.verses)
      console.log(apiA.data.verses)
      // const apiA = await axios.get(`https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${id}`)
      // setayat(apiA.data.verses)
      // console.log(apiA.data.verses)
      
    }

    apiAyat(apiA.data.chapter.id)
  }


  useEffect(()=>{
    apiSurahData()
  },[])

  return (
    <div>
      <div className='lineTop' style={{
        boxShadow: `0 0 50px 5px ${theme.palette.white.coral}` ,
      }}></div>
      <AppBar className='header'>
        <Toolbar sx={{
          display: 'flex' ,
          gap: '20px' ,
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: theme.palette.nav.main,
        }}>
          <Button size='large' variant='outlined'
            sx={{
              bgcolor: theme.palette.purple.main ,
              color: theme.palette.purple.text ,
              borderColor: theme.palette.purple.text ,
              '&:hover' : {
                bgcolor: theme.palette.purple.text ,
                color: theme.palette.purple.main ,
                borderColor: 'transparent' ,
              }
            }}
            onClick={()=>{
              navi('/read')
            }}
          >
            <ArrowBack />
          </Button>
          <div
          style={{
            color: theme.palette.nav.text,
            textShadow: '0 0 10px black',
            display: 'flex' ,
            direction: 'rtl',
            gap: '10px' ,
            alignItems: 'center'
          }}
          >
            <p style={{
              fontSize: '25px',
            }}>[{surahData.id}]</p>  
            <p style={{
              fontFamily: 'hafs',
              fontSize: '35px',
            }}>{surahData.name_arabic}</p>
          </div>
            
          <Button size='large' variant='outlined'
            sx={{
              bgcolor: theme.palette.purple.main ,
              color: theme.palette.purple.text ,
              borderColor: theme.palette.purple.text ,
              fontFamily: " Marhey, cursive !important ",
              '&:hover' : {
                bgcolor: theme.palette.purple.text ,
                color: theme.palette.purple.main ,
                borderColor: 'transparent' ,
              }
            }}
            onClick={()=>{
              setabout(!about)
            }}
          >
            عن السورة
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      {
        about === true ?
        <div className='about' style={{
          position: 'fixed',
          top: '0' ,
          height: '100vh' ,
          width: '100%',
          background: theme.palette.blue.main ,
          color: theme.palette.blue.text ,
          display: 'flex' ,
          justifyContent: 'center' , 
          flexDirection: 'column' ,
          alignItems: 'center' ,
          gap: '20px' ,
          fontSize: '30px',
          direction: 'rtl'
        }}>
          <p>
          إسم السورة <span style={{
            color: 'rgb(255, 193, 7)'
          }}> / </span> {surahData.name_arabic} 
          </p>
          <p>
          الإسم بالإنجليزية
          <span style={{
            color: 'rgb(255, 193, 7)'
          }}> / </span>
          {surahData.translated_name.name}
          </p>
          <p>
          الترتيب في المصحف  
          <span style={{
            color: 'rgb(255, 193, 7)'
          }}> / </span>
          {surahData.id}
          </p>
          <p>
          عدد الآيات
          <span style={{
            color: 'rgb(255, 193, 7)'
          }}> / </span>
          {surahData.verses_count}
          </p>
          <p>
          مكان النزول
          <span style={{
            color: 'rgb(255, 193, 7)'
          }}> / </span>
          {
            surahData.revelation_place === 'makkah' ?
            'مكة المكرمة'
            :
            'المدينة المنورة'
          }
          </p>
          <p>
          ترتيب النزول
          <span style={{
            color: 'rgb(255, 193, 7)'
          }}> / </span>
          {surahData.revelation_order}
          </p>
          <div>
          الصفحات في المصحف
          <span style={{
            color: 'rgb(255, 193, 7)'
          }}> / </span>
            من {surahData.pages[0]}
          <p style={{
            textAlign: 'end'
          }}>
            إلي {surahData.pages[1]}
          </p>
          </div>
        </div>  
        :
        <div className='aboutHiding' style={{
          position: 'fixed',
          top: '50px' ,
          height: '100vh' ,
          width: '100%',
          background: theme.palette.blue.main ,
          color: theme.palette.blue.text ,
        }}>
        </div>    
      }

      <div className='surahReadPage' 
      style={{
        backgroundColor: theme.palette.white.main ,
      }}
      >
      {
        surahData.bismillah_pre === true ?
        <p style={{
          fontSize: '40px',
          paddingBottom: '20px',
          marginBottom: '20px' ,
          color: theme.palette.white.coral ,
          fontFamily: 'hafs'
        }}>
          بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ 
        </p>
        :
        ''
      }

      {
        ayat.map((e,k)=>{
          return (
            <span key={k}
            className='ayat'
            style={{
              color: theme.palette.white.text ,
            }}
            onClick={()=>{

              const rr = `${e.text} - [ ${surahData.name_arabic} - ${e.id} ] `

              navigator.clipboard.writeText(rr)
              console.log(rr)

              
            }}
            onPointerUp={()=>{
              const alertCopy = document.createElement('div')
              
              alertCopy.innerText = 'تم نسخ الآية'
              document.body.append(alertCopy)
              alertCopy.classList.add('copy')
              setTimeout(() => {
                alertCopy.remove()
              }, 700);
            }}
            >
              {''} {e.text} {''}
              <span
              style={{
              color: theme.palette.white.coral ,
              }}
              className='verseNum'
              >
              {`(${e.id})`}
              </span>
            </span>  
          )
        })
      } 
        
        {/* {
          ayat.map((e,k)=>{
            return (
              <span key={k}
              className='ayat'
              style={{
                color: theme.palette.white.text ,
              }}
              onClick={()=>{

                const rr = `${e.text_uthmani} - [ ${surahData.name_arabic} - ${e.verse_key} ] `

                navigator.clipboard.writeText(rr)
                console.log(rr)

                const alertCopy = document.createElement('div')
                alertCopy.innerText = 'تم نسخ الآية'
                document.body.append(alertCopy)
                alertCopy.classList.add('copy')
              }}
              >
                {''} {e.text_uthmani} {''}
                <span
                style={{
                color: theme.palette.white.coral ,
                }}
                className='verseNum'
                >
                {`(${count++})`}
                </span>
              </span>  
            )
          })
        } */}

        {
          ayat.length > 1 ? 
          <p style={{
            fontSize: '40px',
            paddingTop: '20px',
            marginTop: '20px' ,
            color: theme.palette.white.coral ,
            fontFamily: 'hafs'
          }}>
            صَدَقَ اللهُ العَظيمُ
          </p>
          :
          ''
        }
      </div>

      <Extras setmode={setmode} theme={theme}/>
    </div>
  );
}

export default ReadSurah;

import { useTheme } from '@emotion/react';
import { ArrowUpward, Brightness4, LightMode } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react';

const Extras = ({setmode , theme}) => {

  let w = window.srollY 

  window.onscroll = () => {
    const arrow = document.querySelector('.arrow')

    const moding = document.querySelector('.moding')

    const header = document.querySelector('.header')

    const resultsBar = document.querySelector('.resultsBar')

    if(arrow && moding && header) {
      if(window.scrollY === 0){
        arrow.style.transform = 'translateX(200%)'
        arrow.style.opacity = '0'
      } else if(window.scrollY > 300) {
        arrow.style.transform = 'translateX(0)'
        arrow.style.opacity = '1'
        moding.style.transform = 'translateY(0)'
        moding.style.opacity = '1'
      }
  
      if(w < window.scrollY && w > window.innerHeight) {
        header.style.transform = 'translateY(-100%)'
        arrow.style.transform = 'translateX(200%)'
        moding.style.transform = 'translateY(200%)'
        moding.style.opacity = '0'
      } else{
        header.style.transform = 'translateY(0)'
      }
    }
    
    if(resultsBar){

      if(w < window.scrollY && w > window.innerHeight) {
        resultsBar.style.top = '0'
      } else{
        resultsBar.style.top = '54px'
      }
    }

    w = window.scrollY

    let sctop = document.body.scrollTop || document.documentElement.scrollTop
    let scheight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    let scall = (sctop / scheight) * 100

    let lineTop = document.querySelector('.lineTop')
    if(lineTop){
      lineTop.style.width = `${scall}%`
    }
  }

  const [show, setshow] = useState(false)

  return (
    <div className='extras'>
      <Button className='moding' variant='contained' onClick={()=>{
        localStorage.setItem('mode', theme.palette.mode === 'light' ? 'dark' : 'light')
        setmode(theme.palette.mode === 'light' ? 'dark' : 'light')
        setshow(!show)
      }}
      sx={{
        bgcolor: theme.palette.purple.main ,
        color: theme.palette.purple.text
      }}
      >
        {
          show === true ? 
          (
            <Brightness4 sx={{
              fontSize: '40px'
            }} />
          )
          :
          (
            <LightMode sx={{
              fontSize: '40px'
            }} />
          )
        }
      </Button>
      <Button className='arrow' variant='contained'
        onClick={()=>{
          document.documentElement.scrollTop = 0
        }}
        sx={{
            bgcolor: theme.palette.purple.main ,
            color: theme.palette.purple.text
        }}
      >
        <ArrowUpward sx={{
          fontSize: '40px'
        }} />
      </Button>
    </div>
  );
}

export default Extras;
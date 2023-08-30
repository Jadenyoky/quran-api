import { ArrowBack } from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography, createTheme } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Extras from '../Components/Extras';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

const Search = () => {

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
            main: 'black',
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

  const [results , setresults] = useState([])

  const [alter , setalter] = useState([])

  const [query , setquery] = useState('')

  const [num , setnum] = useState(null)

  function hiddenPrev(){
    const final = document.querySelector('.final')
    final.innerHTML = ''
  }

  function wordSaving(apiA , word) {
    if(apiA === 1){
    
      setsaved([
        ...saved.filter((ele) => ele.word !== word), {
          date: Date.now() ,
          word: word ,
        }
      ])
    }
  }

  const apiSearch = async (word) => {

    hiddenPrev()

    const apiA = await axios.get(`https://www.alfanous.org/api/search?query=${word}&perpage=25&page=1`)
    // console.log(apiA.data.search);
    // console.log(apiA.request.responseURL)
    setresults(apiA.data.search)

    console.log(apiA.data.search.interval)

    setalter(apiA.data.search.words.individual[1].derivations)
    // console.log(apiA.data.search.words.individual[1].derivations);

    wordSaving(apiA.data.search.interval.start , word)

    for (const s in apiA.data.search.ayas) {
      if (apiA.data.search.ayas.hasOwnProperty.call(apiA.data.search.ayas, s)) {
        const element = apiA.data.search.ayas[s];    
  
        const final = document.querySelector('.final')

        const div = document.createElement('h3')
        div.innerHTML = 
        `
          <div class='finalRes'>
            <p> 
            ${element.aya.text}
            </p>
          </div>
  
        `

        const div0 = document.createElement('div')
        div0.classList.add('num')

        const div2 = document.createElement('span')
        div2.innerHTML = 
        `
          <img class='copyIcon' src=${require('../Images/copy.png')} alt='test' />
        `

        const div3 = document.createElement('span')
        div3.innerHTML = 
        `
          <p class='numS'>
          [ ${element.identifier.sura_arabic_name} - ${element.aya.id} ]
          </p>
        `


        div2.addEventListener('click', function(){
          navigator.clipboard.writeText(`${div.outerText} - ${div3.outerText}`)
          console.log(div.innerText)

          const alertCopy = document.createElement('div')
          
          alertCopy.innerText = 'تم نسخ الآية'
          document.body.append(alertCopy)
          alertCopy.classList.add('copy')
          setTimeout(() => {
            alertCopy.remove()
          }, 700);
        })

        div.addEventListener('click', function(){

          document.body.style.overflow = 'hidden'

          const contentAll = document.createElement('div')
          const hiddenContent = document.createElement('div')
          const content = document.createElement('div')

          hiddenContent.classList.add('hiddenContent')
          hiddenContent.style.zIndex = '2200'
          document.body.appendChild(hiddenContent)

          contentAll.classList.add('contentSearch')
          contentAll.style.zIndex = '2100'

          content.style.backgroundColor = theme.palette.search.main
          content.classList.add('contentSearchIn')
          const contentAudio = document.createElement('div')
          contentAudio.innerHTML = 
          `
            <div class='ayaAudio'>
              <audio autoplay controls src='${element.aya.recitation}' />
            </div>
          `

          const contentVerseOne = document.createElement('div')
          contentVerseOne.innerHTML =
          `
            <div class='finalResTwo'>
            <p style='color: white'> 
            ${element.aya.prev_aya.text}
            </p>
            </div>
          `

          const aboutVerseOne = document.createElement('div')
          aboutVerseOne.classList.add('numVerse')

          const contentCopyOne = document.createElement('span')
          contentCopyOne.innerHTML = 
          `
            <img class='copyIcon' src=${require('../Images/copy.png')} alt='test' />
          `

          const contentVerseOneId = document.createElement('span')
          contentVerseOneId.innerHTML =
          `
            <p class='numS'>
            [ ${element.aya.prev_aya.sura_arabic} - ${element.aya.prev_aya.id} ]
            </p>
          `

          contentCopyOne.addEventListener('click', function(){
            navigator.clipboard.writeText(`${contentVerseOne.outerText} - ${contentVerseOneId.outerText}`)
            console.log(contentVerseOne.innerText)

            const alertCopy = document.createElement('div')

            alertCopy.style.zIndex = '2100'
            
            alertCopy.innerText = 'تم نسخ الآية'
            document.body.append(alertCopy)
            alertCopy.classList.add('copy')
            setTimeout(() => {
              alertCopy.remove()
            }, 700);
          })

          const contentVerseTwo = document.createElement('div')
          contentVerseTwo.innerHTML =
          `
            <div class='finalResTwo'>
            <p style='color: white'> 
            ${element.aya.text}
            </p>
            </div>
          `

          const aboutVerseTwo = document.createElement('div')
          aboutVerseTwo.classList.add('numVersePlus')

          const contentCopyTwo = document.createElement('span')
          contentCopyTwo.innerHTML = 
          `
            <img class='copyIcon' src=${require('../Images/copy.png')} alt='test' />
          `

          const contentVerseTwoId = document.createElement('span')
          contentVerseTwoId.innerHTML =
          `
            <p class='numS'>
            [ ${element.identifier.sura_arabic_name} - ${element.aya.id} ]
            </p>
          `

          contentCopyTwo.addEventListener('click', function(){
            navigator.clipboard.writeText(`${contentVerseTwo.outerText} - ${contentVerseTwoId.outerText}`)
            console.log(contentVerseTwo.innerText)

            const alertCopy = document.createElement('div')
          
            alertCopy.style.zIndex = '2100'

            alertCopy.innerText = 'تم نسخ الآية'
            document.body.append(alertCopy)
            alertCopy.classList.add('copy')
            setTimeout(() => {
              alertCopy.remove()
            }, 700);
          })

          const contentVerseThree = document.createElement('div')
          contentVerseThree.innerHTML =
          `
            <div class='finalResTwo'>
            <p style='color: white'> 
            ${element.aya.next_aya.text}
            </p>
            </div>
          `

          const aboutVerseThree = document.createElement('div')
          aboutVerseThree.classList.add('numVerse')

          const contentCopyThree = document.createElement('span')
          contentCopyThree.innerHTML = 
          `
            <img class='copyIcon' src=${require('../Images/copy.png')} alt='test' />
          `

          const contentVerseThreeId = document.createElement('span')
          contentVerseThreeId.innerHTML =
          `
            <p class='numS'>
            [ ${element.aya.next_aya.sura_arabic} - ${element.aya.next_aya.id} ]
            </p>
          `

          contentCopyThree.addEventListener('click', function(){
            navigator.clipboard.writeText(`${contentVerseThree.outerText} - ${contentVerseThreeId.outerText}`)
            console.log(contentVerseThree.innerText)

            const alertCopy = document.createElement('div')

            alertCopy.style.zIndex = '2100'
          
            alertCopy.innerText = 'تم نسخ الآية'
            document.body.append(alertCopy)
            alertCopy.classList.add('copy')
            setTimeout(() => {
              alertCopy.remove()
            }, 700);
          })
          
          const contentAbout = document.createElement('div')
          contentAbout.innerHTML =
          `
            <div class='ayaAbout'>
            <p>
            أسماء الجلالة : <span class='match'>${element.stat.godnames}</span> 
            </p>
            <p>
            عدد الحروف : <span class='match'>${element.stat.letters}</span>
            </p>
            <p>
            عدد الكلمات : <span class='match'>${element.stat.words}</span>
            </p>
            <p>
            الجزء : <span class='match'>${element.position.juz}</span>
            </p>
            <p>
            رقم الصفحة : <span class='match'>${element.position.page}</span>
            </p>
            <p>
            الترتيب : <span class='match'>${element.identifier.gid}</span>
            </p>
            </div>
          `
          
          document.body.append(contentAll)
          contentAll.append(content)

          content.append(contentAudio)

          content.append(contentVerseOne)
          content.append(aboutVerseOne)
          aboutVerseOne.append(contentCopyOne)
          aboutVerseOne.append(contentVerseOneId)

          content.append(contentVerseTwo)
          content.append(aboutVerseTwo)
          aboutVerseTwo.append(contentCopyTwo)
          aboutVerseTwo.append(contentVerseTwoId)

          content.append(contentAbout)

          content.append(contentVerseThree)
          content.append(aboutVerseThree)
          aboutVerseThree.append(contentCopyThree)
          aboutVerseThree.append(contentVerseThreeId)

          hiddenContent.addEventListener('click', function(){
            hiddenContent.style.transform = 'translateX(-100%)'
            contentAll.style.transform = 'translateY(10%)'
            contentAll.style.opacity = '0'
            document.body.style.overflow = 'auto'
            setTimeout(() => {
              hiddenContent.remove()
              contentAll.remove()
            }, 700);
          })

        } )
        // <div class='numTwo' >
        // </div>

        final.append(div)
        final.append(div0)
        div0.append(div2)
        div0.append(div3)
  
      }
    }
  }

  const apiSearchTwo = async () => {

    const apiA = await axios.get(`https://www.alfanous.org/api/search?query=${query}&perpage=25&page=${num}`)
    
    console.log(apiA.data.search)
    console.log(apiA.request.responseURL)
    setresults(apiA.data.search)

    const rrr = document.querySelector('.rrr')
    rrr.classList.add('resultsBarP')
    setTimeout(() => {
      rrr.classList.remove('resultsBarP')
    }, 2000);

    for (const s in apiA.data.search.ayas) {
      if (apiA.data.search.ayas.hasOwnProperty.call(apiA.data.search.ayas, s)) {
        const element = apiA.data.search.ayas[s];    
  
        const final = document.querySelector('.final')

        const div = document.createElement('h3')
        div.innerHTML = 
        `
          <div class='finalRes'>
            <p> 
            ${element.aya.text}
            </p>
          </div>
  
        `

        const div0 = document.createElement('div')
        div0.classList.add('num')

        const div2 = document.createElement('span')
        div2.innerHTML = 
        `
          <img class='copyIcon' src=${require('../Images/copy.png')} alt='test' />
        `

        const div3 = document.createElement('span')
        div3.innerHTML = 
        `
          <p class='numS'>
          [ ${element.identifier.sura_arabic_name} - ${element.aya.id} ]
          </p>
        `


        div2.addEventListener('click', function(){
          navigator.clipboard.writeText(`${div.outerText} - ${div3.outerText}`)
          console.log(div.innerText)

          const alertCopy = document.createElement('div')
          
          alertCopy.innerText = 'تم نسخ الآية'
          document.body.append(alertCopy)
          alertCopy.classList.add('copy')
          setTimeout(() => {
            alertCopy.remove()
          }, 700);
        })

        div.addEventListener('click', function(){

          document.body.style.overflow = 'hidden'

          const contentAll = document.createElement('div')
          const hiddenContent = document.createElement('div')
          const content = document.createElement('div')

          content.style.backgroundColor = theme.palette.search.main
          hiddenContent.classList.add('hiddenContent')
          hiddenContent.style.zIndex = '2200'
          document.body.appendChild(hiddenContent)

          contentAll.classList.add('contentSearch')
          contentAll.style.zIndex = '2100'

          content.classList.add('contentSearchIn')
          const contentAudio = document.createElement('div')
          contentAudio.innerHTML = 
          `
            <div class='ayaAudio'>
              <audio autoplay controls src='${element.aya.recitation}' />
            </div>
          `

          const contentVerseOne = document.createElement('div')
          contentVerseOne.innerHTML =
          `
            <div class='finalResTwo'>
            <p style='color: white'> 
            ${element.aya.prev_aya.text}
            </p>
            </div>
          `

          const aboutVerseOne = document.createElement('div')
          aboutVerseOne.classList.add('numVerse')

          const contentCopyOne = document.createElement('span')
          contentCopyOne.innerHTML = 
          `
            <img class='copyIcon' src=${require('../Images/copy.png')} alt='test' />
          `

          const contentVerseOneId = document.createElement('span')
          contentVerseOneId.innerHTML =
          `
            <p class='numS'>
            [ ${element.aya.prev_aya.sura_arabic} - ${element.aya.prev_aya.id} ]
            </p>
          `

          contentCopyOne.addEventListener('click', function(){
            navigator.clipboard.writeText(`${contentVerseOne.outerText} - ${contentVerseOneId.outerText}`)
            console.log(contentVerseOne.innerText)

            const alertCopy = document.createElement('div')
          
            alertCopy.style.zIndex = '2100'

            alertCopy.innerText = 'تم نسخ الآية'
            document.body.append(alertCopy)
            alertCopy.classList.add('copy')
            setTimeout(() => {
              alertCopy.remove()
            }, 700);
          })

          const contentVerseTwo = document.createElement('div')
          contentVerseTwo.innerHTML =
          `
            <div class='finalResTwo'>
            <p style='color: white'> 
            ${element.aya.text}
            </p>
            </div>
          `

          const aboutVerseTwo = document.createElement('div')
          aboutVerseTwo.classList.add('numVersePlus')

          const contentCopyTwo = document.createElement('span')
          contentCopyTwo.innerHTML = 
          `
            <img class='copyIcon' src=${require('../Images/copy.png')} alt='test' />
          `

          const contentVerseTwoId = document.createElement('span')
          contentVerseTwoId.innerHTML =
          `
            <p class='numS'>
            [ ${element.identifier.sura_arabic_name} - ${element.aya.id} ]
            </p>
          `

          contentCopyTwo.addEventListener('click', function(){
            navigator.clipboard.writeText(`${contentVerseTwo.outerText} - ${contentVerseTwoId.outerText}`)
            console.log(contentVerseTwo.innerText)

            const alertCopy = document.createElement('div')
          
            alertCopy.style.zIndex = '2100'

            alertCopy.innerText = 'تم نسخ الآية'
            document.body.append(alertCopy)
            alertCopy.classList.add('copy')
            setTimeout(() => {
              alertCopy.remove()
            }, 700);
          })

          const contentVerseThree = document.createElement('div')
          contentVerseThree.innerHTML =
          `
            <div class='finalResTwo'>
            <p style='color: white'> 
            ${element.aya.next_aya.text}
            </p>
            </div>
          `

          const aboutVerseThree = document.createElement('div')
          aboutVerseThree.classList.add('numVerse')

          const contentCopyThree = document.createElement('span')
          contentCopyThree.innerHTML = 
          `
            <img class='copyIcon' src=${require('../Images/copy.png')} alt='test' />
          `

          const contentVerseThreeId = document.createElement('span')
          contentVerseThreeId.innerHTML =
          `
            <p class='numS'>
            [ ${element.aya.next_aya.sura_arabic} - ${element.aya.next_aya.id} ]
            </p>
          `

          contentCopyThree.addEventListener('click', function(){
            navigator.clipboard.writeText(`${contentVerseThree.outerText} - ${contentVerseThreeId.outerText}`)
            console.log(contentVerseThree.innerText)

            const alertCopy = document.createElement('div')
            
            alertCopy.style.zIndex = '2100'
          
            alertCopy.innerText = 'تم نسخ الآية'
            document.body.append(alertCopy)
            alertCopy.classList.add('copy')
            setTimeout(() => {
              alertCopy.remove()
            }, 700);
          })
          
          const contentAbout = document.createElement('div')
          contentAbout.innerHTML =
          `
            <div class='ayaAbout'>
            <p>
            أسماء الجلالة : <span class='match'>${element.stat.godnames}</span> 
            </p>
            <p>
            عدد الحروف : <span class='match'>${element.stat.letters}</span>
            </p>
            <p>
            عدد الكلمات : <span class='match'>${element.stat.words}</span>
            </p>
            <p>
            الجزء : <span class='match'>${element.position.juz}</span>
            </p>
            <p>
            رقم الصفحة : <span class='match'>${element.position.page}</span>
            </p>
            <p>
            الترتيب : <span class='match'>${element.identifier.gid}</span>
            </p>
            </div>
          `
          
          document.body.append(contentAll)
          contentAll.append(content)

          content.append(contentAudio)

          content.append(contentVerseOne)
          content.append(aboutVerseOne)
          aboutVerseOne.append(contentCopyOne)
          aboutVerseOne.append(contentVerseOneId)

          content.append(contentVerseTwo)
          content.append(aboutVerseTwo)
          aboutVerseTwo.append(contentCopyTwo)
          aboutVerseTwo.append(contentVerseTwoId)

          content.append(contentAbout)

          content.append(contentVerseThree)
          content.append(aboutVerseThree)
          aboutVerseThree.append(contentCopyThree)
          aboutVerseThree.append(contentVerseThreeId)

          hiddenContent.addEventListener('click', function(){
            hiddenContent.style.transform = 'translateX(-100%)'
            contentAll.style.transform = 'translateY(10%)'
            contentAll.style.opacity = '0'
            document.body.style.overflow = 'auto'
            setTimeout(() => {
              hiddenContent.remove()
              contentAll.remove()
            }, 700);
          })

        } )
        // <div class='numTwo' >
        // </div>

        final.append(div)
        final.append(div0)
        div0.append(div2)
        div0.append(div3)
        
        let i = 0
        console.log(i)

        if(window.outerWidth <= 321 ){
          i = window.innerHeight - 370
        } else if(window.outerWidth <= 400 ){
          i = window.innerHeight - 325
        } else if(window.outerWidth <= 700 ){
          i = window.innerHeight - 275
        } else if(window.outerWidth <= 830 ){
          i = window.innerHeight - 230
        } else if(window.outerWidth > 831){
          i = window.innerHeight - 180
        }

        document.documentElement.scrollBy(0, i)
        console.log(i)
      }
    }
  }

  const apiSearchPlus = async (word) => {

    hiddenPrev()

    const apiA = await axios.get(`https://www.alfanous.org/api/search?query=${word}&perpage=25&page=1`)
    // console.log(apiA.data.search);
    // console.log(apiA.request.responseURL)
    setresults(apiA.data.search)

    console.log(apiA.data.search.interval)

    setalter(apiA.data.search.words.individual[1].derivations)
    // console.log(apiA.data.search.words.individual[1].derivations);

    for (const s in apiA.data.search.ayas) {
      if (apiA.data.search.ayas.hasOwnProperty.call(apiA.data.search.ayas, s)) {
        const element = apiA.data.search.ayas[s];    
  
        const final = document.querySelector('.final')

        const div = document.createElement('h3')
        div.innerHTML = 
        `
          <div class='finalRes'>
            <p> 
            ${element.aya.text}
            </p>
          </div>
  
        `

        const div0 = document.createElement('div')
        div0.classList.add('num')

        const div2 = document.createElement('span')
        div2.innerHTML = 
        `
          <img class='copyIcon' src=${require('../Images/copy.png')} alt='test' />
        `

        const div3 = document.createElement('span')
        div3.innerHTML = 
        `
          <p class='numS'>
          [ ${element.identifier.sura_arabic_name} - ${element.aya.id} ]
          </p>
        `


        div2.addEventListener('click', function(){
          navigator.clipboard.writeText(`${div.outerText} - ${div3.outerText}`)
          console.log(div.innerText)

          const alertCopy = document.createElement('div')
          
          alertCopy.innerText = 'تم نسخ الآية'
          document.body.append(alertCopy)
          alertCopy.classList.add('copy')
          setTimeout(() => {
            alertCopy.remove()
          }, 700);
        })

        div.addEventListener('click', function(){

          document.body.style.overflow = 'hidden'

          const contentAll = document.createElement('div')
          const hiddenContent = document.createElement('div')
          const content = document.createElement('div')

          hiddenContent.classList.add('hiddenContent')
          hiddenContent.style.zIndex = '2200'
          document.body.appendChild(hiddenContent)

          contentAll.classList.add('contentSearch')
          contentAll.style.zIndex = '2100'

          content.style.backgroundColor = theme.palette.search.main
          content.classList.add('contentSearchIn')
          const contentAudio = document.createElement('div')
          contentAudio.innerHTML = 
          `
            <div class='ayaAudio'>
              <audio autoplay controls src='${element.aya.recitation}' />
            </div>
          `

          const contentVerseOne = document.createElement('div')
          contentVerseOne.innerHTML =
          `
            <div class='finalResTwo'>
            <p style='color: white'> 
            ${element.aya.prev_aya.text}
            </p>
            </div>
          `

          const aboutVerseOne = document.createElement('div')
          aboutVerseOne.classList.add('numVerse')

          const contentCopyOne = document.createElement('span')
          contentCopyOne.innerHTML = 
          `
            <img class='copyIcon' src=${require('../Images/copy.png')} alt='test' />
          `

          const contentVerseOneId = document.createElement('span')
          contentVerseOneId.innerHTML =
          `
            <p class='numS'>
            [ ${element.aya.prev_aya.sura_arabic} - ${element.aya.prev_aya.id} ]
            </p>
          `

          contentCopyOne.addEventListener('click', function(){
            navigator.clipboard.writeText(`${contentVerseOne.outerText} - ${contentVerseOneId.outerText}`)
            console.log(contentVerseOne.innerText)

            const alertCopy = document.createElement('div')

            alertCopy.style.zIndex = '2100'
            
            alertCopy.innerText = 'تم نسخ الآية'
            document.body.append(alertCopy)
            alertCopy.classList.add('copy')
            setTimeout(() => {
              alertCopy.remove()
            }, 700);
          })

          const contentVerseTwo = document.createElement('div')
          contentVerseTwo.innerHTML =
          `
            <div class='finalResTwo'>
            <p style='color: white'> 
            ${element.aya.text}
            </p>
            </div>
          `

          const aboutVerseTwo = document.createElement('div')
          aboutVerseTwo.classList.add('numVersePlus')

          const contentCopyTwo = document.createElement('span')
          contentCopyTwo.innerHTML = 
          `
            <img class='copyIcon' src=${require('../Images/copy.png')} alt='test' />
          `

          const contentVerseTwoId = document.createElement('span')
          contentVerseTwoId.innerHTML =
          `
            <p class='numS'>
            [ ${element.identifier.sura_arabic_name} - ${element.aya.id} ]
            </p>
          `

          contentCopyTwo.addEventListener('click', function(){
            navigator.clipboard.writeText(`${contentVerseTwo.outerText} - ${contentVerseTwoId.outerText}`)
            console.log(contentVerseTwo.innerText)

            const alertCopy = document.createElement('div')
          
            alertCopy.style.zIndex = '2100'

            alertCopy.innerText = 'تم نسخ الآية'
            document.body.append(alertCopy)
            alertCopy.classList.add('copy')
            setTimeout(() => {
              alertCopy.remove()
            }, 700);
          })

          const contentVerseThree = document.createElement('div')
          contentVerseThree.innerHTML =
          `
            <div class='finalResTwo'>
            <p style='color: white'> 
            ${element.aya.next_aya.text}
            </p>
            </div>
          `

          const aboutVerseThree = document.createElement('div')
          aboutVerseThree.classList.add('numVerse')

          const contentCopyThree = document.createElement('span')
          contentCopyThree.innerHTML = 
          `
            <img class='copyIcon' src=${require('../Images/copy.png')} alt='test' />
          `

          const contentVerseThreeId = document.createElement('span')
          contentVerseThreeId.innerHTML =
          `
            <p class='numS'>
            [ ${element.aya.next_aya.sura_arabic} - ${element.aya.next_aya.id} ]
            </p>
          `

          contentCopyThree.addEventListener('click', function(){
            navigator.clipboard.writeText(`${contentVerseThree.outerText} - ${contentVerseThreeId.outerText}`)
            console.log(contentVerseThree.innerText)

            const alertCopy = document.createElement('div')

            alertCopy.style.zIndex = '2100'
          
            alertCopy.innerText = 'تم نسخ الآية'
            document.body.append(alertCopy)
            alertCopy.classList.add('copy')
            setTimeout(() => {
              alertCopy.remove()
            }, 700);
          })
          
          const contentAbout = document.createElement('div')
          contentAbout.innerHTML =
          `
            <div class='ayaAbout'>
            <p>
            أسماء الجلالة : <span class='match'>${element.stat.godnames}</span> 
            </p>
            <p>
            عدد الحروف : <span class='match'>${element.stat.letters}</span>
            </p>
            <p>
            عدد الكلمات : <span class='match'>${element.stat.words}</span>
            </p>
            <p>
            الجزء : <span class='match'>${element.position.juz}</span>
            </p>
            <p>
            رقم الصفحة : <span class='match'>${element.position.page}</span>
            </p>
            <p>
            الترتيب : <span class='match'>${element.identifier.gid}</span>
            </p>
            </div>
          `
          
          document.body.append(contentAll)
          contentAll.append(content)

          content.append(contentAudio)

          content.append(contentVerseOne)
          content.append(aboutVerseOne)
          aboutVerseOne.append(contentCopyOne)
          aboutVerseOne.append(contentVerseOneId)

          content.append(contentVerseTwo)
          content.append(aboutVerseTwo)
          aboutVerseTwo.append(contentCopyTwo)
          aboutVerseTwo.append(contentVerseTwoId)

          content.append(contentAbout)

          content.append(contentVerseThree)
          content.append(aboutVerseThree)
          aboutVerseThree.append(contentCopyThree)
          aboutVerseThree.append(contentVerseThreeId)

          hiddenContent.addEventListener('click', function(){
            hiddenContent.style.transform = 'translateX(-100%)'
            contentAll.style.transform = 'translateY(10%)'
            contentAll.style.opacity = '0'
            document.body.style.overflow = 'auto'
            setTimeout(() => {
              hiddenContent.remove()
              contentAll.remove()
            }, 700);
          })

        } )
        // <div class='numTwo' >
        // </div>

        final.append(div)
        final.append(div0)
        div0.append(div2)
        div0.append(div3)
  
      }
    }
  }

  // console.log(query)
  // console.log(num);

  const saving = JSON.parse(localStorage.getItem('element'))
  const [saved, setsaved] = useState(localStorage.getItem('element') ? saving : [])

  useEffect(()=>{
    localStorage.setItem('element', JSON.stringify(saved))
    
    const saveds = document.querySelectorAll('.saved')
    saveds.forEach((ele)=>{
      ele.classList.add('down')
      setTimeout(() => {
        ele.classList.remove('down')
      }, 1000);
    })
  },[saved])

  return (
  <div style={{
    backgroundColor: theme.palette.search.main,
    minHeight: 'calc(100vh - 54px)' ,
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
          }} >
            البحث
          </Typography>
        </Toolbar>
    </AppBar>

    <div style={{
      direction: 'rtl'
    }}>
      <div className='searchBox' style={{
        // backgroundColor: theme.palette.search.main,
      }} >
      
        <div className='inputBox' style={{
          display: 'flex',
          gap: '20px'
        }}>
          <input
          style={{
          padding: '20px',
          backgroundColor: theme.palette.blue.main ,
          color: theme.palette.blue.text ,
          border: '0',
          boxShadow: '0 0 10px' + theme.palette.blue.main
        }} 
          className='inputSearch' 
          type='text' 
          placeholder='اكتب كلمة أو آية ...'/>
          
          <Button variant='contained' style={{
            padding: '0 30px' ,
            fontSize: '20px' ,
            backgroundColor: theme.palette.red.main,
            color: theme.palette.red.text,
            fontFamily: 'Marhey' ,
            maxWidth: '50%',
            boxShadow: '0 0 10px' + theme.palette.red.main
          }}
          onClick={()=>{
          // const inputBox = document.querySelector('.inputBox')
          const inputSearch = document.querySelector('.inputSearch')

          if(inputSearch.value !== ''){
            // inputBox.classList.add('inputBoxToTop')
            // document.body.style.overflow = 'hidden'

            // setTimeout(() => {
            //   apiSearch(inputSearch.value)
            //   setquery(inputSearch.value)
            //   setnum(2)

            //   document.body.style.overflow = 'auto'

            //   inputSearch.value = ''

            // }, 500);
            
              apiSearch(inputSearch.value)
              
              setquery(inputSearch.value)
              setnum(2)

              inputSearch.value = ''

          } else {
            console.log('empty ..')
          }
          }}
          >
            إبحث
          </Button>
        </div>

        {
        saved.length ? 
        <div style={{
          display: 'flex' ,
          justifyContent: 'center' ,
          alignItems: 'center' ,
          gap: '20px' ,
          padding: '20px' ,
          flexWrap: 'wrap' ,
        }}
        className='savedContent'
        >
        {
          saved.sort((a,b) => b.date - a.date).map((e,k)=>{
            return(
            k < 5 &&
              <div key={k} className='saved' style={{
                  
              }}>
                <div className='xMark' onClick={()=>{
                const saveds = document.querySelectorAll('.saved')
                  saveds.forEach((ele)=>{
                    ele.classList.add('down')
                    setTimeout(() => {
                      ele.classList.remove('down')
                    }, 1000);
                  })

                  setTimeout(() => {
                    setsaved(saved.filter((ele) => ele.date !== e.date))
                  }, 500);
                }}
                >
                  <FontAwesomeIcon icon={faDeleteLeft} style={{
                    color: 'rgba(255,255,255, 0.7)'
                  }} />
                </div>
                <p   onClick={()=>{
                // const inputBox = document.querySelector('.inputBox')

                // inputBox.classList.add('inputBoxToTop')
                  apiSearchPlus(e.word)
                  setquery(e.word)
                  setnum(2)

                  const saveds = document.querySelectorAll('.saved')
                  saveds.forEach((ele)=>{
                    ele.classList.add('down')
                    setTimeout(() => {
                      ele.classList.remove('down')
                    }, 1000);
                  })
                }}>
                  {e.word}
                </p>
              </div>
            )
          })
        }
        </div>
        :
        ''
      }

      </div>
        
      { alter.length ?
        <div style={{
          color: '#FCBC09' ,
          display: 'flex' ,
          justifyContent: 'center' ,
          alignItems: 'center' ,
          gap: '10px' ,
          padding: '20px' ,
          flexWrap: 'wrap' ,
          borderTop: `20px solid #8a92a554`,
          borderBottom: `20px solid #8a92a554`,
        }}>
          <p style={{
            color: 'white',
            padding: '10px',
            fontFamily: 'hafs',
            fontSize: '20px'
          }}>
          كلمات ذات صلة :
          </p>
            {
              alter.map((e,k)=>{
                return (
                  <p key={k}
                  className='related'
                  onClick={()=>{
                    apiSearchPlus(e)
                    setquery(e)
                    setnum(2)
                  }}
                  >
                    {e}
                  </p>
                )
              })
            }  
        </div>
        :
        ''
      }

      <div className='qs'>
        {
          query !== '' && results.interval ?
            <div className='resultsBar' style={{
              position: 'sticky',
              top: '54px' ,
              padding: '15px',
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: theme.palette.search.main
            }}>
              <p>
                كلمة البحث : <span className='match match2'>{query}</span>
              </p>
              {
                results.interval.total > 0 ?
                <div style={{
                  padding: '10px',
                  display: 'flex',
                  gap: '20px',
                  flexWrap: 'wrap',
                  justifyContent: 'space-around'
                }} className='rrr'>
                  <p>
                  عدد الآيات : <span className='match'>{results.interval.total}</span>
                  </p>
                  <p>
                  عدد التكرارات : <span className='match'>{results.words.global.nb_matches}</span>
                  </p>
                  <p>
                  عدد الصفحات : <span className='match'>{results.interval.nb_pages}</span>
                  </p>
                  <p>
                  الصفحة : <span className='match'>{results.interval.page}</span>
                  </p>
                  <p>
                  من <span className='match'>{results.interval.start}</span> إلي <span className='match'>{results.interval.end}</span>
                  </p>
                </div>
              :
              'لا توجد نتائج'
              }
          </div>  
          :
          ''
        }
        
        <div className='final'></div>
        
        {
          results.interval && num <= results.interval.nb_pages ?
          <div className='moreBtn'>
            <Button variant='contained' onClick={()=>{
              apiSearchTwo()
              setnum(num + 1)
            }}
            style={{
              padding: '5px 40px' ,
              cursor: 'pointer' ,
              backgroundColor: theme.palette.purple.main  ,
              color: theme.palette.purple.text ,
              fontSize: 'larger',
              fontFamily: 'Marhey'
            }}    
            >
              نتائج أكثر
            </Button>
          </div>
          :
          ''  
        }
      </div>
    </div>

    <Extras setmode={setmode} theme={theme}/>
  </div>
  );
}

export default Search;
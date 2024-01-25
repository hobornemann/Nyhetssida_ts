// @ts-nocheck   // This command makes sure that the js-file is not checked as a ts-file when the tsc compiler runs

import { getNewsData } from "./modules/render-news";


getNewsData(); 
// --------------------------Header-menu--------------------------------
const header = document.querySelector('.filter-cont'); 
const headerMenu = document.querySelector('.top-right-menu'); 
headerMenu.addEventListener('click', () => {
    header.classList.toggle('show-menu')
})

// ----------------------SHOW MORE BUTTON--------------------------------
const mainContentContainer = document.querySelector('.main-news-content'); 
mainContentContainer.addEventListener('click', (el) => {
    const showMoreIkon = document.querySelectorAll('.show-more-cont img'); 
    const showMoreContent = document.querySelectorAll('.content');
    const target = el.target;
    console.log(target)
    
    showMoreIkon.forEach((ikon,index) => {
        if(target === ikon){
            showMoreContent[index].classList.toggle('show-more');
            
            if(showMoreContent[index].classList.contains('show-more')) 
                return ikon.style.transform ='rotate(180deg)'; 
            return ikon.style.transform ='rotate(0deg)'
        }
    })
}) 
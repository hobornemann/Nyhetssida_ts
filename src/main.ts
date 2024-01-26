// @ts-nocheck   
// The above command makes sure that the js-file is not checked as a ts-file when the tsc compiler runs

import { getNewsData } from "./modules/render-news";


getNewsData(); 
// ------------------------------Header--------------------------------
const header = document.querySelector('header')!;
const dateInput = document.querySelector<HTMLInputElement>('.date-for-filter-search')!; 
header.addEventListener('click', (el: MouseEvent) => {
    const optionsInHeader: HTMLLIElement = document.querySelector('.filter-cont')!; 
    const headerMenu = document.querySelector('.top-right-menu'); 
    const target: EventTarget | null = el.target; 
    // console.log(dateInput.value)
    if(target === headerMenu) return optionsInHeader.classList.toggle('show-menu'); 
    if(target === headerInput){
        return dateInput.classList.add('show-date');
    } else if(dateInput.classList.contains('show-date') && target !== dateInput){
        return dateInput.classList.remove('show-date');
    }
})

// ---------------------------Search for articles-----------------------------
const headerInput = document.querySelector<HTMLInputElement>('#header-input')!;
const formInHeader = document.querySelector<HTMLInputElement>('.filter-cont')!;
formInHeader.addEventListener('submit', (el: SubmitEvent) => {
    el.preventDefault(); 
  
    const keyWord: string | null = headerInput.value; 
    const date: string | null = dateInput.value; 
    headerInput.value = '' 

    if(keyWord){
       const url: string  = `https://newsapi.org/v2/everything?q=${keyWord}&from=${date}&sortBy=popularity&apiKey=${import.meta.env.VITE_NEWS_API}`
       getNewsData(url); 
        return
    } else if(!keyWord){
        headerInput.value = 'Input is empty..';
        setTimeout(() => {
            headerInput.value = '';
        }, 5000);
    }
}); 

const filterContEl = document.querySelector('.filter-cont'); 
filterContEl?.addEventListener('click', (el: Event) => {
    const filterOptions = document.querySelectorAll<HTMLParagraphElement>('.filter-options p'); 
    const categories = document.querySelectorAll<HTMLUListElement>('.categories');
    const chevronButtonsImage = document.querySelectorAll<HTMLImageElement>('.chevron-button img')
    const target: EventTarget | null = el.target; 
    
    filterOptions.forEach((option: HTMLParagraphElement, index: number) => {
        if((target === option || target == chevronButtonsImage[index]) && categories){        
            categories[index].dataset.showOptions='true'; 
            return
        } 
        
        if(target !== option && index < 2 && categories) {
            categories[index].dataset.showOptions='false'
        }
    })
})
const categoryOptions = document.querySelectorAll<HTMLLIElement>('.category-option')
categoryOptions.forEach((category: HTMLLIElement) => {
    category.addEventListener('click', () => {
        const keyWord = category.dataset.name; 
        const parentEl = document.querySelectorAll('.categories'); 
        const APIkey: string = import.meta.env.VITE_NEWS_API;

        if(keyWord && category.closest('.categories') === parentEl[0]){
            let url = `https://newsapi.org/v2/top-headlines?sources=${keyWord}&apiKey=${APIkey}` 
            if(keyWord === 'General'){
                url = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${APIkey}`
                getNewsData(url);
                return
            }

            getNewsData(url);
            return 
        }

        if(keyWord && category.closest('.categories') === parentEl[1]){
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=sports&q=${keyWord}&apiKey=${APIkey}`
            getNewsData(url);
            return 
        }

    })

})

// ----------------------SHOW MORE BUTTON--------------------------------
const mainContentContainer = document.querySelector<HTMLUListElement>('.main-news-content')!; 
mainContentContainer.addEventListener('click', (el) => {
    const showMoreIcon = document.querySelectorAll<HTMLImageElement>('.show-more-cont img'); 
    const showMoreContent = document.querySelectorAll('.content');
    const target = el.target;
    console.log(target)
    
    showMoreIcon.forEach((icon:HTMLImageElement,index:number) => {
        if(target === icon){
            showMoreContent[index].classList.toggle('show-more');
            
            if(showMoreContent[index].classList.contains('show-more')) 
                return icon.style.transform ='rotate(180deg)'; 
            return icon.style.transform ='rotate(0deg)'
        }
    })
}) 
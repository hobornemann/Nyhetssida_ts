// @ts-nocheck   
// The above command makes sure that the js-file is not checked as a ts-file when the tsc compiler runs

import { getNewsData, renderNewsHTML, asideNewsfunctionality  } from "./modules/render-news";
import { getArticlesFromLocalStorage, setArticlesInLocalStorage } from "./modules/model";
import { Article, Articles } from "./types/article";
import {updateFavouriteButtonsOfRenderedArticles, addEventListenersToFavouriteButtons, firstStepsToSaveArticleAsFavourite} from "./modules/favourites";
import { currentDisplayUrl} from "./modules/localStorage";
import { Data, getLiveShares, renderLiveShareHTML, saveShares } from "./modules/liveShares";


getNewsData(); 
// ------------------------------Header--------------------------------
const header = document.querySelector('header');
const categories: NodeListOf<HTMLUListElement> = document.querySelectorAll('.categories');

if(header !== null){
    header.addEventListener('click', (el: MouseEvent) => {
        const optionsInHeader = document.querySelector('.filter-cont') as HTMLLIElement;
        const headerMenu = document.querySelector('.top-right-menu') as HTMLImageElement;  
        const target: EventTarget | null = el.target; 
        // console.log(dateInput.value)
        if(optionsInHeader && target === headerMenu) return optionsInHeader.classList.toggle('show-menu'); 
        // if(dateInput && target === headerInput) return dateInput.classList.add('show-date');  
        // if(dateInput && dateInput.classList.contains('show-date') && target !== dateInput) 
        // return dateInput.classList.remove('show-date');
    
    })
} else {
    console.log('Header is null'); 
}

// ---------------------------Search for articles-----------------------------
const headerInput = document.querySelector('#header-input') as HTMLInputElement;
const formInHeader  = document.querySelector('.filter-cont') as HTMLInputElement;

if(formInHeader !== null){
    formInHeader.addEventListener('submit', (el: SubmitEvent) => {
        el.preventDefault(); 

        const keyWord: string | null = headerInput ? headerInput.value : null 
        // const date: string | null = dateInput ? dateInput.value : null
        headerInput!.value = '';
        
        if(keyWord){
            formInHeader.classList.remove('show-menu')
            const url: string  = `https://newsapi.org/v2/everything?q=${keyWord}&sortBy=popularity&pageSize=10&page=1&apiKey=${import.meta.env.VITE_NEWS_API}`
            getNewsData(url); 
            if(activePageBorder) activePageBorder.style.left = '0%';

        } else if(!keyWord && headerInput){
            headerInput.placeholder = 'Input is empty..';
            setTimeout(() => {
                headerInput.placeholder = '';
            }, 5000);
        }
    }); 
}

const filterContEl = document.querySelector('.filter-cont'); 
filterContEl?.addEventListener('click', (el: Event) => {
    const filterOptions: NodeListOf<HTMLParagraphElement> = document.querySelectorAll('.filter-options p'); 
    const chevronButtonsImage: NodeListOf<HTMLImageElement> = document.querySelectorAll('.chevron-button img');
    const target = el.target as EventTarget; 
    
    filterOptions.forEach((option, index: number) => {
        if((target === option || target == chevronButtonsImage[index])) return categories[index].classList.toggle('show-options'); 
        if(target !== option && categories[index]) return categories[index].classList.remove('show-options')
    });
});

const categoryOptions: NodeListOf<HTMLLIElement> = document.querySelectorAll('.category-option');
categoryOptions.forEach((category: HTMLLIElement) => {
    category.addEventListener('click', () => {
        const keyWord = category.dataset.name; 
        const parentEl: NodeListOf<HTMLUListElement> = document.querySelectorAll('.categories'); 
        const newsSources = parentEl[0];
        const sportCategories = parentEl[1];
        const favouriteCategory = parentEl[2];
        const APIkey: string = import.meta.env.VITE_NEWS_API;
        if(activePageBorder) activePageBorder.style.left = '0%';
        if(formInHeader) formInHeader.classList.remove('show-menu')

        if(keyWord && category.closest('.categories') === newsSources){
            let url = `https://newsapi.org/v2/top-headlines?sources=${keyWord}&pageSize=10&page=1&apiKey=${APIkey}` 
            if(keyWord === 'General'){
                url = `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=10&page=1&apiKey=${APIkey}`
                getNewsData(url);
                return
            }
            getNewsData(url);
            return 
        }

        if(keyWord && category.closest('.categories') === sportCategories){
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=sports&pageSize=10&page=1&q=${keyWord}&apiKey=${APIkey}`
            getNewsData(url);        
            return 
        }

        if(keyWord && category.closest('.categories') === favouriteCategory){
            if(keyWord === 'Favourites'){               
                let favouriteArticles: Article[] | undefined = getArticlesFromLocalStorage('favouriteArticles')
                let data: Articles = {};
                if(favouriteArticles){
                    data.articles = favouriteArticles
                    renderNewsHTML(data)
                    // setArticlesInLocalStorage('renderedArticles', data.articles)
                    // updateFavouriteButtonsOfRenderedArticles();
                    // addEventListenersToFavouriteButtons();
                } else {
                    const newsCont = document.querySelector('.main-news-content') as HTMLUListElement; 
                    if(newsCont && data.articles.length < 1){
                        return newsCont.innerHTML = "You have not stored any favourite articles yet."
                    } 
                }
            }
            return 
        }
    })
}); 

// ---------------------------------------------------------------------
//                                PAGES                                 |
// ---------------------------------------------------------------------
const pages: NodeListOf<HTMLLIElement> = document.querySelectorAll('.page'); 
const activePageBorder = document.querySelector('.active-page') as HTMLDivElement;
pages.forEach((page) => {
    page.addEventListener('click', () => {
        if(Number(page.textContent) > currentDisplayUrl.pages) return // Lämnar funktionen

        const indexInReplaceMetod = 7;
        const currentPage = Number(page.textContent);
        const redBorderPos = (currentPage * 10) - 10;
        if(activePageBorder) activePageBorder.style.left = `${redBorderPos}%`;
        
        currentDisplayUrl.url = (currentDisplayUrl.url.replace(currentDisplayUrl.url.substring(currentDisplayUrl.url.indexOf('page='), currentDisplayUrl.url.indexOf('page=') + indexInReplaceMetod), `page=${currentPage}&`))
        getNewsData(currentDisplayUrl.url); 
        // console.log(currentDisplayUrl.url)
    });
});

// ----------------------SHOW MORE BUTTON--------------------------------
const mainContentContainer = document.querySelector('.main-news-content') as HTMLUListElement; 
mainContentContainer.addEventListener('click', (el) => {
    const showMoreIcon: NodeListOf<HTMLImageElement> = document.querySelectorAll('.show-more-cont img'); 
    const showMoreContent = document.querySelectorAll('.content');
    const target = el.target as EventTarget;
    // console.log(target)

    showMoreIcon.forEach((icon:HTMLImageElement,index:number) => {
        if(target === icon){
            showMoreContent[index].classList.toggle('show-more');
            
            if(showMoreContent[index].classList.contains('show-more')) 
                return icon.style.transform ='rotate(180deg)'; 
            return icon.style.transform ='rotate(0deg)'
        }
    })
})

// ----------------------SHOW FAVOURITE ARTICLES BUTTON--------------------------------
const showFavouriteArticlesButton = document.querySelector(".show-favourite-articles-button") as HTMLButtonElement
if(showFavouriteArticlesButton){
    showFavouriteArticlesButton.addEventListener('click', (): void => {
        let favouriteArticles: Article[] | undefined = getArticlesFromLocalStorage('favouriteArticles')
        let data: Articles
        data.articles = favouriteArticles
        if(favouriteArticles){
            renderNewsHTML(data)
        } else {
            const newsCont = document.querySelector('.main-news-content') as HTMLUListElement; 
            if(newsCont && data.articles.length < 1){
                return newsCont.innerHTML = "You have not stored any favourite articles yet."
            } 
        }
    })
}
// -------------------ADD TO FAVOURITE ADDEVENTLISTENER----------------------
const gridLayout = document.querySelector('.grid-layout') as HTMLDivElement; 
gridLayout.addEventListener('click', (el) => {
    const button = el.target as HTMLButtonElement;
    if(button.dataset.url) firstStepsToSaveArticleAsFavourite(button);
});

// ------------------------------RENDER SIDE-NEWS-------------------------------------------------
const nasdaq100CurrentPrice = getLiveShares; 
const nasdaq100EndOfPrice = getLiveShares; 
Promise.all([nasdaq100CurrentPrice(['MSFT', 'AAPl', 'AMZN', 'META'], 'price'), nasdaq100EndOfPrice(['MSFT', 'AAPl', 'AMZN', 'META'], 'eod')])
.then((values => {
    renderLiveShareHTML(values);
    setInterval(() => {
        renderLiveShareHTML(values)
    }, 5000 * 60);
}));

getNewsData(`https://newsapi.org/v2/everything?q=technology&sortBy=popularity&apiKey=${import.meta.env.VITE_NEWS_API}`, 1, 'aside');



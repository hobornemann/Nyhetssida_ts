// @ts-nocheck   
// The above command makes sure that the js-file is not checked as a ts-file when the tsc compiler runs

import { getArticlesFromLocalStorage, setArticlesInLocalStorage } from "./modules/model";
import { getNewsData, renderNewsHTML } from "./modules/render-news";
import { Article } from "./types/article";


getNewsData(); 
// ------------------------------Header--------------------------------
const header = document.querySelector('header');
const dateInput: HTMLInputElement | null = document.querySelector('.date-for-filter-search');

if(header !== null){
    header.addEventListener('click', (el: MouseEvent) => {
        const optionsInHeader: HTMLLIElement |null = document.querySelector('.filter-cont'); 
        const headerMenu: HTMLImageElement | null = document.querySelector('.top-right-menu'); 
        const target: EventTarget | null = el.target; 
        // console.log(dateInput.value)
        if(optionsInHeader && target === headerMenu) return optionsInHeader.classList.toggle('show-menu'); 
        if(dateInput && target === headerInput) return dateInput.classList.add('show-date');  
        if(dateInput && dateInput.classList.contains('show-date') && target !== dateInput)
            return dateInput.classList.remove('show-date');
    })
} else {
    console.log('Header is null'); 
}

// ---------------------------Search for articles-----------------------------
const headerInput: HTMLInputElement | null = document.querySelector('#header-input');
const formInHeader: HTMLInputElement | null = document.querySelector('.filter-cont');

if(formInHeader !== null){
    formInHeader.addEventListener('submit', (el: SubmitEvent) => {
        el.preventDefault(); 

        const keyWord: string | null = headerInput ? headerInput.value : null 
        const date: string | null = dateInput ? dateInput.value : null
        headerInput!.value = '';

        if(keyWord){
            const url: string  = `https://newsapi.org/v2/everything?q=${keyWord}&from=${date}&sortBy=popularity&apiKey=${import.meta.env.VITE_NEWS_API}`
            getNewsData(url); 

        } else if(!keyWord && headerInput){
            headerInput.value = 'Input is empty..';
            setTimeout(() => {
                headerInput.value = '';
            }, 5000);
        }
    }); 
}

const filterContEl = document.querySelector('.filter-cont'); 
filterContEl?.addEventListener('click', (el: Event) => {
    const filterOptions: NodeListOf<HTMLParagraphElement> = document.querySelectorAll('.filter-options p'); 
    const categories: NodeListOf<HTMLUListElement> = document.querySelectorAll('.categories');
    const chevronButtonsImage: NodeListOf<HTMLImageElement> = document.querySelectorAll('.chevron-button img');
    const target: EventTarget | null = el.target; 
    
    filterOptions.forEach((option, index: number) => {
        if((target === option || target == chevronButtonsImage[index])) return categories[index].dataset.showOptions='true'; 
        if(target !== option && categories[index]) return categories[index].dataset.showOptions='false';
    });
});

const categoryOptions: NodeListOf<HTMLLIElement> = document.querySelectorAll('.category-option');
categoryOptions.forEach((category: HTMLLIElement) => {
    category.addEventListener('click', () => {
        const keyWord = category.dataset.name; 
        const parentEl: NodeListOf<HTMLUListElement> = document.querySelectorAll('.categories'); 
        const newsSources = parentEl[0]
        const sportCategories = parentEl[1]
        const APIkey: string = import.meta.env.VITE_NEWS_API;

        if(keyWord && category.closest('.categories') === newsSources){
            let url = `https://newsapi.org/v2/top-headlines?sources=${keyWord}&apiKey=${APIkey}` 
            if(keyWord === 'General'){
                url = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${APIkey}`
                getNewsData(url);
                return
            }
            getNewsData(url);
            return 
        }

        if(keyWord && category.closest('.categories') === sportCategories){
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=sports&q=${keyWord}&apiKey=${APIkey}`
            getNewsData(url);
            return 
        }
    })

})

// ----------------------SHOW MORE BUTTON--------------------------------
const mainContentContainer: HTMLUListElement | null = document.querySelector('.main-news-content'); 
if(mainContentContainer){
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
} else {
    console.log('main-news-container is null...');
}


// ----------------------UPDATE FAVOURITE BUTTONS--------------------------------
function updateFavouriteButtons(){

    
}



// ----------------------ADD EVENT LISTENERS TO FAVOURITE BUTTONS--------------------------------
function addEventListenersToFavouriteButtons(): void {
    try{
        const favouriteButtons: HTMLButtonElement[] | null = document.querySelectorAll(".favourite-button")    
        let favouriteArticles: Article[] | null = getArticlesFromLocalStorage('favouriteArticles')
        let renderedArticles: Article[] | null = getArticlesFromLocalStorage('renderedArticles')

        favouriteButtons.forEach(button => {
            button.addEventListener('click', (e: MouseEvent) => {
                let isFavourite: boolean = button.classList.contains("is-favourite-article")
                let urlOfClickedArticle: string = e.target.getAttribute('data-url')
                if(isFavourite){
                    button.innerText = "Save as favourite"
                    button.classList.remove("is-favourite-article")
                    let indexOfArticle: number = favouriteArticles.findIndex(article => article.url === urlOfClickedArticle);
                    favouriteArticles = favouriteArticles.filter(article => article.url !== urlOfClickedArticle)
                    setArticlesInLocalStorage('favouriteArticles', favouriteArticles)
                } else {
                    button.innerText = "Favourite"
                    button.classList.add("is-favourite-article")
                    let clickedArticles: Article[] | null = renderedArticles.find(article => article.url === urlOfClickedArticle);
                    clickedArticles[0].isFavourite = true
                    favouriteArticles.push(clickedArticle[0]) 
                    setArticlesInLocalStorage('favouriteArticles', favouriteArticles)
                }
            })
        })
    }
    catch(error:any){
        console.log("Error in favouriteButtons addEventListener functions", error.message)
    }  
}


// ----------------------SHOW FAVOURITE ARTICLES BUTTON--------------------------------
const showFavouriteArticlesButton: HTMLButtonElement | null = document.querySelector(".show-favourite-articles-button")
if(showFavouriteArticlesButton){
    showFavouriteArticlesButton.addEventListener('click', (): void => {
        let favouriteArticles: Article[] | undefined = getArticlesFromLocalStorage('favouriteArticles')
        let data: Articles
        data.articles = favouriteArticles
        if(favouriteArticles){
            renderNewsHTML(data)
        } else {
            const newsCont: HTMLUListElement | null = document.querySelector('.main-news-content'); 
            if(newsCont && data.articles.length < 1){
                return newsCont.innerHTML = "You have not stored any favourite articles yet."
            } 
        }
    })
}






   /*          
    if(favouriteButtons){
        try{
            
            if(favouriteArticles && renderedArticles){
                let favouriteUrls: string[] = favouriteArticles.map(favouriteArticle => favouriteArticle.url) 
                let renderedFavouriteArticles: Article[] = renderedArticles.filter(renderedArticle => favouriteUrls.includes(renderedArticle.url))
                if(renderedFavouriteArticles){
                    renderedFavouriteArticles.map(renderedFavouriteArticle => {
                        const favouriteButton = favouriteButtons.filter(button => 
                            button.getAttribute('data-url') === renderedFavouriteArticle.url)
                            favouriteButton[0].classList.add('isFavourite')
                            favouriteButton[0].innerText = "Favourite"
                    })
                }
            }
        }
        catch(error: any) { console.log("Error in XXX ", error.message)}

 */

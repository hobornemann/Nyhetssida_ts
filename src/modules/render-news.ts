// @ts-nocheck   
// The above command makes sure that the js-file is not checked as a ts-file when the tsc compiler runs

import axios from "axios";
import { Article, Articles } from "../types/article";
import { getArticlesFromLocalStorage, setArticlesInLocalStorage } from "./model";
import { updateFavouriteButtonsOfRenderedArticles, addEventListenersToFavouriteButtons } from "./favourites.ts";
import saveLocaleStorage, {currentDisplayUrl, renderedArticles} from "./localStorage";
// localStorage.clear();

export async function getNewsData(url: string | null = null, date=null, page:number = 1, container:string = 'main'){
  const APIkey: string = import.meta.env.VITE_NEWS_API; 
  const URL: string = (url) ? 
  url : `https://newsapi.org/v2/top-headlines?country=us&category=general&from=${date}&pageSize=10&page=${page}&apiKey=${APIkey}`;

  try {
    const response = await axios(URL);
    const data = await response.data; 
    console.log("data in render-news.ts", data); 
    
    // console.log(URL)
    
    // ------------------------FILTRERAR BORT ARTIKLAR MED NULL------------------------------
    const filteredArticles: Article[] = data.articles.filter((article: Article) => {
      let {author, url, urlToImage, source: {name}, title, description, content } = article;
      if(url && urlToImage && name && title && description && content) return article;  
    }); 

    const arrOfRenderedURL = renderedArticles.map((article) => article.url);     
    if(arrOfRenderedURL.length > 0){
       filteredArticles.forEach(article => {
        if(!arrOfRenderedURL.includes(article.url)) renderedArticles.push(article)
       })
      
    } else {
      filteredArticles.forEach(article => renderedArticles.push(article)); 
    }

    if(container === 'main') currentDisplayUrl.url = URL;
    renderNewsHTML(filteredArticles, container, data.totalResults); 
    setArticlesInLocalStorage('renderedArticles', renderedArticles);
    updateFavouriteButtonsOfRenderedArticles();
    // addEventListenersToFavouriteButtons(container);
  } catch (error) {
    console.log(error)
    console.log("ERROR when fetching in render-news.ts")
  }
}

export async function renderNewsHTML(articles: Article[], container: string = 'main', totalResults=null){
  const newsCont = (container === 'main') ? 
  document.querySelector('.main-news-content') as HTMLUListElement : 
  document.querySelector('.aside-news-content') as HTMLUListElement; 
  
  if(articles.length < 1){
    return newsCont.innerHTML = "Unfortunately, there are no news articles available for the choosen category/date/page. Please check back later for updates."
  }  

  // -----------------------------------CALC PAGE AMOUNT----------------------------------------------------------
  if(container === 'main'){
    currentDisplayUrl.pages = (totalResults) ? Math.ceil(totalResults / 10) : 1; 
    const amountOfPages: NodeListOf<HTMLParagraphElement> = document.querySelectorAll('.page p'); 
    amountOfPages.forEach((page, index: number) => {
      if(index >= currentDisplayUrl.pages) return page.classList.add('disabled-page-number');
      return page.classList.remove('disabled-page-number');
    });
  }
// ----------------------------------------------------------------------------------------------

  const html: string = articles.map(article => {
    let {author, url, urlToImage, source: {name}, title, description, content } = article;

    content = content.substring(0,content.indexOf('['));
    if(author == null) author = ''; 
    const hideContent: string = (container === 'aside') ? 'none' : '';  
    
    return `
    <li class="article-container" data-type="${container}">
      <a href="${url}" title="Visit the website"><h1>${name}</h1></a><button class="favourite-button" data-url="${url}">Save as Favourite</button>
      <div>
        <div class="article-content">
          <a href="${url}"><img src="${urlToImage}" alt="${name} headline picture"></a>
          <div class="title-container">
          <p style="padding: 10px 0px;"><b>Author: ${author}</b></p>
            <a href="${url}"><h2 class="title" title="Visit the website">${title}</h2></a>
            <p class="sub-title">${description}</p>
          </div>
        </div>
        <div class="show-more-cont" style="display: ${hideContent}">
          <div>
            <p>Show more</p>
            <img src="svg-icon/arrow-down-circle-svgrepo-com.svg" alt="">
          </div>
          <article class="content">
          ${content}
          <a href="${url}"><button class="visit-website-button">Visit ${name}</button>
          </article>
        </div>
      </div>
    </li>
    `
  }).join('');

  if(html.length < 1) return newsCont.innerText = "Unfortunately, there are no news articles available for the choosen category/date/page. Please check back later for updates."
  if(html.length > 1) newsCont.innerHTML = html; 
  if(container == 'aside') asideNewsfunctionality(articles.length);
}

export function asideNewsfunctionality(amountOfArticle: number){
  const asideNewsContainer = document.querySelector('.aside-news-content') as HTMLUListElement;
  const asideNewsContainerWidth = asideNewsContainer.offsetWidth * amountOfArticle; 
  let xCoord = 350;  
  
  asideNewsContainer.scroll({top: 0, left: xCoord, behavior: 'instant'});

  const setIntervalId = setInterval(() => {
    if(xCoord > asideNewsContainerWidth) {
      clearInterval(setIntervalId);
    } 

    asideNewsContainer.scroll({top: 0, left: xCoord, behavior: 'smooth'});
    xCoord += 350; 
  }, (6000 * 2))
}
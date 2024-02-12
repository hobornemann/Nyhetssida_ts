// @ts-nocheck   
// The above command makes sure that the js-file is not checked as a ts-file when the tsc compiler runs

import axios from "axios";
import { Article, Articles } from "../types/article";
import { getArticlesFromLocalStorage, setArticlesInLocalStorage } from "./model";
import { updateFavouriteButtonsOfRenderedArticles, addEventListenersToFavouriteButtons } from "./favourites.ts";
import saveLocaleStorage, {currentDisplayUrl} from "./localStorage";
// localStorage.clear();

export async function getNewsData(url: string | null = null, page:number = 1, container:string = 'main'){
  const APIkey: string = import.meta.env.VITE_NEWS_API; 
  const URL: string = (url) ? 
  url : `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=10&page=${page}&apiKey=${APIkey}`;

  try {
    const response = await axios(URL);
    const data = await response.data; 
    console.log("data in render-news.ts", data);    
    
    currentDisplayUrl.url = URL;
    renderNewsHTML(data, container); 
    setArticlesInLocalStorage('renderedArticles-' + container, data.articles)
    updateFavouriteButtonsOfRenderedArticles(container);
    // addEventListenersToFavouriteButtons(container);
  } catch (error) {
    console.log(error)
  }
}

export async function renderNewsHTML(data: Articles, container: string = 'main'){
  const newsCont = (container === 'main') ? 
  document.querySelector('.main-news-content') as HTMLUListElement : 
  document.querySelector('.aside-news-content') as HTMLUListElement; 
  
  if(data.articles.length < 1){
    return newsCont.innerHTML = "Unfortunately, there are no news articles available for the choosen category/date/page. Please check back later for updates."
  }  
  
  const filteredArticles: Article[] = data.articles.filter((article: Article) => {
    let {author, url, urlToImage, source: {name}, title, description, content } = article;
    if(url && urlToImage && name && title && description && content) return article;  
  }); 

  // -----------------------------------CALC PAGE AMOUNT----------------------------------------------------------
  if(container === 'main'){
    currentDisplayUrl.pages = (data.totalResults) ? Math.ceil(data.totalResults / 10) : 1; 
    const amountOfPages: NodeListOf<HTMLParagraphElement> = document.querySelectorAll('.page p'); 
    amountOfPages.forEach((page, index: number) => {
      if(index >= currentDisplayUrl.pages) return page.classList.add('disabled-page-number');
      return page.classList.remove('disabled-page-number');
    });
  }
  // ----------------------------------------------------------------------------------------------

  console.log(filteredArticles.length)

  const html: string = filteredArticles.map(article => {
    let {author, url, urlToImage, source: {name}, title, description, content } = article;
    // return // content.replace(/(<([^>]+)>)/gi, "")
    // console.log("article in renderNewsHTML",article)
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
  if(container == 'aside') asideNewsfunctionality(filteredArticles.length);
}

export function asideNewsfunctionality(amountOfArticle: number){
  const asideNewsContainer = document.querySelector('.aside-news-content') as HTMLUListElement;
  const asideNewsContainerWidth = asideNewsContainer.offsetWidth * amountOfArticle; 
  let xCoord = 350;  

  console.log(asideNewsContainerWidth)
  asideNewsContainer.scroll({top: 0, left: xCoord, behavior: 'instant'});

  const setIntervalId = setInterval(() => {
    if(xCoord > asideNewsContainerWidth) {
      clearInterval(setIntervalId);
      console.log('xCoord: ' + xCoord ); 
      xCoord = 0; 
      getNewsData(`https://newsapi.org/v2/everything?q=health&sortBy=popularity&apiKey=${import.meta.env.VITE_NEWS_API}`, 1, 'aside');
    } 

    asideNewsContainer.scroll({top: 0, left: xCoord, behavior: 'smooth'});
    xCoord += 350; 
  }, (6000 * 2))
}
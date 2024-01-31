// @ts-nocheck   
// The above command makes sure that the js-file is not checked as a ts-file when the tsc compiler runs

import axios from "axios";
import { Article, Articles } from "../types/article";
import saveLocaleStorage from "./localStorage";
// localStorage.clear();
export const currentDisplayUrl= JSON.parse(localStorage.getItem('activeUrl')) || []; 
export const maxPages = JSON.parse(localStorage.getItem('pages')) || []; 

export async function getNewsData(url: string | [] | null = null, key:string | null = null, page:number = 1){

  const APIkey: string = import.meta.env.VITE_NEWS_API; 
  const URL: string | [] = (url) ? 
  url : `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=10&page=${page}&apiKey=${APIkey}` 
  if(typeof URL === 'string') currentDisplayUrl[0] = (URL.substring(0, URL.indexOf('apiKey=')))

  try {
    const response =  (typeof URL === 'string') ? await axios(URL) : await axios(URL[0] + key);
    const data = await response.data; 
    console.log("data in render-news.ts", data);    
    
    maxPages[0] = (Math.ceil(data.totalResults / 10) > 10) ? 9 : Math.ceil(data.totalResults / 10); 
    saveLocaleStorage('activeUrl', JSON.stringify(currentDisplayUrl))
    saveLocaleStorage('pages', JSON.stringify(maxPages))

    // ---------------------------------------------------------------------------------------------
    const amountOfPages: NodeListOf<HTMLParagraphElement> = document.querySelectorAll('.page p'); 
    if(maxPages[0]) {
      amountOfPages.forEach((page, index) => {
        if(index >= maxPages[0]) return page.classList.add('disabled-page-number');
        return page.classList.remove('disabled-page-number');
      });
    }
    // ----------------------------------------------------------------------------------------------
    console.log(maxPages, currentDisplayUrl)
    renderNewsHTML(data); 
  } catch (error) {
    console.log(error)
  }
}

async function renderNewsHTML(data: Articles){
  const newsCont: HTMLUListElement | null = document.querySelector('.main-news-content'); 
  
  if(newsCont && data.articles.length < 1){
    return newsCont.innerHTML = "Unfortunately, there are no news articles available for the choosen category/date/page. Please check back later for updates."
  }  
  
  const html = data.articles.map((article: Article) => {
    let {author, url, urlToImage, source: {name}, title, description, content } = article;
    
    if(url === null || urlToImage === null || name === null || title === null || description === null || content === null )
      return // Objekt med null inuti ska ej visas på skärmen
  
    // content.replace(/(<([^>]+)>)/gi, "")
    content = content.substring(0,content.indexOf('['));
    if(author == null) author = ''; 
    
  // console.log("article in renderNewsHTML",article)

    return `
    <li class="article-container">
      <a href="${url}" title="Visit the website"><h1>${name}</h1></a>
      <div>
        <div class="article-content">
          <a href="${url}"><img src="${urlToImage}" alt="${name} headline picture"></a>
          <div class="title-container">
          <p style="text-decoration: underline; padding: 10px 0px;"><b>Author: ${author}</b></p>
            <a href="${url}"><h2 class="title" title="Visit the website">${title}</h2></a>
            <p class="sub-title">${description}</p>
          </div>
        </div>
        <div class="show-more-cont">
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

  
  if(newsCont) newsCont.innerHTML = html; 
}

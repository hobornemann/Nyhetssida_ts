// @ts-nocheck   
// The above command makes sure that the js-file is not checked as a ts-file when the tsc compiler runs

import axios from "axios";
import { Article, Articles } from "../types/article";

export async function getNewsData(url: string | null = null){
  const APIkey: string = import.meta.env.VITE_NEWS_API; 
  const URL: string = (url) ? 
  url : `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${APIkey}`

  try {
    const response = await axios(URL)
    const data = await response.data; 
    console.log("data in render-news.ts",data); 
    renderNewsHTML(data); 
  } catch (error) {
    console.log(error)
  }
}

async function renderNewsHTML(data: Articles){
  const newsCont: HTMLUListElement | null = document.querySelector('.main-news-content'); 
  
  if(newsCont && data.articles.length < 1){
    return newsCont.innerHTML = "Unfortunately, there are no news articles available for the choosen date. Please check back later for updates."
  }  
  
  const html = data.articles.map((article: Article) => {
    let {author, url, urlToImage, source: {name}, title, description, content } = article;
    
    if(author === null || url === null || urlToImage === null || name === null || title === null || description === null || content === null )
      return // Objekt med null inuti ska ej visas på skärmen
  
    // content.replace(/(<([^>]+)>)/gi, "")
    content = content.substring(0,content.indexOf('['));
    
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

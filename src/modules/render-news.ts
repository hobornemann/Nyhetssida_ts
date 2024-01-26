// @ts-nocheck   
// The above command makes sure that the js-file is not checked as a ts-file when the tsc compiler runs

import axios from "axios";
import { Article, Articles } from "../types/article";

export async function getNewsData(url=null){
  const APIkey: string = import.meta.env.VITE_NEWS_API; 
  const URL: string = (url) ? 
  url : `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${APIkey}`

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
  // data parametern kommer med en property döpt till article, som innehåller en lista med 10 objekt (Nyheter). 
  // Viktiga properties --> author, content, description, title, urlToImage och publishedAt (date).  
  const newsCont: HTMLUListElement | null = document.querySelector('.main-news-content'); 
  if(newsCont && data.articles.length < 1){
    return newsCont.innerHTML = "Unfortunately, there are no news articles available for the choosen date. Please check back later for updates."
  }  

  const html = data.articles.map((article: Article) => {
    let {author, urlToImage, source: {name}, title, description, content } = article;
    
    if(author === null || urlToImage === null || name === null || title === null || description === null || content === null )
    return // Objekt med null inuti ska ej visas på skärmen
  
  if(content)  
    content = content.substring(0,content.indexOf('[')); 
  // console.log("article in renderNewsHTML",article)

    return `
    <li class="article-container">
      <h1>${name}</h1>
      <div>
        <div class="article-content">
          
          <img src="${urlToImage}" alt="${name} headline picture">
          <div class="title-container">
          <p><b>Author: ${author}</b></p>
            <h2 class="title">${title}</h2>
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
          </article>
        </div>
      </div>
    </li>
    `
  }).join(''); 

  
  if(newsCont) newsCont.innerHTML = html; 
}

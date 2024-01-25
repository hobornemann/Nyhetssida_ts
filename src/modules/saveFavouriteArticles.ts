export {
    saveFavouriteArticleToLocalStorage
}

import {
    getArticlesFromLocalStorage,
    setArticlesInLocalStorage 
} from "./model.ts"




function saveFavouriteArticleToLocalStorage(article: Article):void {
    try{
        let articles: Article[] | undefined = getArticlesFromLocalStorage();
        if(articles !== undefined){
            articles.push(article);
            setArticlesInLocalStorage(articles);    
        } else {
            console.log("Could not save article to localStorage");
        }
    }
    catch (error: any){
        console.log("Error in saving article to local storage.", error.message);
    }
}
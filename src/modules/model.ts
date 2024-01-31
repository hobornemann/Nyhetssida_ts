import { Article } from "../types/article";
export{
    getArticlesFromLocalStorage,
    setArticlesInLocalStorage, 
}


// MODEL 
function setArticlesInLocalStorage(nameOfLocalStorageObject: string, articles: Article[]): Promise<boolean>{
  return new Promise((resolve, reject) =>{
    try{
      localStorage.setItem(nameOfLocalStorageObject, JSON.stringify(articles));
      resolve (true)
    } catch (error: any) {
      console.error("Error when setting articles object in local storage in the setArticlesInLocalStorage(articles) function.", error.message);
      reject(false)
    }
  })
}


// MODEL 
function getArticlesFromLocalStorage(nameOfLocalStorageObject: string): Article[] | undefined {
    let articles: Article[] | undefined;
    let localStorageData: string | null;   
    console.log("nameOfLocalStorageObject", nameOfLocalStorageObject)
    try{
      localStorageData = localStorage.getItem(nameOfLocalStorageObject);
      if(localStorageData){
        //console.log("localStorageData in getArticlesFromLocalStorage: ",localStorageData)
          articles = JSON.parse(localStorageData);
          return articles;
      } else {
        console.log(`The ${nameOfLocalStorageObject} in local storage is empty. See getArticlesFromLocalStorage() function.`)
        return undefined
      }
    }
    catch(error: any){
    console.log("Error getting json-data from local storage in getArticlesFromLocalStorage() function.", error.message)
    return undefined
    }
}

  




import { Article } from "../types/article";
export{
    getDefaultArticlesObject,
    getArticlesFromLocalStorage,
    getArticlesObject,
    setArticlesInLocalStorage, 
}

// MODEL
function getDefaultArticlesObject(){
  
  let articles: Article[] = [
    {
      source: 
      {
          id: "espn",
          name: "ESPN"
      },
      author: "Brett Okamoto",
      title: "Harrison joins UFC, to debut vs. Holm at UFC 300 - ESPN",
      description: "Kayla Harrison, the two-time Olympic judo gold medalist, has signed with the UFC and will make her debut against Holly Holm at UFC 300.",
      url: "https://www.espn.com/mma/story/_/id/39374751/kayla-harrison-joins-ufc-debut-vs-holly-holm-ufc-300",
      urlToImage: "https://a4.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F1126%2Fr1258286_1296x729_16%2D9.jpg",
      publishedAt: "2024-01-24T04:56:00Z",
      content: "Holly Holm and Kayla Harrison, two of the most accomplished athletes in women's combat sports history, will meet at UFC 300.\r\nThe UFC has signed Harrison, a two-time Olympic gold medalist in judo and… [+1753 chars]",
      isFavourite: false,
    },
    {
      source: 
      {
          id: null,
          name: null
      },
      author: null,   
      title: null,
      description: null,
      url: null,
      urlToImage: null,
      publishedAt: null,
      content: null,
      isFavourite: null,
    },
  ];
  return articles;
};


// MODEL 
function getArticlesObject(){
  try{
    let articles: Article[];
    const articlesInLocalStorage = getArticlesFromLocalStorage();
    if(articlesInLocalStorage == null) {
      articles = getDefaultArticlesObject();
      setArticlesInLocalStorage(articles);
    } else{
      articles = articlesInLocalStorage;
    }
    return articles;
  }
  catch (error: any){
    console.log("Error when getting the articles object in the getArticlesObject() function.", error.message)
  }
};


// MODEL 
function setArticlesInLocalStorage(articles: Article[]){
  try{
    localStorage.setItem("articles", JSON.stringify(articles));
  } catch (error: any) {
    console.error("Error when setting articles object in local storage in the setArticlesInLocalStorage(articles) function.", error.message);
  }
}


// MODEL 
function getArticlesFromLocalStorage(){
  let articles: Article[];
  let localStorageData: string | null;   // TODO: OK? Storage funkade inte så bra.
  try{
    localStorageData = localStorage.getItem("articles");
    console.log("localStorageData in getArtilesFromLocalStorage: ",localStorageData)
    if (localStorageData) {
        articles = JSON.parse(localStorageData);
        return articles;
      } else {
      console.log("Error getting data from local storage in getArticlesFromLocalStorage() function.")
    }
  }
  catch(error: any){
  console.log("Error getting json-data from local storage in getArticlesFromLocalStorage() function.", error.message)
  }
};
  
  

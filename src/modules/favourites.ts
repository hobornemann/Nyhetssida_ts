import { Article } from "../types/article";
import { getArticlesFromLocalStorage, setArticlesInLocalStorage} from "./model.ts"



export function firstStepsToSaveArticleAsFavourite(el: HTMLButtonElement){
    const button = el;
    const article = button.closest('.article-container') as HTMLDivElement;
    const dataType: string | undefined = article.dataset.type; 
    if(dataType) addEventListenersToFavouriteButtons(button);
}

// ----------------------UPDATE FAVOURITE BUTTONS OF RENDERED ARTICLES--------------------------------
export function updateFavouriteButtonsOfRenderedArticles(): Promise<boolean>{ 
    return new Promise((resolve, reject) => {
        const favouriteButtons: HTMLButtonElement[] | null = Array.from(document.querySelectorAll(".favourite-button"))
        if(favouriteButtons){
            try{
                let favouriteArticles: Article[] | undefined = getArticlesFromLocalStorage('favouriteArticles')
                if(favouriteArticles){
                    let renderedArticles: Article[] | undefined = getArticlesFromLocalStorage('renderedArticles')
                    if(renderedArticles){
                        let favouriteUrls: (string | null)[] = favouriteArticles.map(favouriteArticle => favouriteArticle.url) 
                        let renderedFavouriteArticles: Article[] = renderedArticles.filter(renderedArticle => favouriteUrls.includes(renderedArticle.url))
                        renderedFavouriteArticles.map(renderedFavouriteArticle => {
                            const favouriteButton = favouriteButtons.filter(button => 
                                button.getAttribute('data-url') === renderedFavouriteArticle.url)
                            if(favouriteButton[0]){
                                favouriteButton[0].classList.add('is-favourite-article')
                                favouriteButton[0].innerText = "Favourite"
                            }
                                
                        })
                    }
                }
                resolve(true)
            }
            catch(error: any) { 
                console.log("Error in updateFavouriteButtonsOfRenderedArticles function. ", error.message)
                reject(false)
            }
        } else{
            console.log(`Array.from(document.querySelectorAll(".favourite-button")) generates an empty elements-array in updateFavouriteButtonsOfRenderedArticles function`)
            reject(false)
        }
    })
}

// ----------------------ADD EVENT LISTENERS TO FAVOURITE BUTTONS--------------------------------
export function addEventListenersToFavouriteButtons(clickedButton: HTMLButtonElement): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try{
            const favouriteButtons: HTMLButtonElement[] | null = Array.from(document.querySelectorAll(".favourite-button"))    
            let renderedArticles: Article[] | undefined = getArticlesFromLocalStorage('renderedArticles')
            if(favouriteButtons && renderedArticles){
                favouriteButtons.forEach(button => {
                    if(button === clickedButton){
                        let isFavourite: boolean = button.classList.contains("is-favourite-article")
                        // let clickedButton: HTMLButtonElement = e.target as HTMLButtonElement;
                        let urlOfClickedArticle: string | null = clickedButton.getAttribute('data-url')
                        if(isFavourite){
                            let favouriteArticles: Article[] | undefined = getArticlesFromLocalStorage('favouriteArticles')
                            if(favouriteArticles){          
                                favouriteArticles = favouriteArticles.filter(favouriteArticle => favouriteArticle.url !== urlOfClickedArticle)
                                if(favouriteArticles){
                                    setArticlesInLocalStorage('favouriteArticles', favouriteArticles)
                                } else{
                                    localStorage.removeItem('favouriteArticles');
                                }
                            }
                            button.innerText = "Save as Favourite"
                            button.classList.remove("is-favourite-article")
                        } else if(!isFavourite) {
                            if(renderedArticles){
                                button.innerText = "Favourite"
                                button.classList.add("is-favourite-article")
                                let clickedArticle: Article | undefined = renderedArticles.find(article => article.url === urlOfClickedArticle);
                                if(clickedArticle){
                                    clickedArticle.isFavourite = true
                                    let favouriteArticles: Article[] | undefined = getArticlesFromLocalStorage('favouriteArticles')
                                    if(favouriteArticles){
                                        favouriteArticles.push(clickedArticle) 
                                        setArticlesInLocalStorage('favouriteArticles', favouriteArticles)
                                    } else {
                                        let favouriteArticles: Article[] = [];
                                        favouriteArticles.push(clickedArticle)
                                        setArticlesInLocalStorage('favouriteArticles', favouriteArticles)
                                    }
                                } else {
                                    console.log("Error in addEventListenersToFavouriteButtons function. clickedArticle is undefined.")
                                }
                            } else {
                                console.log("renderedArticles are undefined in addEventListenersToFavouriteButtons function")
                            }
                        } else {
                            console.log("Error:  neither isFavourite nor !isFavourite")
                        }
                    }
                })
                resolve(true)    
            } else {
                console.log("At least one of favouriteButtons && renderedArticles is undefined in addEventListenersToFavouriteButtons function. ")
                reject(false)
            }
        }
        catch(error:any){
            console.log("Error in addEventListenersToFavouriteButtons function", error.message)
            reject(false)
        }  
    })
}

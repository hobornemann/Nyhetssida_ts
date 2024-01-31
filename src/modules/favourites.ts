import { Article } from "../types/article";
import { getArticlesFromLocalStorage, setArticlesInLocalStorage} from "./model.ts"




export function updateFavouriteButtonsOfRenderedArticles(){
    
    const favouriteButtons: HTMLButtonElement[] | null = Array.from(document.querySelectorAll(".favourite-button"))
    if(favouriteButtons){
        try{
            let favouriteArticles: Article[] | undefined = getArticlesFromLocalStorage('favouriteArticles')
            let renderedArticles: Article[] | undefined = getArticlesFromLocalStorage('renderedArticles')
            if(favouriteArticles && renderedArticles){
                let favouriteUrls: (string | null)[] = favouriteArticles.map(favouriteArticle => favouriteArticle.url) 
                let renderedFavouriteArticles: Article[] = renderedArticles.filter(renderedArticle => favouriteUrls.includes(renderedArticle.url))
                if(renderedFavouriteArticles){
                    renderedFavouriteArticles.map(renderedFavouriteArticle => {
                        const favouriteButton = favouriteButtons.filter(button => 
                            button.getAttribute('data-url') === renderedFavouriteArticle.url)
                            favouriteButton[0].classList.add('is-favourite-article')
                            favouriteButton[0].innerText = "Favourite"
                    })
                }
            }
        }
        catch(error: any) { 
            console.log("Error in updateFavouriteButtonsOfRenderedArticles function. ", error.message)
        }
    }
}



// ----------------------ADD EVENT LISTENERS TO FAVOURITE BUTTONS--------------------------------
export function addEventListenersToFavouriteButtons(): void {
    try{
        const favouriteButtons: HTMLButtonElement[] | null = Array.from(document.querySelectorAll(".favourite-button"))    
        let favouriteArticles: Article[] | undefined = getArticlesFromLocalStorage('favouriteArticles')
        let renderedArticles: Article[] | undefined = getArticlesFromLocalStorage('renderedArticles')
        if(favouriteButtons && favouriteArticles && renderedArticles){
            favouriteButtons.forEach(button => {
                button.addEventListener('click', (e: MouseEvent) => {
                    let isFavourite: boolean = button.classList.contains("is-favourite-article")
                    let clickedButton: HTMLButtonElement = e.target as HTMLButtonElement;
                    let urlOfClickedArticle: string | null = clickedButton.getAttribute('data-url')
                    if(isFavourite && favouriteArticles){
                        button.innerText = "Save as favourite"
                        button.classList.remove("is-favourite-article")
                        //let indexOfFavouriteArticle: number = favouriteArticles.findIndex(article => article.url === urlOfClickedArticle);
                        favouriteArticles = favouriteArticles.filter(favouriteArticle => favouriteArticle.url !== urlOfClickedArticle)
                        setArticlesInLocalStorage('favouriteArticles', favouriteArticles)
                    } else {
                        if(renderedArticles){
                            button.innerText = "Favourite"
                            button.classList.add("is-favourite-article")
                            let clickedArticle: Article | undefined = renderedArticles.find(article => article.url === urlOfClickedArticle);
                            if(clickedArticle && favouriteArticles){
                                clickedArticle.isFavourite = true
                                favouriteArticles.push(clickedArticle) 
                                setArticlesInLocalStorage('favouriteArticles', favouriteArticles)
                            } else {
                                console.log("Error in addEventListenersToFavouriteButtons function. clickedArticle and/or favouriteArticles is/are undefined.")
                            }
                        } else {
                            console.log("renderedArticles is undefined in addEventListenersToFavouriteButtons function")
                        }
                    }
                })
            })
        } else {
            console.log("At least one of favouriteButtons && favouriteArticles && renderedArticles is undefined in addEventListenersToFavouriteButtons function. ")
        }
    }
    catch(error:any){
        console.log("Error in addEventListenersToFavouriteButtons function", error.message)
    }  
}

# Project NYHETSSIDA  -  LATEST NEWS

## Table of Contents

1. About the Project
   - purpose
2. Built With
3. Getting Started
   - Prerequisites
   - Installation
4. Description and Usage
5. Roadmap
6. Contributing
7. Licences
8. Contact
9. Acknowledgements

## 1. About the Project

### Purpose

The purpose of this web application is to provide the user with a portal to US- and international news agencies and news articles.  



## 2. Built With

HTML
CSS
Typescript
JavaScript
npm
dotenv
Vite
Axios
GitHub
Firebase (work in progress)

## 3. Getting Started

### Prerequisites

1. An IDE like e.g. VS Code or IntelliJ
2. Node.js, npm, dotenv, Vite, Axios, 
3. Web browser, e.g. Google Chrome.
4. The HTML-documents requires links to the following style-sheet and javascript-file.
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/style/article.css">
    <link rel="stylesheet" href="/style/pages.css">
    <link rel="stylesheet" href="/style/style.css">
    <link rel="stylesheet" href="/style/media-queries.css">
    <script type="module" src="/src/main.ts" defer></script>
5. Access to https://github.com/hobornemann/Nyhetssida_ts   

### Installation

1. The project is public. 
2. Log in to GitHub and clone the project:
   https://github.com/hobornemann/Nyhetssida_ts
3. Make sure that any new html-pages include the following css-links and javascript-links:
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/style/article.css">
    <link rel="stylesheet" href="/style/pages.css">
    <link rel="stylesheet" href="/style/style.css">
    <link rel="stylesheet" href="/style/media-queries.css">
    <script type="module" src="/src/main.ts" defer></script>
4. Launching the web application: In VS Code, standing in the Terminal window, you type: npm run dev
Ctrl+click on the link http://localhost:xxxx/
The application opens in your web browser.
If you try to open the application in the Live Server, it will not work. 
The package.json needs to include the following two dependencies (or later versions thereof): 
 "devDependencies": {
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  },
  "dependencies": {
    "axios": "^1.6.7",
    "dotenv": "^16.4.1",
    "firebase": "^10.7.2"
  },
5. Api Access Keys: 
To be able to use the application, you need to have/get a free personal API Access Key from the following data providers:

https://newsapi.org/
https://twelvedata.com/

Create a .env file and add '.env' to the files listed in .gitignore. This way, the personal API-key will not be pushed to the repo. 

The personal API-keys need to be inserted into a the .env-file in the following way: 
{
    VITE_NEWS_API = "your personal Api access key"
    VITE_TWELVE_DATA_APIKEY = "your personal Api access key" 
}


## 4. Description and Usage

### Description

The web application is a single-page application that fetches headlines, subheadlines and pictures of news articles written by different English speaking news agencies.

- Search/filter: The user can search for news articles that contain a specific word. The application will search across different news providers. 

- Full articles:  By clicking on a specific news article headline/picture/author, the user is transfered to the complete article on the news agency's website.

- News from a specific news agency: Via the website navigation, the user can directly fetch news articles from a specific news agency.

- Favourites: The user has the possibility to mark specific articles as 'Favourite'. In the navigation panel, the user can easily retrieve all favourite-marked articles.  

- Pagination of news articles:  Instead of having all fetched articles in one long page scroll, the application divides and distributes the fetched articles into different tabs/pages which contain up to 10 articles per tab/page.

- Most traded stocks:  The application also has a section which gives the user an update on the share prices of the most traded tech-stocks, i.e. Apple, Amazon, Meta and Microsoft.

- News carousel: In order to make the website come alive, catch the user's attention and keep the user engaged longer, a separate news feed has been provided on the right hand side of the webpage.   

- Responsivity: The application is responsive and can be used on desktops, tablets and mobile phones.

- Offline functionality: The application has been equipped with a service worker. If/when the application goes offline, the application reloads on the most recently fetched news articles and continues to provide the user access to all pages and news fetches that the user had visited/fetched before going offline.


### Usage

1. Type Safety / Potential Bugs:
- By using Typescript, we have 

2. Show/hide:

- When the user wants to add a new web link, a dialog box appears with two input-fields.In the first one, the user inserts the url to the new website. In the second one, the user provides a name to the website. When done, the user clicks the OK- or the Cancel-button. The dialog box disappears when a button has been clicked.  


3. User Interaction / Communication:

- Should the user insert a faulty url, a popup alert appears and explains that the provided web address was not fully correct. The alert provides info on what the user may have missed when inserting the url.




### Code

The code/mark-up/assets can be found in the following files / folder:

HTML:                               index.html
Style for static elements:          style.css 
Style for article element:          article.css
Style for live-shares element:      live-shares.css
Style for media-queries:            media-queries.css
Style for tabs/pages:               pages.css 
Types:                              article.d.ts, index.d.ts, part of liveShares.ts
EventListeners and data-fetch:      main.ts, favourites.ts
Local Storage:                      model.ts, localStorage.ts
News article rendering:             render-news.ts, liveShares.ts
Service worker:                     sw.ts
API-access keys:                    .env
Files excluded from repo:           .gitignore
README:                             README.md
Icons:                              svg-icon folder
Images:                             no app-specific images included
Dependencies:                       package.json
Package-lock:                       package-lock.json
Typescript Configuration:           tsconfig.json
Installed packages/modules          node_modules folder
Compiled / built assets:            dist folder


### Code Review 

In this section, I will provide some comments on the code, i.e. what I perceive to be the strengths and weaknesses. 

1. Strengths

a) MVC-inspired Module Structure: 

=> Model: 
> This application has a backend in the form of 
  a localStorage object (model.js) and the accessible databases of the API-providers (fetchData.js).

=> View: 
> the single-page HTML-document (index.html) only contains structural elements. It neither contains any styles nor any functionality. The dynamic parts of the web page are generated dynamically to fit data-items fetched from localStorage or the API-providers.
> all styles are included in one file (style.css). Elements that belong to each other are grouped together (weblinks, weather forecasts, news articles, notes). 

=> Controller:
> all event listeners are located in one file (main.js). Event listeners that are related to each other are also grouped together. 

b) Naming:
> HTML-elements, JS-objects/variables and functions have been given names that enable other developers to understand the code. This will make it easy and fast for other developers to maintain and/or improve. 

c) Refactoring
> All code that is related to fetching data from local storage or from external data providers via API has been refactored into separate functions. 
> The rendering functions that require the rendering of dynamic HTML and the dynamic creation of event listeners have intentionally not been refactored into sub-functions. 

d) Error handling 
> all functions and event-listeners have been equipped with try-catch for error handling in order to catch errors at the source.
> With a few intentional exceptions (the rendering functions), functions have been limited to only serve one purpose. Including try-catch error handling in each function makes sure that errors are caught at the source where they occur.  
> However, the area of error handling is probably much larger than I have knowledge about at this point. Thus, error handling has also been listed as a weakness.

e) Validation of user input
> The code contains at least a basic form of validation of user-input as regards the creation of new web links (checking that the input has the format of a valid website address, that the main domain can be extracted from the website address and that the number of web-links does not exceed the number that can be displayed on the web page).

f) API access keys
> The API-Access Keys are stored in a separate json-file, which has been excluded from the GitHub repo via the dot-gitignore-file. 

g) Responsive design
> By using css' clamis in English  feature for specifying font-size, height etc of certain HTML-elements, I have achieved a design that is dynamically responsive, i.e. that dynamcially and gradually adjusts the design to the type and size of the user's device (rather than the stepwise responsive design that media-queries can achieve). The advantage of using clamp is that it will work on any and all new device-sizes that manufacturers may come up with.


2. Weaknesses

a) Testing:
> The application has not been properly tested. The project lacks both unit tests and proper UI-test.

b) Security
> The application has not been checked or tested from a security perspective at all. 

c) Accessibility:
> The application has only been subject to minimal accessibility tests.
> No alt-texts have been added to the images retrieved from the external data providers

d) Long names:
> unless you use special software to shrink the size of the application, longer names has the disadvantage of making the application larger than needs to be from a performance perspective. However, performance should not be an issue for this application. The clarity of code aspect is more important in this case.    

e) Error handling:
> The area of error handling is probably much larger than I have knowledge to include into this project. Thus, error handling is probably also a major weakness of the project at this point.

f) Limits on free data
> There is a limit on the number of images that the user may retrieve from Unsplash per unit of time. This limit has been handled by applying a default background image that is displayed when the limit has been reached.
> There may potentially be corresponding limits on data retrieval from the other data providers.   

g) Language
> The app is targeting a Swedish speaking audience only. 
> The news feed from BBC is in English only. 

h) Overloaded functions 
> Two similar functions could have been structured as one overloaded function (I didn't have time to look into how to do that). 

i) Validation:
> Lacking validation for the cityName & countryCode when changing location for the weather forecasts (I ran out of time)


## 5. Roadmap 

For the time being, there are no plans to extend, update or permanently publish the application. It only serves as a solution to an educational assignment. 


## 6. Contributing

Any suggestions for improvements, further developments of the project or other contributions are more than welcome.

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 7. Licences

No licences are required for development or publication of this web application. VS Code, Node.js, Axios, Vite, GitHub as well as the three data providers NewsAPI and TwelveData offer free accounts / free APIs (within certain limits). 

## 8. Contact

Project assignment designed by:
Sandra Larsson
Sandra.Larsson@ChasAcademy.se

Project developed by:
Isak Tilahun
Isak.Tilahun@chasacademy.se

Carl Mikaelsson
Carl.Mikaelsson@chasacademy.se

Adnan Druzic
Adnan.Druzic@chasacademy.se

Hans-Olov Bornemann
hans-olov.bornemann@chasacademy.se

Project-link:
https://github.com/hobornemann/Nyhetssida_ts

## 9. Acknowledgements

Many thanks to Sandra Larsson for providing the project specification, description of required functionality as well as the design guidelines of this application.

Thanks also to the following communities/organisations/companies for providing open source and/or free version of their services/products:

NewsAPI
TwelveData
Developer.Mozilla.org
GitHub
Microsoft





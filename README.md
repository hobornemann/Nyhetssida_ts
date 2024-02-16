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

Trello:  https://trello.com/invite/b/VQLxu5L9/ATTI9590dbf396b7d21be46e98c6e7be55aaDB0B8CBD/kanban-nyhetsapp
Presentation:  https://docs.google.com/presentation/d/1wGXHlWbrkvHz_W40zojDG20Xu28yE7b616CEvfESpKg/edit?usp=sharing 

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
5. Install serviceworker types: npm install @types/serviceworker --save-dev
6. Access to https://github.com/hobornemann/Nyhetssida_ts   

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
5. Install serviceworker types: npm install @types/serviceworker --save-dev
6. Api Access Keys: 
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
- Since 100% of the code-base has been written in Typescript (no more //@ts-nocheck), we have minimised the number of potential problems that may arise. 

2. Search capability:

-  The web application offers the possibility to search news articles that contain a specific word. 

3. Filter capability:

-  The user can filter news articles per news agency as well for favourite-marked articles. 

4. Intuitive Navigation and Interaction:

-  The navigation menue, search- and filtering functionality is easily discoverable and user-friendly in both desktop, tablet and mobile view.

5. Offline capability:

- When going offline, the application reloads on the most recently visited page / fetched articles and continues to enable the user to surf the pages / fetches that the user hade activated before he/she went offline. 




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

In this section, I will provide some comments on the project and code, i.e. what I perceive to be the strengths and weaknesses. 

1. Strengths

a) Typescript:
100% of the code base has been written and type-checked in Typescript (i.e. without the //@ts-nocheck exclusion). No outstanding errors.

b) Design and usability:
The clean design and the intuitive navigation and interaction functionality makes it easy for the user to understand and enjoy the the web application.

c) Offline capability & performance:
The use of a service worker not only makes it possible to continue enjoying the website in an offline-mode, but the service worker also helps to improved the perceived performance of the website by applying pre-caching and run-time caching.


2. Improvement Potential

a) Firebase not fully set up yet:
> The application has not been fully set up on Firebase yet. A good amount of work has been done, but there are a few things outstanding to complete the mission.

b) Google Analytics not demonstrated yet:
> A tracking tag has been implemented, but the Google Analytics functionality has not yet been demonstrated.

c) Accessibility:
> Alt-texts have been added to icons, but the application has not gone through other types of accessibility tests.

d) Testing:
> The application has not been properly tested. The project lacks both unit tests and proper UI-test. 

e) Error handling:
> The area of error handling is probably much larger than we have knowledge to include into this project. Thus, error handling is probably also a weakness of the project at this point.

f) Limits on free data
> There is a limit on the number of articles and stock prices that the user may retrieve from NewsAPI and TwelveData per unit of time.  

g) Language
> The app is targeting a English speaking audience only. 
> The news feeds are in English only. 



## 5. Roadmap 

The outstanding things in this project are to:
a) finish the Firebase / Firestore set up including login page / authentication and 
b) demonstrate that the Google Analytics tracking tags are working as intended.


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





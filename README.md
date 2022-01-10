# Github Search
---

## Overview
This is my submission for a coding challenge, which required re-implementing a portion of GitHub's Search feature. 

Requirements included:

* User is able to search for and see a paginated list of results
* User can navigate through next and previous pages in paginated results
* User can see total count of results returned
* User can see notable information, including description, star/follower count, profile pictures, etc.
* User can select a search result and be taken to the applicable page on GitHub

<img src="https://github.com/carrollsa/carrollsa_public/blob/main/GithubSearch.jpg">

---
## Table of Contents
* [Features](https://github.com/carrollsa/github-search/blob/main/README.md#features)
* [Technologies](https://github.com/carrollsa/github-search/blob/main/README.md#technologies)
* [Challenges](https://github.com/carrollsa/github-search/blob/main/README.md#challenges)
* [Installation](https://github.com/carrollsa/github-search/blob/main/README.md#installation)
* [Issues](https://github.com/carrollsa/github-search/blob/main/README.md#issues)
* [Ideas for improvements](https://github.com/carrollsa/github-search/blob/main/README.md#improvements)
* [Credits](https://github.com/carrollsa/github-search/blob/main/README.md#credits)

---
<a name="features"/>

## Features
* Responsive UI
* Pagination with reusable usePagination hook
* Tooltips with reusable useHover hook
* Accessible color scheme

---
<a name="technologies"/>

## Technologies used

* React
* GraphQL

### New tools and concepts explored
* GraphQL
* Pagination
* Accessible color scheming

---
<a name="challenges"/>

## Challenges
* Learning to properly structure a GraphQL query took some time, but I'm glad I did it. I fetched from the regular REST endpoints originally, but what I was finding took an original query to return basic details, and then separate queries for specifics about users. Although I was convinced there had to be a better way using REST, the GraphQL API made it a lot simpler. 
* Manually implementing pagination took some time, but I felt as it was my first time paginating search results, I would understand better if I went through the process without using a library. In the future, I may use a library to speed things up.

---
<a name="installation"/>

## Running locally

1. Clone the repository with `$ git clone https://github.com/carrollsa/github-search`
2. `cd` into new folder and install dependencies with `npm install`
3. Run project with `npm run start`
4. Visit locally at http://localhost:3000/


---
<a name="issues"/>

## Known Issues
* Double render of Pagination component
	* I wanted to display the pagination component both above and below the results but did not want to perform the operations within it twice. I experimented with trying to memoize it but could not find a way to not duplicate the rendering operation. I have not used Redux, but I believe it some other sort of state-management tool could be used to aid in this.
* There is a point between the fetch and the rendering of `<Posts />` where the `users` prop passed in is undefined. I only knew of it from PropTypes, but I did not have time to figure out when `<Posts />` was trying to render without the appropriate props. This error did not cause any issues with the current application, but I would like to address it in the future.

---
<a name="improvements"/>

## Ideas for Improvements

* Add a posts per page selection
* Add a dark theme
	- This one is fairly simple, and I've implemented it before, but I was hesitant to try to do so here, as I would want to make sure the dark scheme retained the same contrast required to meet accessibility standards. Admittedly, I am new to this, and I am not certain I met them exactly. 
* Add simple animations for hovering over pages, cards, etc.
* Explore further levels of accessibility including greater consideration for screen readers
* Explore fetching further pages from the GraphQL query
	- The current query returns the maximum allowed by GitHub of 100 results. I did look into this a bit and structured the query so that it returns page info. This would allow storing of the `hasNextPage` and `endCursor` values which can be used within a further query to fetch the next 100 results. I think I could get this working without too much trouble, but I felt it was outside the scope of this project.
* Implement thorough automated testing
	- I had wanted to explore this, but time got the better of me. I have a project written in Java that includes thorough unit testing with JUnit, but I have not yet done frontend testing. I would really like to explore this idea soon.

---
<a name="credits"/>

## Credits

* [Tyler McGinnis](https://github.com/tylermcginnis) from UI.dev for teaching me React 
* [FreeCodeCamp](https://www.freecodecamp.org/) and [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA) for aiding me in understanding implementing paginated frontend results.

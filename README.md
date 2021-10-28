// Requirements before you can use
________________________________________________
.. 1. cd Phase-2-Group-Project--Movie-Database
___
.. 2. open terminal and run: npm install if not already done previously
___
.. 3. open terminal and run: npm start (this start start the localhost:3000 for webpage, localhost:3001 for db.json| running db.json is only neccessary if you need to populate your ruby backend crackle table|)
___
.. 4. open new terminal
___
.. 5. cd Phase-2-Group-Project--Movie-Database-Backend
___
.. 6. in terminal run: bundle install
___
.. 7. check if there are tables/schema/migrations needing to be made
___
.. 8. Tables need to be made? run: rake db:create_migration NAME=create_tables
___
.. 9. take the contents of the file, backupdb:create_migration, completely overwrite the new migration file you've just made, save your changes
___
.. 10. in terminal run: rake db:migrate, your databases should now be made
___
.. 11. in terminal run: rake server
________________________________________________

.. 12. back in the front end, open file components > HeaderBanner > CrackleIcon.js
___
.. 13. if your webpage is not loading due to an error that is because your crackle DB has not been populated, completely comment out the first useEffect()
___
.. 14. ctrl+F to find section titled: Send JSON DATA TO RUBY BE 
___
.. 15. in that section copy all the contents and paste it below the first commented out useEffect() the moment you save, the new useEffect will begin running it's logic, so before you save double check that all 3 of your servers are running. Webpage, db.json, ruby BE server. npm start initiates both webpage and db.json, rake server is for ruby BE
___
.. 16. if you check your ruby terminal you should see many prints to terminal about posting to crackle table, wait for it to finish. there should be 34 pages
___
.. 17. remove the second useEffect() the one you've added in step 15
___
.. 18. uncomment out the first useEffect() from step 13, save changes
___
.. 19. The website should be fully functional now
________________________________________________

.. 20. go to Phase-2-Group-Project--Movie-Database > package.json
___
.. 21. remove the line "& json-server --watch db.json -p 3001" from 
___
"scripts":{"start":}, this will stop your db.json from running the next time you run npm start. db.json has already served it's purpose. You will no longer need it after the crackle table is populated
________________________________________________

vu- 10/28
- added add and delete buttons for watchlist with full functionality front and backend
- added logic to toggle form on and off and what fields to show
- when adding user or watchlist, need addtions will now populate without a refresh(task: make it only populate after a successful message is returned. Right now it just assumes it was a successful add, currently possible that it can try and push errors into the array)
- when deleting user, watchlistarray and moviesarray will be cleared
- when deleting watchlist, moviesarray will be cleared

vu- 10/27
- removed sessionToken as a useState, replaced by isLoggedIn:boolean and cookies variable
- brought cookies package import to App.js and passed it down as props instead of having each component needing it import the package
- applied DRY to auto and manual login functions
- added front end login error handling for expired session tokens
- made TV container funcational again with new visuals from movies (old.TVFILES left just incase to reference)

vu- 10/26
- reworked login to use Cookies and auto login users with valid and non expired token, back end also has it's own expiration timer on the tokens to force a relog

vu- 10/25
- fixed endpoints to work with rails
- fixed everything front end that broke because of the switch (crackles disabled temp until a crackle DB is created on backend)

vu- 10/16
- cleaned up logic and split what frontend and backend does for a smoother experience
- front end no longer sends each element from the array 1 at a time to ruby backend
- front now sends the whole collection, and backend is responsible for iterating through and creating the available crackle movies
- backend crackle DB also now uses short_title column no spaces, all lowercase, and the release year is removed from the title, this way when you search the map function is not responsible for converting the each elements title on the spot before it checks for a matching name
- added instructions
- added logic to compare filtered YT search and filtered DB names to more accurately filter fuzzy matches being returned from YT search or years included in the YT title
- hopefully finally solved the useEffect console messages about clean up effect in MovieList.js

vu- 10/15
- cleaning up and organizing code from previous days
- added crackle DB to ruby backend, adjusted related front end logic
- added function to pull crackle movies from their website to add data to db.json
- added function to transfer the above from db.json to ruby back end (there is an issue where ruby back end stops recieving requests after too many post requests)

vu- 10/14
- finished functionality coding for backend and front end for adding reviews and review responses
- !! all new code needs to be organized to their proper places. I made it "work" without consideration to where things should logically/properly belong.

vu- 10/13
- built watchlist in backend
- WList now loads from backend when user logs in
- watchlist add and remove now works with backend and front end
- watchlist eyeball icons now properly reflect if they're in the watchlist
- current iteration of watchlist is fully functional
- adjusted page change arrows
- removed extra width of webpage
- disabled eyeball icon if not logged in
- added functional watchlist add/remove button to MP2C
- readjusted reviews
- made readmoreunderlay component
- extracted YT api key cycler into it's own function
- added readmorecontainer and style

vu- 10/11
- login/register logic complete front end and backend
- added user profile and name to top right corner
- watchlist button no longer goes off page or sits off page if user shrinks screen
- !! need to persist sessionToken in client cache
- !! need to make logic so when user first loads page check cache for sessionToken to auto log them in

vu- 10/10
- moviecardModal now uses css opacity transition instead of opacity controlled by javascript
- added background blur effect to all underlays
- front end logic for userLogin/Registration done, just need backend to be built
- adjusted css elements

vu- 10/09
- added opening npm start and npm server to run on one line, npm start
- changed Genres and Year Release titles to no longer use document.querySelector, they use useState now
- clicking movieCard now resets GenreNYear titles
- watchlistIcon now drag and droppable
- watchlistContainer now moves with watchlistIcon
- restyled styled watchlistContainer
- watchlistRating now changes from R -> G based on rating of movie
- added login/register form with css, need to complete functionality
- corrected styling of mainCategoryBtns and extendedCategoryOptions, visually the same but css code better
- added transtion duration on pageOptions, textArea toolbar, navlinks
- added fade-in class
- gave ExtendedOptions fade-in class conditional
- displayinfobtn now transitions to a smaller scale
- headerImageContainer renamed headerUnderlay to better reflect it's role
- headerUnderlay also got transition effects
- adjusted extraMovieWarning 
- loginUnderlay has transition effects
- added a useState to crackleIcon, one starts the video component for the first time, the other lets the user toggle to show the video or to hide

vu- 10/03
- added a return ()=> clearTimeout to the end of the useEffect in MovieCardModal to fix !! from 10/02
- adjsuted cracklevideo to be the same size as youtubevideo
- crackle video now properly doesnt show if video not found, needed to adjust logic because of the change from previous iteration
- !! try to adjust the Gernes and Year Release without doing document.querySelector
- !! make modal to read full user review
- !! make comment form submit save comment to DB
- !! try to figure out how to disable crackle autoplay while keeping the iframe functioning (currently removing autoplay prevents the crackle player for playing. I think it's because of the ad componenent they use on their player)

vu- 10/02
- added/remade components, parent (FreeMovieContainer), children (CrackleIcon, CrackleVideo, YoutubeIcon, YoutubeTrailer, YoutubeVideo)
- Header now is the grandparent of all the above
- adjusted CSS of all the above
- added a container to house all the free movie icons, and 4 vertical dots to toggle to hide or show that container
- added a line to reset YT free movie to it's default state, previously there was no proper reset when a different movie was choosen to featured
- added a display to let the user know there are free source for the movie they selected. CSS needs to be cleaned up, and logic needs to be put in a place it can refresh data on first run. possibly need to move useState up to main container
- !! need to find reason console is saying there's an unmounted component warning when going to page2, possibly it's the modal

vu- 9/29/2021
- added notes alongside functions and important lines of code for future understanding
- added better textarea component (functionality needs work)
- added modal functionality and style when hovering movie card
- modal now fades in, using react. Couldnt do it through css
- modal overview now has 3 different font sizes based on how many characters are in the overview
- fixed errors messages from api being pushed into movies data array
- adjusted logic of dynamically adjusting moviecardscontainer and cardscontainer
- throughly adjusted and fixed next, previous, pageOptions buttons interaction with each other. Should be no more problems regardless of how user decides to browse or press buttons in whichever order

vu- 9/28/2021
- added variable to MovieContainer to control whether YT and Crackle components are loaded

vu- 9/27/2021
- added logic to make amount of pages loaded dynamic. Dev can now determine how many pages to load by changing const pagesToLoad, to whatever they want
- with new logic dev can now make and option where users can determine how many pages they wish to see per load (not yet implemented)
- experimented more with Crackles API. Unfortunately it's as I guessed, sony does not keep their api up to date with their website, and their search api is unreliable in returning current and relevent data. The only option left is to Data scrap their movies catalog to pull movie id, movie name, movie release_date and build a database on that.
- removed setTogglePage2(false) from multiple functions and placed a single useState switch in MovieContainer when the last page loads
- eyeballicon for moviecards now have opacity 0.40 when not hovered, when hovered changes to opacity 1, this is so they don't stand out too much and take away from the movie posters
- finetuned when crackle video loads, closes, persists and visuals
- added PagesToLoadOptions functionality and styling, users can now choose how many pages to load, limited to 100 movies max per page to proactively reduce performance impact
- replaced logic on mainCategories to now keep highlighted which category is selected
- replaced logic on extendedOptions to persists the selected extendedoption highlight
- improved CSS on extendedOptions
- !! bug going from 20 => next page > 40 causes infinite appending pages -fixed (the issue was that setCurrentCounter would be +1 higher than the pageCount so it would keep running the else statement. I made choosing a different amount of pages to load would reset both page number and counter to 1)
- ^^ for the above I changed it so that user does not lose the current page they're on when changing selection. no more reset to page 1
- next and previous arrows now hidden during waitforload, I think if client double clicked arrow as it was loading new page, there was a chance duplicate page would be added in place of one that should truly belong there
- added logic to dynamically adjust the min-height of cardContainer and movieContainer. This is to prevent webpage visual jumpiness when user clicks the previous and next arrows
- added logic that now changes mainCategory textContent to display the selected extendedOptions.
- added same logic of resetting maincategory to search function

vu- 9/25/2021
- added Crackle video component
- notes: because crackle's api is not particularly good/easily accessible, their movie names/release dates aren't exactly correct, api data isn't uptodate or complete, and their videos aren't embed friendly a workaround was done
    - iframe is actually their whole webpage for that movie, but overflow is hidden to just show their video player and uninteractable/scrollable/selectable
    - logic was used to alter and match the names between data from tmdb(main data) with crackle data stored on local db.json
      - however it's not perfect because some crackle movie names are missing entire words from the movie title
    - if there's a match it'll return the crackle movie id to the iframe src
    - release year was also used to filter the match, but additional logic was also placed on release year with a potential offset of 1 year, because again crackle data isn't accurate to tmdb
    - double click the underlay to close the iframe
    - there are functions commented out at the bottom which can check for any crackle movies in db.json that have passed their expiration date, if it's true then it should delete the database and refetch. (however there's a problem, I'm trying to figure out how to clear entire database crackle array with fetch request without having to delete objects 1 by 1)
    - the crackle db.json matches the api of available movies, however it does not match what's actually free and available on crackles website. The website has more. Either this limit to the api is done purposely or the api used to query was incorrect. Maybe check if not specificying genre defaults to a genre instead of being all. Maybe you must query throlugh all genres and add it to the db. However how do you handle movies that exist in multiple genres
    - better to make a website scrapper to pull movies section movie title and releaseYear along with their url id

vu- 9/24/2021
- cleaned up code
- removed drag to scroll from main container
- made certain elements unselectable through mouse drag
- added loading gif to wait for all 40 movies to load
- added variable to manually disable the YT API key cycler to save quotas when developing/rerendering webpage
- added filler if there are currently no reviews for the selected movie

vu- 9/23/2021
- css overhaul
- forgot to update genresLI buttons when I did the overhaul for loading more movies, fixed now
- page 2 logos an cast are draggable to scroll
- updated stock images and icons
- cast blanks now differentiate between male and female avatars
- enabled/disabled MoviePage2Container and MovieList components based on if togglePage2 is true or false. There is a performance benefit for doing so if the user performs tasks on the respective page. However when loading from page 1 to page 2 or vice versa you can tell there's a slight load time because some parts of the components such as empty divs arent preloaded and hidden.
- logos now display a company text if the company did not have a logo in the DB
- watchlist eyeballs now toggle between watched and unwatched, but not fully function with watchlist because there is no database and users created yet to store the information
- prepared a rough draft outline of page 2 reviews/comments section
- added dragscrolling to mainContainer, questionable about it's functionality. Need to somehow ignore clicks on movie images when scrolling for better user experience

vu - 9/22/2021
- added extra logic to moviecontainer to pull in 40 movies
- adjusted next and previous buttons logic to cycle through the new 40 movies instead of 20
- adjusted filter categories to work with the new useEffect of moviecontainer movieCategory as a dependency, this prevents the useEffect from firing off if you chose genres or year release without yet choosing a filter from their categories
- added setIsLoadMoreMovies to the genres and year logics to trigger the moviecontainer useEffect
- changed the key of MovieCards to be movie.id+index, there are some movies in the array that have duplicates (ex. Wonder 2017, in popular)
- adjusted the trigger of the useeffect to no longer use 
- added extra logic to youtubefreemovie to automatically cycle through api keys incase the default reaches it's quota limit
- better nested moviecards so that I can change left and right arrows to use position sticky
- raised the min-height of moviecardlist container to 1600px to account for the sticky arrows and 40 movies instead of 20
- adjusted default position of left and right arrows
- adjusted cardContainer to no longer be display:flex
- additionally adjusted all of contents related to cardContainer because of the change to cardContainer
- added a limiter on YT API key retry, otherwise it would keep looping if all keys quotas were maxed
- added a rough draft of movieExtraInfo on page2
- pushed castContainer down to make room for movieExtraInfo
- added visual feedback for when a search fails to return results
- made a toggle which hides the movieCardsContainer if no results are returned. This is to prevent user from see a long empty space and clicking next and previous buttons. which will cause a bug because there's no coding to iterate through a 0 length array
- added stock images for blankAvatar and blankPoster
- clicking Genres or Year Release no longer triggers togglePage2 to false until you choose a child option.
- extended delay of togglepage2 changing to false. Now that we load 40 movies, it needs some extra time or user will see the first array clearing and being replaced
- changed logic to close extendedoptions when mouse leaves searchbar rather than when a genre/year extendedoption is selected

vu - 9/19/2021
- added release date to youtube api search to filter movies with duplicate names

vu - 9/18/2021
- (HEADER MOVIE DETAILS OVERLAY IS COMPLETE)
- defined more classNames in Header div to better customize how their elements show/perform
- adjusted CSS of header elements
- -added logo logic to pull logo icons, for now they are on banner but will move that logic to page2
- adjusted element layout of movie card text so it's easier to customize
- adjusted movieContainer to display-flex column with align items centered
- adjusted headerinfosmall's center-line to line up with headerinfobig's center-line
- added button to replace trailer with full movie if available for free on youtube
- added logic to only display button if free movie is available
** for some reason upcoming eventually stops populating movie cards, have not yet noticed a pattern


vu - 9/17/2021
- moved movie files into a seperate section
- higher resolution back_drop
- added ternary for broken image for header movie cover
- limited watchlist to max-hieght 570
- changed year release category to have 12 years
- placed extendedcategoryoptions into a div with a classname to manipulate in css
- fixed Genres and Year Release not closing when their extended option was not chosen after opening dropdown list
    - added const [currentCategorySelected, setCurrentCategorySelected] = useState("") to search to double check which category was chosen because setting a state in filtercategory.js made a state for each one. So there was never a true double check.
- added movie language to header info
- added movie status to header info
- added homepage link to header info, will open to new tab of movie homepage if
    they have one, if not the icon will not appear
- moved genrelist up to higher level to pass to movie cards, the header genre list doesnt update because it doesnt replace the data for the genrelist set it in the handleCardImageClick
- setTimeout 120ms for above ^
- adjusted relative and absolute positions of headerbannercontainer, headerimagecontainer and mainpage2container
- interpolated all api_key to read from moviecontainer
- changed cast.js to use the index as the key instead of id, some cast in the array are the same
- setTimeout of 150ms on togglepage2 when user clicks on movie card to give the cast time to load. the longer the array of cast the more you can visually see it as the array changes out
- made better informationIcon
- cannot add duplicate movies to watchlist now
- moved setMovieID and movieID to mainContainer, header was not populating full info on header if you clicked on movie in watchlist, the two variables passed down to watchlistcard.js
- adjusted movielist cardcontainer to be relative so that i can adjust the next and prev arrows to absolute position based on the container
- card container given hidden tag when you are on page 2 because it's position: was changed to relative earlier

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

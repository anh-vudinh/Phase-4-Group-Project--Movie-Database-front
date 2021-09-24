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

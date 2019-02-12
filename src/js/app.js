import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

/* Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/

const state = {};

const controlSearch = async() => {
    // 1) get query from view
    const query = searchView.getInput();

    // 2) add new Search object to state;
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResults);
    // renderLoader(elements.recipe);

    // 4) get the results
    await state.search.getResults();

    // 5) Render results in UI
    clearLoader();
    searchView.renderResults(state.search.result);
};

elements.searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    controlSearch();
});

elements.resultsPages.addEventListener('click', function(event) {
    const button =  event.target.closest('.btn');
    if(button) {
        const nextPage = +(button.dataset.page);
        searchView.clearResults();
        searchView.renderResults(state.search.result, nextPage);
    }
});

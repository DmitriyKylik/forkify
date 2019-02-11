import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';
// export
/* Global state of the app
* - Search object
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/

const state = {};

const controlSearch = async() => {
    // 1) get query from view
    const query = searchView.getInput(); // TODO

    // 2) add new Search object to state;
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    // 4) get the results
    await state.search.getResults();

    // 5) Render results in UI
    searchView.renderResults(state.search.result);
    // 6) Clear input value

};

// Способ задавания ивентов. ( Не через document.querySelector);
elements.searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    controlSearch();
});

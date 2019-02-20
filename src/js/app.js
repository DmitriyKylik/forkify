import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import {elements, renderLoader, clearLoader} from './views/base';


/* Global state of the app
* - Search object !
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
    console.log(state.search);
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

/*
    Recipe controller
*/

const controlRecipe = async() => {
    const id = window.location.hash.replace('#', '');

    if(id) {
        state.recipe = new Recipe(id);
        try {
            // Prepare UI for changes
            recipeView.clearRecipe();
            renderLoader(elements.recipeElem);

            if(state.search) {
                recipeView.highlightSelected(id);
            }
            // Get recipe data
            await state.recipe.getRecipe();
            state.recipe.calcServings();
            state.recipe.calcTime();
            state.recipe.parseIngredients();
            recipeView.renderRecipe(state.recipe);
            clearLoader();
        }catch(error) {
            console.log(error);
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

elements.recipeElem.addEventListener('click', (event) => {
    const {target} = event;
    if(target.matches('.btn_adjust, .btn_adjust *')) {
        const btn = target.closest('.btn_adjust');
        if(state.recipe.servings > 1 || (btn.dataset.type !== 'reduce' && state.recipe.servings === 1)) {
            state.recipe.updateServings(btn.dataset.type);
            recipeView.updateServingsElement(state.recipe);
            recipeView.updateIngredientsElement(state.recipe);
        }
    }
});
/*
     List controller
*/



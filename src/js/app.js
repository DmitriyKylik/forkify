import Search from './models/Search';
import Recipe from './models/Recipe';
import Shop from './models/Shop';
import Like from './models/Like';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shopView from './views/shopView';
import * as likeView from './views/likeView';
import {elements, elementStrings, renderLoader, clearLoader} from './views/base';

/* Global state of the app
* - Search object !
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/

const state = {};
// state.like = new Like();
const controlSearch = async() => {
    // 1) get query from view
    const query = searchView.getInput();

    // 2) add new Search object to state;
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResults);

    await state.search.getResults();
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
     Like controller
*/

const controlLike  = () => {
    if(!state.like) state.like = new Like();
    const currentId = state.recipe.id;
    if(!state.like.isLiked(currentId)) {
        state.like.addLike(currentId, state.recipe.title, state.recipe.publisher, state.recipe.img);
        // Add to localStorage

        // Toggle like button
        likeView.togglikeBtn(true);

        likeView.renderLikedRecipe(currentId, searchView.limitRecipeTitle(state.recipe.title), state.recipe.publisher, state.recipe.img);
    } else {
        // Toggle like button
        likeView.togglikeBtn(false);
        // Remove recipe
        // remove item also from localStorage and from ul list
        state.like.removeLike(currentId);
        likeView.removeLikedRecipe(currentId);
    }
    likeView.toggleLikeMenu(state.like.getNumLikes());
};

const loadSavedRecipes = () => {
    // Restore liked recipes on page load
    if(!state.like) state.like = new Like();

    // Restore likes
    state.like.getpersistData();

    // Toggle like menu
    likeView.toggleLikeMenu(state.like.getNumLikes());

    // Render existing likes if ther
    if(state.like.getNumLikes() > 0) {
        state.like.likes.forEach(like => likeView.renderLikedRecipe(like.id, searchView.limitRecipeTitle(like.title), like.author, like.img));
    }
};

/*
    Recipe controller
*/

const controlRecipe = async(event) => {
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
            if(event.type === 'load') {
                loadSavedRecipes();
                recipeView.renderRecipe(state.recipe, state.like.isLiked(id));

                // Toggle like button
                likeView.togglikeBtn(state.like.isLiked(id));
            } else if(!state.like) {
                recipeView.renderRecipe(state.recipe, false);
            } else {
                likeView.togglikeBtn(state.like.isLiked(id));
                recipeView.renderRecipe(state.recipe, state.like.isLiked(id));
            }

            clearLoader();
        }catch(error) {
            console.log(error);
        }
    } else {
        loadSavedRecipes();
        console.log(localStorage);
    }
};

['hashchange', 'load'].forEach(elem => window.addEventListener(elem, (event) => controlRecipe(event) ) );

elements.shoppingList.addEventListener('click', (event) => {
    const id = event.target.closest(`.${elementStrings.shoppingItem}`).dataset.shopid;
    if(event.target.matches('.btn_cross, .btn_cross *')) {
        state.shopList.removeItem(id);
        shopView.removeItem(id);
    } else if(event.target.matches(`.${elementStrings.shopItemInput}`)) {
        const value = parseFloat(event.target.value, 10);
        state.shopList.updateCount(id, value);
    }
});

/*
     List controller
*/

const controlShopList = (recipe) => {

    if(!state.shopList) state.shopList = new Shop();
    shopView.clearShopList();
    recipe.ingredients.forEach(elem => {
        const item = state.shopList.addItem(elem.count, elem.unit, elem.ingredient);
        shopView.renderShopItems(item);
    });
};

elements.recipeElem.addEventListener('click', (event) => {
    const {target} = event;
    if(target.matches('.btn_adjust, .btn_adjust *')) {
        const btn = target.closest('.btn_adjust');
        if(state.recipe.servings > 1 || (btn.dataset.type !== 'reduce' && state.recipe.servings === 1)) {
            state.recipe.updateServings(btn.dataset.type);
            recipeView.updateServingsElement(state.recipe);
            recipeView.updateIngredientsElement(state.recipe);
        }
    } else if(target.matches('.btn_shopping, .btn_shopping *')) {
        controlShopList(state.recipe);
    } else if(target.matches('.btn_like, .btn_like *')) {
        controlLike();
    }
});


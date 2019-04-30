import Search from './models/Search';
import Recipe from './models/Recipe';
import Shop from './models/Shop';
import Like from './models/Like';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as shopView from './views/shopView';
import * as likeView from './views/likeView';
import {elements, elementStrings, renderLoader, clearLoader, hideForkifyMain, displayForkifyMain} from './views/base';

/* Global state of the app
* - Current recipe object
* - Shopping list object
* - Liked recipes
*/

const state = {};
const controlSearch = async() => {
    state.windowId = window.location.hash.replace('#', '');
    // 1) get query from view
    const query = searchView.getInput();

    // 2) add new Search object to state;
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();

    if(state.windowId) {
        renderLoader(elements.searchResults);
    } else {
        renderLoader(elements.forkifyWrapper, 'beforeend');
    }
    try {
        await state.search.getResults();
        clearLoader();
        searchView.displayMessage(state.search.message);
        if(state.search.result.length !== 0) {
            displayForkifyMain();
            searchView.renderResults(state.search.result);
            searchView.highlightSelected(state.windowId);
        }
    }catch(error) {
        console.log(error);
    }
};

elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    controlSearch();
});

elements.searchResults.addEventListener('click', (event) => {
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
    let newItem;
    if(!state.like.isLiked(currentId)) {
        // If shoplist exists
        newItem = state.like.addLike(state.recipe);

        // Toggle like button
        likeView.togglikeBtn(true);

        // Toggle remove all recipes button
        likeView.toggleRemoveBtn(state.like.getNumLikes());

        likeView.renderLikedRecipe(newItem);
        // Render shere a shop list of the liked recipe
    } else {
        // Toggle like button
        likeView.togglikeBtn(false);

        // remove item also from localStorage and from ul list
        state.like.removeLike(currentId);

        // Toggle remove all recipes button
        likeView.toggleRemoveBtn(state.like.getNumLikes());
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
    // Render existing likes if there are items in it
    if(state.like.getNumLikes() > 0) {
        state.like.likes.forEach(like => likeView.renderLikedRecipe(like));
        // Render here a shop list of the liked recipe
    }

    likeView.toggleRemoveBtn(state.like.getNumLikes());
};

elements.removeRecipeBtn.addEventListener('click', () => {
    likeView.removeLikedRecipes();
    state.like.removeLikedRecipes();
    likeView.toggleRemoveBtn(state.like.getNumLikes());
    likeView.toggleLikeMenu(state.like.getNumLikes());
    likeView.togglikeBtn(state.like.isLiked());
    shopView.toggleSaveBtn(false);
    shopView.clearShopList();
});

/*
    Recipe controller
*/

const controlRecipe = async(event) => {
    state.windowId = window.location.hash.replace('#', '');
    if(state.windowId) {
        displayForkifyMain();
        state.recipe = new Recipe(state.windowId);
        try {
            // Prepare UI for changes
            recipeView.clearRecipe();
            renderLoader(elements.recipeElem);
            shopView.clearShopList();

            // Check for liked recipes
            if(event.type === 'load') {
                loadSavedRecipes();
            }

            const isLiked = state.like.isLiked(state.windowId);
            // If we have such recipe in 'liked' list get data out there not from api
            if(state.like && isLiked) {
                await state.recipe.getRecipe(state.like.getLiked(state.windowId));
                // Render shoplist
                if(state.recipe.shopList) {
                    state.recipe.shopList.forEach(elem => shopView.renderShopItems(elem));
                    shopView.toggleSaveBtn(true);
                }else {
                    shopView.toggleSaveBtn(false);
                }
            }else {
                await state.recipe.getRecipe();
                state.recipe.parseIngredients();
            }
            // On load or hash change event check if recipe is liked and does it have shoplist
            state.recipe.calcServings();
            state.recipe.calcTime();

            // Check is id liked or not
            if(state.recipe.shopList) {
                shopView.toggleSaveBtn(isLiked);
            }

            if(isLiked) {
                // If state.like is exists but recipe that loads is not liked
                likeView.togglikeBtn(isLiked);
                recipeView.renderRecipe(state.recipe, isLiked);
            } else {
                recipeView.renderRecipe(state.recipe, isLiked);
                shopView.toggleSaveBtn(isLiked);
            }

            if(state.search || state.like) {
                searchView.highlightSelected(state.windowId);
            }

            clearLoader();
        }catch(error) {
            console.log(error);
        }
    } else {
        hideForkifyMain();
        loadSavedRecipes();
    }
};

['hashchange', 'load'].forEach(elem => window.addEventListener(elem, (event) => controlRecipe(event) ) );

elements.shoppingList.addEventListener('click', (event) => {
    const shopItem = event.target.closest(`.${elementStrings.shoppingItem}`);
    let id;
    if(shopItem) {
        id = shopItem.dataset.shopid;
    }
    if(event.target.matches('.btn_cross, .btn_cross *')) {
        state.shopList.removeItem(id);
        shopView.removeItem(id);
    } else if(event.target.matches(`.${elementStrings.shopItemInput}`)) {
        const value = parseFloat(event.target.value, 10);
        state.shopList.updateCount(id, value);
    }
});

/*
     Shop controller
*/

const controlShopList = (recipe) => {
    if(!state.shopList) state.shopList = new Shop();
    shopView.clearShopList();
    recipe.ingredients.forEach(elem => {
        const item = state.shopList.addItem(elem.count, elem.unit, elem.ingredient);
        shopView.renderShopItems(item);
    });
    shopView.toggleSaveBtn(true);
};
// Save data in state.like
elements.saveShopListBtn.addEventListener('click', () => {
    if(state.like.isLiked(state.windowId)) {
        const item = state.like.getLiked(state.windowId);
        item.shopList = state.shopList.items;
        // Save shopList in localStorage
        state.like.persistData();
        alert('Success');
    } else {
        alert('Recipe is not saved! Please like it before save shop list!');
    }
});

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


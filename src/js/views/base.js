export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search_input'),
    searchResList: document.querySelector('.results_list'),
    searchResults: document.querySelector('.results'),
    resultsPages: document.querySelector('.results_pages'),
    recipeElem: document.querySelector('.recipe'),
    recipeCount: document.querySelector('.recipe_count'),
    shoppingList: document.querySelector('.shopping_list')
    // btnIngredReduce: document.querySelector('.btn_ingredReduce')
};

export const elementStrings = {
    loader: 'loader',
    activeRecipe: 'results_link-active',
    recipeLink: 'results_link',
    nextPagbtn: {
        btnClass: 'results_btn-next',
        svgIcon: 'icon-triangle-right'
    },
    prevPagbtn: {
        btnClass: 'results_btn-prev',
        svgIcon: 'icon-triangle-left'
    },
    recipeCount: 'recipe_count',
    recipeServings: 'recipe_serving_count'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg class="icon icon-cw">
                <use xlink:href="img/sprite.svg#icon-cw"/>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) {
        loader.parentElement.removeChild(loader);
    }
};


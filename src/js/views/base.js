export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search_input'),
    searchResList: document.querySelector('.results_list'),
    forkifyList: document.querySelector('.forkify_list'),
    searchResults: document.querySelector('.results'),
    resultsPages: document.querySelector('.results_pages'),
    recipeElem: document.querySelector('.recipe'),
    recipeCount: document.querySelector('.recipe_count'),
    shoppingList: document.querySelector('.shopping_list'),
    likePannel: document.querySelector('.likes'),
    likesList: document.querySelector('.likes_list'),
    removeRecipeBtn: document.querySelector('.btn_remove'),
    saveShopListBtn: document.querySelector('.btn_shop'),
    forkifyMain: document.querySelector('.forkify_main'),
    forkifyWrapper: document.querySelector('.forkify_wrapper'),
    forkifyHeaderMessage: document.querySelector('.forkify_header_message')
};

export const elementStrings = {
    loader: 'loader',
    activeRecipe: 'forkify_link-active',
    forkListItem: 'forkify_list_item',
    nextPagbtn: {
        btnClass: 'results_btn-next',
        svgIcon: 'icon-triangle-right'
    },
    prevPagbtn: {
        btnClass: 'results_btn-prev',
        svgIcon: 'icon-triangle-left'
    },
    forkifyList: 'forkify_list',
    forkifyLink: 'forkify_link',
    recipeCount: 'recipe_count',
    recipeServings: 'recipe_serving_count',
    shoppingItem: 'shopping_item',
    shopItemInput: 'ingredient_data_amount',
    btnRecipeLike: 'btn_like',
    likedRecipe: 'likes_item',
    iconHeart: 'icon-heart',
    iconHeartOutline: 'icon-heart-outlined'
};

export const supportClasses = {
    hide: 'hide', // visibility: hidden
    removed: 'removed' // display: none
};

export const renderLoader = (parent, position = 'afterbegin') => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg class="icon icon-cw">
                <use xlink:href="img/sprite.svg#icon-cw"/>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML( position, loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) {
        loader.parentElement.removeChild(loader);
    }
};

export const hideForkifyMain = () => {
    if(elements.forkifyMain) {
        elements.forkifyMain.classList.add(supportClasses.removed);
    }
};

export const displayForkifyMain = () => {
    if(elements.forkifyMain) {
        elements.forkifyMain.classList.remove(supportClasses.removed);
    }
};

// Past with pomodoro and spinach
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, curr) => {
            if(acc + curr.length <= limit) {
                newTitle.push(curr);
            }
            return acc + curr.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search_input'),
    searchResList: document.querySelector('.results_list'),
    searchResults: document.querySelector('.results'),
    recipe: document.querySelector('.recipe')
    // recipe: document.querySelectorAll('.loader')
};

export const elementStrings = {
    loader: 'loader'
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

// export const hideLoader = parent => {}

// Render Loader
// 1) Create loader
// 2) Add styles for spinner (loader class)
// 2) on choose the recipe apply spinner for parent


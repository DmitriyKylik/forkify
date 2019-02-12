export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search_input'),
    searchResList: document.querySelector('.results_list'),
    searchResults: document.querySelector('.results'),
    resultsPages: document.querySelector('.results_pages')
};

export const elementStrings = {
    loader: 'loader',
    nextPagbtn: {
        btnClass: 'results_btn-next',
        svgIcon: 'icon-triangle-right'
    },
    prevPagbtn: {
        btnClass: 'results_btn-prev',
        svgIcon: 'icon-triangle-left'
    }

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


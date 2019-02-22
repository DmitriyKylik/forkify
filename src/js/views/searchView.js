import { elements, elementStrings} from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {elements.searchInput.value = ''};
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.resultsPages.innerHTML = '';
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

const renderRecipe = recipe => {
    const markup = `
    <li class="forkify_list_item">
        <a class="forkify_link" href="#${recipe.recipe_id}" data-id="${recipe.recipe_id}">
            <figure class="forkify_fig">
                <img src=${recipe.image_url} alt="${recipe.title}">
            </figure>
            <div class="forkify_data">
                <h4 class="forkify_name" title="${recipe.title}">${limitRecipeTitle(recipe.title)}</h4>
                <p class="forkify_author" title="${recipe.publisher}">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

const createPaginBtn = (page, type) => {
    return `
    <button class="btn btn_pagination btn_inline bg-gray btn-round ${type.btnClass}" data-page="${page}">
        <span class="btn_text">Page ${page}</span>
        <svg class="icon ${type.svgIcon}">
            <use href="img/sprite.svg#${type.svgIcon}"></use>
        </svg>
    </button>
    `;
};

const renderButtons = (page, recipesAmount, resPerPage) => {
    const totalPages = Math.ceil(recipesAmount / resPerPage);
    let button;
    // Decide which button should be render in order of current page
    if(totalPages >= 1) {
        // Render only next button;
        if(page === 1) {
            button = createPaginBtn(page + 1, elementStrings.nextPagbtn);
            // add Event listener
        }else if(page > 1 && page < totalPages) {
            // fix this
            button = `
                ${createPaginBtn(page - 1, elementStrings.prevPagbtn)}
                ${createPaginBtn(page + 1, elementStrings.nextPagbtn)}
            `;
        }else if(page === totalPages) {
            button = createPaginBtn(page - 1, elementStrings.prevPagbtn);
        }
    }
    elements.resultsPages.insertAdjacentHTML('beforeend', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resPerPage);
};

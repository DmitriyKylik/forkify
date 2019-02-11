import { elements } from './base';

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {elements.searchInput.value = ''};
export const clearResults = () => {elements.searchResList.innerHTML = ''};
// Past with pomodoro and spinach
const limitRecipeTitle = (title, limit = 17) => {
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
    <li class="results_list_item">
        <a class="results_link" href="#${recipe.recipe_id}">
            <figure class="results_fig">
                <img src=${recipe.image_url} alt="${recipe.title}">
            </figure>
            <div class="results_data">
                <h4 class="results_name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results_author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};
// func that recieves recipes array and prints them
export const renderResults = recipes => {
    console.log(recipes);
    recipes.forEach(renderRecipe);
};

import {Fraction} from 'fractional';
import {elements, elementStrings} from './base';

export const clearRecipe = () => {
    elements.recipeElem.innerHTML = '';
};

const convertFraction = count => {
    if(count) {
        const newCount = Math.round(count * 100) / 100;
        const [int, dec] = newCount.toString().split('.').map(elem => parseInt(elem, 10) );
        if(!dec) {
            return count;
        }
        if(int === 0) {
            const fr = new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`;
        }else {
            const fr = new Fraction(count - int);
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
    }
    return '?';
};

const createRecipeFigure = (recipe) => {
    return `<figure class="recipe_view">
                <img src="${recipe.img}" alt="${recipe.title}">
                <h2 class="recipe_title skewed"><span class="grad-orange">${recipe.title}</span></h2>
            </figure>
            `;
};
const createRecipeDetails = (recipe, isLiked) => {
    return `<div class="recipe_details">
                <div class="recipe_info recipe_time">
                    <svg class="icon icon-stopwatch">
                        <use xlink:href="img/sprite.svg#icon-stopwatch"/>
                    </svg>
                    <span class="recipe_info_data recipe_time_minutes">${recipe.time}</span>
                    <span class="recipe_time_text">minutes</span>
                </div>
                <div class="recipe_info recipe_serving">
                    <svg class="icon icon-man">
                        <use xlink:href="img/sprite.svg#icon-man"/>
                    </svg>
                    <span class="recipe_info_data recipe_serving_count">${recipe.servings}</span>
                    <span class="recipe_serving_text">serving</span>
                    <div class="recipe_serving_buttons">
                        <button class="btn_adjust btn_inline" data-type="reduce">
                            <svg class="icon icon-circle-minus">
                                <use xlink:href="img/sprite.svg#icon-circle-minus"/>
                            </svg>
                        </button>
                        <button class="btn_adjust btn_inline" data-type="add">
                            <svg class="icon icon-circle-plus">
                                <use xlink:href="img/sprite.svg#icon-circle-plus"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <button class="btn btn_like btn_inline grad-orange scaled">
                    <svg class="icon ${isLiked ? elementStrings.iconHeart : elementStrings.iconHeartOutline}">
                        <use xlink:href="img/sprite.svg#${isLiked ? elementStrings.iconHeart : elementStrings.iconHeartOutline}"/>
                    </svg>
                </button>
            </div>
            `;
};

const createRecipeDirections = (recipe) => {
    return `<!-- BEGIN recipe_directions -->
    <div class="recipe_directions">
        <h3 class="recipe_directions_title">how to cook it</h3>
        <p class="recipe_directions_text">This recipe was carefully designed and tested
            by <span class="recipe_author">${recipe.publisher}</span>.
        </p>
        <a href="${recipe.source_url}" class="btn btn_directions grad-orange scaled">
            <span class="button_directions_text">directions</span>
            <svg class="icon icon-search">
                <use xlink:href="img/sprite.svg#icon-search"/>
            </svg>
        </a>
    </div>
    <!-- END recipe_directions -->
    `;
};

const createRecipeItems = (recipe) => {
    let ingredient = '';
    recipe.ingredients.forEach(elem => {
        ingredient += `
        <li class="recipe_ingredients_item">
            <svg class="icon icon-check">
                <use xlink:href="img/sprite.svg#icon-check"/>
            </svg>
            <div class="recipe_ingredient">
                <span class="recipe_count">${convertFraction(elem.count)}</span>
                <span class="recipe_ingredient_unit">${elem.unit}</span>
                <span class="recipe_ingredient_name">${elem.ingredient}</span>
            </div>
        </li>
        `;
    });
    return ingredient;
};

export const renderRecipe = (recipe, isLiked) => {
    const markup = `
        <!-- BEGIN recipe -->
        <div class="recipe bg-gray">
            ${createRecipeFigure(recipe)}
            ${createRecipeDetails(recipe, isLiked)}
            <!-- BEGIN recipe_ingredients -->
            <div class="recipe_ingredients">
                <ul class="recipe_ingredients_list">
                ${createRecipeItems(recipe)}
                </ul>
                <button class="btn btn_shopping grad-orange scaled">
                    <svg class="icon icon-shopping-cart">
                        <use xlink:href="img/sprite.svg#icon-shopping-cart"/>
                    </svg>
                    <span>add to shopping list</span>
                </button>
            </div>
            <!-- END recipe_ingredients -->
            ${createRecipeDirections(recipe)}
        </div>
        <!-- END recipe -->
        `;
    elements.recipeElem.insertAdjacentHTML('afterbegin', markup);
};

export const updateServingsElement = recipe => {
    const servings = document.querySelector(`.${elementStrings.recipeServings}`);
    if(servings) {
        servings.textContent = `${recipe.servings}`;
    }
};

export const updateIngredientsElement = (recipe) => {
    const ingredients = Array.from(document.querySelectorAll(`.${elementStrings.recipeCount}`));
    if(ingredients) {
        ingredients.forEach((elem, i) => {
            elem.textContent = `${convertFraction(recipe.ingredients[i].count)}`;
        });
    }
};

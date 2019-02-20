import {elements, elementStrings} from './base';

// render List Items

const createShopItem = (ingredient) =>
    `<li class="shopping_item">
        <div class="ingredient_data">
            <input type="number" class="ingredient_data_amount" min="0" value="${ingredient.count}" step="0.25" placeholder="0">
            <span class="ingredient_data_unit">${ingredient.unit}</span>
        </div>
        <p class="shopping_descr">
            ${ingredient.name}
        </p>
        <button class="btn btn_cross btn_inline">
            <svg class="icon icon-circle-cross">
                <use xlink:href="img/sprite.svg#icon-circle-cross"/>
            </svg>
        </button>
    </li>`;

export const renderShopItems = (recipe) => {
    const markup = `
        ${recipe.ingredients.map(elem => createShopItem(elem))}
    `;
    elements.shoppingList.insertAdjacentHTML('afterbegin', markup);
};

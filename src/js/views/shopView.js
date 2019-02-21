import {elements, elementStrings} from './base';

export const clearShopList = () => {
    elements.shoppingList.innerHTML = '';
};

export const renderShopItems = (ingredient) => {
    const markup = `
        <li class="${elementStrings.shoppingItem}" data-shopid="${ingredient.id}">
            <div class="ingredient_data">
                <input type="number" class="${elementStrings.shopItemInput}" min="0" value="${ingredient.count}" step="${ingredient.count}" placeholder="0">
                ${ingredient.unit ? `<span class="ingredient_data_unit">${ingredient.unit}</span>` : ''}
            </div>
            <p class="shopping_descr">
                ${ingredient.ingredient}
            </p>
            <button class="btn btn_cross btn_inline">
                <svg class="icon icon-circle-cross">
                    <use xlink:href="img/sprite.svg#icon-circle-cross"/>
                </svg>
            </button>
        </li>`;
    elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const removeItem = (id) => {
    const item = document.querySelector(`[data-shopid=${id}]`);
    if(item) {
        item.parentElement.removeChild(item);
    }
};

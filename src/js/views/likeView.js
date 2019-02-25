import {elements, elementStrings, limitRecipeTitle} from './base';

export const removeLikedRecipes = () => {elements.likesList.innerHTML = '';};

export const togglikeBtn = isLiked => {
    const likeBtnString = isLiked ? elementStrings.iconHeart : elementStrings.iconHeartOutline;
    const svg =  document.querySelector(`.${elementStrings.btnRecipeLike} svg`);
    if(svg) {
        svg.classList.toggle(`${elementStrings.iconHeart}`);
        svg.classList.toggle(`${elementStrings.iconHeartOutline}`);
        document.querySelector(`.${elementStrings.btnRecipeLike} use`).setAttribute('xlink:href', `img/sprite.svg#${likeBtnString}`);
    }
};

export const toggleLikeMenu = numLikes => {
    numLikes > 0 ? elements.likePannel.classList.remove(`${elementStrings.hide}`) : elements.likePannel.classList.add(`${elementStrings.hide}`) ;
};

export const renderLikedRecipe = (recipe) => {
    const markup = `
        <li class="forkify_list_item likes_item" data-likeid="${recipe.id}">
            <a class="forkify_link likes_link" href="#${recipe.id}">
                <figure class="forkify_fig likes_fig">
                    <img src="${recipe.img}" alt="Test"/>
                </figure>
                <div class="forkify_data likes_data">
                    <h4 class="forkify_name likes_name" title="${recipe.title}">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="forkify_author likes_author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`;

    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

// remove by ID
export const removeLikedRecipe = id => {
    const item = document.querySelector(`.${elementStrings.likedRecipe}[data-likeid="${id}"]`);
    if(item) {
        item.parentElement.removeChild(item);
    }
};

export const toggleRemoveBtn = numLikes => {
    numLikes > 0 ? elements.removeRecipeBtn.classList.remove(`${elementStrings.hide}`) : elements.removeRecipeBtn.classList.add(`${elementStrings.hide}`);
    // On click event use removeLikedRecipe function in controller
};

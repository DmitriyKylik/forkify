export default class Like {
    constructor() {
        this.likes = [];
    }

    addLike(recipe) {
        const item = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            img: recipe.img,
            ingredients: recipe.ingredients,
            source_url: recipe.source_url,
        };
        this.likes.push(item);
        this.persistData();
        return item;
    }

    removeLike(id) {
        const itemIndex =  this.likes.findIndex(elem => elem.id === id);
        this.likes.splice(itemIndex, 1);
        this.persistData();
    }

    isLiked(id) {
        // If index !== -1 then recipe is liked (true) if === -1 then recipe is not liked
        return this.likes.findIndex(elem => elem.id === id) !== -1;
    }

    getLiked(id) {
        const item = this.likes.find(elem => elem.id === id);
        return item;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    };

    getpersistData() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        if(storage) {
            this.likes = storage;
        }
    };

    removeLikedRecipes() {
        this.likes = [];
        localStorage.removeItem('likes');
    }
};

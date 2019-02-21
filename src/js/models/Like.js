export default class Like {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const item = {
            id,
            title,
            author,
            img
        };
        this.likes.push(item);
        return item;
    }

    removeLike(id) {
        // Get index of item
        const itemIndex =  this.likes.findIndex(elem => elem.id === id);
        // Remove item
        this.likes.splice(itemIndex, 1);
    }

    isLiked(id) {
        // If index !== -1 then recipe is liked (true) if === -1 then recipe is not liked
        return this.likes.findIndex(elem => elem.id === id) !== -1;
    }
};

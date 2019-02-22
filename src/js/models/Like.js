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

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    };

    getperSistData() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        if(storage) {
            this.likes = storage;
        }
    };
};

import uniqid from 'uniqid';

export default class Shop {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        return item;
    }

    removeItem(id) {
        // Get index of item
        const itemIndex =  this.items.findIndex(elem => elem.id === id);
        // Remove item
        this.items.splice(itemIndex, 1);
    }

    updateCount(id, newCount) {
        this.items.find(elem => elem.id === id).count = newCount;
        // this.items[itemIndex].count = newCount;
    }
};

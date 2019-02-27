import axios from 'axios';
import {forkApi} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe(recipe) {
        if(!recipe) {
            try {
                const result = await axios(`${forkApi.dataPath}${forkApi.get}${forkApi.key}&rId=${this.id}`);
                this.img = result.data.recipe.image_url;
                this.ingredients = result.data.recipe.ingredients;
                this.publisher = result.data.recipe.publisher;
                this.title = result.data.recipe.title;
                this.source_url = result.data.recipe.source_url;
            } catch(error) {
                console.log('Something wrong... =(');
            }
        }else {
            this.img = recipe.img;
            this.ingredients = recipe.ingredients;
            this.publisher = recipe.publisher;
            this.title = recipe.title;
            this.source_url = recipe.source_url;
            if(recipe.shopList) {
                this.shopList = recipe.shopList;
            }
        }
    }

    calcTime() {
        // 15 min for each 3 ingredients
        const numIngr = this.ingredients.length;
        const periods = numIngr / 3;
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    updateServings(type) {
        const newServings = type === 'add' ? this.servings + 1 : this.servings - 1 ;
        this.ingredients.forEach(elem => {
            elem.count *= (newServings / this.servings);
        });
        this.servings = newServings;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'cups', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'cup', 'oc', 'oc', 'tsp', 'tsp', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];

        // Set the new array of ingredients
        const newIngredients = this.ingredients.map(elem => {
            // 1) Uniform units
            let ingredient = elem.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2) Remove parenthesis and clear whitespaces
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ').trim();
            // 2.1) Remove "-" symbols from
            ingredient = ingredient.replace('-', ' ');
            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');
            // Get index of ingredient unit
            const unitIndex = arrIng.findIndex(elem => units.includes(elem));

            let ingrObj;
            if(unitIndex > -1) {
                // If unit is defined there is a count too
                let arrCount = arrIng.slice(0, unitIndex);

                if (arrCount.length !== 0) {
                    // If count defined as fraction or as fraction and integer (Ex. 1 1/2 'unit')
                    arrCount = arrCount.map(el => {
                        if(el.includes('/')) {
                            const fraction = el.split('/');
                            const numerator = parseInt(fraction[0], 10);
                            const denumerator = parseInt(fraction[1], 10);
                            const decimal = parseFloat((numerator / denumerator).toFixed(2));
                            return decimal;
                        }
                        return parseInt(el, 10);
                    });

                    const count = arrCount.reduce((acc, curr) => acc + curr, 0);
                    ingrObj = {
                        count,
                        unit: arrIng[unitIndex],
                        ingredient: arrIng.slice(unitIndex + 1).join(' ')
                    };
                } else {
                    // If unit is defined but count is not
                    ingrObj = {
                        count: 1,
                        unit: arrIng[unitIndex],
                        ingredient: arrIng.slice(unitIndex + 1).join(' ')
                    };
                }
            }else if(parseInt(arrIng[0], 10)) {
                //  If unit is not defined there might be a count
                ingrObj = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
            }else if(unitIndex === -1) {
                ingrObj = {
                    count: 1,
                    unit: '',
                    ingredient
                };
            }

            return ingrObj;
        });
        this.ingredients = newIngredients;
    }
}

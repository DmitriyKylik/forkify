import axios from 'axios';
import {forkApi, proxy} from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(`${forkApi.dataPath}${forkApi.search}${forkApi.key}&q=${this.query}`);
            this.result = res.data.recipes;
            console.log(res);
            if(this.result.length === 0) {
                this.message = 'There is no recipe with such name or ingredient. Try another one!';
                console.log(this.message);
            }else {
                this.message = 'Enjoy!';
            }
        }catch (error) {
            console.log(error);
        }
    }
}

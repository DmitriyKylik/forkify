import Search from './models/Search';

const state = {};

const controlSearch = async() => {
    // 1) get query from view
    const query = 'pizza'; // TODO

    // 2) add new Search object to state;
    state.search = new Search(query);

    // 3) Prepare UI for results

    // 4) get the results
    await state.search.getResults();

    // 5) Render results in UI
    console.log(state.search.result);
};

// Способ задавания ивентов. ( Не через document.querySelector);
document.querySelector('.search').addEventListener('submit', function(event) {
    event.preventDefault();
    controlSearch();
});

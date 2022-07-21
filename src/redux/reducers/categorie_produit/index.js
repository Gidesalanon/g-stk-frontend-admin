const INITIAL_STATE = {
    current: null,
    preview: null,
    reload_data: null,
}


const categorie_produitReducer = (state = INITIAL_STATE, action) => {
    const { current, event,preview } = action
    switch (action.type) {
        case 'current-categorie_produit':
            return { ...state, current }
        case 'preview-categorie_produit':
            return { ...state, preview }
        case 'reload-data':
            return { ...state, reload_data: event}

        default:
            return INITIAL_STATE;
    }
};

export default categorie_produitReducer;

const INITIAL_STATE = {
    current: null,
    reload_data: null,
}


const utilisateurReducer = (state = INITIAL_STATE, action) => {
    const { current, event } = action
    switch (action.type) {
        case 'current-utilisateur':
            return { ...state, current }

        case 'reload-data':
            return { ...state, reload_data: event}

        default:
            return INITIAL_STATE;
    }
};

export default utilisateurReducer;

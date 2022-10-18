const INITIAL_STATE = {
    current: null,
    preview: null,
    reload_data: null,
}


const sellingReducer = (state = INITIAL_STATE, action) => {
    const { current, event,preview } = action
    switch (action.type) {
        case 'current-selling':
            return { ...state, current }
        case 'preview-selling':
            return { ...state, preview }
        case 'reload-data':
            return { ...state, reload_data: event}

        default:
            return INITIAL_STATE;
    }
};

export default sellingReducer;

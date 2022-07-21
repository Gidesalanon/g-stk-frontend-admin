const INITIAL_STATE = {
    current: null,
    reload_data: null,
}

const applicationReducer = (state = INITIAL_STATE, action) => {
    const { current, event, preview } = action
    switch (action.type) {
        case 'current-application':
            return { ...state, current }

        case 'preview-application':
            return { ...state, preview }

        case 'reload-data':
            return { ...state, reload_data: event}

        default:
            return INITIAL_STATE;
    }
};

export default applicationReducer;

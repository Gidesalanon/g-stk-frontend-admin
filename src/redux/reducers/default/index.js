const INITIAL_STATE = {
    table_fields: [],
}


const defaultReducer = (state = INITIAL_STATE, action) => {
    const { table_fields } = action

    switch (action.type) {
        case 'load-table-fields':
            return { ...state, table_fields }

        default:
            return INITIAL_STATE;
    }
};

export default defaultReducer;

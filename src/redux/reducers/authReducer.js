

const initialState = {
    user: null,
    watchlist:[],
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'set_user':
            return { ...state, user: action.payload };

        case 'set_watchlist':
            return { ...state, watchlist: action.payload };

        default:
            return state;
    }
}

export default authReducer;


const initialState = {
    currency: 'INR',
    symbol: '₹',
    coins:null,
    loading:false,
    alert:{
        open:false,
        message:'',
        type:'success',
    }
}




const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'set_currency':
            return { ...state, currency: action.payload };

        case 'set_symbol':
            return { ...state, symbol: action.payload };

        case 'set_coins':
            return { ...state, coins: action.payload };

        case 'set_loading':
            return { ...state, loading: action.payload };

        case 'set_alert':
            return { ...state, alert: action.payload };

        default:
            return state;
    }
}

export default currencyReducer;

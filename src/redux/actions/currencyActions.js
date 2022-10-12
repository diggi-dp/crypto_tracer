

export const setCurrency = (currency) => {
    return {
        type: "set_currency",
        payload: currency,
    }
}

export const setSymbol = (symbol) => {
    return {
        type: "set_symbol",
        payload: symbol,
    }
}
export const setCoinsAction = (apidata) => {
    return {
        type: "set_coins",
        payload: apidata,
    }
}
export const setLoadingAction = (bool) => {
    return {
        type: "set_loading",
        payload: bool,
    }
}

export const setAlertAction = (obj) => {
    return {
        type: "set_alert",
        payload: obj,
    }
}

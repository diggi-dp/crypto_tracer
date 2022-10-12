
export const setUserAction = (user) => {
    return {
        type: "set_user",
        payload: user,
    }

}
export const setWatchlistAction = (coin) => {
    return {
        type: "set_watchlist",
        payload: coin,
    }
}
const commentsReducer = (state = {data: null}, action) => {
    switch (action.type) {
        case "ADD_COMMENT":
            return { ...state, data: action.payload }
            
    
        default:
            return state
    }
}

export default commentsReducer
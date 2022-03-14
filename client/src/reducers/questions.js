const questionsReducer = (state= {data: null }, action) => {
    switch (action.type) {
        case "POST_QUESTION":
            return { ...state }  // {...state , data: action.payload} from this , data: action.payload => not mentioned in video          
        case "POST_ANSWER":
            return { ...state }  // , data: action.payload => not mentioned in video
        case "ADD_COMMENT":
            //console.log(state)
            return { ...state} // , data: action.payload
        case 'FETCH_ALL_QUESTIONS': 
            return { ...state, data: action.payload }
        default:
            return state
    }
}

export default questionsReducer
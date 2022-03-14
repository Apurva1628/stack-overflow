import * as api from '../api/index'

export const askQuestion = (questionData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.postQuestion(questionData)
        dispatch( {type: "POST_QUESTION", payload: data})
        dispatch(fetchAllQuestions())
        navigate('/')
    } catch (error) {
        console.log(error)
    }
} 
export const fetchAllQuestions = () => async (dispatch) => {
    try {
        const { data } = await api.getAllQuestions()
        console.log(data)
        dispatch({ type: 'FETCH_ALL_QUESTIONS', payload: data})
     } catch (error) {
         console.log(error)
        
    }
}

export const deleteQuestion = (id, navigate) => async (dispatch) => {
    try {
        const { data } = api.deleteQuestion(id)
        dispatch(fetchAllQuestions())
        navigate('/') 
    } catch (error) {
        console.log(error)
        
    }
}

export const voteQuestion = (id, value, userId) =>  async (dispatch) => {
    try {
        const { data } = await api.voteQuestion(id, value, userId)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
}

export const postAnswer = (answerData) => async (dispatch) => {   // when we click on post your answer btn then this function will get triggered
    try {
        const {  id, noOfAnswers, answerBody, userAnswered, userId } = answerData;
        const { data } = await api.postAnswer( id, noOfAnswers, answerBody, userAnswered, userId )
        dispatch({ type: 'POST_ANSWER', payload: data})
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
} 

export const deleteAnswer = (id, answerId, noOfAnswers) => async (dispatch) => {
    try {
        const { data } = await api.deleteAnswer(id, answerId, noOfAnswers)
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
}

export const addComment = (commentData) => async (dispatch) => {
    try {
        //alert(commentData.userId)
        const { id, commentBody, userCommented,userId } = commentData
        //alert("actions "+id+" "+commentBody+" "+userCommented+" "+userId)
        const { data } = await api.addComment(id, commentBody, userCommented,userId) // retrieve data from backend
        //alert("actions data "+data.id+" "+data.commentBody+" "+data.userCommented+" "+data.userId)
        dispatch({type: 'ADD_COMMENT', payload: data})
        dispatch(fetchAllQuestions())
    } catch (error) {
        console.log(error)
    }
    
}

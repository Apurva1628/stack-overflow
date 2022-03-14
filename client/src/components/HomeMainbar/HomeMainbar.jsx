import React from 'react'
import {  useLocation, useNavigate  } from 'react-router-dom'
import './HomeMainbar.css'
import QuestionsList from './QuestionsList'
import { useSelector} from 'react-redux'

const HomeMainbar = () => {

    const location = useLocation()
    const user = 1;     // var
    const navigate = useNavigate()  // variable

    const questionsList = useSelector(state => state.questionsReducer)
    //console.log(questionsList)
    // var questionsList = [{
    //     _id: 1, 
    //     upVotes: 3,
    //     downVotes: 2,
    //     votes: 3,
    //     noOfAnswers: 2,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "node js", "react js", "mongodb"],
    //     userPosted: "praj",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: "Prachi",
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // },{
    //     _id: 2,
    //     upVotes: 3,
    //     downVotes: 2,
    //     votes: 0,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "praj",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: "Prachi",
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // }, {
    //     _id: 3,
    //     upVotes: 3,
    //     downVotes: 2,
    //     votes: 1,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody: "It meant to be",
    //     questionTags: ["java", "node js", "react js", "mongodb"],
    //     userPosted: "praj",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //         answerBody: "Answer",
    //         userAnswered: "Prachi",
    //         answeredOn: "jan 2",
    //         userId: 2,
    //     }]
    // }]

    

  
    const checkAuth = () => {
        if(user === null){
            alert("login or signup to ask a question")
            navigate('/Auth')   
        }else{
            navigate('/AskQuestion')
        }
    }
    return (
        <div className='main-bar'>
            <div className='main-bar-header'>
                { 
                    location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
                }
                <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
            </div>
            <div>
                {
                    questionsList.data === null ? 
                    <h1>Loading....</h1> : 
                    <>
                        <p>{ questionsList.data.length } questions</p>
                        <QuestionsList questionsList={questionsList.data}/> 
                    </>
                }
            </div>
            
        </div>
    )
}

export default HomeMainbar





// line 16 // to get it from the backend, we hv written _id
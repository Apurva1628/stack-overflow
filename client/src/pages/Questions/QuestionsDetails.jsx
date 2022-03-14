import React, { useState} from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import moment  from 'moment'
import copy from 'copy-to-clipboard'

import upvote from '../../assets/sort-up-solid.svg'
import downvote from '../../assets/sort-down-solid.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'

import { postAnswer, deleteQuestion, voteQuestion, addComment} from '../../actions/question'
import DisplayComment from './DisplayComment'

//import { addComment } from '../../actions/comment'


const QuestionsDetails = () => {

    const { id } = useParams()
    const questionsList = useSelector(state => state.questionsReducer)
    //console.log(questionsList)
    //console.log(id)
 
    // var questionsList = [{
    //     _id: '1', 
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
    //     _id: '2',
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
    //     _id: '3',
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
    // } ]
    const [Answer, setAnswer] = useState('')
    const[Show, setShow] = useState(false) // for comment
    const [Comment, setComment] = useState('')
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
    const location = useLocation()
    const url = 'http://localhost:3000'

    const handlePostAns = (e, answerLength) => {
        e.preventDefault()
        if(User === null){
            alert('Login or Signup to answer a question')
            Navigate('/Auth')
        }else{
            if(Answer === ''){
                alert('Enter an answer before submitting')
            }else{
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name, userId: User.result._id}, Navigate))
            }
        }
    }

    const handleShare = () => {
        copy(url+location.pathname)  // when we click on share btn, the url will be copied along with pathname
        alert('Copied url : '+url+location.pathname)
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, Navigate))
    }

    const handleUpVote = () => {
        dispatch(voteQuestion(id, 'upVote', User.result._id))
    }

    const handleDownVote = () => {
        dispatch(voteQuestion(id, 'downVote', User.result._id))
    }


    const handleComment = (e) => {
        e.preventDefault()
        //console.log({Comment})    
        // dispatch(addComment({ Comment, userCommented: User.result.name }, Navigate))
        if(User === null){
            alert('Login or Signup to add a comment')
            Navigate('/Auth')
        }else{
            if(Comment === ''){
                alert('Enter a comment before submitting')
            }else{
                dispatch(addComment({ id, commentBody: Comment, userCommented: User.result.name, userId: User.result._id}, Navigate))
            }
        }
    }
    
    const handleEnter = (e) => {
        if(e.key === 'Enter'){
            setComment(Comment + "\n") 
        }
    }

    return(
        
        <div className='question-details-page'>
            {
                questionsList.data === null ?
                <h1>Loading...</h1> :
                <>
                {
                    // filter() =>  it will return the entire elements in array as well as we  can filter the array with few specific values
                    //in below line 'questionsList.filter(question => question._id === id)' ==> took single element(i.e question) from the list and 
                    //check its id matches the url's id(i.e. question._id === id) & if its same then it will just return that specific ques only
                    //(i.e this entire line will return only one question among the three question given above which matches the specific id 
                    //which is equal to 1)
                    questionsList.data.filter(question => question._id === id).map(question => (   

                        <div key={question._id}> 
                        {console.log(question)}
                            <section className='question-details-container'>
                                <h1>{question.questionTitle}</h1>
                                <div className='question-details-container-2'>
                                    <div className='question-votes'>
                                        <img src={upvote} alt="" width='18' className='votes-icon' onClick={handleUpVote}/>
                                        <p>{question.upVote.length - question.downVote.length}</p>
                                        <img src={downvote} alt="" width='18' className='votes-icon' onClick={handleDownVote} />

                                    </div>
                                    <div style={{width: "100%"}}>
                                        <p className='question-body'>{question.questionBody}</p>
                                        <div className='question-details-tags'>
                                            {
                                                question.questionTags.map((tag) => (
                                                    <p key={tag}>{tag}</p>
                                                ))
                                            }
                                    </div>
                                    {/* </div> */}
                                    <div className="question-action-user">
                                        <div>
                                            <button type='button' onClick={handleShare}>Share</button>
                                            {
                                                User?.result?._id === question?.userId && (
                                                    <button type='button' onClick={handleDelete}>Delete</button>
                                                )
                                            }
                                            
                                        </div>
                                        <div>
                                            <p>asked {moment(question.askedOn).fromNow()}</p>
                                            <Link to={`/Users/${question.userId}`} className='user-link' style={{color: '#0086d8'}}>
                                                <Avatar backgroundColor='orange' px='8px' py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                <div>
                                                    {question.userPosted}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            
                        </section>
                        
                        {
                            question.noOfAnswers !== 0 && (
                                <section>
                                    <h3>{question.noOfAnswers} Answer(s)</h3>
                                    <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                                </section>
                            )
                        }

                        {
                            question.comment.length> 0 && (
                                <section>
                                    <h3>{question.comment.length} Comments(s)</h3>
                                    <DisplayComment key={question._id} question={question} handleShare={handleShare}/>
                                </section>
                            )
                        }

                        {/* Comment Code */}
                        <section className='add-comment-container'>
                                
                            <button onClick={() => setShow(!Show)} >Add a Comment</button>
                             
                            <form onSubmit={ (e) => { handleComment(e) } }>
                            {
                                Show && (<div className='title'>
                                    <textarea name="" id="" onChange={(e) => {setComment(e.target.value)}} cols="30" rows="10" placeholder='Add your comment...' onKeyPress={handleEnter}></textarea><br/>
                                    <input type='Submit' className='comment-btn' value='Add Comment' />
                                </div>)
                            }
                           </form>
                            
                        </section>


                        <section className='post-ans-container'>
                            <h3>Your Answer</h3>
                            <form onSubmit={ (e) => {handlePostAns(e, question.answer.length) }}>  {/*handlePostAnswer*/}
                                <textarea name="" id="" cols="30" rows="10" onChange={e => setAnswer(e.target.value)}></textarea><br/>
                                <input type="Submit" className='post-ans-btn' value='Post Your Answer'/>
                            </form>
                            <p>
                                Browse other Question tagged 
                                {
                                    question.questionTags.map((tag) => (
                                        <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                                    ))
                                } or 
                                <Link to='/AskQuestion' style={{textDecoration:'none', color: '#009dff'}}> ask your own question.</Link>
                            </p>
                        </section>
                    </div>

                )) 
            }

        </>
    }

</div>
)
}

export default QuestionsDetails
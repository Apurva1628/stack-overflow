import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'

import Avatar from '../../components/Avatar/Avatar'


const DisplayComment = ({question}) => {

    //const User = useSelector((state) => (state.currentUserReducer))
    
    
    return (
        <div>
            {
                question.comment.map((com) => (
                    <div className='display-ans' key={com._id}>
                        <p>{com.commentBody}</p>
                        <div className="question-action-user">
                            
                            <div>
                                <p>commented {moment(com.commentedAt).fromNow()}</p>
                                <Link to={`/Users/${com.userId}`} className='user-link' style={{color: '#0086d8'}}>
                                <Avatar backgroundColor='lightgreen' px='8px' py='5px'>{com.userCommented}</Avatar>
                                    <div>
                                            {com.commentedAt} 
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                ))
            }

        </div>
    )
}

export default DisplayComment
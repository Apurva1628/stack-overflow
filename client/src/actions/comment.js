import React from 'react'
import * as api from '../api'

export const addComment = (commentData) => async (dispatch) => {
    try {
        const { data } = await api.addComment(commentData)
        alert("actions "+commentData)
        dispatch({ type: "ADD_COMMENT", payload: data})

    } catch (error) {
        console.log(error)
    }
}
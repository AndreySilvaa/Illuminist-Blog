import { db } from '../firebase/config'
import { useReducer, useState } from 'react'
import { collection, addDoc, Timestamp } from 'firebase/firestore'


const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) =>{
    switch(action.type){
        case "LOADING":
            return {loading: true, error: null}
        case "INSERTED":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const useInsertDocument = (docCollection) =>{
    const [response, dispatch] = useReducer(insertReducer, initialState)

    // check memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelled = (action) =>{
        if(!cancelled){
            dispatch(action)
        }
    }

    const insertDocument = async (document) =>{

        checkCancelled({
            type: "LOADING"
        })

        try {
            const newDocument = {...document, createdAt: Timestamp.now()}

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )

            checkCancelled({
                type: "INSERTED",
                payload: insertedDocument
            })
        } catch (error) {
            checkCancelled({
                type: "ERROR",
                payload: error.message
            })
            console.log(error.message)
        }
    }

    return {insertDocument, response}
    
}
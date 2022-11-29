import { db } from '../firebase/config'
import { useReducer, useState } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'


const initialState = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) =>{
    switch(action.type){
        case "LOADING":
            return {loading: true, error: null}
        case "DELETED":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const useDeleteDocument = (docCollection) =>{
    const [response, dispatch] = useReducer(deleteReducer, initialState)

    // check memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelled = (action) =>{
        if(!cancelled){
            dispatch(action)
        }
    }

    const deleteDocument = async (id) =>{

        checkCancelled({
            type: "LOADING"
        })

        try {
            

            const deletedDocument = await deleteDoc(doc(db, docCollection, id))

            checkCancelled({
                type: "DELETED",
                payload: deletedDocument
            })
        } catch (error) {
            checkCancelled({
                type: "ERROR",
                payload: error.message
            })
            console.log(error.message)
        }
    }

    return {deleteDocument, response}
    
}
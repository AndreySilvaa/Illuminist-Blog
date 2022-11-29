import { db } from '../firebase/config'
import { useState, useEffect} from 'react'
import {
    collection,
    query,
    orderBy,
    onSnapshot,
    QuerySnapshot,
    where
} from 'firebase/firestore'

export const useFetchDocument = (docCollection, search = null, uid = null) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [documents, setDocuments] = useState(null)

    // memory leak
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        async function loadData(){
            if(cancelled) return

            setLoading(true)

            const collectionRef = await collection(db, docCollection)

            try {
                let q
                
                // search
                // dashboard
                if(uid === ""){
                    return
                }

                if(search){
                    q = await query(collectionRef, where("tagsArray", "array-contains", search), orderBy("createdAt", "desc"))
                }else if(uid){
                    q = await query(collectionRef, where("uid", "==", uid), orderBy("createdAt", "desc"))
                }else{
                    q = await query(collectionRef, orderBy("createdAt", "desc"))
                }

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                    )
                })

                setLoading(false)


            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }

        loadData()

    }, [docCollection, search, uid, cancelled])

    useEffect(() =>{
        setCancelled(true)
    }, [])

    return {documents, loading, error}
}
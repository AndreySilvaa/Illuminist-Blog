import React from 'react'
import styles from './Dashboard.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Hooks
import {useAuthValue} from '../../context/AuthContext'
import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useDeleteDocument } from '../../hooks/useDeletePost'

const Dashboard = ({user}) => {
  //const {user} = useAuthValue() REMOVIDO POIS O VALOR DO USER CHEGAVA ATRASADO
  // SOLUÇÃO: PASSAR O USER COMO PROPS
  const [uid, setUid] = useState(user.uid)
  const { deleteDocument } = useDeleteDocument("posts")
  
  const { documents: posts, loading } = useFetchDocument("posts", null, uid)

  if(loading){
    return <p>Carregando...</p>
  }
  
  return (
    <div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <p>Gerencie os seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className='btn'>
              Criar primeiro post
            </Link>
          </div>
        ) : (
          <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>

          {posts && posts.map((post) => <div key={post.id} className={styles.post_row}>
            <p>{post.title}</p>
            <div className={styles.edictions}>
            <Link to={`/posts/${post.id}`}className="btn btn-outline">Ver</Link>
            <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">Editar</Link>
            <button onClick={() => deleteDocument(post.id)} className="btn btn-outline btn-danger">
              Excluir
            </button>
            </div>
          </div>)}
          </>
        )}

        
    </div>
  )
}

export default Dashboard
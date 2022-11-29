import React from 'react'

// CSS
import styles from './PostDetail.module.css'

// Hook
import { useParams } from 'react-router-dom'
import { useReadDocument } from '../../hooks/useReadDocument'

const PostDetail = () => {
    const { id } = useParams()
    const {document: post, loading} = useReadDocument("posts", id)

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando...</p>}
        {post && (
          <>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title}/>
            <p className={styles.post_body}>{post.body}</p>
            <h3>Este post trata sobre:</h3>
            <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
            </div>
          </>
        )}
    </div>
  )
}

export default PostDetail
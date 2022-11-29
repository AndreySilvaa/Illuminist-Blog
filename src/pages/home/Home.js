import React from 'react'

// CSS
import styles from './home.module.css'

// hooks
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocument } from '../../hooks/useFetchDocument'

// components
import Post from '../../components/post/Post'

// CONTEXT
import { useAuthValue } from '../../context/AuthContext'

const Home = () => {
  const [query, setQuery] = useState("")
  const {documents: posts, loading, error} = useFetchDocument("posts")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    return navigate(`/search?q=${query}`)
  }

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder='Ou busque por tags... ' onChange={(e) => setQuery(e.target.value)}/>
        <button type='submit' className='btn btn-dark'>Pesquisar</button>
      </form>

      <div>
          {loading && <p>Carregando...</p>}
          {posts && posts.map((post) => (
            <Post post={post} key={post.id}/>
          ))}

          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <p>Não foram encontrados nenhum post</p>
              <Link to='/create/post' className='btn'>Crie o primeiro post</Link>
            </div>
          )}
      </div>
    </div>
  )
}

export default Home
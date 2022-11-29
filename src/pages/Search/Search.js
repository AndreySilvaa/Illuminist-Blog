import React from 'react'

// CSS
import styles from "./Search.module.css"

// HOOKS
import {useQuery} from '../../hooks/useQuery'
import { useFetchDocument } from '../../hooks/useFetchDocument'

// Components
import  Post from '../../components/post/Post'

import { Link } from 'react-router-dom'

const Search = () => {
    const query = useQuery()
    const search = query.get("q")

    const {documents: posts} = useFetchDocument("posts", search)

  return (
    <div className={styles.search_container}>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts a partir da sua busca.</p>
            <Link to='/'>
              Voltar
            </Link>
          </div>
        )}

        {posts && posts.map((post) => (
          <Post key={post.id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Search
import React from 'react'
import {useState, useEffect} from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useReadDocument } from '../../hooks/useReadDocument'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'

// CSS
import styles from './EditPost.module.css'


const EditPost = () => {

    const {id} = useParams()
    const {document: post} = useReadDocument("posts", id)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const {updateDocument, response} = useUpdateDocument('posts')
    const [formError, setFormError] = useState('')

    useEffect(() => {
      if(post){
        setTitle(post.title)
        setBody(post.body)
        setImage(post.image)

        const textTags = post.tagsArray.join(", ")
        setTags(textTags)
      }
    }, [post])

    const navigate = useNavigate()

    const {user} = useAuthValue()
    
    const handleSubmit = (e) =>{
        e.preventDefault()

        setFormError('')

        // validar url

        try {
          new URL(image)
        } catch (error) {
          console.log("deu erro na url")
          setFormError("A imagem precisa ser uma URL")
        }

        // formatar as tags
        
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLocaleLowerCase())

        // validar os campos de formulário

        if(!title || !image || !body || !tags){
          setFormError("Preencha todos os campos do formulário")
        }

        if(formError) return
        

        const data = {
          title,
          image,
          body,
          tagsArray,
          createBy: user.displayName,
          uid: user.uid
        }
        updateDocument(id, data)
      
        navigate("/dashboard")
    }

  return (
    <div className={styles.edit_post}>
        {post && (
          <>
            <h2>Editando post: {post.title}</h2>
            <p>Altere o post como desejar</p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label>
                <span>Título:</span>
                <input type="text" name="title" required placeholder='Pense em um bom título...' onChange={(e) => setTitle(e.target.value)} value={title}/>
              </label>

              <label>
                <span>URL da imagem:</span>
                <input type="text" name="image" required placeholder='Insira uma imagem que represente o seu post' onChange={(e) => setImage(e.target.value)} value={image}/>
              </label>

              <p className={styles.preview_title}>Preview da imagem:</p>
              <img className={styles.image_preview} src={post.image} alt={post.title} />
              <label>
                <span>Conteúdo:</span>
                <input type="text" name="body" required placeholder='Insira o conteúdo do post' onChange={(e) => setBody(e.target.value)} value={body}/>
              </label>

              <label>
                <span>Tags:</span>
                <input type="text" name="tags" required placeholder='Insira as tags separadas por vírgula' onChange={(e) => setTags(e.target.value)} value={tags}/>
              </label>
        
            {!response.loading && <button className='btn'>Editar</button>}
            {response.loading && <button className='btn'>Aguarde...</button>}
            {response.error && <p className={styles.error}>{response.error}</p>}
            {formError && <p className={styles.error}>{formError}</p>}
            </form>
          </>
        )}
      </div>
  )
}

export default EditPost
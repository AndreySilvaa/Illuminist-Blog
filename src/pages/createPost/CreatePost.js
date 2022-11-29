import React from 'react'
import {useState} from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import { useNavigate } from 'react-router-dom'

// CSS
import styles from './CreatePost.module.css'


const CreatePost = () => {

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const {insertDocument, response} = useInsertDocument('posts')
    const [formError, setFormError] = useState('')

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
        

        const document = {
          title,
          image,
          body,
          tagsArray,
          createBy: user.displayName,
          uid: user.uid
        }
        insertDocument(document)
      
        navigate("/")
    }

  return (
    <div className={styles.create_post}>
        <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <span>Título:</span>
          <input type="text" name="title" required placeholder='Pense em um bom título...' onChange={(e) => setTitle(e.target.value)} value={title}/>
        </label>

        <label>
          <span>URL da imagem:</span>
          <input type="text" name="image" required placeholder='Insira uma imagem que represente o seu post' onChange={(e) => setImage(e.target.value)} value={image}/>
        </label>

        <label>
          <span>Conteúdo:</span>
          <input type="text" name="body" required placeholder='Insira o conteúdo do post' onChange={(e) => setBody(e.target.value)} value={body}/>
        </label>

        <label>
          <span>Tags:</span>
          <input type="text" name="tags" required placeholder='Insira as tags separadas por vírgula' onChange={(e) => setTags(e.target.value)} value={tags}/>
        </label>
  
       {!response.loading && <button className='btn'>Enviar</button>}
       {response.loading && <button className='btn'>Aguarde...</button>}
       {response.error && <p className={styles.error}>{response.error}</p>}
       {formError && <p className={styles.error}>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost
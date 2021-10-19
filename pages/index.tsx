import { FormEvent, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
 
  function handleSubmit(event:FormEvent) {

    event.preventDefault()

    const data = {
      email,
      password
    }

    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Submeter</button>
    </form>
  )
}
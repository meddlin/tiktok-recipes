import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { recipes } from './api/tiktoks'

export default function Home() {
  return (
    <div className={styles.container}>
      <main>
        <h1> Recipes </h1>
        {recipes.map(rec => {
          return <p key={rec.url}>
            <b>{rec.title}</b> - <i><a href={rec.accountUrl}>{rec.account}</a></i>
            <br />
            <a href={rec.url}>{rec.url}</a>
            <a href={`/recipes/${rec.id}`}>Recipe Page -- {rec.title}</a>
          </p>
        })}
      </main>

      <footer className={styles.footer}>
        Footer
      </footer>
    </div>
  )
}

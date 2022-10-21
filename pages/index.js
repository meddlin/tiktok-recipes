import styles from '../styles/Home.module.css'
import { recipes } from './api/tiktoks'

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-between items-center">

      {/* Main recipes list */}
      <main>
        <h1 className="text-2xl font-bold underline"> Recipes </h1>
        {recipes.map(rec => {
          return (
            <p key={rec.url} className="mt-5 mb-5">
              <b>{rec.title}</b> - <i><a href={rec.accountUrl}>{rec.account}</a></i>
              <br />
              <a href={rec.url}>{rec.url}</a>
              <br />
              <a href={`/recipes/${rec.id}`}>Recipe Page -- {rec.title}</a>
            </p>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="">
        <p className="text-xl">
          Recipes collection curated from TikTok
        </p>
      </footer>
    </div>
  )
}

import { useCallback, useState } from 'react';
import styles from '../styles/Home.module.css'
import { recipes, getSearchCache } from './api/tiktoks'

/**
 * use 'getStaticProps()' to produce an array of posts to throw around as a prop
 * 
 * - pull `title` from ./api/tiktoks.js
 *    - make array of { title: "", id: "" } objects
 * - on input field
 *    - if "text" ~like~ .map( any of titles )
 *      - results = push(title/recipe/thing)
 * - display `results` in component
 */

 export async function getStaticProps({ params }) {
  // const id = params.id;
  // const recipe = await getRecipe(id);
  const searchArray = await getSearchCache();

  return {
      props: {
          searchArray
      }
  }
};

/**
 * 
 * @returns 
 */

export default function Home({ searchArray }) {
  const [searchResults, setSearchResults] = useState([]);

  /* Debounce solution: https://javascript.plainenglish.io/implementing-debouncing-in-react-f3316ef344f5 */
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  function handleSearchChange(value) {
    console.log(`value: ${value}`);

    let tempResults = [];
    if (value === "") {
      setSearchResults(searchArray);
    } else {
      searchArray.forEach(recipe => {
        if (recipe.title.toLowerCase().includes(value.toLowerCase())) {
          tempResults.push(recipe);
        }
      });
      
      setSearchResults(tempResults);
    }
  }

  const optimizedFn = useCallback(debounce(handleSearchChange), []);

  return (
    <div className="flex flex-col h-screen justify-between items-center">

      {/* Main recipes list */}
      <main>
        <h1 className="text-2xl font-bold underline"> Recipes </h1>

        <input placeholder="Search..." onChange={(ev) => optimizedFn(ev.target.value)} />
        {searchResults.length > 0 ? searchResults.map((res, key) => {
          return (
            <div key={key}>{res.title}</div>
          );
        }) : 'No results yet' }

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

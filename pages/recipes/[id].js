import { getAllRecipes, getRecipe } from "../api/tiktoks";

export async function getStaticProps({ params }) {
    const id = params.id;
    const recipe = await getRecipe(id);

    return {
        props: {
            recipe
        }
    }
};

export async function getStaticPaths() {
    const recipes = getAllRecipes();

    return {
        paths: recipes.map(recipe => {
            return {
                params: { id: recipe.id }
            }
        }),
        fallback: false
    }
};

/**
 * TODO : Add TikTok embed to this component/page
 * - Create TikTok embed npm component from **other** code
 * - Use that component here
 */

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export default function Recipe({ recipe }) {
    return (
        <div>
            <h2>Recipe Page</h2>
            <p>
                <i>{recipe.title}</i>
            </p>
            
            <div className="recipe-container" style={{ display: `flex` }}>

                {/* 
                    TikTok video goes here 
                */}
                <div className="recipe-media" style={{ border: `1px solid black`, flexGrow: `1` }}>
                    <a href={recipe.url}>See the TikTok!</a>
                </div>

                {/* 
                    Actual recipe goes here 
                */}
                <div className="recipe" style={{ flexGrow: `1` }}>
                    <div className="instructions">
                        <h3>Instructions</h3>
                        <ul>
                            {(recipe && recipe.instructions && recipe.instructions.length) > 0 ? (
                                (recipe.instructions.map((inst, idx) => {
                                    return (<li key={idx}>{inst}</li>);
                                }))
                            ) : ''}
                        </ul>
                    </div>
                    <div className="ingredients">
                        <h3>Ingredients</h3>
                        <ul>
                            {(recipe && recipe.ingredients && recipe.ingredients.length) > 0 ? (
                                (recipe.ingredients.map((ing, idx) => {
                                    return (<li key={idx}>{ing.item} {ing.amount}</li>);
                                }))
                            ) : ''}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
};
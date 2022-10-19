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

export default function Recipe({ recipe }) {
    return (
        <div>
            <h2>Recipe Page</h2>
            <p>
                <i>{recipe.title}</i>
            </p>
            <a href={recipe.url}>See the TikTok!</a>
            <p>
                <h3>Instructions</h3>
                <ul>
                    {(recipe && recipe.instructions && recipe.instructions.length) > 0 ? (
                        (recipe.instructions.map((inst, idx) => {
                            return (<li key={idx}>{inst}</li>);
                        }))
                    ) : ''}
                </ul>
            </p>
            <p>
                <h3>Ingredients</h3>
                <ul>
                    {(recipe && recipe.ingredients && recipe.ingredients.length) > 0 ? (
                        (recipe.ingredients.map((ing, idx) => {
                            return (<li key={idx}>{ing.item} {ing.amount}</li>);
                        }))
                    ) : ''}
                </ul>
            </p>
        </div>
    )
};
import { getAllRecipes, getRecipe } from "../api/tiktoks";
import { TikTok } from '../../components/tiktok-embed';
import { useEffect, useState, useRef } from "react";
import { Helmet } from 'react-helmet';

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
            
            <div className="recipe-container flex flex-row justify-center space-x-6">

                {/* 
                    TikTok video goes here 
                */}
                <TikTok url={recipe.embedUrl} />

                {/* 
                    Actual recipe goes here 
                */}
                <div className="recipe mt-5 space-y-3">
                    <div className="ingredients">
                        <h3 className="text-lg font-medium">Ingredients</h3>
                        <ul>
                            {(recipe && recipe.ingredients && recipe.ingredients.length) > 0 ? (
                                (recipe.ingredients.map((ing, idx) => {
                                    return (<li key={idx}>{ing.item} {ing.amount}</li>);
                                }))
                            ) : ''}
                        </ul>
                    </div>
                    <div className="instructions">
                        <h3 className="text-lg font-medium">Instructions</h3>
                        <ul>
                            {(recipe && recipe.instructions && recipe.instructions.length) > 0 ? (
                                (recipe.instructions.map((inst, idx) => {
                                    return (<li key={idx}>{inst}</li>);
                                }))
                            ) : ''}
                        </ul>
                    </div>
                    
                </div>
            </div>

        </div>
    )
};
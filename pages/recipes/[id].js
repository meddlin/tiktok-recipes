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
        <div className="flex flex-col items-center">
            {/* <h2 className="text-xl font-bold">Recipe Page</h2> */}
            <h2 className="text-xl font-bold italic">
                {recipe.title}
            </h2>
            
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
                        <h3 className="text-lg font-bold">Ingredients</h3>
                        <ul className="ml-4">
                            {(recipe && recipe.ingredients && recipe.ingredients.length) > 0 ? (
                                (recipe.ingredients.map((ing, idx) => {
                                    return (<li key={idx} className="list-disc">{ing.amount} {ing.unit} {ing.item}</li>);
                                }))
                            ) : ''}
                        </ul>
                    </div>
                    <div className="instructions">
                        <h3 className="text-lg font-bold">Instructions</h3>
                        <ul>
                            {(recipe && recipe.instructions && recipe.instructions.length) > 0 ? (
                                (recipe.instructions.map((inst, idx) => {
                                    return (
                                        <li key={idx}>
                                            <h4 className="text-base font-semibold">Step {++idx}</h4>
                                            {inst}
                                        </li>
                                    );
                                }))
                            ) : ''}
                        </ul>
                    </div>
                    
                </div>
            </div>

        </div>
    )
};
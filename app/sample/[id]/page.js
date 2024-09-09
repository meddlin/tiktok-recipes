'use client';

import { TikTokWrapper } from "@/components/TikTokWrapper";

export default function Recipe({ params }) {
    const id = params.id;

    const recipe = {
        url: "https://www.tiktok.com/t/ZTRHPMdSV/",
        embedUrl: "https://www.tiktok.com/@tiggerninjafitness/video/7155596179513068846",
        id: "ZTRHPMdSV",
        account: "tiggerninjafitness",
        accountUrl: "https://www.tiktok.com/@tiggerninjafitness?_t=8WcwcNRWU5m&_r=1",
        title: "Sam Gamgee's Roasted Potatoes",
        instructions: [
            "score potatoes",
            "line baking dish",
            "set potatoes on top of seasonings",
            "bake @ 450F for 20 minutes"
        ],
        ingredients: [
            {
                item: "potatoes",
                amount: "several",
                unit: ''
            },
            {
                item: "melted butter",
                amount: "12",
                unit: "oz"
            },
            {
                item: "garlic (minced)",
                amount: "1",
                unit: "clove"
            },
            {
                item: "oregano",
                amount: 2,
                unit: "tbsp"
            }
        ]
    };

    return (
        <>
            <h1>Recipe: {id}</h1>

            <div className="flex flex-col items-center">
                {/* <h2 className="text-xl font-bold">Recipe Page</h2> */}
                <h2 className="text-xl font-bold italic">
                    {recipe.title}
                </h2>
                <h4>Credit: <a href={recipe.accountUrl}>{recipe.account}</a></h4>

                <div className="recipe-container flex flex-col justify-center space-x-6">

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
                                                <h4 className="text-base font-semibold">Step {++idx}. </h4>
                                                <p>{inst}</p>
                                            </li>
                                        );
                                    }))
                                ) : ''}
                            </ul>
                        </div>
                    </div>

                    {/* 
                    TikTok video goes here 
                */}
                    <TikTokWrapper url={recipe.embedUrl} />
                </div>

            </div>
        </>
    );
}
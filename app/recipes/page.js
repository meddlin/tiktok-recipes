'use client'

import { useState, useEffect } from 'react';
import apiClient from "@/libs/api";
import DaisyButton from '@/components/DaisyButton';
import { AddRecipeModal, AddRecipeModalContents, AddRecipeModalOpenButton, AddRecipeModalDismissButton } from '@/components/AddRecipeModal';
import AddRecipeForm from './add-recipe-form';

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [selectingRecipes, setSelectingRecipes] = useState(false);

    const getRecipes = async () => {
        const data = await apiClient.post("/recipes")
            .then(function (res) {
                console.log(`CLIENT - res in request: ${res}`)
                return res
            });
        return data;
    }

    useEffect(() => {
        (async () => {
            let data = await getRecipes();
            console.log(`CLIENT - data in useEffect: ${data}`);
            setRecipes(data);
        })();
    }, []);

    function recipeCreditIsEmpty(creditObj) {
        if (!creditObj || (creditObj.url == "" && creditObj.embedUrl == "" && creditObj.account == "" && creditObj.accountUrl == "")) {
            return true;
        }

        return false;
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row items-center">
                    <div className="grow">
                        <input placeholder="Search..." />
                    </div>

                    <div className="ml-12 justify-self-end">
                        <AddRecipeModal>
                            <AddRecipeModalOpenButton>
                                <DaisyButton label="+ Recipe" />
                            </AddRecipeModalOpenButton>
                            <AddRecipeModalContents>
                                <AddRecipeForm />
                            </AddRecipeModalContents>
                        </AddRecipeModal>
                    </div>
                </div>

                <div className="flex mt-16">
                    {/* side nav */}
                    <div>
                        <ul>
                            {'abcdefghijklmnopqrstuvwxyz'.split('').map((c, key) => <li key={key} className="py-2 pl-2 leading-4 rounded-sm hover:bg-slate-100 hover:cursor-pointer">{c}</li>)}
                        </ul>
                    </div>

                    {/* recipe list */}
                    <div className={`ml-4 ${selectingRecipes ? 'px-24 pb-12 pt-4 border-2 rounded-lg drop-shadow-md' : ''}`}>
                        {selectingRecipes ? (
                            <fieldset>
                                <legend className="sr-only">Recipes</legend>
                                {recipes.length > 0 ? recipes.map((res, key) => {
                                    return (
                                        <div className="space-y-5" key={key}>
                                            <div className="relative flex items-start">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                        id="comments"
                                                        name="comments"
                                                        type="checkbox"
                                                        aria-describedby="comments-description"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm leading-6">
                                                    <label htmlFor="comments" className="font-medium text-gray-100">
                                                        {res.title}
                                                    </label>
                                                    <p id="comments-description" className="text-gray-500">
                                                        {res.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }) : 'no recipes to select from'}
                            </fieldset>
                        ) : (
                            <ul>
                                {recipes.length > 0 ? recipes.map((res, key) => {
                                    return (
                                        <li key={key} className="mt-5 mb-5 flex-col">
                                            <a href={`/sample/${res.id}`}>
                                                <b>{res.title}</b>
                                            </a>
                                            {recipeCreditIsEmpty(res.recipeCredit) ? '' :
                                                <div className="text-xs">Credit: <a href={res.recipeCredit.accountUrl}>{res.recipeCredit.account}</a></div>}
                                        </li>
                                    );
                                }) : 'No recipes yet. Add one to get started!'}
                            </ul>
                        )}
                    </div>

                    {/* filters */}
                    <div className="ml-16">
                        <ul className="mb-10">
                            {['breakfast', 'lunch', 'dinner', 'dessert', 'drinks'].map((opt, key) => (
                                <li key={key} className="py-2 leading-4 rounded-sm hover:bg-slate-100 hover:cursor-pointer">{opt}</li>
                            ))}
                        </ul>

                        <hr />

                        <div className="mt-10">
                            <div
                                className="my-4 cursor-pointer"
                                onClick={() => setSelectingRecipes(!selectingRecipes)}
                            >
                                New grocery list
                            </div>
                            <div
                                className="my-4 cursor-pointer"
                                onClick={() => alert('enables recipe selection')}
                            >
                                New meal plan
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
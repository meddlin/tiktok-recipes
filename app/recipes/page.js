'use client'

import recipes from '@/recipe-data';

export default function Recipes() {

    function recipeCreditIsEmpty(creditObj) {
        if (creditObj.url == "" && creditObj.embedUrl == "" && creditObj.account == "" && creditObj.accountUrl == "")
            return true;
        
        return false;
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div>
                    <input placeholder="Search..." />
                </div>

                <div>
                    <button onClick={() => alert('add new recipe')}>Add New</button>
                </div>

                <div className="flex mt-16">
                    {/* side nav */}
                    <div>
                        <ul>
                            {'abcdefghijklmnopqrstuvwxyz'.split('').map((c, key) => <li key={key} className="py-2 pl-2 leading-4 rounded-sm hover:bg-slate-100 hover:cursor-pointer">{c}</li>)}
                        </ul>
                    </div>

                    {/* recipe list */}
                    <div className="ml-4">
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
                    </div>

                    {/* filters */}
                    <div className="ml-16">
                        <ul>
                            {['breakfast', 'lunch', 'dinner', 'dessert', 'drinks'].map((opt, key) => (
                                <li key={key} className="py-2 leading-4 rounded-sm hover:bg-slate-100 hover:cursor-pointer">{opt}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
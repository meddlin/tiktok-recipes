'use client'

export default function Recipes() {
    const recipes = [
        {
            title: "Chocolate Chip Cookies",
            description: "best homemade chocolate chip cookies you could make",
            category: "dessert",
            ingredients: [
                {
                    name: "egg",
                    quantity: "2",
                    unit: ""
                },
            ],
            directions: [
                {
                    explanation: "Beat eggs, white sugar, brown sugar together"
                },
            ],
            recipeCredit: {
                url: "https://www.tiktok.com/t/ZTRHPMdSV/",
                embedUrl: "https://www.tiktok.com/@tiggerninjafitness/video/7155596179513068846",
                account: "tiggerninjafitness",
                accountUrl: "https://www.tiktok.com/@tiggerninjafitness?_t=8WcwcNRWU5m&_r=1",
            }
        },
        {
            title: "Dark Palaces",
            description: "Dressed up 'old fashioned', inspired by James Joyce Irish pub in Baltimore",
            category: "cocktails",
            ingredients: [
                {
                    name: "Four Roses bourbon",
                    quantity: "1",
                    unit: "oz"
                },
                {
                    name: "almond bitters",
                    quantity: "1-2",
                    unit: "dashes"
                },
            ],
            directions: [
                {
                    explanation: "Mix in glass, pour over ice."
                },
            ],
            recipeCredit: {
                url: "",
                embedUrl: "",
                account: "",
                accountUrl: "",
            }
        }
    ]

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
                            {'abcdefghijklmnopqrstuvwxyz'.split('').map(c => <li className="py-2 pl-2 leading-4 rounded-sm hover:bg-slate-100 hover:cursor-pointer">{c}</li>)}
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
                            {['breakfast', 'lunch', 'dinner', 'dessert', 'drinks'].map(opt => (
                                <li className="py-2 leading-4 rounded-sm hover:bg-slate-100 hover:cursor-pointer">{opt}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
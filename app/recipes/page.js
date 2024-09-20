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
        }
    ]

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <div>
                    <input placeholder="Search..." />
                </div>
                <div className="flex">
                    {/* side nav */}
                    <div>
                        <ul>
                            {'abcdefghijklmnopqrstuvwxyz'.split('').map(c => <li>{c}</li>)}
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
                                        <div className="text-xs">Credit: <a href={res.recipeCredit.accountUrl}>{res.recipeCredit.account}</a></div>
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
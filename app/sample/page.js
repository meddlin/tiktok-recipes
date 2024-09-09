'use client';

export default function SamplePage() {
    const recipes = [
        {
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
        }, 
        {
            url: "https://www.tiktok.com/t/ZTRHPRA5T/",
            id: "ZTRHPRA5T",
            account: "gaming_foodie",
            accountUrl: "https://www.tiktok.com/@gaming_foodie",
            title: "Garlic Green Beans",
            instructions: [],
            ingredients: [],
        },
        {
            url: "https://www.tiktok.com/t/ZTRHPLtt7/",
            id: "ZTRHPLtt7",
            account: "pepperbellypete",
            accountUrl: "https://www.tiktok.com/@pepperbellypete",
            title: "Pasta Pig Party",
            instructions: [],
            ingredients: [],
        },
        {
            url: "https://www.tiktok.com/t/ZTRHfombS/",
            id: "ZTRHfombS",
            account: "cookiesandcups",
            accountUrl: "https://www.tiktok.com/@cookiesandcups",
            title: "Churro Snack Mix",
            instructions: [],
            ingredients: [],
        },
        {
            url: "https://www.tiktok.com/t/ZTRHPNfGX/",
            id: "ZTRHPNfGX",
            account: "scaseyfitness",
            accountUrl: "https://www.tiktok.com/@scaseyfitness",
            title: "Slow Cooker Honey Garlic Chicken Noodles",
            instructions: [],
            ingredients: [],
        }
    ];

    // const optimizedFn = useCallback(debounce(handleSearchChange), []);
    
    return (
        <>
            <h1>Sample Page - POC</h1>

            <div className="flex flex-col h-screen justify-between items-center">

                {/* Main recipes list */}
                <main>
                    <h1 className="text-2xl font-bold underline"> Recipes </h1>

                    {/* <input placeholder="Search first..." onChange={(ev) => optimizedFn(ev.target.value)} /> */}
                    <input placeholder="Search..." />
                    {recipes.length > 0 ? recipes.map((res, key) => {
                        return (
                            <p key={key} className="mt-5 mb-5">
                                <b>{res.title}</b> - <i><a href={res.accountUrl}>{res.account}</a></i>
                                <br />
                                <a href={res.url}>{res.url}</a>
                                <br />
                                <a href={`/recipes/${res.id}`}>Recipe Page -- {res.title}</a>
                            </p>
                        );
                    }) : 'No results yet'}
                </main>

                {/* Footer */}
                <footer className="">
                    <p className="text-xl">
                        Recipes collection curated from TikTok
                    </p>
                </footer>
            </div>
        </>
    );
}
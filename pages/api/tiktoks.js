export const recipes = [
    {
        url: "https://www.tiktok.com/t/ZTRHPMdSV/",
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
                item: "oregano",
                amount: 2,
                unit: "tbsp"
            }
        ]
    }, 
    {
        url: "https://www.tiktok.com/t/ZTRHPRA5T/",
        id: "ZTRHPRA5T",
        account: "",
        title: ""
    },
    {
        url: "https://www.tiktok.com/t/ZTRHPLtt7/",
        id: "ZTRHPLtt7",
        account: "pepperbellypete",
        title: ""
    },
    {
        url: "https://www.tiktok.com/t/ZTRHfombS/",
        id: "ZTRHfombS",
        account: "",
        title: ""
    },
    {
        url: "https://www.tiktok.com/t/ZTRHPNfGX/",
        id: "ZTRHPNfGX",
        account: "scaseyfitness",
        title: "Slow Cooker Honey Garlic Chicken Noodles"
    }
];

export const getAllRecipes = () => {
    return recipes;
};

export async function getRecipe(id) {
    return recipes.filter(r => r.id === id)[0];
}
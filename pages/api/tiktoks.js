export const recipes = [
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

/**
 * Return all recipes
 * @returns 
 */
export const getAllRecipes = () => {
    return recipes;
};

/**
 * Get a specific recipe that matches the 'id'
 * @param {*} id 
 * @returns 
 */
export async function getRecipe(id) {
    return recipes.filter(r => r.id === id)[0];
}

/**
 * Return the recipes data array, but modified to only include the
 * metadata needed for the search to work.
 */
export const getSearchCache = () => {
    /* reformat objects in array: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#using_map_to_reformat_objects_in_an_array */
    return recipes.map( ({id, title, account, accountUrl }) => ({ id, title, account, accountUrl }));
}


export default function MealPlans() {
    const mealPlans = [
        {
            createdDate: '2024-09-28',
            name: '', // name of a meal plan is optional
            recipes: [
                { name: '', recipeId: '' }
            ],
            days: [
                {
                    breakfast: '',
                    lunch: '',
                    dinner: '',
                    snack: ''
                }
            ]
        }
    ]
    
    return (
        <>
            <h2>Meal Plans</h2>

            <p>
                NOTE: page still in development. Not sure how to design this 
            </p>

            <div>
                <h2>Week 24 - name of meal plan?</h2>
                <div>
                    <h3>Day 1</h3>
                    <ul>
                        <li>
                            <div>Breakfast - breakfast burrito</div>
                        </li>
                        <li>
                            <div>Lunch - grilled chicken salad</div>
                        </li>
                        <li>
                            <div>Dinner - low-carb tacos</div>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
}


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
                    breakfast: 'breakfast burrito',
                    lunch: 'grilled chicken salad',
                    dinner: 'low-carb tacos',
                    snack: ''
                },
                {
                    breakfast: 'breakfast burrito',
                    lunch: 'grilled chicken salad',
                    dinner: 'low-carb tacos',
                    snack: ''
                }
            ]
        },
        {
            createdDate: '2024-10-02',
            name: '', // name of a meal plan is optional
            recipes: [
                { name: '', recipeId: '' }
            ],
            days: [
                {
                    breakfast: 'breakfast burrito',
                    lunch: 'grilled chicken salad',
                    dinner: 'low-carb tacos',
                    snack: ''
                }
            ]
        }
    ]
    
    return (
        <div className="flex flex-col justify-center items-center">
            <h2>Meal Plans</h2>

            <p>
                NOTE: page still in development. Not sure how to design this 
            </p>

            <div>
                {mealPlans && mealPlans.length > 0 ? mealPlans.map((plan, index) => {
                    return (
                        <div key={`plan-${index}`}
                            className="my-8"
                        >
                            <h2>{plan.createdDate} {plan.name !== '' ? `- ${plan.name}` : ''}</h2>
                            {plan.days && plan.days.length ? plan.days.map((day, d_idx) => {
                                return (
                                    <div key={`day-${d_idx}`}>
                                        <h3>Day {d_idx}</h3>
                                        <ul>
                                            <li>Breakfast: {day.breakfast}</li>
                                            <li>Lunch: {day.lunch}</li>
                                            <li>Dinner: {day.dinner}</li>
                                        </ul>
                                    </div>
                                );
                            }) : ''}
                            <div className="mt-4 cursor-pointer underline underline-offset-4">Related recipes...</div>
                        </div>
                    );
                }) : 'Add a meal plan'}
            </div>
        </div>
    );
}
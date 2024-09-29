import { useFormikContext, Formik, Field, FieldArray, ErrorMessage } from "formik";
import { object, string, number, date } from 'yup';
import DaisyInput from "@/components/DaisyInput";
import DaisyButton from "@/components/DaisyButton";
import NotesArea from "@/components/NotesArea";
import apiClient from "@/libs/api";

export default function AddGroceryListForm() {
    const validationSchema = object().shape({

    });

    const initialValues = {
        dateCreated: '2024-09-27',
        name: '',
        groceryItems: [
            {
                name: 'eggs',
                quantity: ''
            },
            {
                name: 'bread',
                quantity: ''
            },
            {
                name: 'milk',
                quantity: ''
            }
        ],
        relatedRecipes: [
            { recipeId: 'asdf1234', title: 'this is a sample recipe' }, { recipeId: 'qwerty1234', title: 'this is a sample recipe' }
        ],
        notes: ''
    };

    return (
        <>
            <div className="bg-slate-400 py-5 mb-10">
                <h2 className="flex justify-center items-center text-xl font-bold text-slate-900">New Grocery List</h2>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                    try {
                        await apiClient.post('/add-grocery-list', {
                            // userId: body.userId,
                            dateCreated: new Date(),
                            name: values.name,
                            groceryItems: values.groceryItems,
                            relatedRecipes: values.relatedRecipes,
                            notes: values.notes
                        })
                    } catch (error) {
                        console.log(error);
                    } finally {
                        console.log('onSubmit - add new recipe form, finally block')
                    }
                }}
            >
                {({ setFieldValue, handleChange, handleBlur, handleReset, handleSubmit, values, errors, touched, isValid, dirty }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <DaisyInput
                                label="Name"
                                name="name"
                                id="name"
                                labelClassName={'my-2'}
                                className={`${errors.name && touched.name ? 'input-error' : ''}`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            <FieldArray
                                name="groceryItems"
                                render={arrayHelpers => (
                                    <div>
                                        {values.groceryItems && values.groceryItems.length > 0 ? (
                                            values.groceryItems.map((dirc, index) => (
                                                <div key={index}>
                                                    <div className="flex flex-row">
                                                        <DaisyInput
                                                            name={`groceryItems[${index}].name`}
                                                            label="Name"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.groceryItems[index].name}
                                                        />
                                                        <DaisyInput
                                                            name={`groceryItems[${index}].quantity`}
                                                            label="Qty"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.groceryItems[index].quantity}
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => arrayHelpers.remove(index)} // remove from the list
                                                    > - </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => arrayHelpers.insert(index, '')} // insert into the position
                                                    > + </button>
                                                </div>
                                            ))
                                        ) : (<button type="button" onClick={() => arrayHelpers.push('')}>Add ingredient</button>)}
                                    </div>
                                )}
                            />
                            <NotesArea
                                label={'Notes'}
                                id={'notes'}
                                name={'notes'}
                                value={values.notes}
                                onChange={handleChange}
                            />
                            <ErrorMessage name="notes" component="span" className="error text-xs text-red-700" />

                            <hr />
                            <div>
                                <div>Related Recipes</div>
                                <ul>
                                    {values.relatedRecipes && values.relatedRecipes.length > 0 ? values.relatedRecipes.map((rec, index) => {
                                        return (
                                            <li key={index}>
                                                {JSON.stringify(rec)}
                                            </li>
                                        );
                                    }) : ''}
                                </ul>
                            </div>

                            <div className="flex justify-between my-5">
                                <DaisyButton
                                    label="Clear"
                                    type="button"
                                    onClick={handleReset}
                                />
                                <DaisyButton
                                    label="Submit"
                                    type="submit"
                                    className="btn-success"
                                />
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
}
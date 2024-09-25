import { useState } from 'react';
import { useFormikContext, Formik, Field, ErrorMessage } from "formik";
import { object, string, number, date } from 'yup';
import DaisyInput from "@/components/DaisyInput";
import DaisyButton from "@/components/DaisyButton";
import ComboSelector from "@/components/ComboSelector";
import apiClient from "@/libs/api";
import NotesArea from "@/components/NotesArea";

export default function AddRecipeForm() {
    const [tempIngredients, setTempIngredients] = useState([]);
    const [tempDirections, setTempDirections] = useState([]);

    const validationSchema = object().shape({
        title: string().required('Required'),
        description: string(),
        category: string(),
        notes: string()
    })

    const initialValues = {
        title: '',
        description: '',
        category: '',
        ingredients: [],
        directions: [],
        notes: '',
        // recipeCredit: {}
    }

    return (
        <>
            <div className="bg-slate-400 py-5 mb-10">
                <h2 className="flex justify-center items-center text-xl font-bold text-slate-900">Add recipe</h2>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                    try {
                        await apiClient.post('/add-recipe', {
                            title: values.title,
                            description: values.description,
                            category: values.category,
                            ingredients: tempIngredients,
                            directions: [
                                { explanation: 'this is a step in the process' }
                            ],
                            notes: values.notes,
                            recipeCredit: {
                                url: "test",
                                embedUrl: "test",
                                account: "test",
                                accountUrl: "test"
                            }
                        })
                    } catch (error) {
                        console.log(error);
                    } finally {
                        console.log('onSubmit - add new recipe form, finally block')
                    }
                }}
            >
                {({ setFieldValue, handleChange, handleBlur, handleReset, handleSubmit, values, errors, touched, isValid, dirty }) => (
                    <>
                        <span>{JSON.stringify(values)}</span>
                        <br />
                        <span>ingredients: {JSON.stringify(tempIngredients)}</span>

                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <DaisyInput
                                    label="Title"
                                    name="title"
                                    id="title"
                                    type={'text'}
                                    labelClassName={'my-2'}
                                    className={`${errors.title && touched.title ? 'input-error' : ''}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                />
                                <ErrorMessage name="title" component="span" className="error text-xs text-red-700" />

                                <DaisyInput
                                    label="Description"
                                    name="description"
                                    id="description"
                                    type={'text'}
                                    labelClassName={'my-2'}
                                    className={`${errors.description && touched.description ? 'input-error' : ''}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                />
                                <ErrorMessage name="description" component="span" className="error text-xs text-red-700" />

                                {/* <DaisyInput
                                    label="Category"
                                    name="category"
                                    id="category"
                                    type={'text'}
                                    labelClassName={'my-2'}
                                    className={`${errors.category && touched.category ? 'input-error' : ''}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.category}
                                />
                                <ErrorMessage name="category" component="span" className="error text-xs text-red-700" /> */}
                                <label>Category</label>
                                <ComboSelector
                                    data={['breakfast', 'lunch', 'dinner', 'dessert', 'drinks']}
                                    name="category"
                                    id="category"
                                    value={values.category}
                                    onChange={data => {
                                        handleChange(data);
                                        setFieldValue('category', data);
                                    }}
                                />
                                <ErrorMessage name="category" component="span" className="error text-xs text-red-700" />

                                {/* ingredients */}
                                <input />
                                <button onClick={() => {
                                    let arr = [{name: 'ex name', quantity: '1', unit: 'oz' }, ...tempIngredients]
                                    setTempIngredients(arr)
                                }}
                                >
                                    +1 ingr
                                </button>

                                {/* directions */}

                                <NotesArea 
                                    label={'Notes'}
                                    id={'notes'}
                                    name={'notes'}
                                    value={values.notes}
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="notes" component="span" className="error text-xs text-red-700" />

                                <p>Recipe Credit</p>

                                <DaisyInput
                                    label="Credit URL"
                                    name="creditUrl"
                                    id="creditUrl"
                                    type={'text'}
                                    labelClassName={'my-2'}
                                    className={`${errors.creditUrl && touched.creditUrl ? 'input-error' : ''}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.creditUrl}
                                />
                                <ErrorMessage name="creditUrl" component="span" className="error text-xs text-red-700" />

                                <DaisyInput
                                    label="Embed URL"
                                    name="embedUrl"
                                    id="embedUrl"
                                    type={'text'}
                                    labelClassName={'my-2'}
                                    className={`${errors.embedUrl && touched.embedUrl ? 'input-error' : ''}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.embedUrl}
                                />
                                <ErrorMessage name="embedUrl" component="span" className="error text-xs text-red-700" />

                                <DaisyInput
                                    label="Account"
                                    name="account"
                                    id="account"
                                    type={'text'}
                                    labelClassName={'my-2'}
                                    className={`${errors.account && touched.account ? 'input-error' : ''}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.account}
                                />
                                <ErrorMessage name="account" component="span" className="error text-xs text-red-700" />

                                <DaisyInput
                                    label="Account URL"
                                    name="accountUrl"
                                    id="accountUrl"
                                    type={'text'}
                                    labelClassName={'my-2'}
                                    className={`${errors.accountUrl && touched.accountUrl ? 'input-error' : ''}`}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.accountUrl}
                                />
                                <ErrorMessage name="accountUrl" component="span" className="error text-xs text-red-700" />
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
                        </form>
                    </>
                )}
            </Formik>
        </>
    );
}
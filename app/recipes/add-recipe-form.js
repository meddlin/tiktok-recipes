import { useState } from 'react';
import { useFormikContext, Formik, Field, FieldArray, ErrorMessage } from "formik";
import { object, string, number, date } from 'yup';
import DaisyInput from "@/components/DaisyInput";
import DaisyButton from "@/components/DaisyButton";
import ComboSelector from "@/components/ComboSelector";
import apiClient from "@/libs/api";
import NotesArea from "@/components/NotesArea";

export default function AddRecipeForm() {
    const validationSchema = object().shape({
        title: string().required('Required'),
        description: string(),
        category: string(),
        // ingredients: [],
        // directions: [{ explanation: '' }],
        notes: string()
    })

    const initialValues = {
        title: '',
        description: '',
        category: '',
        ingredients: [{ name: '', quantity: '', unit: '' }],
        directions: [{ explanation: '' }],
        notes: '',
        recipeCredit: {
            url: '',
            embedUrl: '',
            account: '',
            accountUrl: ''
        }
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
                            ingredients: values.ingredients,
                            directions: values.directions,
                            notes: values.notes,
                            recipeCredit: values.recipeCredit
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
                        {/* debugging form values */}
                        {/* <span>{JSON.stringify(values)}</span> */}

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

                                <h3>Ingredients</h3>
                                <FieldArray
                                    name="ingredients"
                                    render={arrayHelpers => (
                                        <div>
                                            {values.ingredients && values.ingredients.length > 0 ? (
                                                values.ingredients.map((dirc, index) => (
                                                    <div key={index}>
                                                        <div className="flex flex-row">
                                                            <DaisyInput
                                                                name={`ingredients[${index}].name`}
                                                                label="Name"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.ingredients[index].name}
                                                            />
                                                            <DaisyInput
                                                                name={`ingredients[${index}].quantity`}
                                                                label="Qty"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.ingredients[index].quantity}
                                                            />
                                                            <DaisyInput
                                                                name={`ingredients[${index}].unit`}
                                                                label="Unit"
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.ingredients[index].unit}
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

                                <h3>Directions</h3>
                                <FieldArray
                                    name="directions"
                                    render={arrayHelpers => (
                                        <div>
                                            {values.directions && values.directions.length > 0 ? (
                                                values.directions.map((dirc, index) => (
                                                    <div key={index}>
                                                        <DaisyInput
                                                            name={`directions[${index}].explanation`}
                                                            label="Expl:"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.directions[index].explanation}
                                                        />
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
                                            ) : (<button type="button" onClick={() => arrayHelpers.push('')}>Add a direction</button>)}
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

                                <p>Recipe Credit</p>

                                <DaisyInput
                                    label="Credit URL"
                                    name="recipeCredit.url"
                                    id="recipeCredit.url"
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
                                    name="recipeCredit.embedUrl"
                                    id="recipeCredit.embedUrl"
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
                                    name="recipeCredit.account"
                                    id="recipeCredit.account"
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
                                    name="recipeCredit.accountUrl"
                                    id="recipeCredit.accountUrl"
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
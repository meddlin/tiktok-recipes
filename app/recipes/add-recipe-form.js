import { useState } from 'react';
import { useFormikContext, Formik, Field, FieldArray, ErrorMessage } from "formik";
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
                            directions: tempDirections,
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
                        <span><b>ingredients</b>: {JSON.stringify(tempIngredients)}</span>
                        <br />
                        <span><b>directions</b>: {JSON.stringify(tempDirections)}</span>

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
                                <h3>Ingredients</h3>
                                {tempIngredients && tempIngredients.length > 0 ? tempIngredients.map((ingr, key) => {
                                    return (
                                        <div key={key} className="flex flex-row">
                                            <input placeholder='name' />
                                            <input placeholder='quantity' />
                                            <input placeholder='unit' />
                                            <div onClick={() => console.log('remove ingredient')}>REM -</div>
                                        </div>
                                    )
                                }) : <div className="flex flex-row">
                                    <input placeholder='name' />
                                    <input placeholder='quantity' />
                                    <input placeholder='unit' />
                                    <div onClick={() => console.log('remove ingredient')}>REM -</div>
                                </div>
                                }
                                <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                        let arr = [{ name: 'ex name', quantity: '1', unit: 'oz' }, ...tempIngredients]
                                        setTempIngredients(arr)
                                    }}
                                >
                                    +1 ingr
                                </div>

                                {/* directions */}
                                <h3>Directions</h3>
                                {/* <Field name="directions[0].explanation" /> */}
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

                                {/* {values.directions && values.directions.length > 0 ? values.directions.map((dirc, key) => {
                                    return (
                                        <div key={key} className="flex flex-row">
                                            <DaisyInput
                                                // name={`${ dirc[key].explanation }`}

                                                // name={`${dirc.explanation}`}
                                                name={`${values.directions[key].explanation}`}

                                                label="Expl:"
                                                type={'text'}
                                                // className={`${errors.dirc[key].explanation && touched.dirc[key].explanation ? 'input-error' : ''}`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            // value={values.dirc[key].explanation}
                                            />
                                            <div onClick={() => console.log('remove direction')}>REM -</div>
                                        </div>
                                    )
                                }) : <div className="flex flex-row">
                                    <DaisyInput
                                        name={`${dirc[key].explanation}`}
                                        label="Expl:"
                                        type={'text'}
                                        className={`${errors.dirc[key].explanation && touched.dirc[key].explanation ? 'input-error' : ''}`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.dirc[key].explanation}
                                    />
                                    <div onClick={() => console.log('remove direction')}>REM -</div>
                                </div>
                                } */}
                                {/* <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                        let arr = [{ explanation: 'do a thing' }, ...tempDirections]
                                        setTempDirections(arr)
                                    }}
                                >
                                    +1 dirc
                                </div> */}

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
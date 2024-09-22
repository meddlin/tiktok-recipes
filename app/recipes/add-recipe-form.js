import { useFormikContext, Formik, Field, ErrorMessage } from "formik";
import { object, string, number, date } from 'yup';
import DaisyInput from "@/components/DaisyInput";
import DaisyButton from "@/components/DaisyButton";
import apiClient from "@/libs/api";

export default function AddRecipeForm() {
    const validationSchema = object().shape({
        title: string().required('Required')
    })

    const initialValues = {
        title: 'Sample recipe'
    }

    return (
        <>
            <div className="bg-slate-400 py-5 mb-10">
                <h2 className="flex justify-center items-center text-xl font-bold text-slate-900">Add fuel log</h2>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                    try {
                        await apiClient.post('/add-recipe', {
                            title: 'Sample recipe title',
                            description: 'this is a sample description',
                            category: 'dinner',
                            ingredients: [
                                { name: 'eggs', quantity: '1' },
                                { name: 'sugar', quantity: 'some' }
                            ]
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
                            </div>

                            <div className="flex justify-between my-5">
                                <DaisyButton
                                    label="Submit"
                                    type="submit"
                                    className="btn-success"
                                />
                                <DaisyButton
                                    label="Clear"
                                    type="button"
                                    onClick={handleReset}
                                />
                            </div>
                        </form>
                    </>
                )}
            </Formik>
        </>
    );
}
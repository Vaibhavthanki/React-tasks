import './App.css';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

function App() {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        preferedLocation: [{
            location: ""
        }],
        educationalDetails: [{
            course: "",
            startingYear: "",
            complitionYear: "",
            univercity: "",
            gread: "",
        }],
        acceptTerms: false,
    }
    const stratingValue = () => {
        let today = new Date();
        let month = today.getMonth() + 1;
        let year = today.getFullYear();
        if (month < 10) {
            month = "0" + month;
        }
        today = year + "-" + month;
        return today;
    }
    let maxStartingvalue = stratingValue();
    const complitingValue = () => {
        let today = new Date();
        let month = today.getMonth() + 1;
        let year = today.getFullYear() + 4;
        if (month < 10) {
            month = "0" + month;
        }
        today = year + "-" + month;
        return today
    }
    let maxComplitingValue = complitingValue();
    console.log(maxStartingvalue);
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().trim().matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "* Please enter valid Firstname").required('* FirstName is required'),
        lastName: Yup.string().trim().matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, "* Please enter valid LastName").required('* LastName is required'),
        email: Yup.string().trim().email('* Invalid email').required('* Email is required').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "* Please enter valid email-address"),
        preferedLocation: Yup.array().of(
            Yup.object().shape({
                location: Yup.string().required("* Please enter your prefered loaction")
            })
        ).min(1, "* Please enter atleast one preferedloaction"),
        educationalDetails: Yup.array().of(
            Yup.object().shape({
                course: Yup.string().required("* Please select your course"),
                startingYear: Yup.string().required("* Please select starting year"),
                complitionYear: Yup.string().required("* Please select compliting year"),
                univercity: Yup.string().required("* Please select your univercity"),
                gread: Yup.number().required("* Please enter your gread")
            })
        ),
        acceptTerms: Yup.bool().oneOf([true], "* Please accpt terms and condition")
    })
    const onSubmit = (data) => {
        console.log(data);
    }
    const courseList = [
        { value: "Bsc", label: "Bsc" },
        { value: "Msc", label: "Msc" },
        { value: "BE", label: "BE" },
        { value: "ME", label: "ME" },
        { value: "Btech", label: "Btech" },
        { value: "Mtech", label: "Mtech" },
    ]
    return (
        <div className="App">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    ({ errors, values, touched, setvalues }) => (
                        <Form>
                            <div className='container'>
                                <div className='row'>
                                    <h2 className='text-center'>Form Registration</h2>
                                    <div className='col-md-8 mx-auto mt-3'>
                                        <div className='d-md-flex'>
                                            <label className='form-lable col-md-2'>First-Name:</label>
                                            <Field className='form-control' id="firstName" type="text" name="firstName"></Field>
                                        </div>
                                        <ErrorMessage name='firstName' component="div" className='text-danger col-md-8 mx-auto'></ErrorMessage>
                                    </div>
                                    <div className='col-md-8 mx-auto mt-3'>
                                        <div className='d-md-flex'>
                                            <label className='form-lable col-md-2'>Last-Name:</label>
                                            <Field className='form-control' id="lastName" type="text" name="lastName"></Field>
                                        </div>
                                        <ErrorMessage name='lastName' component="div" className='text-danger col-md-8 mx-auto'></ErrorMessage>
                                    </div>
                                    <div className='col-md-8 mx-auto mt-3'>
                                        <div className='d-md-flex'>
                                            <label className='form-lable col-md-2'>email:</label>
                                            <Field className='form-control' id="email" type="email" name="email"></Field>
                                        </div>
                                        <ErrorMessage name='email' component="div" className='text-danger col-md-8 mx-auto'></ErrorMessage>
                                    </div>
                                    <div>
                                        {
                                            <div className='col-md-8 mx-auto mt-3'>
                                                <div className='d-md-flex'>
                                                    <label className='form-lable col-md-2'>Prefered-Location:</label>
                                                    <FieldArray name="preferedLocation">
                                                        {({ remove, push }) => (
                                                            <div className='d-md-flex col-md-8'>
                                                                <div className='col-md-12'>
                                                                    {values.preferedLocation.length > 0 && values.preferedLocation.map((data, index) => (
                                                                        <div key={index} className='d-md-flex col-md-12 flex-column'>
                                                                            <Field className="form-control" id="preferedLocation" type="text" name={`preferedLocation.${index}.location`}></Field>
                                                                            <ErrorMessage name={`preferedLocation.${index}.location`} component="div" className='text-danger' />
                                                                            {index > 0 &&
                                                                                <div>
                                                                                    <button type='button' className='btn btn-primary' onClick={() => remove(index)}>Remove</button>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div>
                                                                    <button type='button' onClick={() => push({ location: "" })} className="btn btn-primary">Addmore</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </FieldArray>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        {
                                            <div className='col-md-8 mx-auto mt-3'>
                                                <FieldArray name='educationalDetails'>
                                                    {({ remove, push }) => (

                                                        <div className='col-md-12'>
                                                            {values.educationalDetails.length > 0 && values.educationalDetails.map((data, index) => (
                                                                <div key={index}>
                                                                    <div className='d-md-flex mt-3 flex-column'>
                                                                        <div className='d-md-flex'>
                                                                            <label className='form-label col-md-2'>Coure:</label>
                                                                            <Field as="select" className="form-select" name={`educationalDetails.${index}.course`}>
                                                                                <option value={""} selected hidden>Please select your course</option>
                                                                                {
                                                                                    courseList.map((optiondata, index) => (
                                                                                        <option value={optiondata.value}>{optiondata.value}</option>
                                                                                    ))
                                                                                }
                                                                            </Field>
                                                                        </div>
                                                                        <ErrorMessage name={`educationalDetails.${index}.course`} component="div" className='text-danger col-md-8 mx-auto' />
                                                                    </div>
                                                                    <div className='d-md-flex mt-3 flex-column'>
                                                                        <div className='d-md-flex'>
                                                                            <label className='form-label col-md-2'>starting-Year:</label>
                                                                            <Field type="month" className="form-control" name={`educationalDetails.${index}.startingYear`} max={maxStartingvalue}></Field>
                                                                        </div>
                                                                        <ErrorMessage name={`educationalDetails.${index}.startingYear`}
                                                                            component="div" className='text-danger col-md-8 mx-auto' />
                                                                    </div>
                                                                    <div className='d-md-flex mt-3 flex-column'>
                                                                        <div className='d-md-flex'>
                                                                            <label className='form-label col-md-2'>complition-Year:</label>
                                                                            <Field type="month" className="form-control" name={`educationalDetails.${index}.complitionYear`} max={maxComplitingValue}></Field>
                                                                        </div>
                                                                        <ErrorMessage name={`educationalDetails.${index}.complitionYear`}
                                                                            component="div" className='text-danger col-md-8 mx-auto' />
                                                                    </div>
                                                                    <div className='d-md-flex mt-3 flex-column'>
                                                                        <div className='d-md-flex'>
                                                                            <label className='form-label col-md-2'>Univercity:</label>
                                                                            <Field type="text" className="form-control" name={`educationalDetails.${index}.univercity`}></Field>
                                                                        </div>
                                                                        <ErrorMessage name={`educationalDetails.${index}.univercity`}
                                                                            component="div" className='text-danger col-md-8 mx-auto' />
                                                                    </div>
                                                                    <div className='d-md-flex mt-3 flex-column'>
                                                                        <div className='d-md-flex'>
                                                                            <label className='form-label col-md-2'>Gread:</label>
                                                                            <Field type="number" className="form-control" name={`educationalDetails.${index}.gread`}></Field>
                                                                        </div>
                                                                        <ErrorMessage name={`educationalDetails.${index}.gread`}
                                                                            component="div" className='text-danger col-md-8 mx-auto' />
                                                                    </div>
                                                                    {
                                                                        index > 0 &&
                                                                        <div>
                                                                            <button type='button' className='btn btn-primary' onClick={() => remove(index)}>Remove</button>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            ))}
                                                            <div className='d-md-flex mt-3'>
                                                                <button type='button' className='btn btn-primary' onClick={() => push({ course: "", startingYear: "", complitionYear: "", univercity: "", gread: "", })}>Addmore</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </FieldArray>
                                            </div>
                                        }
                                    </div>
                                    <div className='col-md-8 mx-auto mt-3'>
                                        <div className='d-md-flex'>
                                            <label className='form-lable col-md-2'>Accept-terms:</label>
                                            <Field className='form-checkbox' id="acceptTerms" type="checkbox" name="acceptTerms"></Field>
                                        </div>
                                        <ErrorMessage name='acceptTerms' component="div" className='text-danger col-md-8 mx-auto'></ErrorMessage>
                                    </div>
                                    <div className='col-md-8 mx-auto mt-3'>
                                        <button type='submit' className='d-table mx-auto btn btn-primary'>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
            </Formik>
        </div>
    );
}

export default App;

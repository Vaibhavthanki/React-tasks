import './App.css';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

function App() {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    preferedLocation: [],
    educationalDetails: [{}],
    acceptTerms: false,
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim().matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,"* Please enter valid Firstname").required('* FirstName is required'),
    lastName: Yup.string().trim().matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,"* Please enter valid LastName").required('* LastName is required'),
    email: Yup.string().trim().email('* Invalid email').required('* Email is required').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"* Please enter valid email-address"),
    
    acceptTerms : Yup.bool().oneOf([true],"* Please accpt terms and condition")
  })
  const onSubmit = (data) => {
    console.log(data);
  }
  const addnewfield = (e,values,setvalues) => {
    
  }
  return (
    <div className="App">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {
        ({errors,values,touched,setvalues}) => (
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
              <div className='col-md-8 mx-auto mt-3'>
                <div className='d-md-flex justify-content-md-between'>
                  <label className='form-lable col-md-2'>Prefered-Location:</label>
                  <div className='col-md-8'>
                  <Field className="form-control" id="preferedLocation" type="text" name="preferedLocation"></Field>
                  </div>
                  <button type='button' onClick={e => addnewfield(e,values,setvalues)} className="btn btn-primary">Addmore</button>
                  <FieldArray name="preferedLocation">
                    {
                      () => (values.preferedLocation.map((preferedLocation,index) => {
                        const preferedLocationErrors = errors.preferedLocation?.length && errors.preferedLocation[index] || {};
                        const preferedLocationTouched = touched.preferedLocation?.length && touched.preferedLocation[index] || {};
                        return(
                          <div key={index} className="col-md-6 mx-auto mt-30">
                            <Field name={`preferedLocation.${index}.preferedLocation`} type="text" className={'form-control' + (preferedLocationErrors.preferedLocation && preferedLocationTouched.preferedLocation ? ' is-valid': "")}></Field>
                            <ErrorMessage name={`preferedLocation.${index}.preferedLocation`} component="div" className='invalid-feedback'/>
                          </div>
                        );
                      }))
                    }
                  </FieldArray>
                </div>
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

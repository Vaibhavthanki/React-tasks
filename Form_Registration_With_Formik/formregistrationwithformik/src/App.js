import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function App() {
  const countryList = ["India","Sri-lanka","Bhutan","Nepal","Bangladesh"];
  const country = countryList.map((value,index) => {
    return(
      <option value={value} key={index}>{value}</option>
    )
  })
  console.log(country);
  const currentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yy = today.getFullYear();

    if(dd < 10){
      dd = '0' + dd;
    }
    if(mm < 10){
      mm = '0' + mm
    }

    today = yy + '-' + mm + '-' + dd; 
    return today;
  }
  let day = currentDate();
  console.log(day);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    birthdate: "",
    gender: "",
    mobileNumber: "",
    language: [],
    password: "",
    confirmPassword: "",
    url: "",
    country: "",
    acceptTerms: false,
  }
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().trim().matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,"* Please enter valid Firstname").required('* FirstName is required'),
    lastName: Yup.string().trim().matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,"* Please enter valid LastName").required('* LastName is required'),
    email: Yup.string().trim().email('* Invalid email').required('* Email is required').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"* Please enter valid email-address"),
    birthdate: Yup.string().required("* Please enter your birthdate"),
    gender: Yup.string().required("* Please select your gender"),
    mobileNumber: Yup.number().min(10,"* Invalid mobilenumber").required("* Please enter your mobilenumber"),
    language: Yup.array().max(4,"* You can only select 4 language").min(2,"Please select at least 2 language"),
    password: Yup.string().required("* Please enter your password").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/img,"* password must contain 8 characters, at least one letter, one number and one special character"),
    confirmPassword: Yup.string().required("* Please enter confirm Password").oneOf([Yup.ref('password'),null],"* Confirmpassword doesn't match"),
    url : Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,"* Please enter valid url").required("* Please enter valid url"),
    country : Yup.string().nullable().required("* Please select your country"),
    acceptTerms : Yup.bool().oneOf([true],"* Please accpt terms and condition")
  })
  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className="App">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className='container'>
            <div className='row'>
              <h2 className='text-center'>Form Registration</h2>
              <div className='col-md-8 mx-auto mt-3'>
                <div className='d-md-flex'>
                  <label className='form-lable col-md-2'>FirstName:</label>
                  <Field className='form-control' id="firstName" type="text" name="firstName"></Field>
                </div>
                <ErrorMessage name='firstName' component="div" className='text-danger col-md-8 mx-auto'></ErrorMessage>
              </div>
              <div className='col-md-8 mx-auto mt-3'>
                <div className='d-md-flex'>
                  <label className='form-lable col-md-2'>LastName:</label>
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
                <div className='d-md-flex'>
                  <label className='form-lable col-md-2'>Birthdate:</label>
                  <Field className='form-control' id="birthdate" type="date" name="birthdate" max={day}></Field>
                </div>
                <ErrorMessage name='birthdate' component="div" className='text-danger col-md-8 mx-auto'></ErrorMessage>
              </div>
              <div className='col-md-8 mx-auto mt-3'>
                <div className='d-md-flex'>
                  <label className='form-lable col-md-2'>gender:</label>
                  <div className='d-md-flex col-md-10'>
                    <div className='col-4'>
                    <label className='form-lable me-1'>Male:</label>
                    <Field type="radio" name="gender" value="male"/>
                    </div>
                    <div className='col-4'>
                      <label className='form-lable me-1'>Female:</label>
                      <Field type="radio" name="gender" value="female"/>
                    </div>
                    <div className='col-4'>
                      <label className='form-lable me-1'>Other:</label>
                      <Field type="radio" name="gender" value="other"/>
                    </div>
                  </div>
                </div>
                <ErrorMessage name='gender' component="div" className='text-danger col-md-8 mx-auto'></ErrorMessage>
              </div>
              <div className='col-md-8 mx-auto mt-3'>
                <div className='d-md-flex'>
                  <label className='form-lable col-md-2'>Mobile-Number:</label>
                  <Field className='form-control' id="mobileNumber" type="number" name="mobileNumber"></Field>
                </div>
                <ErrorMessage name='mobileNumber' component="div" className='text-danger col-md-8 mx-auto'></ErrorMessage>
              </div>
              <div className='col-md-8 mx-auto mt-3'>
                <div className='d-md-flex'>
                  <label className='form-lable col-md-2'>Language:</label>
                  <div className='d-md-flex col-md-10 flex-md-wrap'>
                    <div className='col-4'>
                    <label className='form-lable me-1'>Gujarati:</label>
                    <Field type="checkbox" name="language" value="gujarati"/>
                    </div>
                    <div className='col-4'>
                      <label className='form-lable me-1'>Hindi:</label>
                      <Field type="checkbox" name="language" value="hindi"/>
                    </div>
                    <div className='col-4'>
                      <label className='form-lable me-1'>English:</label>
                      <Field type="checkbox" name="language" value="english"/>
                    </div>
                    <div className='col-4'>
                      <label className='form-lable me-1'>Spanish:</label>
                      <Field type="checkbox" name="language" value="spanish"/>
                    </div>
                    <div className='col-4'>
                      <label className='form-lable me-1'>Arabic:</label>
                      <Field type="checkbox" name="language" value="arabic"/>
                    </div>
                    <div className='col-4'>
                      <label className='form-lable me-1'>Urdu:</label>
                      <Field type="checkbox" name="language" value="urdu"/>
                    </div>
                  </div>
                </div>
                <ErrorMessage name='language' component="div" className='text-danger col-md-8 mx-auto'></ErrorMessage>
              </div>
              <div className='col-md-8 mx-auto mt-3'>
                <div className='d-md-flex'>
                  <label className='form-lable col-md-2'>Password:</label>
                  <Field className='form-control' id="password" type="password" name="password"></Field>
                </div>
                <ErrorMessage name='password' component="div" className='text-danger col-md-8 mx-auto'></ErrorMessage>
              </div>
              <div className='col-md-8 mx-auto mt-3'>
                <div className='d-md-flex'>
                  <label className='form-lable col-md-2'>confirmPassword:</label>
                  <Field className='form-control' id="confirmPassword" type="password" name="confirmPassword"></Field>
                </div>
                <ErrorMessage name='confirmPassword' component="div" className='text-danger col-md-8 mx-auto'></ErrorMessage>
              </div>
              <div className='col-md-8 mx-auto mt-3'>
                <div className='d-md-flex'>
                  <label className='form-lable col-md-2'>Url:</label>
                  <Field className='form-control' id="url" type="text" name="url"></Field>
                </div>
                <ErrorMessage name='url' component="div" className='text-danger col-md-8 mx-auto'></ErrorMessage>
              </div>
              <div className='col-md-8 mx-auto mt-3'>
                <div className='d-md-flex'>
                  <label className='form-lable col-md-2'>Country:</label>
                  <Field className='form-select' id="country" as="select" name="country">
                    <option value={""} disabled hidden>Please select your country...</option>
                    {country}
                  </Field>
                </div>
                <ErrorMessage name='country' component="div" className='text-danger col-md-8 mx-auto'></ErrorMessage>
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
      </Formik>
    </div>
  );
}

export default App;

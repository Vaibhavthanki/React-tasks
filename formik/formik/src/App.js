import './App.css';
import axios from 'axios'
import { Formik, Field, Form } from 'formik';

function App() {
  return (
    <div className="App">
      <div>
        <h1>Sign Up</h1>
        <Formik
          initialValues={{
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            password:'',
            confirmPassword:'',
            acceptTerms:true,

          }}
          onSubmit={ (values) => {

            const headers = {
              "Content-type": "application/json; charset=UTF-8"
            }

            axios.post("http://localhost:4000/accounts/register",values,headers)
            .then(values => {
              console.log(values);
            })

          }}
        >
          <Form>
            <label htmlFor='title'>Titla</label>
            <Field id="title" name="title" placeholder="title" type="text"/>

            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="Jane" type="text"/>

            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Doe" type="text"/>

            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="jane@acme.com"
              type="email"
            />

            <label htmlFor='password'>password</label>
            <Field id="password" name="password" placeholder="Please enter your password" type="password"/>

            <label htmlFor='confirmPassword'>confirmPassword</label>
            <Field id="confirmPassword" name="confirmPassword" placeholder="Please enter your confirmPassword" type="password"/>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default App;

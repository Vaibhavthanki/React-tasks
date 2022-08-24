import './App.css';
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(
    {
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: true,
    language:["Gujarati","English","Hindi"]
  }
  )
  const myData = (e) => {


    if (e.target.type == "checkbox") {
      setData({ ...data, [e.target.name]: e.target.checked });
    }

    else {
      setData({ ...data, [e.target.name]: e.target.value });

    }

  }

  const mySubmit = (e) => {
    console.log(e)
    e.preventDefault();
    // console.log(data);
  }
  return (
    <div className="App">
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            {
              <div className='col-6 mx-auto'>
                <form onSubmit={mySubmit}>
                  <div className='mb-3'>
                    <label className='col-4'>title</label>
                    <input type="text" name='title' onChange={myData} className='col-8'/>
                  </div>
                  <div className='mb-3'>
                    <label className='col-4'>FirstName</label>
                    <input type="text" name='firstName' onChange={myData} className='col-8'/>
                  </div>
                  <div className='mb-3'>
                    <label className='col-4'>LastName</label>
                    <input type="text" name='lastName' onChange={myData} className='col-8'/>
                  </div>
                  <div className='mb-3'>
                    <label className='col-4'>email</label>
                    <input type="text" name='email' onChange={myData} className='col-8'/>
                  </div>
                  <div className='mb-3'>
                    <label className='col-4'>password</label>
                    <input type="text" name='password' onChange={myData} className='col-8'/>
                  </div>
                  <div className='mb-3'>
                    <label className='col-4'>confirmPassword</label>
                    <input type="text" name='confirmPassword' onChange={myData} className='col-8'/>
                  </div>
                  <div className='mb-3'>
                    {
                    data.language.map((value) => {
                    return(
                      <div>
                      <label>{value}</label>
                      <input type='checkbox' value={value} name={value}/>  
                      </div>
                      )
                    })
                  }
                  </div>
                  <input type="submit" value="Save" />
                </form>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

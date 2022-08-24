import React, { useState } from 'react';
import './App.css';
import ReactSelect from "react-select";

export default function Form() {
    const [state, setState] = useState({
        form: {
            firstName: "",
            middleName: "",
            lastName: "",
            gender: null,
            email: "",
            password: "",
            confirmPassword: "",
            mobileNumber: "",
            address: "",
            language: [],
            city: "",
            state: "",
            country: "",
            zipCode: "",
            acceptTerms: false,
        },
        formErrors: {
            firstName: null,
            middleName: null,
            lastName: null,
            gender: "",
            email: null,
            password: null,
            confirmPassword: null,
            mobileNumber: null,
            address: null,
            language: null,
            city: null,
            state: null,
            country: null,
            acceptTerms: false,
        }
    })
    const countryList = [
        { value: "india", label: "India" },
        { value: "us", label: "US" },
        { value: "australia", label: "Australia" },
        { value: "Canada", label: "Canada" }
    ];

    const languageList = [
        { value: "english", label: "English" },
        { value: "hindi", label: "Hindi" },
        { value: "spanish", label: "Spanish" },
        { value: "arabic", label: "Arabic" }
    ];
    const stateList = [
        { value: "gujarat", label: "Gujarat" },
        { value: "maharastra", label: "Maharastra" },
        { value: "utterpradesh", label: "Utterpradesh" },
        { value: "kerela", label: "Kerela" },
    ];
    const cityList = [
        { value: "porbandar", label: "Porbandar" },
        { value: "rajkot", label: "Rajkot" },
        { value: "ahemdabad", label: "Ahemdabad" },
        { value: "vadodara", label: "Vadodara" },
    ];
    const validateNumber = evt => {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;

        key = String.fromCharCode(key);

        if (key)
            var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    const handleChange = (e) => {

        const { name, value, checked } = e.target;
        const { form, formErrors } = state;
        let formObj = {};
        if (name === "language") {
            if (checked) {
                formObj = { ...form };
                formObj[name].push(value);
            } else {
                formObj = {
                    ...form,
                    [name]: form[name].filter(x => x !== value)
                };
            }
        }
        else if (name === "acceptTerms") {
            if (checked) {
                formObj = { ...form, [name]: true };
            } else {
                formObj = { ...form, [name]: false }
            }
        }
        else {
            formObj = {
                ...form,
                [name]: value,
            }

        }

        //if (!Object.keys(formErrors).includes(name)) return;

        let formErrorsObj = {};

        if (name === "password" || name === "confirmPassword") {
            let refValue = state.form[name === "password" ? "confirmPassword" : "password"]
            const errorMsg = validateField(name, value, refValue);
            formErrorsObj = { ...formErrors, [name]: errorMsg };
        } /* else {
            const errorMsg = validateField(name,
                name == "language" ? state.form["language"] : value);
            formErrorsObj = { ...formErrors, [name]: errorMsg }
            
        }; */
        else {
            const errorMsg = validateField(name, value);
            formErrorsObj = { ...formErrors, [name]: errorMsg };
        }
        setState({ ...state, formErrors: formErrorsObj, form: formObj });
    }
    const validateField = (name, value, refValue) => {
        let errorMsg = null;
        switch (name) {
            case "firstName":
                if (!value) errorMsg = "* Please enter Firstname";
                else if (!/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(value)) errorMsg = "Please enter valid Firstname";
                break;
            case "middleName":
                if (!value) errorMsg = "* Please enter Firstname";
                else if (!/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(value)) errorMsg = "Please enter valid middleName";
                break;
            case "lastName":
                if (!value) errorMsg = "* Please enter Firstname";
                else if (!/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(value)) errorMsg = "Please enter valid lastName";
                break;
            case "gender":
                if (!value) errorMsg = "* Please select your gender";
                break;
            case "email":
                if (!value) errorMsg = "* Please enter your email-address";
                if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) errorMsg = "* Please enter valid email-address";
                break;
            case "password":
                if (!value) errorMsg = "* please enter valid password";
                else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/img.test(value)) errorMsg = "* password must contain 8 characters, at least one letter, one number and one special character";
                else if (refValue && value !== refValue)
                    errorMsg = "Password and Confirm Password does not match.";
                break;
            case "confirmPassword":
                if (!value) errorMsg = "* please enter confirmPassword";
                else if (refValue && value !== refValue) errorMsg = "* confirmPassword and password doesn't match";
                break;
            case "mobileNumber":
                if (!value) errorMsg = "* please enter valid mobilenumber";
                else if (!/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/img.test(value)) errorMsg = "* please enter valid mobilenumber";
                break;
            case "address":
                if (!value) errorMsg = "* please enter your address";
                else if (!/^[a-zA-Z0-9\s,.'-]{3,}$/img.test(value)) errorMsg = "* please enter valid address";
                break;
            case "language":
                if (value.length === 0) errorMsg = "* please select your language";
                break;
            case "city":
                if (!value) errorMsg = "* Please select your city";
                break;
            case "state":
                if (!value) errorMsg = "* please select your state";
                break;
            case "country":
                if (!value) errorMsg = "* please select your country";
                break;
            case "acceptTerms":
                if (!value) errorMsg = "* Please accept terms and condition";
                break;
            default: break;
        }
        return errorMsg;
    }
    const validateForm = (form, formErrors, validateFunc) => {
        const errorObj = {};
        Object.keys(formErrors).map(x => {
            let refValue = null;
            if (x === "password" || x === "confirmpassword") {
                refValue = form[x === "password" ? "confirmPassword" : "password"];
            }
            const msg = validateFunc(x, form[x], refValue);
            if (msg) errorObj[x] = msg;
        });
        return errorObj;
    };
    const handleSubmit = () => {
        const { form, formErrors } = state;
        const errorObj = validateForm(form, formErrors, validateField);
        if (Object.keys(errorObj).length !== 0) {
            setState({ ...state, formErrors: { ...formErrors, ...errorObj } });
            return false;
        }
        console.log(form);
    }
    return (
        <div className='Form'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='col-6 mx-auto'>
                            <h2 className='text-center'>Registration-Form</h2>
                            <form>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="firstName" className="form-label">FirstName:</label>
                                    <input type="text" className="form-control" id="firstName" placeholder='Please enter your first name' name='firstName' onChange={handleChange} onBlur={handleChange} value={state.form.firstName} />
                                    {state.formErrors.firstName && (
                                        <span className="err">{state.formErrors.firstName}</span>
                                    )}
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="MiddleName" className="form-label">MiddleName:</label>
                                    <input type="text" className="form-control" id="MiddleName" placeholder='Please enter your middle name' name='middleName' onChange={handleChange} onBlur={handleChange} value={state.form.middleName} />
                                    {state.formErrors.middleName && (
                                        <span className="err">{state.formErrors.middleName}</span>
                                    )}
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="LastName" className="form-label">LastName:</label>
                                    <input type="text" className="form-control" id="LastName" placeholder='Please enter your last name' name='lastName' onChange={handleChange} onBlur={handleChange} value={state.form.lastName} />
                                    {state.formErrors.lastName && (
                                        <span className="err">{state.formErrors.lastName}</span>
                                    )}
                                </div>
                                <div className='col-md-12 mb-3'>
                                    <label htmlFor="Gender" className='form-label'>Gender:</label>
                                    <div className='form-check'>
                                        <div className='d-md-flex'>
                                            <div className='col-md-4 col-sm-12'>
                                                <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault1" value="Male" onChange={handleChange} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">Male</label>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault2" value="Female" onChange={handleChange} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">Female</label>
                                            </div>
                                            <div className='col-md-4 col-sm-12'>
                                                <input className="form-check-input" type="radio" name="gender" id="flexRadioDefault3" value="Other" onChange={handleChange} />
                                                <label className="form-check-label" htmlFor="flexRadioDefault3">Other</label>
                                            </div>
                                        </div>
                                    </div>
                                    {state.formErrors.gender && (
                                        <span className="err">{state.formErrors.gender}</span>
                                    )}
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="inputEmail4" className="form-label">Email:</label>
                                    <input type="email" className="form-control" id="inputEmail4" placeholder='Please enter your email' onChange={handleChange} onBlur={handleChange} name="email" value={state.form.email} />
                                    {state.formErrors.email && (
                                        <span className="err">{state.formErrors.email}</span>
                                    )}
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="inputPassword4" className="form-label">Password:</label>
                                    <input type="password" className="form-control" id="inputPassword4" placeholder='Please enter 8th digit password' name='password' value={state.form.password} onChange={handleChange} onBlur={handleChange} />
                                    {state.formErrors.password && (
                                        <span className="err">{state.formErrors.password}</span>
                                    )}
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="inputConfirmPassword4" className="form-label">ConfirmPassword:</label>
                                    <input type="password" className="form-control" id="inputConfirmPassword4" placeholder='Please reenter password' name='confirmPassword' value={state.form.confirmPassword} onChange={handleChange} onBlur={handleChange} />
                                    {state.formErrors.confirmPassword && (
                                        <span className="err">{state.formErrors.confirmPassword}</span>
                                    )}
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="inputAddress" className="form-label">MobileNumber:</label>
                                    <input type="number" className="form-control" id="inputMobileNumber" placeholder="Please enter mobilenumber" name='mobileNumber' onChange={handleChange} onBlur={handleChange} onKeyPress={validateNumber} value={state.form.mobileNumber} />
                                    {state.formErrors.mobileNumber && (
                                        <span className="err">{state.formErrors.mobileNumber}</span>
                                    )}
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="inputAddress" className="form-label">Address:</label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="Please enter address" onChange={handleChange} onBlur={handleChange} name="address" value={state.form.address} />
                                    {state.formErrors.address && (
                                        <span className="err">{state.formErrors.address}</span>
                                    )}
                                </div>
                                <div className='col-12 mb-3'>
                                    <label htmlFor="inputlanguage" className='form-lael'>Language:</label>
                                    <div className='d-md-flex mt-2'>
                                        {
                                            (languageList.map((x) => {
                                                return (
                                                    <div className='col-3'>
                                                        <input type="checkbox" name='language' value={x.value} onChange={handleChange} />
                                                        <label className='ms-1'>{x.value}</label>
                                                    </div>
                                                )
                                            }))
                                        }
                                    </div>
                                    {state.formErrors.language && (
                                        <span className="err">{state.formErrors.language}</span>
                                    )}
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="inputState" className="form-label">City:</label>
                                    <ReactSelect options={cityList} id='inputState' name='City' value={cityList.find(x => x.value === state.form.country)} onChange={e =>
                                        handleChange({
                                            target: {
                                                name: "city",
                                                value: e.value
                                            }
                                        })
                                    } />
                                    {state.formErrors.city && (
                                        <span className="err">{state.formErrors.city}</span>
                                    )}
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="inputState" className="form-label">State:</label>
                                    <ReactSelect options={stateList} id='inputState' name='state' value={stateList.find(x => x.value === state.form.country)} onChange={e =>
                                        handleChange({
                                            target: {
                                                name: "state",
                                                value: e.value
                                            }
                                        })
                                    } />
                                    {state.formErrors.state && (
                                        <span className="err">{state.formErrors.state}</span>
                                    )}
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="inputCity" className="form-label">Country:</label>
                                    <ReactSelect options={countryList} id="inputCountry" name='country' value={countryList.find(x => x.value === state.form.country)} onChange={e =>
                                        handleChange({
                                            target: {
                                                name: "country",
                                                value: e.value
                                            }
                                        })
                                    } />
                                    {state.formErrors.country && (
                                        <span className="err">{state.formErrors.country}</span>
                                    )}
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="inputZip" className="form-label">Zip:</label>
                                    <input type="text" className="form-control" id="inputZip" placeholder='Please enter zip code' onChange={handleChange} name="zipCode" />
                                </div>
                                <div className="col-12 mb-3">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="gridCheck" name='acceptTerms' onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="gridCheck">
                                            * Accept terms and condition
                                        </label>
                                        {state.formErrors.acceptTerms && (
                                            <span className="err">{state.formErrors.acceptTerms}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-12 mb-3">
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Register</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

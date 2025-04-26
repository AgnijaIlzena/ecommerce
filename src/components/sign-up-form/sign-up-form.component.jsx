import { useState } from 'react';
import './sign-up-form.styles.scss';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils';
import FormInput from '../form-input/form-input.component';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("password", password);
        if (password != confirmPassword){
            alert("password does not match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);   // user is the same as response.user
           await createUserDocumentFromAuth(user, {displayName});
           resetFormFields();
      
        } catch (error){
            console.log(error);
            if (error.code === 'auth/email-already-in-use'){
                alert('Such email already exists');
            } else {
                console.log(error);
            }
        }         

    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
         const {name, value} = event.target;
         setFormFields({...formFields, [name]:value}) 
    }

    return(
        <div>
        <h1>Sign Up with your email</h1>
            <form onSubmit={handleSubmit}>          
                <FormInput 
                    label="Display Name"
                    onChange={handleChange} 
                    type="text" 
                    name="displayName" 
                    value={displayName} 
                    required
                />

                <FormInput 
                    label="Email"
                    onChange={handleChange} 
                    type="email" 
                    name="email" 
                    value={email} 
                    required
                />

                {/* <label>Email</label>
                <input onChange={handleChange} type="email" name="email" value={email} required /> */}

                <label>Password</label>
                <input onChange={handleChange} type="password" name="password" value={password} required />

                <label>Confirm Password</label>
                <input onChange={handleChange} type="password" name="confirmPassword" value={confirmPassword} required />
             
                <button type='submit'>submit</button>
            </form>
        </div>
    )
}

export default SignUpForm;
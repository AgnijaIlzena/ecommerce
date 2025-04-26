// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import { 
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth
 } from './../../utils/firebase.utils.js';
 import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx';

const SignIn = () => {

    // useEffect(() => {
    //     const fetchRedirectResult = async () => {
    //         const response = await getRedirectResult(auth);
    //         console.log('response:', response);
    //         if (response) {
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     };
    
    //     fetchRedirectResult();
    // }, []);

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
    }

    return(
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}> 
                Sign In with Google POpUP
            </button>
            <SignUpForm />
            {/* <button onClick={signInWithGoogleRedirect}> 
                Sign In with Google Redirect
            </button> */}
        </div>
    )
}

export default SignIn;
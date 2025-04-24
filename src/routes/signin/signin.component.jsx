import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth
 } from './../../utils/firebase.utils.js'

const SignIn = () => {
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
        </div>
    )
}

export default SignIn;
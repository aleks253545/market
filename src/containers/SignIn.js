
import { connect } from 'react-redux'

import SignInForm from '../components/HomePage/SignInForm/SignInForm';

import {changePassword, changeLogin, signIn, checkToken} from '../redux//home/home-actions';
let mapStateToProps = (state) => {
    return{
        login:state.homePage.login,
        password:state.homePage.password,
        authorized:state.homePage.authorized
    }
}
let mapDispatchToProps=(dispath)=>{
    return{
        changeLog:(login) => {
            dispath(changeLogin(login));
        },
        changePass:(password) => {  
            dispath(changePassword(password));
        },
        signIn: (login,password) => {
            dispath(signIn(login,password));
        },
        checkToken:() => {
            dispath(checkToken())
        }
    }
}
const SignIn=connect(mapStateToProps,mapDispatchToProps)(SignInForm);
export default SignIn;
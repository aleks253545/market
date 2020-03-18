import { connect } from 'react-redux'

import SignUpForm from '../components/HomePage/SignUpForm/SignUpForm';

import {changePassword, changeLogin, signUp} from '../redux/home/home-actions';
let mapStateToProps = (state) => {
    return{
        login:state.homePage.login,
        password:state.homePage.password,
        authorized:state.homePage.authorized
    }
}
let mapDispatchToProps=(dispath)=>{
    return{
        changeLog: (login) => {
            dispath(changeLogin(login));
        },
        changePass: (password) => {  
            dispath(changePassword(password));
        },
        signUp: (login,password) => {
            dispath(signUp(login,password));
        }

    }
}
const SignUp = connect(mapStateToProps,mapDispatchToProps)(SignUpForm);
export default SignUp;

import { connect } from 'react-redux'

import SignUpForm from '../components/HomePage/SignUpForm/SignUpForm';

import {changePassword, changeLogin, SigUpUser} from '../redux/home-reducer';
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
            dispath(SigUpUser(login,password));
        }

    }
}
const SignUp = connect(mapStateToProps,mapDispatchToProps)(SignUpForm);
export default SignUp;
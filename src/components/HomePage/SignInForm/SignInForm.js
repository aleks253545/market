import React, {useEffect ,useState} from 'react'

import s from './SignInForm.module.scss';
import success from '../../../img/success.png';
import error from '../../../img/error.png';
import { Redirect } from 'react-router-dom';

function SignInForm(props) {
  const [status, setStatus] = useState('success');

  let logRef = React.createRef();
  let pasRef = React.createRef();
  let regexp = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i,
  image,
  statusClassName;
  let mail = props.login.match(regexp);
  if(mail){
    image = success;
    statusClassName = s.successEmail;
  }
  const changeLogin = () => {
    props.changeLog(logRef.current.value);
    setStatus('');
  }
  const changePassword = () => {
    props.changePass(pasRef.current.value);
  }
  const signInUser = () => {
    if(mail){
      props.signIn(props.login,props.password);
    }else { 
        setStatus('error')
    }
  }
  if( status === 'error'){
    image = error;
    statusClassName = s.errorEmail;
  }
  useEffect(() => {
    props.checkCookie();
    return () => {
      props.changePass('');
      props.changeLog('');
    }
  }, [ ])
  if(props.authorized === true ){
    return <Redirect to={'/home/welcoming'}></Redirect>
  }

  return (
    <div className = {s.signBlock}>
      <h3 className= {s.title}>Sign In</h3>
      <form className = {s.form}>
        <label >Login</label>
        <div className = {s.backPanel}>
        <input 
          className = {statusClassName}
          type='login' 
          ref = {logRef} 
          onChange = {changeLogin} 
          value = {props.login}
        />
        <img src={image} className = {s.validateImg} alt = 'img'></img>
        </div>
        <label >password</label>
        <input 
          type='password' 
          ref = {pasRef} 
          onChange = {changePassword} 
          value = {props.password}
        >
        </input>
      </form>
      <button type='submit' className = {s.submitBtn} onClick = {signInUser}>
        <span>Sign In</span>
      </button>
    </div>
  )
}
export default SignInForm;
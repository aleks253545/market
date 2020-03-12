import React, { useEffect } from 'react'

import success from '../../../img/success.png';
import error from '../../../img/error.png';
import s from './SignUpForm.module.scss';
import { Redirect } from 'react-router-dom';

function SignUpForm(props) {
  let logRef = React.createRef();
  let pasRef = React.createRef();
  let regexp = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i,
    image,
    statusClassName;
    let mail = props.login.match(regexp);
    if(mail){
      image = success;
      statusClassName = s.successEmail;
    }else {
      image = error;
      statusClassName = s.errorEmail;
    }
  const changeLogin = () => {
    props.changeLog(logRef.current.value);
  }

  const changePassword = () => {
    props.changePass(pasRef.current.value);
  }

  const signUpUser = () => {
    if(mail){
      props.signUp(props.login,props.password);
    }
    
  }
 
  useEffect(() => {
    return () => {
      props.changePass('');
      props.changeLog('');
    }
  }, [])

  if(props.authorized === true ){
    return <Redirect to={'/home/welcoming'}></Redirect>
  }

  return (
    <div className = {s.signBlock}>
      <h3 className= {s.title}>Sign Up</h3>
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
        <img src={image} className = {s.validateImg}></img>
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
      <button type='submit' className = {s.submitBtn} onClick = {signUpUser} >
        <span>Sign Up</span>
      </button>
    </div>
  )
}
export default SignUpForm;
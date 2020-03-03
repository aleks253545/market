import React, { useEffect } from 'react'

import s from './SignUpForm.module.scss';
import { Redirect } from 'react-router-dom';

function SignUpForm(props) {
  let logRef = React.createRef();
  let pasRef = React.createRef();

  const changeLogin = () => {
    props.changeLog(logRef.current.value);
  }

  const changePassword = () => {
    props.changePass(pasRef.current.value);
  }

  const signUpUser = () => {
    props.signUp(props.login,props.password);
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
        <input 
          type='login' 
          ref = {logRef} 
          onChange = {changeLogin} 
          value = {props.login}
        >
        </input>
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
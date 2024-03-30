import {useContext, useState} from "react";
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch} from "react-redux";
import styles from "./SignUp.module.css";
import {signup} from "../redux/userSlice";

export default function SignUp(){
  const navigate=useNavigate();

  const [values, setValues] = useState({
    userName: '',
    email: '',
    password: ''
  })

  const dispatch=useDispatch();

  const handleValidation = () => {
    const { userName, email, password } = values;
    if (userName == '') {
      alert("Name should be present");
      return false;
    }
    if (userName.length < 3) {
      alert("Name should of more than 3 characters");
      return false;
    }
    if (email === '') {
      alert("Email should be present");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return false;
    }

    if (password === '') {
      alert("Password should be present");
      return false;
    }
    if (password.length < 6) {
      alert("Password should be greater than 6 characters");
      return false;
    }
    return true;
  }

  const formSubmitHandler = async () => {
    event.preventDefault();
    if (handleValidation()) {
      const { userName,email, password } = values;
      try {
        dispatch(signup(userName,email,password));
        navigate("/login?registered=true");
      } catch (error) {
        console.log(error.message);
        alert("SignUp Failed,Please try again");
      }     

    }
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  return(
    <>
      <div className={styles.container}>
        <div className={styles.profile}>
          <i className="fa fa-user"></i>
        </div>
        <form onSubmit={formSubmitHandler}>
          <div className={styles.form_group}>
            <label>Username</label>
            <input type='text'  placeholder={"Enter your name here"} className={styles.input} name='userName' onChange={(e) => handleChange(e)} value={values.userName}></input>
          </div>
          <div className={styles.form_group}>
            <label>Email</label>
            <input type='email'  placeholder={"Enter your Email here"} className={styles.input} name='email' onChange={(e) => handleChange(e)} value={values.email}></input>
          </div>
          <div className={styles.form_group}>
            <label>Password</label>
            <input type='password'  className={styles.input} name='password' onChange={(e) => handleChange(e)} value={values.password} placeholder={"Enter your Password here"}></input>
          </div>
          <button className={styles.btn} >Submit</button>
          <div className={styles.meta}>
            <p>Already have an account?<Link to="/login">LogIn Here</Link>.</p>
          </div>
        </form>
      </div>
    </>
  );
}

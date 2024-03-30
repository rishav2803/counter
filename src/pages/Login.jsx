import {  useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {login} from "../redux/userSlice";
import styles from "./Login.module.css";


export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch=useDispatch();

  // This is use to check whether the login page is rendred from register or directly
  // If from register we are coming then we will give a notif to user to login using new account
  const queryParmas = new URLSearchParams(location.search);

  const isRegistered = queryParmas.get("registered");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });


  const handleValidation = () => {
    const { email, password } = values;
    if (email == "") {
      alert("Name should be present");
      return false;
    }
    if (password === "") {
      alert("Password should be present");
      return false;
    }
    return true;
  };

  const formHandler = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, password } = values;
      try {
        dispatch(login(email, password, () => navigate("/")));
      } catch (error) {
        console.log(error);
        alert("LogIn Failed,Please try again");
      }
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (isRegistered) {
      alert("Registration Successful! Please Login!");
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profile}>
          <i className="fa fa-user"></i>
        </div>
        <div className={styles.form_group}>
          <label>Email</label>
          <input
            onChange={(e) => {
              handleChange(e);
            }}
            type="text"
            placeholder={"Enter your email here"}
            className={styles.input}
            name="email"
          ></input>
        </div>
        <div className={styles.form_group}>
          <label>Password</label>
          <input
            onChange={(e) => {
              handleChange(e);
            }}
            type="password"
            placeholder={"Enter your Password here"}
            className={styles.input}
            name="password"
          ></input>
        </div>
        <button className={styles.btn} onClick={formHandler}>
          Submit
        </button>
        <div className={styles.meta}>
          <p>
            Don't have an account?<Link to="/register">Register Here</Link>.
          </p>
        </div>
      </div>
    </>
  );
}

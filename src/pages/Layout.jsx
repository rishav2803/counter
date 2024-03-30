import React from "react";
import TallyCounter from "../Components/TallyCounter";
import { useDispatch, useSelector } from "react-redux";
import { addCounter } from "../redux/counterSlice";
import styles from "./Layout.module.css";
import {selectCounter} from "../redux/counterSlice";
import {logout, selectCurrentUser} from "../redux/userSlice";
import {auth} from "../firebase";

export default function Layout() {
  const dispatch = useDispatch();
  const counters = useSelector(selectCounter);

  const handleAddCounter = () => {
    dispatch(addCounter());
  };

  console.log(counters)
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button onClick={handleAddCounter}>Add Counter</button>
        <div className={styles.cont}>
          <h1>UserName:{auth.currentUser.displayName}</h1>
          <button onClick={()=>{dispatch(logout())}}> Log out</button>
        </div>
      </div>
      <div className={styles.tallyCounterContainer}>
        {counters.map((id, index) => (
          <TallyCounter index={id} key={id}/>
        ))}
      </div>
    </div>
  );
}

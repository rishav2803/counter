import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementCounter,
  decrementCounter,
  resetCounter,
  setCounterName,
  setInitialValue,
  removeCounter,
} from "../redux/counterSlice";
import styles from "./TallyCounter.module.css";

export default function TallyCounter({index}) {
  const dispatch = useDispatch();
  const [value,setValue]=useState(0);
  const [name,setName]=useState("Tally Counter");

  console.log(index);
  const handleIncrement = () => {
    setValue(value + 1)
    dispatch(incrementCounter());
  };

  const handleDecrement = () => {
    setValue(value - 1)
    dispatch(decrementCounter());
  };

  const handleReset = () => {
    setValue(0)
    dispatch(resetCounter());
  };

  //I have used the prompt to get the value 
  const handleSetCounterName = () => {
    const newName = prompt("Enter new counter name:");
    if (newName !== null) {
      setName(newName);
      dispatch(setCounterName(newName));
    }
  };

  //I have used the prompt to get the value 
  const handleSetInitialValue = () => {
    const newValue = prompt("Enter new initial value:");
    if (newValue !== null && !isNaN(newValue)) {
      setValue(parseInt(newValue,10));
      dispatch(setInitialValue(parseInt(newValue, 10)));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{name}</h2>
        <button onClick={()=>{dispatch(removeCounter(index))}}>X</button>
      </div>
      <div className={styles.form_group}>
        <input type="number" className={styles.input} value={value} readOnly></input>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={handleDecrement}>
          -
        </button>
        <button className={styles.btn} onClick={handleIncrement}>
          +
        </button>
      </div>
      <button style={{ marginBottom: "1rem" }} className={styles.btn} onClick={handleReset}>
        Reset Counter
      </button>
      <button style={{ marginBottom: "1rem" }} className={styles.btn} onClick={handleSetInitialValue}>
        Set Value
      </button>
      <button className={styles.btn} onClick={handleSetCounterName}>
        Counter Name
      </button>
    </div>
  );
}

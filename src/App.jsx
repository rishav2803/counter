import Layout from "./pages/Layout";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute";


function App() {
  return(
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/register" element={<Layout/>}/>
        <Route path="/" element={
          <ProtectedRoute>
            <Layout/>
          </ProtectedRoute>
        }/>
      </Routes>
    </>
  );
}

export default App

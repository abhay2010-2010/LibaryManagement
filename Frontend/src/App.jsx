import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BookDetails from "./pages/BookDetails";
import AddBook from "./pages/AddBook";
import PrivateRoute from "./components/PrivateRoute";
import UpdateBook from "./pages/UpdateBook";
import "./App.css";
function App() {
  return (
    <div >
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/book/:id" element={<PrivateRoute><BookDetails /></PrivateRoute>} />
        <Route path="/add-book" element={<PrivateRoute><AddBook /></PrivateRoute>} />
        <Route path="/edit-book/:id" element={<PrivateRoute><UpdateBook /></PrivateRoute>} />
      </Routes>
    </div>
  );
}
// const styles = {
//   mainpage: {
//     backgroundImage: 'url("https://source.unsplash.com/1600x900/?library,books")',
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     height: "100vh",
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// };
  

export default App;

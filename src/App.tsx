import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
      </Routes>

    </Router>
    </AuthProvider>
  );
};

export default App;

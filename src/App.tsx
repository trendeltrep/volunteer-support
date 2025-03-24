import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import VolunteerProfile from "./pages/VolunteerProfile";
import Login from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";
import RecipientProfile from "./pages/RecipientProfile";

const App = () => {

  const { user } = useAuth();
  
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/volunteer" element={<VolunteerProfile />} />
          <Route path="/recipient" element={<RecipientProfile />} />
          {/* {user?.role === "Volunteer" && <Route path="/profile" element={<VolunteerProfile />} />} */}
          {/* {user?.role === "Recipient" && <Route path="/profile" element={<RecipientProfile />} />} */}
      </Routes>
    </AuthProvider>
  );
};

export default App;

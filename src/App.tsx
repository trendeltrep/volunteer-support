import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import VolunteerProfile from "./pages/VolunteerProfile";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import RecipientProfile from "./pages/RecipientProfile";
import Requirements from "./pages/Requirements";
import FundDetails from "./pages/FundDetails";

const App = () => {

  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/volunteer" element={<VolunteerProfile />} />
          <Route path="/recipient" element={<RecipientProfile />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/funds/:id" element={<FundDetails />} />

      </Routes>
    </AuthProvider>
  );
};

export default App;

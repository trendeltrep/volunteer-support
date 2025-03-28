import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const { user, volunteer, logout } = useAuth();
    
  return (
    <AppBar position="static">
      <Toolbar>
      <Button color="inherit" component={Link} to="/">Головна</Button>
          <Button color="inherit" component={Link} to="/search">Пошук</Button>
          {user ? (
            <>
              {/* {user.role === "Volunteer" && <Button color="inherit" component={Link} to="/requirements">Требования</Button>} */}
              {user?.role === "Recipient" && (
                <Button color="inherit" component={Link} to="/requirements">Потреби</Button>
              )}
              {user?.role === "Volunteer" && (
                <Button color="inherit" component={Link} to="/requirements">Потреби</Button>
              )}

              {user?.role === "Volunteer" && (
                <Button color="inherit" component={Link} to="/volunteer">Профіль</Button>
              )}
              {user?.role === "Recipient" && (
                <Button color="inherit" component={Link} to="/recipient">Профіль</Button>
              )}
              <Button color="inherit" onClick={logout}>Вийти</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Увійти</Button>
          )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

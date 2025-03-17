import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const { user, volunteer, logout } = useAuth();
    
  return (
    <AppBar position="static">
      <Toolbar>
      <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/search">Поиск по сборам</Button>
          {user ? (
            <>
              {user.role === "Volunteer" && <Button color="inherit" component={Link} to="/requirements">Требования</Button>}
              <Button color="inherit" component={Link} to="/profile">Профиль</Button>
              <Button color="inherit" onClick={logout}>Выйти</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Войти</Button>
          )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;

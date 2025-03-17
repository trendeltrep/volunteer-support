import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Volunteer Support
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit">Поиск</Button>
        <Button color="inherit">Войти</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import { AppBar, Toolbar, Button, Typography, Box, MenuItem, Menu } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
    const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleLanguageMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <Button color="inherit" component={Link} to="/">{i18n.t("HomePage")}</Button>
          <Button color="inherit" component={Link} to="/search">{i18n.t("Search")}</Button>
          {user ? (
            <>
              {user?.role === "Recipient" && (
                <Button color="inherit" component={Link} to="/requirements">{i18n.t("Needs")}</Button>
              )}
              {user?.role === "Volunteer" && (
                <Button color="inherit" component={Link} to="/requirements">{i18n.t("Needs")}</Button>
              )}
              {user?.role === "Volunteer" && (
                <Button color="inherit" component={Link} to="/volunteer">{i18n.t("Profile")}</Button>
              )}
              {user?.role === "Recipient" && (
                <Button color="inherit" component={Link} to="/recipient">{i18n.t("Profile")}</Button>
              )}
              <Button color="inherit" onClick={logout}>{i18n.t("Logout")}</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">{i18n.t("Login")}</Button>
          )}
        </Box>
         <Box>
          <Button
            color="inherit"
            onClick={handleLanguageMenuOpen}
          >
            {i18n.t("ChangeLanguage")}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleLanguageMenuClose}
          >
            <MenuItem onClick={() => changeLanguage("uk")}>UKR</MenuItem>
            <MenuItem onClick={() => changeLanguage("en")}>EN</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

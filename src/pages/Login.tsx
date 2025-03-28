import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Stack } from "@mui/material";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: "Volunteer" | "Recipient") => {
    login(role === "Volunteer" ? "volunteer@example.com" : "recipient@example.com", "password", role);
    if (role === "Volunteer") {
      navigate("/volunteer");
    } else {
      navigate("/recipient");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Увійти як:
      </Typography>
      <Stack spacing={2}>
        <Button variant="contained" onClick={() => handleLogin("Volunteer")}>
          Волонтер
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleLogin("Recipient")}>
          Отримувач
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;

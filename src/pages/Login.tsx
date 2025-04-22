import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Typography,
  TextField,
  Stack,
  Alert,
} from "@mui/material";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Проверяем моки
    if (email === "volunteer@example.com" && password === "password") {
      login(email, password, "Volunteer");
      navigate("/volunteer");
    } else if (email === "recipient@example.com" && password === "password") {
      login(email, password, "Recipient");
      navigate("/recipient");
    } else {
      setError("Невірний логін або пароль.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Вхід до системи
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Логін"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Пароль"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button variant="contained" onClick={handleLogin}>
          Увійти
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;

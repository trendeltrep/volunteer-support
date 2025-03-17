import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { UserAccount, Volunteer } from "../types";

const Login = () => {
//   const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

//     try {
//       const response = await api.post<{ user: UserAccount; volunteer?: Volunteer }>("/auth/login", { email, password });
//       login(response.data.user, response.data.volunteer);
//       navigate("/profile");
//     } catch {
//       setError("Ошибка входа. Проверьте данные.");
//     }
  };

  return (
    <Container sx={{ width: 1024, mt: 4 }}>
      <Typography variant="h4">Вход</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Пароль" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Войти</Button>
      </form>
    </Container>
  );
};

export default Login;

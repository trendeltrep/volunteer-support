import { Container, Typography, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { UserAccount, Volunteer } from "../types";

const mockUserAccount: UserAccount = {
    id: "user-123",
    email: "volunteer@example.com",
    role: "Volunteer",
  };
  
const mockVolunteer: Volunteer = {
    id: "vol-456",
    name: "Иван",
    surname: "Петров",
    phone: "+380501234567",
    age: 28,
    rating: 4.7,
    totalReports: 15,
  };

const Profile = () => {
  const { user, volunteer } = useAuth();

  if (!mockUserAccount) {
    return <Typography variant="h6">Вы не авторизованы</Typography>;
  }

  return (
    <Container sx={{ width: 1024, mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4">Профиль</Typography>
        <Typography variant="h6">Личные данные</Typography>
        <Typography>Email: {mockUserAccount.email}</Typography>
        <Typography>Роль: {mockUserAccount.role}</Typography>

        {mockVolunteer && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>Информация о волонтере</Typography>
            <Typography>Имя: {mockVolunteer.name} {mockVolunteer.surname}</Typography>
            <Typography>Телефон: {mockVolunteer.phone}</Typography>
            <Typography>Возраст: {mockVolunteer.age}</Typography>
            <Typography>Рейтинг: {mockVolunteer.rating}</Typography>
            <Typography>Количество отчетов: {mockVolunteer.totalReports}</Typography>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;

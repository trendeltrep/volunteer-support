import { Container, Typography, Paper, Box, Grid, Avatar, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import FundCard from "../components/FundCard";
import { useState } from "react";
import EditVolunteerModal from "../modals/EditVolunteerModal";

const VolunteerProfile = () => {
  const { user, volunteer, funds } = useAuth();
  const [editOpen, setEditOpen] = useState(false);

  if (!user || user.role !== "Volunteer" || !volunteer) {
    return <Typography variant="h6" color="error">Доступ заборонено</Typography>;
  }

  const userFunds = funds.filter((fund) => fund.volunteer === user.email);

  return (
    <Container sx={{ width: 1024, mt: 4 }}>
      <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setEditOpen(true)}>
        Редагувати профіль
      </Button>

      <EditVolunteerModal open={editOpen} onClose={() => setEditOpen(false)} />
        
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar 
            sx={{ width: 80, height: 80 }}
            src={user.profilePic || "/default-avatar.png"}
          />
          <Box>
            <Typography variant="h4" gutterBottom>{volunteer.name} {volunteer.surname}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
            <Typography variant="body1"><strong>Телефон:</strong> {volunteer.phone}</Typography>
            <Typography variant="body1"><strong>Вік:</strong> {volunteer.age}</Typography>
            <Typography variant="body1"><strong>Роль:</strong> Волонтер</Typography>
            <Typography variant="body1"><strong>Рейтинг:</strong> {volunteer.rating}</Typography>
            <Typography variant="body1"><strong>Кількість звітів:</strong> {volunteer.totalReports}</Typography>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Мої збори</Typography>
        {userFunds.length === 0 ? (
          <Typography>Немає створених зборів.</Typography>
        ) : (
          <Grid container spacing={2}>
            {userFunds.map((fund) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={fund.id}>
                <FundCard fund={fund} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

    </Container>
  );
};

export default VolunteerProfile;

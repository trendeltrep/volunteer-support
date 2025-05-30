import { useAuth } from "../context/AuthContext";
import { Container, Typography, Card, CardContent, Avatar, Box, Button } from "@mui/material";
import RequirementCard from "../components/RequirementCard";
import { useState } from "react";
import EditRecipientModal from "../modals/EditRecipientModal";

const RecipientProfile = () => {
  const { user, recipient, requirements } = useAuth();
  const [editOpen, setEditOpen] = useState(false);

  if (!user || user.role !== "Recipient" || !recipient) {
    return <Typography variant="h6" color="error">Доступ заборонено</Typography>;
  }

  const userRequirements = requirements.filter(
    (req) => req.createdBy.userAccount.email === user.email
  );

  return (
    <Container sx={{ width: 1024, mt: 4 }}>
      <Card sx={{ p: 3 }}>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setEditOpen(true)}>
            Редагувати профіль
          </Button>

          <EditRecipientModal open={editOpen} onClose={() => setEditOpen(false)} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar 
            sx={{ width: 80, height: 80 }}
            src={user.profilePic || "/default-avatar.png"}
          />
          <Box>
            <Typography variant="h4" gutterBottom>{recipient.name} {recipient.surname}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
            <Typography variant="body1"><strong>Телефон:</strong> {recipient.phone}</Typography>
            <Typography variant="body1"><strong>Роль:</strong> Отримувач</Typography>
            <Typography variant="body1"><strong>Про себе:</strong> {recipient.needs || "Немає інформації"}</Typography>
          </Box>
        </Box>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Мої потреби</Typography>
        {userRequirements.length === 0 ? (
          <Typography>Немає створених потреб.</Typography>
        ) : (
          userRequirements.map((req) => (
            <RequirementCard key={req.id} requirement={req} />
          ))
        )}
      </Box>
    </Container>
  );
};

export default RecipientProfile;

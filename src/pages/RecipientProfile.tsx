import { useAuth } from "../context/AuthContext";
import { Container, Typography, Card, CardContent, Avatar } from "@mui/material";

const RecipientProfile = () => {
  const { user } = useAuth();

  if (!user || user.role !== "Recipient") {
    return <Typography variant="h6" color="error">Доступ запрещён</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4, p: 2 }}>
        <CardContent sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Avatar 
            sx={{ width: 80, height: 80, mb: 2 }}
            src={user.profilePic || "/default-avatar.png"}
          />
          <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
          {/* <Typography variant="body1"><strong>О себе:</strong> {user.bio || "Нет информации"}</Typography> */}
        </CardContent>
      </Card>
    </Container>
  );
};

export default RecipientProfile;

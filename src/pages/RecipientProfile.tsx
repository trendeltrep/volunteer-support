import { useAuth } from "../context/AuthContext";
import { Container, Typography, Card, CardContent, Avatar, Box, Button } from "@mui/material";
import RequirementCard from "../components/RequirementCard";
import { useState } from "react";
import EditRecipientModal from "../modals/EditRecipientModal";
import { useTranslation } from "react-i18next";

const RecipientProfile = () => {
  const { user, recipient, requirements } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const { i18n } = useTranslation();

  if (!user || user.role !== "Recipient" || !recipient) {
    return <Typography variant="h6" color="error">{i18n.t("AccessDenied")}</Typography>;
  }

  const userRequirements = requirements.filter(
    (req) => req.createdBy.userAccount.email === user.email
  );

  return (
    <Container sx={{ width: 1024, mt: 4 }}>
      <Card sx={{ p: 3 }}>
          <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setEditOpen(true)}>
            {i18n.t("EditProfile")}
          </Button>

          <EditRecipientModal open={editOpen} onClose={() => setEditOpen(false)} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar 
            sx={{ width: 80, height: 80 }}
            src={user.profilePic || "/default-avatar.png"}
          />
          <Box>
            <Typography variant="h4" gutterBottom>{recipient.name} {recipient.surname}</Typography>
            <Typography variant="body1"><strong>{i18n.t("Email")}:</strong> {user.email}</Typography>
            <Typography variant="body1"><strong>{i18n.t("Phone")}:</strong> {recipient.phone}</Typography>
            <Typography variant="body1"><strong>{i18n.t("Role")}:</strong> {i18n.t("Recipient")}</Typography>
            <Typography variant="body1"><strong>{i18n.t("Needs")}:</strong> {recipient.needs || "-"}</Typography>
          </Box>
        </Box>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>{i18n.t("MyFunds")}</Typography>
        {userRequirements.length === 0 ? (
          <Typography>{i18n.t("NoFunds")}.</Typography>
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

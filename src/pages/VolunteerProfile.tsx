import { Container, Typography, Paper, Box, Grid, Avatar, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import FundCard from "../components/FundCard";
import { useState } from "react";
import EditVolunteerModal from "../modals/EditVolunteerModal";
import { useTranslation } from "react-i18next";

const VolunteerProfile = () => {
  const { user, volunteer, funds } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const { i18n } = useTranslation();

  if (!user || user.role !== "Volunteer" || !volunteer) {
    return <Typography variant="h6" color="error">{i18n.t("AccessDenied")}</Typography>;
  }

  const userFunds = funds.filter((fund) => fund.volunteer === user.email);

  return (
    <Container sx={{ width: 1024, mt: 4 }}>
      <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setEditOpen(true)}>
        {i18n.t("EditProfile")}
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
            <Typography variant="body1"><strong>{i18n.t("Email")}:</strong> {user.email}</Typography>
            <Typography variant="body1"><strong>{i18n.t("Phone")}:</strong> {volunteer.phone}</Typography>
            <Typography variant="body1"><strong>{i18n.t("Age")}:</strong> {volunteer.age}</Typography>
            <Typography variant="body1"><strong>{i18n.t("Role")}:</strong> {i18n.t("Volunteer")}</Typography>
            <Typography variant="body1"><strong>{i18n.t("Rating")}:</strong> {volunteer.rating}</Typography>
            <Typography variant="body1"><strong>{i18n.t("ReportNumber")}:</strong> {volunteer.totalReports}</Typography>
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

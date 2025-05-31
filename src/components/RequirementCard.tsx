import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { Requirement } from "../types";
import { useTranslation } from "react-i18next";

interface RequirementCardProps {
  requirement: Requirement;
  onClick?: () => void;
  isClickable?: boolean;
}

const RequirementCard = ({ requirement, onClick, isClickable = false }: RequirementCardProps) => {
    const { i18n } = useTranslation();

  return (
    <Card
      sx={{
        mb: 2,
        cursor: isClickable ? "pointer" : "default",
        transition: "0.3s",
        "&:hover": {
          boxShadow: isClickable ? 6 : 2,
        },
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          {requirement.title}
        </Typography>

        <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
          {i18n.t("Created")}: {requirement.createdBy.name} {requirement.createdBy.surname}
        </Typography>

        {requirement.priority === "High" && (
          <Typography variant="body2" color="error" sx={{ mb: 1 }}>
            {i18n.t("Priority")}: High
          </Typography>
        )}

        {requirement.deadline && (
          <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
            {i18n.t("Deadline")}: {new Date(requirement.deadline).toLocaleDateString()}
          </Typography>
        )}

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
            {i18n.t("Items")}:
          </Typography>
          {requirement.items.map((item, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="body2" sx={{ flex: 1 }}>
                {item.name} - {item.quantity} {i18n.t("Pieces")}.
              </Typography>
              <Chip 
                label={item.category} 
                color="primary" 
                size="small"
                sx={{ ml: 1 }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RequirementCard;

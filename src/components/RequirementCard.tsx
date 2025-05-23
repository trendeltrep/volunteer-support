import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { Requirement } from "../types";

interface RequirementCardProps {
  requirement: Requirement;
  onClick?: () => void;
  isClickable?: boolean;
}

const RequirementCard = ({ requirement, onClick, isClickable = false }: RequirementCardProps) => {
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

        <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
          Створив: {requirement.createdBy.name} {requirement.createdBy.surname}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
            Предмети:
          </Typography>
          {requirement.items.map((item, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="body2" sx={{ flex: 1 }}>
                {item.name} - {item.quantity} шт.
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

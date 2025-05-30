import { Card, CardContent, Typography, Box } from "@mui/material";
import { Fund } from "../types";
import { useAuth } from "../context/AuthContext";

const FundCard = ({ fund }: { fund: Fund }) => {
  const { requirements } = useAuth();
  const requirement = requirements.find(r => r.id === fund.requirementId);
  const isHighPriority = requirement?.priority === "High";

  return (
    <Card sx={{ width: 300, m: 2 }}>
      <Box sx={{ position: "relative", height: 150, background: `url(${fund.image})`, backgroundSize: "cover" }}>
        {isHighPriority && (
          <Typography
            sx={{ position: "absolute", top: 8, right: 8, background: "red", color: "white", px: 1, fontWeight: "bold" }}
          >
            HOT
          </Typography>
        )}
        <Box sx={{ position: "absolute", bottom: 0, width: "100%", height: `${fund.progress}%`, background: "rgba(0, 0, 255, 0.5)" }} />
      </Box>
      <CardContent>
        <Typography variant="h6">{fund.name}</Typography>
        <Typography variant="body2">Організатор: {fund.volunteer}</Typography>
        <Typography variant="body2">Отримувач: {fund.recipient}</Typography>
      </CardContent>
    </Card>
  );
};

export default FundCard;

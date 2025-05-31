import { Box, Typography } from "@mui/material";
import { Fund } from "../../types";

const FundInfo = ({ fund }: { fund: Fund }) => (
  <Box sx={{ mt: 2 }}>
    <Typography variant="h6">{fund.name}</Typography>
    <Typography><strong>Опис:</strong> {fund.description || "Немає опису"}</Typography>
    <img
      src={fund.image}
      alt={fund.name}
      style={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
    />
    <Typography variant="h6" sx={{ mt: 2 }}>Прогрес: {fund.progress}%</Typography>
    <Typography sx={{ mt: 1 }}><strong>Волонтер:</strong> {fund.volunteer}</Typography>
    <Typography><strong>Отримувач:</strong> {fund.recipient}</Typography>
    <Typography><strong>Статус:</strong> {fund.status === "active" ? "Активний" : "Неактивний"}</Typography>
  </Box>
);

export default FundInfo;

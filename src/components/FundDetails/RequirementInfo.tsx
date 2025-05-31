import { Box, Typography } from "@mui/material";
import { Requirement } from "../../types";

const RequirementInfo = ({ requirement }: { requirement: Requirement }) => (
  <Box sx={{ mt: 2 }}>
    <Typography>
      <strong>Дедлайн:</strong> {requirement.deadline ? new Date(requirement.deadline).toLocaleDateString() : "Безстроково"}
    </Typography>
    <Typography>
      <strong>Пріоритет:</strong> {requirement.priority === "High" ? "Високий" : "Без пріоритету"}
    </Typography>
  </Box>
);

export default RequirementInfo;

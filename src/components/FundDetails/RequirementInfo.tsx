import { Box, Typography } from "@mui/material";
import { Requirement } from "../../types";
import { useTranslation } from "react-i18next";

const RequirementInfo = ({ requirement }: { requirement: Requirement }) => 
    
    {
        const { i18n } = useTranslation();
        const High = i18n.t("High");
        const NoDeadline = i18n.t("NoDeadline");
        const NoPriority = i18n.t("NoPriority");
    return(
  <Box sx={{ mt: 2 }}>
    <Typography>
      <strong>{i18n.t("Deadline")}:</strong> {requirement.deadline ? new Date(requirement.deadline).toLocaleDateString() : "Безстроково"}
    </Typography>
    <Typography>
      <strong>{i18n.t("Priority")}:</strong> {requirement.priority === "High" ? "Високий" : "Без пріоритету"}
    </Typography>
  </Box>
);
    }
export default RequirementInfo;

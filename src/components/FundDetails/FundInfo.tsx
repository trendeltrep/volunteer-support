import { Box, Typography } from "@mui/material";
import { Fund } from "../../types";
import { useTranslation } from "react-i18next";

const FundInfo = ({ fund }: { fund: Fund }) =>
{
    const {i18n} = useTranslation();
    const NoDescription = i18n.t("NoDescription");
    const active = i18n.t("Active");
    const disabled = i18n.t("Disabled");

    return(
  <Box sx={{ mt: 2 }}>
    <Typography variant="h6">{i18n.t("FundName")}: {fund.name}</Typography>
    <Typography><strong>{i18n.t("FundDescription")}:</strong> {fund.description || NoDescription}</Typography>
    <img
      src={fund.image}
      alt={fund.name}
      style={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
    />
    <Typography variant="h6" sx={{ mt: 2 }}>{i18n.t("Progress")}: {fund.progress}%</Typography>
    <Typography sx={{ mt: 1 }}><strong>{i18n.t("Volunteer")}:</strong> {fund.volunteer}</Typography>
    <Typography><strong>{i18n.t("Recipient")}:</strong> {fund.recipient}</Typography>
    <Typography><strong>{i18n.t("Status")}:</strong> {fund.status === "active" ? active : disabled}</Typography>
  </Box>
);
}
export default FundInfo;

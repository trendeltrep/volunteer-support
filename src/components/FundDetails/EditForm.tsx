import { Box, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const EditForm = ({ name, description, setName, setDescription, onSave, onCancel }: any) => 
{
    const {i18n} = useTranslation();
    
    return(
  <Box sx={{ mt: 2 }}>
    <TextField
      label={i18n.t("FundName")}
      fullWidth
      sx={{ mt: 2 }}
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <TextField
      label={i18n.t("FundDescription")}
      fullWidth
      multiline
      rows={3}
      sx={{ mt: 2 }}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      <Button variant="contained" onClick={onSave}>{i18n.t("Save")}</Button>
      <Button variant="outlined" onClick={onCancel}>{i18n.t("Cancel")}</Button>
    </Box>
  </Box>
);
}
export default EditForm;

import { Box, TextField, Button } from "@mui/material";

const EditForm = ({ name, description, setName, setDescription, onSave, onCancel }: any) => (
  <Box sx={{ mt: 2 }}>
    <TextField
      label="Назва збору"
      fullWidth
      sx={{ mt: 2 }}
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <TextField
      label="Опис"
      fullWidth
      multiline
      rows={3}
      sx={{ mt: 2 }}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      <Button variant="contained" onClick={onSave}>Зберегти</Button>
      <Button variant="outlined" onClick={onCancel}>Скасувати</Button>
    </Box>
  </Box>
);

export default EditForm;

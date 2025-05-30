import { Dialog, DialogTitle, DialogContent, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const EditRecipientModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { recipient, setRecipient } = useAuth();

  const [name, setName] = useState(recipient?.name || "");
  const [surname, setSurname] = useState(recipient?.surname || "");
  const [phone, setPhone] = useState(recipient?.phone || "");
  const [needs, setNeeds] = useState(recipient?.needs || "");

  const handleSave = () => {
    if (!recipient) return;

    setRecipient({
      ...recipient,
      name,
      surname,
      phone,
      needs,
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Редагування профілю</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Ім’я" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label="Прізвище" value={surname} onChange={(e) => setSurname(e.target.value)} fullWidth />
          <TextField label="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
          <TextField label="Потреби" value={needs} onChange={(e) => setNeeds(e.target.value)} fullWidth multiline rows={3} />
          <Button variant="contained" onClick={handleSave}>Зберегти</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EditRecipientModal;

import { Dialog, DialogTitle, DialogContent, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const EditVolunteerModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { volunteer, setVolunteer } = useAuth();

  const [name, setName] = useState(volunteer?.name || "");
  const [surname, setSurname] = useState(volunteer?.surname || "");
  const [phone, setPhone] = useState(volunteer?.phone || "");
  const [age, setAge] = useState(volunteer?.age || 0);

  const handleSave = () => {
    if (!volunteer) return;

    setVolunteer({
      ...volunteer,
      name,
      surname,
      phone,
      age,
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
          <TextField label="Вік" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} fullWidth />
          <Button variant="contained" onClick={handleSave}>Зберегти</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EditVolunteerModal;

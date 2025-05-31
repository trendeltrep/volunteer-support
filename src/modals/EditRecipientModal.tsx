import { Dialog, DialogTitle, DialogContent, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const EditRecipientModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { recipient, setRecipient } = useAuth();

  const [name, setName] = useState(recipient?.name || "");
  const [surname, setSurname] = useState(recipient?.surname || "");
  const [phone, setPhone] = useState(recipient?.phone || "");
  const [needs, setNeeds] = useState(recipient?.needs || "");

  const {i18n} = useTranslation();

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
      <DialogTitle>{i18n.t("EditProfile")}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label={i18n.t("Name")} value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          <TextField label={i18n.t("Surname")} value={surname} onChange={(e) => setSurname(e.target.value)} fullWidth />
          <TextField label={i18n.t("Phone")} value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
          <TextField label={i18n.t("Needs")} value={needs} onChange={(e) => setNeeds(e.target.value)} fullWidth multiline rows={3} />
          <Button variant="contained" onClick={handleSave}>{i18n.t("Save")}</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default EditRecipientModal;

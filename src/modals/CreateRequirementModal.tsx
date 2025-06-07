import {
  Modal,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
  Typography,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

const categories = ["Food", "Medicine", "Equipment", "Other"];

const CreateRequirementModal = ({ open, onClose, onSubmit }: any) => {
  const { recipient } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); 
  const [items, setItems] = useState([{ name: "", quantity: 1, category: "Food" }]);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [priority, setPriority] = useState<"High" | "None">("None");

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 1, category: "Food" }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, idx) => idx !== index);
    setItems(updatedItems);
  };

  const handleChangeItem = (index: number, field: string, value: any) => {
    const updatedItems = [...items];
    (updatedItems[index] as any)[field] = value;
    setItems(updatedItems);
  };

  const {i18n} = useTranslation();

  const handleSubmit = () => {
    if (!recipient) {
      alert("Помилка: отримувач не авторизований");
      return;
    }

    const newRequirement = {
      id: Date.now().toString(),
      title,
      description, 
      items,
      createdBy: recipient,
      deadline: deadline?.toISOString() || null,
      priority,
    };

    onSubmit(newRequirement);
    setTitle("");
    setDescription(""); 
    setItems([{ name: "", quantity: 1, category: "Food" }]);
    setDeadline(null);
    setPriority("None");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
          mx: "auto",
          mt: 8,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {i18n.t("CreateRequirement")}
        </Typography>

        <TextField
          fullWidth
          label={i18n.t("RequirementName")}

          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label={i18n.t("RequirementDescription")}

          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        <TextField
          label={i18n.t("Deadline")}

          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={deadline ? deadline.toISOString().split("T")[0] : ""}
          onChange={(e) => setDeadline(new Date(e.target.value))}
          sx={{ mb: 2 }}
        />

        <InputLabel sx={{ mb: 1 }}>{i18n.t("Priority")}</InputLabel>
        <Select
          fullWidth
          value={priority}
          onChange={(e) => setPriority(e.target.value as "High" | "None")}
          sx={{ mb: 2 }}
        >
          <MenuItem value="None">{i18n.t("NoPriority")}</MenuItem>
          <MenuItem value="High">{i18n.t("High")}</MenuItem>
        </Select>

        {items.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" sx={{ mb: 2, gap: 1 }}>
            <TextField
              label={i18n.t("ItemName")}
              value={item.name}
              onChange={(e) => handleChangeItem(index, "name", e.target.value)}
              sx={{ flex: 2 }}
            />
            <TextField
              label={i18n.t("Quantity")}
              type="number"
              value={item.quantity}
              onChange={(e) => handleChangeItem(index, "quantity", Number(e.target.value))}
              sx={{ flex: 1 }}
            />
            <Select
              value={item.category}
              onChange={(e) => handleChangeItem(index, "category", e.target.value)}
              sx={{ flex: 2 }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
            <IconButton onClick={() => handleRemoveItem(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button fullWidth variant="outlined" onClick={handleAddItem} sx={{ mb: 2 }}>
          {i18n.t("AddItem")}
        </Button>

        <Button fullWidth variant="contained" onClick={handleSubmit}>
          {i18n.t("Create")}
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateRequirementModal;

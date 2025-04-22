// src/modals/CreateRequirementModal.tsx

import {
  Modal,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import DeleteIcon from "@mui/icons-material/Delete";

const categories = ["Food", "Medicine", "Equipment", "Other"];

const CreateRequirementModal = ({ open, onClose, onSubmit }: any) => {
  const { recipient } = useAuth(); 
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 1, category: "Food" }]);

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

  const handleSubmit = () => {
    if (!recipient) {
      alert("Ошибка: получатель не авторизован");
      return;
    }

    const newRequirement = {
      title,
      items,
      createdBy: recipient, 
    };

    onSubmit(newRequirement);
    setTitle("");
    setItems([{ name: "", quantity: 1, category: "Food" }]);
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
          Створення потреби
        </Typography>

        <TextField
          fullWidth
          label="Назва потреби"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        {items.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" sx={{ mb: 2, gap: 1 }}>
            <TextField
              label="Назва"
              value={item.name}
              onChange={(e) => handleChangeItem(index, "name", e.target.value)}
              sx={{ flex: 2 }}
            />
            <TextField
              label="К-сть"
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
          Додати позицію
        </Button>

        <Button fullWidth variant="contained" onClick={handleSubmit}>
          Створити
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateRequirementModal;

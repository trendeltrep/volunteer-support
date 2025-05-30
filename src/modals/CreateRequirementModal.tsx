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

const categories = ["Food", "Medicine", "Equipment", "Other"];

const CreateRequirementModal = ({ open, onClose, onSubmit }: any) => {
  const { recipient } = useAuth();
  const [title, setTitle] = useState("");
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

  const handleSubmit = () => {
    if (!recipient) {
      alert("Помилка: отримувач не авторизований");
      return;
    }

    const newRequirement = {
      id: Date.now().toString(),
      title,
      items,
      createdBy: recipient,
      deadline: deadline?.toISOString() || null,
      priority,
    };

    onSubmit(newRequirement);
    setTitle("");
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
        <Typography variant="h6" sx={{ mb: 2 }}>Створення потреби</Typography>

        <TextField
          fullWidth
          label="Назва потреби"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

          <TextField
            label="Дедлайн"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={deadline ? deadline.toISOString().split("T")[0] : ""}
            onChange={(e) => setDeadline(new Date(e.target.value))}
          />


        <InputLabel sx={{ mb: 1 }}>Пріоритет</InputLabel>
        <Select
          fullWidth
          value={priority}
          onChange={(e) => setPriority(e.target.value as "High" | "None")}
          sx={{ mb: 2 }}
        >
          <MenuItem value="None">Без пріоритету</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>

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

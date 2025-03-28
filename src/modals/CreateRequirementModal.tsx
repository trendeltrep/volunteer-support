import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const categories = ["Food", "Medicine", "Equipment", "Other"];

interface CreateRequirementModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; items: { category: string; name: string; quantity: number }[] }) => void;
}

const CreateRequirementModal = ({ open, onClose, onSubmit }: CreateRequirementModalProps) => {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([{ category: "", name: "", quantity: 1 }]);

  const handleAddItem = () => {
    setItems([...items, { category: "", name: "", quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title.trim() || items.some((item) => !item.category || !item.name.trim() || item.quantity < 1)) {
      alert("Заповніть всі поля!");
      return;
    }
    onSubmit({ title, items });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, bgcolor: "white", mx: "auto", mt: 10, width: 400, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Нова потреба</Typography>
        <TextField
          fullWidth
          label="Назва потреби"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        {items.map((item, index) => (
          <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
            <Select
              value={item.category}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].category = e.target.value;
                setItems(newItems);
              }}
              displayEmpty
              sx={{ flex: 1 }}
            >
              <MenuItem value="" disabled>Категорії</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>

            <TextField
              label="Назва предмету"
              value={item.name}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].name = e.target.value;
                setItems(newItems);
              }}
              sx={{ flex: 1 }}
            />

            <TextField
              label="Кількість"
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].quantity = Math.max(1, parseInt(e.target.value) || 1);
                setItems(newItems);
              }}
              sx={{ width: "80px" }}
            />

            <IconButton color="error" onClick={() => handleRemoveItem(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button startIcon={<AddIcon />} onClick={handleAddItem} sx={{ mt: 2 }}>
          Добавити
        </Button>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button onClick={onClose}>Отмена</Button>
          <Button variant="contained" onClick={handleSubmit}>Створити</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateRequirementModal;

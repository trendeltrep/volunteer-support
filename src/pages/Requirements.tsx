import { useState } from "react";
import {
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../context/AuthContext";

const categories = ["Food", "Medicine", "Equipment", "Other"];

const Requirements = () => {
  const { recipient } = useAuth(); // Берем данные о получателе
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([{ category: "", name: "", quantity: 1 }]);
  const [requirements, setRequirements] = useState<any[]>([]);

  if (!recipient) {
    return <Typography variant="h6" color="error">Доступ запрещён</Typography>;
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setItems([{ category: "", name: "", quantity: 1 }]);
  };

  const addItem = () => {
    setItems([...items, { category: "", name: "", quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!title.trim() || items.some((item) => !item.category || !item.name.trim())) {
      alert("Заполните все поля!");
      return;
    }

    const newRequirement = {
      title,
      items,
      createdBy: `${recipient.name} ${recipient.surname}`,
    };

    setRequirements([...requirements, newRequirement]);
    handleClose();
  };

  return (
    <Container maxWidth="sm">
      <Button variant="contained" sx={{ mt: 4, mb: 2 }} onClick={handleOpen}>
        Створити
      </Button>

      {requirements.map((req, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{req.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              Створив: {req.createdBy}
            </Typography>
            {req.items.map((item: any, idx: number) => (
              <Typography key={idx} variant="body2">
                {item.category} - {item.name} ({item.quantity})
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Модальное окно */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: 24,
            width: "400px",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Новое требование
          </Typography>
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
                <MenuItem value="" disabled>
                  Категорії
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
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
                  newItems[index].quantity = parseInt(e.target.value) || 1;
                  setItems(newItems);
                }}
                sx={{ width: "80px" }}
              />

              <IconButton color="error" onClick={() => removeItem(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button startIcon={<AddIcon />} onClick={addItem} sx={{ mt: 2 }}>
            Добавити
          </Button>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button onClick={handleClose}>Отмена</Button>
            <Button variant="contained" onClick={handleSubmit}>
              Створити
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Requirements;

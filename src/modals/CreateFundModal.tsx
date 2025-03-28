import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAuth } from "../context/AuthContext";
import { Volunteer, Recipient } from "../types";

interface RequirementItem {
  name: string;
  quantity: number;
}

interface Requirement {
  title: string;
  createdBy: Recipient;
  items: RequirementItem[];
}

interface CreateFundModalProps {
  open: boolean;
  onClose: () => void;
  requirement: Requirement | null;
  onSubmit: (data: {
    name: string;
    description: string;
    link: string;
    recipient: string;
    volunteer: string;
    items: { name: string; quantity: number }[];
  }) => void;
}

const CreateFundModal = ({ open, onClose, requirement, onSubmit }: CreateFundModalProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [fundData, setFundData] = useState({
    name: "",
    description: "",
    link: "",
  });

  const [items, setItems] = useState<
    { name: string; quantity: number; selectedQuantity: number }[]
  >([]);

  useEffect(() => {
    if (requirement) {
      setItems(requirement.items.map((item) => ({ ...item, selectedQuantity: 0 })));
    }
  }, [requirement]);

  const handleQuantityChange = (index: number, delta: number) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, selectedQuantity: Math.max(0, item.selectedQuantity + delta) }
          : item
      )
    );
  };
  

  const handleNextStep = () => setStep(2);
  const handleBackStep = () => setStep(1);

  const handleSubmit = () => {
    const volunteerName =
      user?.role === "Volunteer"
        ? `${user?.email || "Анонімний волонтер"}`
        : "Анонімний волонтер";

    onSubmit({
      ...fundData,
      recipient: `${requirement?.createdBy.name} ${requirement?.createdBy.surname}`,
      volunteer: volunteerName,
      items: items
        .filter((item) => item.selectedQuantity > 0)
        .map(({ name, selectedQuantity }) => ({ name, quantity: selectedQuantity })),
    });

    onClose();
    setStep(1);
  };

  if (!requirement) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, bgcolor: "white", mx: "auto", mt: 10, width: 400, borderRadius: 2 }}>
        {step === 1 ? (
          <>
            <Typography variant="h6">{requirement.title}</Typography>
            <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
              Оберіть потрібну кількість предметів для збору:
            </Typography>

            {items.map((item, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}
              >
                <Typography sx={{ flex: 1 }}>
                  {item.name} ({item.quantity} шт. в потребі)
                </Typography>
                <IconButton onClick={() => handleQuantityChange(index, -1)} disabled={item.selectedQuantity === 0}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ width: 30, textAlign: "center" }}>{item.selectedQuantity}</Typography>
                <IconButton
                  onClick={() => handleQuantityChange(index, 1)}
                  disabled={item.selectedQuantity >= item.quantity}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            ))}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleNextStep}
              disabled={items.every((item) => item.selectedQuantity === 0)}
            >
              Далі
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">Створення збору</Typography>
            <TextField
              label="Назва збору"
              fullWidth
              sx={{ mt: 2 }}
              value={fundData.name}
              onChange={(e) => setFundData({ ...fundData, name: e.target.value })}
            />
            <TextField
              label="Опис"
              fullWidth
              multiline
              rows={3}
              sx={{ mt: 2 }}
              value={fundData.description}
              onChange={(e) => setFundData({ ...fundData, description: e.target.value })}
            />
            <TextField
              label="Посилання на банку"
              fullWidth
              sx={{ mt: 2 }}
              value={fundData.link}
              onChange={(e) => setFundData({ ...fundData, link: e.target.value })}
            />
            <TextField
              label="Отримувач"
              fullWidth
              disabled
              sx={{ mt: 2 }}
              value={`${requirement.createdBy.name} ${requirement.createdBy.surname}`}
            />
            <TextField
              label="Волонтер"
              fullWidth
              disabled
              sx={{ mt: 2 }}
              value={user?.role === "Volunteer" ? `${user?.email}` : "Анонімний волонтер"}
            />

            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" fontWeight="bold">
                Обрані предмети:
              </Typography>
              {items
                .filter((item) => item.selectedQuantity > 0)
                .map((item, index) => (
                  <Typography key={index} variant="body2">
                    {item.name} - {item.selectedQuantity} шт.
                  </Typography>
                ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button variant="outlined" onClick={handleBackStep}>
                Назад
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={items.every((item) => item.selectedQuantity === 0)}
              >
                Створити
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CreateFundModal;

import { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Requirement } from "../types";

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
    status: "active" | "disabled";
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
    { name: string; quantity: number; selected: boolean }[]
  >([]);

  useEffect(() => {
    if (requirement) {
      setItems(requirement.items.map((item) => ({ ...item, selected: false })));
    }
  }, [requirement]);

  const handleToggleSelect = (index: number) => {
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleNextStep = () => setStep(2);
  const handleBackStep = () => setStep(1);

  const handleSubmit = () => {
    const volunteerEmail = user?.role === "Volunteer" ? user?.email : "anonym@volunteer";
    const recipientName = requirement?.createdBy?.userAccount?.email || "anonym@recipient";

    onSubmit({
      ...fundData,
      recipient: recipientName,
      volunteer: volunteerEmail,
      items: items
        .filter((item) => item.selected)
        .map(({ name, quantity }) => ({ name, quantity })),
      status: "active",
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
              Виберіть предмети, які підуть у збір:
            </Typography>

            {items.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={item.selected}
                    onChange={() => handleToggleSelect(index)}
                  />
                }
                label={`${item.name} (${item.quantity} шт.)`}
                sx={{ mt: 1 }}
              />
            ))}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleNextStep}
              disabled={items.every((item) => !item.selected)}
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
              label="Пріоритет потреби"
              fullWidth
              disabled
              sx={{ mt: 2 }}
              value={requirement.priority === "High" ? "Високий" : "Звичайний"}
            />

            <TextField
              label="Дедлайн"
              fullWidth
              disabled
              sx={{ mt: 2 }}
              value={
                requirement.deadline
                  ? new Date(requirement.deadline).toLocaleDateString()
                  : "—"
              }
            />

            <TextField
              label="Отримувач"
              fullWidth
              disabled
              sx={{ mt: 2 }}
              value={`${requirement.createdBy?.name} ${requirement.createdBy?.surname}`}
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
                .filter((item) => item.selected)
                .map((item, index) => (
                  <Typography key={index} variant="body2">
                    {item.name} - {item.quantity} шт.
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
                disabled={items.every((item) => !item.selected)}
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

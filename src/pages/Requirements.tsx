import { useState, useEffect } from "react";
import { Container, Button, Typography, Card, CardContent, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import CreateRequirementModal from "../modals/CreateRequirementModal";
import CreateFundModal from "../modals/CreateFundModal";
import { Volunteer, Recipient } from "../types";

// Мокнутые профили
const mockVolunteer: Volunteer = {
  id: "vol-456",
  name: "Иван",
  surname: "Петров",
  phone: "+380501234567",
  age: 28,
  rating: 4.7,
  totalReports: 15,
  userAccount: {
    id: "user-123",
    email: "volunteer@example.com",
    role: "Volunteer",
  },
};

const mockRecipient: Recipient = {
  id: "rec-789",
  name: "Анна",
  surname: "Сидорова",
  phone: "+380501234567",
  needs: "Помощь в покупке продуктов",
  userAccount: {
    id: "user-789",
    email: "recipient@example.com",
    role: "Recipient",
  },
};

// Мокнутые нужды
const mockRequirements = [
  {
    title: "Продукты для семьи",
    createdBy: mockRecipient,
    items: [
      { name: "Молоко", quantity: 2 },
      { name: "Хлеб", quantity: 3 },
      { name: "Макароны", quantity: 1 },
    ],
  },
  {
    title: "Одежда для детей",
    createdBy: mockRecipient,
    items: [
      { name: "Куртка зимняя", quantity: 2 },
      { name: "Шапка", quantity: 4 },
    ],
  },
];

const Requirements = () => {
  const { user } = useAuth();
  const [requirements, setRequirements] = useState<any[]>([]);
  const [openRequirementModal, setOpenRequirementModal] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<any | null>(null);

  useEffect(() => {
    setRequirements(mockRequirements);
  }, []);

  const handleCreateRequirement = (requirement: any) => {
    setRequirements([...requirements, { ...requirement, createdBy: mockRecipient }]);
  };

  const handleCreateFund = (fund: any) => {
    console.log("Збір створено:", fund);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>

      {user?.role === "Recipient" && (
        <Button
          variant="contained"
          sx={{ mt: 2, mb: 3, width: "100%" }}
          onClick={() => setOpenRequirementModal(true)}
        >
          Створити потребу
        </Button>
      )}


      {requirements.length === 0 && (
        <Typography variant="h6" textAlign="center" sx={{ mt: 4, color: "gray" }}>
          Немає потреб
        </Typography>
      )}

    
      {requirements.map((req, index) => (
        <Card
          key={index}
          sx={{
            mb: 2,
            cursor: user?.role === "Volunteer" ? "pointer" : "default",
            transition: "0.3s",
            "&:hover": {
              boxShadow: user?.role === "Volunteer" ? 6 : 2, 
            },
          }}
          onClick={() => user?.role === "Volunteer" && setSelectedRequirement(req)}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>{req.title}</Typography>
            <Typography variant="body2" sx={{ color: "gray", mb: 1 }}>
              Створив: {req.createdBy.name} {req.createdBy.surname}
            </Typography>

            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" fontWeight="bold">
                Предмети:
              </Typography>
              {req.items.map((item: any, idx: any) => (
                <Typography key={idx} variant="body2">
                  {item.name} - {item.quantity} шт.
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>
      ))}

      <CreateRequirementModal
        open={openRequirementModal}
        onClose={() => setOpenRequirementModal(false)}
        onSubmit={handleCreateRequirement}
      />

      <CreateFundModal
        open={!!selectedRequirement}
        onClose={() => setSelectedRequirement(null)}
        requirement={selectedRequirement}
        onSubmit={handleCreateFund}
      />
    </Container>
  );
};

export default Requirements;

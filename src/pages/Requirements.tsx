import { useEffect, useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useAuth} from "../context/AuthContext";
import CreateRequirementModal from "../modals/CreateRequirementModal";
import CreateFundModal from "../modals/CreateFundModal";
import RequirementCard from "../components/RequirementCard";
import { Requirement } from "../types";

const Requirements = () => {
  const { user, requirements, addRequirement,addFund } = useAuth();

  const [openRequirementModal, setOpenRequirementModal] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);

  const { volunteer, recipient, setRequirements } = useAuth();

 
  const handleCardClick = (requirement: Requirement) => {
    if (user?.role === "Volunteer") {
      setSelectedRequirement(requirement);
    }
  };

    const handleCreateRequirement = (requirement: Requirement) => {
      const updatedRequirements = [...requirements, requirement];
      setRequirements(updatedRequirements); 
    };

  const handleCreateFund = (fund: any) => {
  const newFund = {
    id: Date.now().toString(),
    ...fund,
    image: "/images/default.jpg",
    progress: 0,
    requirementId: selectedRequirement?.id || "",
  };


  addFund(newFund); 

  setSelectedRequirement(null);
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

      {requirements.length === 0 ? (
        <Typography variant="h6" textAlign="center" sx={{ mt: 4, color: "gray" }}>
          Немає потреб
        </Typography>
      ) : (
        requirements.map((requirement, index) => (
          <RequirementCard
            key={index}
            requirement={requirement}
            isClickable={user?.role === "Volunteer"}
            onClick={() => handleCardClick(requirement)}
          />
        ))
      )}

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

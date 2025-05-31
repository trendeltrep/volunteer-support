import { useEffect, useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import { useAuth} from "../context/AuthContext";
import CreateRequirementModal from "../modals/CreateRequirementModal";
import CreateFundModal from "../modals/CreateFundModal";
import RequirementCard from "../components/RequirementCard";
import { Fund, Requirement } from "../types";
import { useTranslation } from "react-i18next";

const Requirements = () => {
  const { user, requirements, addRequirement,addFund } = useAuth();

  const [openRequirementModal, setOpenRequirementModal] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);

  const { volunteer, recipient, setRequirements } = useAuth();

  const {i18n} = useTranslation();

 
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
    const newFund: Fund = {
      id: Date.now().toString(),
      ...fund,
      progress: 0,
      requirementId: selectedRequirement?.id || "",
      status: "active", 
    };

    addFund(newFund);
    setSelectedRequirement(null);

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
          {i18n.t("Create")}
        </Button>
      )}

      {requirements.length === 0 ? (
        <Typography variant="h6" textAlign="center" sx={{ mt: 4, color: "gray" }}>
          {i18n.t("NoRequirements")}
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

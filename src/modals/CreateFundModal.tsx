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
import { useTranslation } from "react-i18next";

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
    image: string;
  }) => void;
}

const CreateFundModal = ({ open, onClose, requirement, onSubmit }: CreateFundModalProps) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {i18n} = useTranslation();
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const High = i18n.t("High");
  const NoPriority = i18n.t("NoPriority");

  const handleSubmit = () => {
    const volunteerEmail = user?.role === "Volunteer" ? user?.email : "anonym@volunteer";
    const recipientName = requirement?.createdBy?.userAccount?.email || "anonym@recipient";

    const images = [
      "/images/1.jpg",
      "/images/2.jpg",
      "/images/3.jpg",
      "/images/4.jpg",
      "/images/5.jpg",
      "/images/6.jpg",
      "/images/7.jpg",
      "/images/8.jpg",
    ];

    const final_image = images[Math.floor(Math.random() * images.length)];
    
    onSubmit({
      ...fundData,
      recipient: recipientName,
      volunteer: volunteerEmail,
      items: items
        .filter((item) => item.selected)
        .map(({ name, quantity }) => ({ name, quantity })),
      status: "active",
      image: final_image, 
    });

    onClose();
    setStep(1);
    setSelectedFile(null); 
  };

  if (!requirement) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, bgcolor: "white", mx: "auto", mt: 10, width: 400, borderRadius: 2 }}>
        {step === 1 ? (
          <>
            <Typography variant="h6">{requirement.title}</Typography>
            <Typography variant="body2" sx={{ color: "gray", mt: 1 }}>
              {i18n.t("ChooseItems")}:
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
                label={`${item.name} (${item.quantity} ${i18n.t("Pieces")}.)`}
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
              {i18n.t("Next")}
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6">{i18n.t("CreateFund")}</Typography>
            <TextField
              label={i18n.t("FundName")}
              fullWidth
              sx={{ mt: 2 }}
              value={fundData.name}
              onChange={(e) => setFundData({ ...fundData, name: e.target.value })}
            />
            <TextField
              label={i18n.t("FundDescription")}
              fullWidth
              multiline
              rows={3}
              sx={{ mt: 2 }}
              value={fundData.description}
              onChange={(e) => setFundData({ ...fundData, description: e.target.value })}
            />

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" fontWeight="bold">
                {i18n.t("FundImage")}
              </Typography>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </Box>

            <TextField
              label={i18n.t("FundLink")}
              fullWidth
              sx={{ mt: 2 }}
              value={fundData.link}
              onChange={(e) => setFundData({ ...fundData, link: e.target.value })}
            />
            <TextField
              label={i18n.t("FundPriority")}
              fullWidth
              disabled
              sx={{ mt: 2 }}
              value={requirement.priority === "High" ? High : NoPriority}
            />

            <TextField
              label={i18n.t("Deadline")}
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
              label={i18n.t("Recipient")}
              fullWidth
              disabled
              sx={{ mt: 2 }}
              value={`${requirement.createdBy?.name} ${requirement.createdBy?.surname}`}
            />
            <TextField
              label={i18n.t("Volunteer")}
              fullWidth
              disabled
              sx={{ mt: 2 }}
              value={user?.role === "Volunteer" ? `${user?.email}` : "-"}
            />

            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" fontWeight="bold">
                {i18n.t("ChosenItems")}:
              </Typography>
              {items
                .filter((item) => item.selected)
                .map((item, index) => (
                  <Typography key={index} variant="body2">
                    {item.name} - {item.quantity} {i18n.t("Pieces")}.
                  </Typography>
                ))}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button variant="outlined" onClick={handleBackStep}>
                {i18n.t("Back")}
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={items.every((item) => !item.selected)}
              >
                {i18n.t("CreateFund")}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default CreateFundModal;



import React from "react";
import { Modal, Box, Typography, Rating, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface RatingModalProps {
  open: boolean;
  rating: number | null;
  onClose: () => void;
  onSave: () => void;
  setRating: (rating: number | null) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
  open,
  rating,
  onClose,
  onSave,
  setRating,
}) => 
    
{
    const {i18n} = useTranslation();
    

    return(
  <Modal open={open} onClose={onClose}>
    <Box sx={{ p: 4, bgcolor: "white", borderRadius: 2, mx: "auto", mt: 20, width: 300 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{i18n.t("YourRating")}</Typography>
      <Rating
        name="fund-rating"
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="contained" onClick={onSave}>{i18n.t("Save")}</Button>
        <Button variant="outlined" onClick={onClose}>{i18n.t("Cancel")}</Button>
      </Box>
    </Box>
  </Modal>
);
}
export default RatingModal;

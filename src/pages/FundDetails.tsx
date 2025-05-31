import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent, CircularProgress, Button, Box, Modal, Rating } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Fund, Requirement } from "../types";

import HeaderMenu from "../components/FundDetails/HeaderMenu";
import EditForm from "../components/FundDetails/EditForm";
import FundInfo from "../components/FundDetails/FundInfo";
import FundItems from "../components/FundDetails/FundItems";
import RequirementInfo from "../components/FundDetails/RequirementInfo";
import RatingModal from "../modals/RatingModal";

const FundDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { funds, requirements, setFunds, user } = useAuth();
  const [fund, setFund] = useState<Fund | null>(null);
  const [requirement, setRequirement] = useState<Requirement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    try {
      const localFundsRaw = JSON.parse(localStorage.getItem("app_funds") || "[]");
      const localFunds: Fund[] = localFundsRaw.map((f: any) => ({
        ...f,
        status: f.status === "active" ? "active" : "disabled",
      }));
      const currentFund = funds.find((f) => f.id === id) || localFunds.find((f) => f.id === id) || null;
      if (!currentFund) {
        setError("Збір не знайдено");
        return;
      }
      setFund(currentFund);

      const localRequirements: Requirement[] = JSON.parse(localStorage.getItem("app_requirements") || "[]");
      const currentRequirement =
        requirements.find((r) => r.id === currentFund.requirementId) ||
        localRequirements.find((r) => r.id === currentFund.requirementId) ||
        null;

      setRequirement(currentRequirement);
      setEditedName(currentFund.name);
      setEditedDescription(currentFund.description);
      setRating(currentFund.rating || null); 
    } catch (error) {
      console.error(error);
      setError("Помилка при завантаженні даних");
    } finally {
      setLoading(false);
    }
  }, [id, funds, requirements]);

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleDeactivate = () => {
  if (fund) {
    const updated = funds.map((f) =>
      f.id === fund.id ? { ...f, status: "disabled" as "disabled" } : f
    );
    setFunds(updated);
    setFund({ ...fund, status: "disabled" });
  }
  handleMenuClose();
};


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && fund) {
      const reportUrl = URL.createObjectURL(file);
      const updated = funds.map((f) => f.id === fund.id ? { ...f, reportUrl } : f);
      setFunds(updated);
      setFund({ ...fund, reportUrl });
    }
  };

  const handleSaveEdit = () => {
    if (fund) {
      const updated = funds.map((f) =>
        f.id === fund.id ? { ...f, name: editedName, description: editedDescription } : f
      );
      setFunds(updated);
      setFund({ ...fund, name: editedName, description: editedDescription });
      setIsEditing(false);
    }
  };

  // Для оценки
  const handleSaveRating = () => {
    if (fund && rating !== null) {
      const updated = funds.map((f) =>
        f.id === fund.id ? { ...f, rating } : f
      );
      setFunds(updated);
      setFund({ ...fund, rating });
      setRatingModalOpen(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!fund) return <Typography color="error">Збір не знайдено</Typography>;

  return (
    <Container sx={{ width: 1024, mt: 4 }}>
      <Card>
        <CardContent>
          {isEditing ? (
            <EditForm
              name={editedName}
              description={editedDescription}
              setName={setEditedName}
              setDescription={setEditedDescription}
              onSave={handleSaveEdit}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <FundInfo fund={fund} />
              {user?.role === "Volunteer" ? (
                <HeaderMenu
                  onEdit={() => { setIsEditing(true); handleMenuClose(); }}
                  onDeactivate={handleDeactivate}
                  onFileUpload={handleFileUpload}
                  anchorEl={anchorEl}
                  handleMenuOpen={handleMenuOpen}
                  handleMenuClose={handleMenuClose}
                />
              ) : (
                <Button variant="outlined" onClick={() => setRatingModalOpen(true)}>
                  Поставити оцінку
                </Button>
              )}
            </Box>
          )}

          <FundItems items={fund.items} />

          {requirement && <RequirementInfo requirement={requirement} />}

          {fund.link && (
            <Button variant="contained" color="primary" href={fund.link} target="_blank" sx={{ mt: 2 }}>
              Підтримати збір 💙
            </Button>
          )}

          {fund.reportUrl && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" fontWeight="bold">Звіт:</Typography>
              <a href={fund.reportUrl} target="_blank" rel="noopener noreferrer">
                Переглянути звіт
              </a>
            </Box>
          )}

          {fund.rating && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" fontWeight="bold">Оцінка збору:</Typography>
              <Rating value={fund.rating} readOnly />
            </Box>
          )}
        </CardContent>
      </Card>

      <RatingModal
        open={ratingModalOpen}
        rating={rating}
        onClose={() => setRatingModalOpen(false)}
        onSave={handleSaveRating}
        setRating={setRating}
      />
    </Container>
  );
};

export default FundDetails;

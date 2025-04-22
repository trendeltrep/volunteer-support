import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Fund } from "../types";

const FundDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { funds } = useAuth();
  const [fund, setFund] = useState<Fund | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFund = () => {
      try {
        let foundFund = funds.find(fund => fund.id === id);

        if (!foundFund) {
          const storedFunds: Fund[] = JSON.parse(localStorage.getItem("app_funds") || "[]");
          const foundFund = storedFunds.find(f => f.id === id) || null;
        }

        if (foundFund) {
          setFund(foundFund);
        } else {
          setError("Збір не знайдено");
        }
      } catch (err) {
        setError("Помилка при завантаженні даних");
      } finally {
        setLoading(false);
      }
    };

    fetchFund();
  }, [id, funds]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!fund) return <Typography color="error">Збір не знайдено</Typography>;

  return (
    <Container sx={{ width: 1024, mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4">Інформація про збір</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>{fund.name}</Typography>
          <img src={fund.image} alt={fund.name} style={{ width: "100%", maxHeight: 400, objectFit: "cover" }} />
          <Typography variant="h6" sx={{ mt: 2 }}>Прогрес: {fund.progress}%</Typography>
          {fund.isHot && <Typography color="error" sx={{ mt: 1 }}>🔥 Швидкий!</Typography>}
          <Typography sx={{ mt: 1 }}>Волонтер: {fund.volunteer}</Typography>
          <Typography>Отримувач: {fund.recipient}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FundDetails;

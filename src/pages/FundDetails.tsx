import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { Fund } from "../types";
import { api } from "../api";

const FundDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [fund, setFund] = useState<Fund | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const mockFunds: Fund[] = [
    { id: "1", name: "Помощь детям", image: "/images/fund1.jpg", progress: 60, isHot: true, volunteer: "Иван", recipient: "Орфан" },
    { id: "2", name: "Медикаменты", image: "/images/fund2.jpg", progress: 30, isHot: false, volunteer: "Анна", recipient: "Больница" }
  ];

  

  useEffect(() => {
    const fetchFund = async () => {
      try {
        // const response = await api.get<Fund>(`/funds/${id}`);
        // setFund(response.data);
        if (id === "1") {
          setFund(mockFunds[0]);
        } else if (id === "2") {
          setFund(mockFunds[1]);
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchFund();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!fund) return <Typography color="error">Збір не найдено</Typography>;

  return (
    <Container sx={{ width: 1024, mt: 4 }}>
      <Card>
        <CardContent>
        <Typography variant="h4">Інформація про збір</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>{fund.name}</Typography>
          <img src={fund.image} alt={fund.name} style={{ width: "100%", maxHeight: 400, objectFit: "cover" }} />
          <Typography variant="h6">Прогрес: {fund.progress}%</Typography>
          {fund.isHot && <Typography color="error">🔥 Швидкий!</Typography>}
          <Typography>Волонтер: {fund.volunteer}</Typography>
          <Typography>Отримувач: {fund.recipient}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FundDetails;

import { Container, Grid } from "@mui/material";
import FundCard from "../components/FundCard";
import { Fund } from "../types";
import { useState, useEffect } from "react";
import { api } from "../api";

const mockFunds: Fund[] = [
  { id: "1", name: "Помощь детям", image: "/images/fund1.jpg", progress: 60, isHot: true, volunteer: "Иван", recipient: "Орфан" },
  { id: "2", name: "Медикаменты", image: "/images/fund2.jpg", progress: 30, isHot: false, volunteer: "Анна", recipient: "Больница" }
];

const Home = () => {
    const [funds, setFunds] = useState<Fund[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchFunds = async () => {
        try {
          const response = await api.get<Fund[]>("/funds"); // Запрос к бэкенду
          setFunds(response.data);
        } catch (err) {
          setError("Ошибка загрузки данных");
        } finally {
          setLoading(false);
        }
      };
  
      fetchFunds();
    }, []);
    
  return (
    <Container sx={{ width: 1024, mt: 4 }}>
      <Grid container spacing={2}>
        {mockFunds.map((fund) => (
          <Grid item key={fund.id}>
            <FundCard fund={fund} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;

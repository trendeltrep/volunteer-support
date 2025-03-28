import { useEffect, useState } from "react";
import { Container, Grid, CircularProgress, Typography, TextField } from "@mui/material";
import FundCard from "../components/FundCard";
import { Fund } from "../types";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const mockFunds: Fund[] = [
  { id: "1", name: "Помощь детям", image: "/images/fund1.jpg", progress: 60, isHot: true, volunteer: "Иван", recipient: "Орфан" },
    { id: "2", name: "Медикаменты", image: "/images/fund2.jpg", progress: 30, isHot: false, volunteer: "Анна", recipient: "Больница" }
];

const Search = () => {
  const [funds, setFunds] = useState<Fund[]>(mockFunds);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();


  const fetchFunds = async (searchQuery: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<Fund[]>("/funds/search", { params: { query: searchQuery } });
      setFunds(response.data);
    } catch (err) {
      setError("error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunds(""); 
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    fetchFunds(event.target.value);
  };

  return (
    <Container sx={{ width: 1024, mt: 4 }}>
      <TextField
        fullWidth
        label="Пошук зборів"
        variant="outlined"
        value={query}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {funds.map((fund) => (
          <Grid item key={fund.id} onClick={() => navigate(`/funds/${fund.id}`)} sx={{ cursor: "pointer" }}>
            <FundCard fund={fund} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;

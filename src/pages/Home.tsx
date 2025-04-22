import { Container, Grid, CircularProgress, Typography } from "@mui/material";
import FundCard from "../components/FundCard";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { funds } = useAuth(); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (funds.length === 0) {
      setError("Нет доступных фондов");
    } else {
      setLoading(false);
    }
  }, [funds]); 

  if (loading) {
    return (
      <Container sx={{ width: 1024, mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ width: 1024, mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ width: 1024, mt: 4 }}>
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

export default Home;

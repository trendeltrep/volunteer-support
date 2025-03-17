import { Container, Grid } from "@mui/material";
import FundCard from "../components/FundCard";
import { Fund } from "../types";

const mockFunds: Fund[] = [
  { id: "1", name: "Помощь детям", image: "/images/fund1.jpg", progress: 60, isHot: true, volunteer: "Иван", recipient: "Орфан" },
  { id: "2", name: "Медикаменты", image: "/images/fund2.jpg", progress: 30, isHot: false, volunteer: "Анна", recipient: "Больница" }
];

const Home = () => {
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

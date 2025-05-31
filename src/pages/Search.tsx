import { useEffect, useState } from "react";
import { Container, Grid, CircularProgress, Typography, TextField, Box } from "@mui/material";
import FundCard from "../components/FundCard";
import { useAuth } from "../context/AuthContext";
import { Fund } from "../types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Search = () => {
  const { funds } = useAuth();
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const filterFunds = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setFilteredFunds(funds);
    } else {
      const filtered = funds.filter((fund) =>
        fund.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFunds(filtered);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    filterFunds(value);
  };

  useEffect(() => {
    filterFunds(query);
  }, [funds, query]);

  return (
    <Container sx={{ width: 1024, mt: 4 }}>
      <TextField
        fullWidth
        label={i18n.t("Search")}
        variant="outlined"
        value={query}
        onChange={handleSearch}
        sx={{ mb: 2 }}
      />
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>{i18n.t("Result")}</Typography>
        {filteredFunds.length === 0 ? (
          <Typography>{i18n.t("NoResult")}.</Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredFunds.map((fund) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={fund.id}>
                <FundCard fund={fund} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Search;

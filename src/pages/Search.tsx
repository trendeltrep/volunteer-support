import { useEffect, useState } from "react";
import { Container, Grid, CircularProgress, Typography, TextField } from "@mui/material";
import FundCard from "../components/FundCard";
import { useAuth } from "../context/AuthContext";  // Импортируем useAuth для доступа к контексту
import { Fund } from "../types";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { funds } = useAuth();  // Получаем данные о сборах из AuthContext
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>(funds);  // Местное состояние для отфильтрованных сборов
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");  // Состояние для поискового запроса
  const navigate = useNavigate();

  // Функция для фильтрации сборов по имени
  const filterFunds = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setFilteredFunds(funds);  // Если запрос пустой, показываем все сборы
    } else {
      const filtered = funds.filter((fund) =>
        fund.name.toLowerCase().includes(searchQuery.toLowerCase()) // Фильтруем по имени
      );
      setFilteredFunds(filtered);
    }
  };

  // Обработка изменений в поисковом поле
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);  // Обновляем состояние запроса
    filterFunds(event.target.value);  // Фильтруем сборы
  };

  useEffect(() => {
    filterFunds(query);  // Изначально фильтруем сборы по пустому запросу
  }, [funds]);  // Если данные о сборах изменяются, фильтруем снова

  return (
    <Container sx={{ width: 1024, mt: 4 }}>
      <TextField
        fullWidth
        label="Пошук зборів"
        variant="outlined"
        value={query}
        onChange={handleSearch}  // Обработчик изменений поиска
        sx={{ mb: 2 }}
      />
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2}>
        {filteredFunds.map((fund) => (
          <Grid item key={fund.id} onClick={() => navigate(`/funds/${fund.id}`)} sx={{ cursor: "pointer" }}>
            <FundCard fund={fund} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Search;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Fund, Requirement } from "../types";

const FundDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { funds, requirements } = useAuth();

  const [fund, setFund] = useState<Fund | null>(null);
  const [requirement, setRequirement] = useState<Requirement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const localFunds: Fund[] = JSON.parse(localStorage.getItem("app_funds") || "[]");
      const currentFund = funds.find((f) => f.id === id) || localFunds.find((f) => f.id === id) || null;

      if (!currentFund) {
        setError("Збір не знайдено");
        return;
      }

      setFund(currentFund);

      const localReqs: Requirement[] = JSON.parse(localStorage.getItem("app_requirements") || "[]");
      const req = requirements.find((r) => r.id === currentFund.requirementId) ||
                  localReqs.find((r) => r.id === currentFund.requirementId) ||
                  null;

      setRequirement(req);
    } catch {
      setError("Помилка при завантаженні даних");
    } finally {
      setLoading(false);
    }
  }, [id, funds, requirements]);

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
          <Typography sx={{ mt: 1 }}><strong>Волонтер:</strong> {fund.volunteer}</Typography>
          <Typography><strong>Отримувач:</strong> {fund.recipient}</Typography>

          {requirement && (
            <>
              <Typography>
                <strong>Дедлайн:</strong>{" "}
                {requirement?.deadline
                  ? new Date(requirement.deadline).toLocaleDateString()
                  : "Безстроково"}
              </Typography>

              <Typography><strong>Пріоритет:</strong> {requirement.priority === "High" ? "Високий" : "Без пріоритету"}</Typography>

              <Typography sx={{ mt: 2 }}><strong>Предмети з потреби:</strong></Typography>
              <List>
                {requirement.items.map((item, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemText primary={`${item.name} - ${item.quantity} шт.`} />
                  </ListItem>
                ))}
              </List>
            </>
          )}

          {fund.link && (
            <Button
              variant="contained"
              color="primary"
              href={fund.link}
              target="_blank"
              sx={{ mt: 2 }}
            >
              Підтримати збір 💙
            </Button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default FundDetails;

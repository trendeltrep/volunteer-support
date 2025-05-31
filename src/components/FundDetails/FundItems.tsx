import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const FundItems = ({ items }: { items: { name: string; quantity: number }[] }) => 
{
    const { i18n } = useTranslation();

    return(
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2" fontWeight="bold">{i18n.t("IncludedItems")}:</Typography>
    <List>
      {items.map((item, index) => (
        <ListItem key={index} sx={{ pl: 0 }}>
          <ListItemText primary={`${item.name} - ${item.quantity} ${i18n.t("Pieces")}.`} />
        </ListItem>
      ))}
    </List>
  </Box>
);
}
export default FundItems;

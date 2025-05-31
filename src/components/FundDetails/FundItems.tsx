import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const FundItems = ({ items }: { items: { name: string; quantity: number }[] }) => (
  <Box sx={{ mt: 2 }}>
    <Typography variant="body2" fontWeight="bold">Предмети, включені у збір:</Typography>
    <List>
      {items.map((item, index) => (
        <ListItem key={index} sx={{ pl: 0 }}>
          <ListItemText primary={`${item.name} - ${item.quantity} шт.`} />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default FundItems;

import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const HeaderMenu = ({
  onEdit,
  onDeactivate,
  onFileUpload,
  anchorEl,
  handleMenuOpen,
  handleMenuClose,
}: any) => (
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <IconButton onClick={handleMenuOpen}>
      <MoreVertIcon />
    </IconButton>
    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
      <MenuItem onClick={onEdit}>Редагувати збір</MenuItem>
      <MenuItem onClick={onDeactivate}>Деактивувати</MenuItem>
      <MenuItem>
        <label style={{ cursor: "pointer" }}>
          Завантажити звіт
          <input type="file" hidden onChange={onFileUpload} accept="application/pdf, image/*" />
        </label>
      </MenuItem>
    </Menu>
  </Box>
);

export default HeaderMenu;

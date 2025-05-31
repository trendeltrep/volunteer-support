import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";

const HeaderMenu = ({
  onEdit,
  onDeactivate,
  onFileUpload,
  anchorEl,
  handleMenuOpen,
  handleMenuClose,
}: any) =>
    {
        
        const {i18n} = useTranslation();

        return(
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <IconButton onClick={handleMenuOpen}>
      <MoreVertIcon />
    </IconButton>
    <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleMenuClose}>
      <MenuItem onClick={onEdit}>{i18n.t("EditFund")}</MenuItem>
      <MenuItem onClick={onDeactivate}>{i18n.t("Disabled")}</MenuItem>
      <MenuItem>
        <label style={{ cursor: "pointer" }}>
          {i18n.t("LoadReport")}
          <input type="file" hidden onChange={onFileUpload} accept="application/pdf, image/*" />
        </label>
      </MenuItem>
    </Menu>
  </Box>
);
    }

export default HeaderMenu;

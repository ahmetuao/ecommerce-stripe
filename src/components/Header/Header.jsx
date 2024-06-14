import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../../assets/images/logo.svg";
import CartHeader from "./Cart/CartHeader";
import SearchArea from "./SearchArea";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const pages = [
  {
    id: 1,
    name: "Products",
    url: "products",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ top: "0", left: "0", zIndex: "9" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              width: { xs: "75px", md: "100px" },
              padding: { xs: ".5rem", md: "1rem" },
              marginRight: "1rem",
              backgroundColor: "#ffffff",
              borderRadius: "32px",
              cursor: "pointer",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <img
              onClick={() => navigate("/")}
              src={LogoImg}
              alt="logo"
              width={100}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.id}
                  onClick={() => (handleCloseNavMenu(), navigate(page.url))}
                >
                  {page.id === 1 ? (
                    <AutoStoriesIcon
                      sx={{
                        marginRight: ".5rem",
                        position: "relative",
                        top: "-2px",
                      }}
                    />
                  ) : null}
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              width: { xs: "75px", md: "100px" },
              padding: { xs: ".5rem", md: "1rem" },
              backgroundColor: "#ffffff",
              borderRadius: "32px",
              cursor: "pointer",
              display: { xs: "flex", md: "none" },
            }}
          >
            <img
              onClick={() => navigate("/")}
              src={LogoImg}
              alt="logo"
              style={{ width: "100%" }}
            />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "space-between",
              alignItems: "center",
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => (handleCloseNavMenu(), navigate(page.url))}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.id === 1 ? (
                  <AutoStoriesIcon
                    sx={{
                      marginRight: ".5rem",
                      position: "relative",
                      top: "5px",
                    }}
                  />
                ) : null}
                {page.name}
              </Button>
            ))}

            <SearchArea />
            <CartHeader />
          </Box>
        </Toolbar>
        <Box
          sx={{
            position: "absolute",
            top: "15px",
            left: "calc(50% - 20px)",
            display: { xs: "flex", md: "none" },
            width: { xs: "fit-content", md: "100%" },
            justifyContent: "center",
          }}
        >
          <CartHeader />
        </Box>
      </Container>
    </AppBar>
  );
}
export default Header;

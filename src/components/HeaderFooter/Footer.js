import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
const Footer = () => {
  return (
    <>
      <AppBar
        position="static"
        style={{ background: "#114b7a", position: "fixed", bottom: "0" }}
      >
        <Container maxWidth="md">
          <Typography
            variant="body1"
            color="inherit"
            style={{ textAlign: "center" }}
          >
            © 2022 Sadcoder's OnlinEd
          </Typography>
        </Container>
      </AppBar>
    </>
  );
};

export default Footer;

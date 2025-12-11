import { Typography } from "@mui/material";

const FooterView = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        width: "100%",
        padding: "24px 0",
      }}
    >
      <Typography sx={{ color: "grey.500" }}>
        © {new Date().getFullYear()} Dizzy-Shield. Crafted by cadi.
      </Typography>
    </footer>
  );
};
export default FooterView;

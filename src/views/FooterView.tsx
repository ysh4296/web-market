import { Typography } from "@mui/material";
import { useTranslation } from "gatsby-plugin-react-i18next";

const FooterView = () => {
  const { t } = useTranslation();

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
        {t("footer.credit", { year: new Date().getFullYear() })}
      </Typography>
    </footer>
  );
};
export default FooterView;

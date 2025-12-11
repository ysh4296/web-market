import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useI18next } from "gatsby-plugin-react-i18next";
import { useEffect, useRef } from "react";

const LANGUAGE_LABELS: Record<string, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  es: "Español",
  zh: "中文",
};

export default function LanguageSwitcher() {
  const { language, languages, changeLanguage } = useI18next();
  const didSetFromBrowser = useRef(false);

  // 초기 렌더에서 브라우저 기본 언어를 반영해 기본값을 맞춤
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (didSetFromBrowser.current) return;

    let browserLang;
    if (language === undefined) browserLang = navigator.language.split("-")[0];

    if (
      browserLang &&
      languages.includes(browserLang) &&
      browserLang !== language
    ) {
      didSetFromBrowser.current = true;
      changeLanguage(browserLang);
    }
  }, [changeLanguage, language, languages]);

  return (
    <Box sx={{ minWidth: 140 }}>
      <FormControl fullWidth size="small" variant="outlined">
        <InputLabel sx={{ color: "grey.300" }}>Language</InputLabel>
        <Select
          label="Language"
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          sx={{
            color: "grey.100",
            borderColor: "rgba(255,255,255,0.2)",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.2)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.35)",
            },
            ".MuiSvgIcon-root": { color: "grey.200" },
          }}
        >
          {languages.map((lng) => (
            <MenuItem key={lng} value={lng}>
              {LANGUAGE_LABELS[lng] ?? lng}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

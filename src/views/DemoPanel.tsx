import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import useInView from "@hooks/useInView";
import DemoView from "@views/DemoView";
import { fadeUp } from "@utils/keyFrames";
import { useTranslation } from "gatsby-plugin-react-i18next";
import { useMemo, useRef, useState } from "react";

const COLORS = [
  { key: "red", value: "#ef4444" },
  { key: "orange", value: "#f97316" },
  { key: "yellow", value: "#facc15" },
  { key: "green", value: "#22c55e" },
  { key: "blue", value: "#3b82f6" },
] as const;


function hexToRgba(hex: string, alpha: number) {
  const parsed = hex.replace("#", "");
  const r = Number.parseInt(parsed.slice(0, 2), 16);
  const g = Number.parseInt(parsed.slice(2, 4), 16);
  const b = Number.parseInt(parsed.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function DemoPanel() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.5 });

  const [color, setColor] = useState<string>(COLORS[0].value);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const focusDepthRef = useRef(0);
  const [inputsDisabled, setInputsDisabled] = useState(false);

  const squareStyle = useMemo(() => {
    const overlayColor = hexToRgba(color, 1);
    const size = isFullscreen ? 120 : 80;
    return {
      width: size,
      height: size,
      background: overlayColor,
      borderRadius: 8,
      pointerEvents: "none" as const,
    };
  }, [color, isFullscreen]);

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 1000,
        mx: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          animation: inView ? `${fadeUp} .6s ease-out` : "none",
          opacity: inView ? 1 : 0,
        }}
      >
        {t("demo.title")}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "grey.300",
          animation: inView ? `${fadeUp} .6s ease-out` : "none",
          opacity: inView ? 1 : 0,
          lineHeight: 1.7,
        }}
      >
        {t("demo.description")}
      </Typography>

      <Paper
        sx={{
          mt: 2,
          p: { xs: 2, md: 2.25 },
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          background: "rgba(17, 24, 39, 0.8)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
        onFocusCapture={() => {
          focusDepthRef.current += 1;
          setInputsDisabled(true);
        }}
        onBlurCapture={() => {
          focusDepthRef.current = Math.max(0, focusDepthRef.current - 1);
          if (focusDepthRef.current === 0) setInputsDisabled(false);
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: { xs: 1.5, md: 2 },
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: "1 1 320px", minWidth: 260 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("demo.colorPicker")}
            </Typography>
            <FormControl>
              <RadioGroup
                row
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                {COLORS.map((c) => (
                  <FormControlLabel
                    key={c.value}
                    value={c.value}
                    control={
                      <Radio
                        sx={{
                          color: c.value,
                          "&.Mui-checked": { color: c.value },
                        }}
                      />
                    }
                    label={t(`demo.colors.${c.key}`)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              flex: "1 1 280px",
              minWidth: 240,
            }}
          >
            <Box sx={{ flex: "1 1 140px" }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {t("demo.overlay.label")}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setShowOverlay((prev) => !prev)}
                sx={{
                  px: 2,
                  color: "#e2e8f0",
                  borderColor: "rgba(255,255,255,0.35)",
                  "&:hover": { borderColor: "rgba(255,255,255,0.5)" },
                }}
              >
                {t(showOverlay ? "demo.overlay.hide" : "demo.overlay.show")}
              </Button>
            </Box>

            <Box sx={{ flex: "1 1 160px" }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {t("demo.fullscreen.label")}
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  const target = containerRef.current;
                  if (!target) return;
                  if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => {});
                  } else {
                    target.requestFullscreen?.().catch(() => {});
                  }
                }}
                sx={{
                  px: 2,
                  color: "#e2e8f0",
                  borderColor: "rgba(255,255,255,0.35)",
                  "&:hover": { borderColor: "rgba(255,255,255,0.5)" },
                }}
              >
                {t(
                  isFullscreen
                    ? "demo.fullscreen.exit"
                    : "demo.fullscreen.enter",
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <DemoView
          showFullscreenButton={false}
          onMountRefChange={(el) => {
            containerRef.current = el;
          }}
          onFullscreenChange={(fs) => setIsFullscreen(fs)}
          inputsDisabled={inputsDisabled}
          overlay={
            showOverlay && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    ...squareStyle,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    ...squareStyle,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    ...squareStyle,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    ...squareStyle,
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    ...squareStyle,
                  }}
                />
              </Box>
            )
          }
        />
      </Box>
    </Box>
  );
}



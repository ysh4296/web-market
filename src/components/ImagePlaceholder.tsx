import { Box } from "@mui/material";

// 이미지 placeholder 컴포넌트
function ImagePlaceholder({
  label,
  height = 280,
}: { label: string; height?: number }) {
  return (
    <Box
      role="img"
      aria-label={label}
      sx={{
        height,
        borderRadius: 2,
        border: "1.5px dashed rgba(255,255,255,0.2)",
        background: "rgba(255,255,255,0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        color: "rgba(255,255,255,0.6)",
        textAlign: "center",
        margin: "0 auto",
        maxWidth: 600,
      }}
    >
      [{label}]
    </Box>
  );
}
export default ImagePlaceholder;

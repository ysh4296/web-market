import { Box, Container, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import dizzySheld from "@images/dizzy-shield.ico";
import ShineButton from "@components/ShineButton";

// float 애니메이션 (SSR-safe)
const floatIcon = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0); }
`;

const BrandingView = () => {
  return (
    <Box
      component="section"
      sx={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* 아이콘 + 애니메이션 */}
      <Box
        component="img"
        src={dizzySheld}
        alt="멀미 안정 아이콘"
        sx={{
          width: 120,
          height: 120,
          position: "absolute",
          top: 160,
          animation: `${floatIcon} 3s ease-in-out infinite`,
          opacity: 0.9,
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
        }}
      />

      {/* 텍스트 컨텐츠 */}
      <Container sx={{ maxWidth: 720, mt: 30 }}>
        <Typography
          variant="h2"
          sx={{ lineHeight: 1.1, mb: 2, fontWeight: 700 }}
        >
          3D 멀미, 이제는 그만
        </Typography>

        <Typography variant="h5" color="grey.400">
          시야 안정 레이아웃으로 방향감과 몰입감을 동시에 지킨다
        </Typography>
      </Container>
      <ShineButton>지금 체험하기</ShineButton>
    </Box>
  );
};

export default BrandingView;

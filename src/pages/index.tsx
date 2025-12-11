import {
  ThemeProvider,
  createTheme,
  Container,
  Typography,
  Button,
  Card,
  Divider,
  Box,
} from "@mui/material";
import BrandingView from "@views/BrandingView";

// MUI 다크 테마 설정
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#6366f1" }, // indigo
    grey: { 200: "#cbd5e1", 300: "#94a3b8", 700: "#334155" },
    background: { default: "#0f172a", paper: "#1e293b" },
  },
  typography: {
    fontFamily: `"Inter", "Pretendard", sans-serif`,
  },
});

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

export default function AntiMotionSicknessLanding() {
  return (
    <ThemeProvider theme={theme}>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 64,
          width: "100%",
          background: theme.palette.background.default,
        }}
      >
        {/* Hero Section */}
        <BrandingView />

        <Divider sx={{ width: "100%", opacity: 0.1 }} />

        {/* 문제 제시 */}
        <section style={{ textAlign: "center", width: "100%" }}>
          <Container maxWidth="md">
            <Typography variant="h4" sx={{ mb: 1 }}>
              왜 멀미가 생길까
            </Typography>

            <Typography variant="body1" sx={{ color: "grey.300" }}>
              카메라 급회전, 불균형 FOV, 시야 흔들림이 평형감각과 시각 정보의
              불일치를 만든다. <br />
              장시간 플레이 시 방향감 상실과 피로를 유발한다.
            </Typography>

            <Box mt={3}>
              <ImagePlaceholder label="문제 상황을 설명하는 이미지" />
            </Box>
          </Container>
        </section>

        <Divider sx={{ width: "100%", opacity: 0.1 }} />

        {/* 해결책 소개 */}
        <section style={{ textAlign: "center", width: "100%" }}>
          <Container maxWidth="md">
            <Typography variant="h4" sx={{ mb: 1 }}>
              우리는 이렇게 해결한다
            </Typography>

            <Card
              sx={{
                p: 4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
              }}
            >
              {/* item 1 */}
              <Box>
                <Typography variant="h6">시야 중심 HUD</Typography>
                <Typography sx={{ color: "grey.300" }}>
                  고정 기준점을 제공해 급회전 시에도 방향감을 유지한다.
                </Typography>
              </Box>

              {/* item 2 */}
              <Box>
                <Typography variant="h6">
                  {" "}
                  brightness · 대비 자동 보정
                </Typography>
                <Typography sx={{ color: "grey.300" }}>
                  어두운 장면 전환 시 눈부심과 피로를 줄여준다.
                </Typography>
              </Box>

              {/* item 3 */}
              <Box>
                <Typography variant="h6">포스트잇 방향 가이드</Typography>
                <Typography sx={{ color: "grey.300" }}>
                  화면 모서리의 단순한 색상/문구 포스트잇으로 방향 상실을
                  방지한다.
                </Typography>
              </Box>
            </Card>

            <Box mt={3}>
              <ImagePlaceholder label="HUD 오버레이 예시 이미지" />
            </Box>
          </Container>
        </section>

        <Divider sx={{ width: "100%", opacity: 0.1 }} />

        {/* 데모 */}
        <section style={{ textAlign: "center", width: "100%" }}>
          <Container maxWidth="md">
            <Typography variant="h4" sx={{ mb: 1 }}>
              시연을 확인해봐
            </Typography>
            <Typography sx={{ color: "grey.300" }}>
              HUD On/Off 비교로 효과를 직접 확인할 수 있다.
            </Typography>

            <Box mt={3}>
              <ImagePlaceholder label="데모 영상 썸네일 이미지" height={320} />
            </Box>

            <Box mt={2}>
              <Button variant="outlined" size="large">
                영상 보기
              </Button>
            </Box>
          </Container>
        </section>

        <Divider sx={{ width: "100%", opacity: 0.1 }} />

        {/* 후기 */}
        <section style={{ textAlign: "center", width: "100%" }}>
          <Container maxWidth="md">
            <Typography variant="h4" sx={{ mb: 3 }}>
              사용자 후기
            </Typography>

            <Card sx={{ mb: 2 }}>
              <Box p={3}>
                <Typography variant="h6">
                  “10분도 힘들었는데 이제 1시간은 거뜬하다.”
                </Typography>
                <Typography sx={{ color: "grey.400" }}>- 게이머 A</Typography>
              </Box>
            </Card>

            <Card>
              <Box p={3}>
                <Typography variant="h6">
                  “HUD 켜고 나서 방향감이 유지돼 집중도가 올라갔다.”
                </Typography>
                <Typography sx={{ color: "grey.400" }}>- 개발자 B</Typography>
              </Box>
            </Card>
          </Container>
        </section>

        <Divider sx={{ width: "100%", opacity: 0.1 }} />

        {/* CTA */}
        <section
          style={{ textAlign: "center", width: "100%", padding: "60px 0" }}
        >
          <Container maxWidth="md">
            <Typography variant="h3" sx={{ mb: 1 }}>
              지금 바로 체험해봐
            </Typography>

            <Typography sx={{ color: "grey.300" }}>
              무료로 시작하고, 맞다면 프로 버전으로 업그레이드하자.
            </Typography>

            <Box
              mt={3}
              sx={{ display: "flex", gap: 2, justifyContent: "center" }}
            >
              <Button variant="contained" size="large">
                무료 다운로드
              </Button>
              <Button variant="outlined" size="large">
                설치 가이드
              </Button>
            </Box>

            <Box mt={3}>
              <ImagePlaceholder label="다운로드 안내 이미지" height={180} />
            </Box>
          </Container>
        </section>

        {/* 푸터 */}
        <footer
          style={{
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            width: "100%",
            padding: "24px 0",
          }}
        >
          <Typography sx={{ color: "grey.500" }}>
            © {new Date().getFullYear()} Motion Layout. All rights reserved.
          </Typography>
        </footer>
      </main>
    </ThemeProvider>
  );
}

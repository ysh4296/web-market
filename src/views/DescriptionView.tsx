import { Container, Typography, Box, Card } from "@mui/material";

const DescriptionView = () => {
  return (
    <section style={{ width: "100%", padding: "60px 0" }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 6,
          }}
        >
          {/* 왼쪽 — 문제 + 해결 서론 */}
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              왜 멀미가 생길까?
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: "grey.300", lineHeight: 1.7 }}
            >
              3D 게임에서 카메라가 빠르게 회전하거나 시야가 흔들리면, 뇌는 시각
              정보와 평형감각 사이에서 불일치를 감지해요. 이 작은 차이가
              누적되면 방향감 상실, 어지러움, 피로감이 발생하며 장시간 플레이가
              어려워져요.
              <br />
              <br />
              이러한 문제를 해결하기 위해서 흔들리는 환경 속에서도 뇌가 안정적인
              기준점을 유지하도록 도와주는 시각적 장치가 필요해요.
            </Typography>
          </Box>

          {/* 오른쪽 — 강조된 해결책 Card */}
          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                p: 4,
                borderRadius: 3,
                background: "paper",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 0 16px rgba(99,102,241,0.2)",
              }}
            >
              <Typography variant="h4" sx={{ mb: 3, textAlign: "left" }}>
                우리는 이렇게 해결한다
              </Typography>

              {/* item 1 */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">시야 중심 고정 HUD</Typography>
                <Typography sx={{ color: "grey.300", lineHeight: 1.6 }}>
                  화면에 안정적인 기준점을 제공해 급격한 회전이나 롤링
                  상황에서도 방향 감각을 잃지 않게 도와줘요.
                </Typography>
              </Box>

              {/* item 2 */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6">자동 밝기·대비 보정</Typography>
                <Typography sx={{ color: "grey.300", lineHeight: 1.6 }}>
                  크기, 색상, 투명도를 조절해서 개인에게 가장 잘맞는 레이아웃을
                  설정해요.
                </Typography>
              </Box>
            </Card>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default DescriptionView;

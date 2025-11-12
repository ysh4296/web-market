import {
  Theme,
  Container,
  Heading,
  Text,
  Button,
  Card,
  Separator,
  Box,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

function ImagePlaceholder({
  label,
  height = 280,
}: { label: string; height?: number }) {
  return (
    <Box
      role="img"
      aria-label={label}
      style={{
        height,
        borderRadius: 16,
        border: "1.5px dashed var(--gray-6)",
        background: "var(--gray-2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        color: "var(--gray-11)",
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
    <Theme appearance="dark" accentColor="indigo" grayColor="slate">
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 64,
          width: "100%",
        }}
      >
        {/* Hero */}
        <section
          style={{
            width: "100%",
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
          }}
        >
          <Container size="3" style={{ maxWidth: 720, margin: "0 auto" }}>
            <Heading size="9" style={{ lineHeight: 1.1, marginBottom: 12 }}>
              3D 멀미, 이제는 그만
            </Heading>
            <Text size="5" color="gray">
              시야 안정 레이아웃으로 방향감과 몰입감을 동시에 지킨다
            </Text>
            <div
              style={{
                marginTop: 28,
                display: "flex",
                gap: 12,
                justifyContent: "center",
              }}
            >
              <Button size="4" variant="solid">
                지금 체험하기
              </Button>
              <Button size="4" variant="soft">
                문서 보기
              </Button>
            </div>
          </Container>
        </section>

        <Separator size="4" />

        {/* 문제 제시 */}
        <section style={{ textAlign: "center" }}>
          <Container size="3" style={{ maxWidth: 720, margin: "0 auto" }}>
            <Heading size="7" style={{ marginBottom: 12 }}>
              왜 멀미가 생길까
            </Heading>
            <Text size="4" color="gray">
              카메라 급회전, 불균형 FOV, 시야 흔들림이 평형감각과 시각 정보의
              불일치를 만든다.
              <br />
              장시간 플레이 시 방향감 상실과 피로를 유발한다.
            </Text>
            <div style={{ marginTop: 24 }}>
              <ImagePlaceholder label="문제 상황을 설명하는 이미지" />
            </div>
          </Container>
        </section>

        <Separator size="4" />

        {/* 해결책 소개 */}
        <section style={{ textAlign: "center" }}>
          <Container size="3" style={{ maxWidth: 720, margin: "0 auto" }}>
            <Heading size="7" style={{ marginBottom: 12 }}>
              우리는 이렇게 해결한다
            </Heading>
            <Card
              size="3"
              style={{
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                alignItems: "center",
              }}
            >
              <div>
                <Heading size="4">시야 중심 HUD</Heading>
                <Text color="gray">
                  고정 기준점을 제공해 급회전 시에도 방향감을 유지한다.
                </Text>
              </div>
              <div>
                <Heading size="4">밝기·대비 자동 보정</Heading>
                <Text color="gray">
                  어두운 장면 전환 시 눈부심과 피로를 줄여준다.
                </Text>
              </div>
              <div>
                <Heading size="4">포스트잇 방향 가이드</Heading>
                <Text color="gray">
                  화면 모서리에 단순한 색상/문구 포스트잇을 배치해 방향 상실을
                  방지한다.
                </Text>
              </div>
            </Card>
            <div style={{ marginTop: 20 }}>
              <ImagePlaceholder label="HUD 오버레이 예시 이미지" />
            </div>
          </Container>
        </section>

        <Separator size="4" />

        {/* 데모 */}
        <section style={{ textAlign: "center" }}>
          <Container size="3" style={{ maxWidth: 720, margin: "0 auto" }}>
            <Heading size="7" style={{ marginBottom: 8 }}>
              시연을 확인해봐
            </Heading>
            <Text color="gray">
              HUD On/Off 비교로 효과를 직접 확인할 수 있다.
            </Text>
            <div style={{ marginTop: 20 }}>
              <ImagePlaceholder label="데모 영상 썸네일 이미지" height={320} />
            </div>
            <div style={{ marginTop: 16 }}>
              <Button size="3" variant="outline">
                영상 보기
              </Button>
            </div>
          </Container>
        </section>

        <Separator size="4" />

        {/* 후기 */}
        <section style={{ textAlign: "center" }}>
          <Container size="3" style={{ maxWidth: 720, margin: "0 auto" }}>
            <Heading size="7" style={{ marginBottom: 16 }}>
              사용자 후기
            </Heading>
            <Card style={{ marginBottom: 12 }}>
              <Box p="3">
                <Text size="4">“10분도 힘들었는데 이제 1시간은 거뜬하다.”</Text>
                <Text color="gray">- 게이머 A</Text>
              </Box>
            </Card>
            <Card>
              <Box p="3">
                <Text size="4">
                  “HUD 켜고 나서 방향감이 유지돼 집중도가 올라갔다.”
                </Text>
                <Text color="gray">- 개발자 B</Text>
              </Box>
            </Card>
          </Container>
        </section>

        <Separator size="4" />

        {/* CTA */}
        <section
          style={{
            textAlign: "center",
            width: "100%",
            padding: "60px 0",
          }}
        >
          <Container size="3" style={{ maxWidth: 720, margin: "0 auto" }}>
            <Heading size="8" style={{ marginBottom: 8 }}>
              지금 바로 체험해봐
            </Heading>
            <Text color="gray">
              무료로 시작하고, 맞다면 프로 버전으로 업그레이드하자.
            </Text>
            <div
              style={{
                marginTop: 20,
                display: "flex",
                gap: 12,
                justifyContent: "center",
              }}
            >
              <Button size="4" variant="solid">
                무료 다운로드
              </Button>
              <Button size="4" variant="soft">
                설치 가이드
              </Button>
            </div>
            <div style={{ marginTop: 20 }}>
              <ImagePlaceholder label="다운로드 안내 이미지" height={180} />
            </div>
          </Container>
        </section>

        {/* 푸터 */}
        <footer
          style={{
            textAlign: "center",
            borderTop: "1px solid var(--gray-5)",
            width: "100%",
            padding: "24px 0",
          }}
        >
          <Text color="gray">
            © {new Date().getFullYear()} Motion Layout. All rights reserved.
          </Text>
        </footer>
      </main>
    </Theme>
  );
}

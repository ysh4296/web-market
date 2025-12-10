import { Text, Container, Heading } from "@radix-ui/themes";
import { useMemo } from "react";

import dizzySheld from "@images/dizzy-shield.ico";

export const BrandingView = () => {
  // 인라인 style에 keyframes 넣기 힘드니까 memo로 className 생성
  const animationClass = useMemo(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes floatIcon {
        0% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
        100% { transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return "float-icon-animation";
  }, []);
  return (
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
      {" "}
      {/* 아이콘 + 애니메이션 */}
      <img
        src={dizzySheld}
        alt="멀미 안정 아이콘"
        className={animationClass}
        style={{
          width: 120,
          height: 120,
          position: "absolute",
          top: "160px",
          animation: "floatIcon 3s ease-in-out infinite",
          opacity: 0.9,
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
        }}
      />
      <Container size="3" ml="8" style={{ maxWidth: 720, marginTop: 300 }}>
        <Heading size="9" style={{ lineHeight: 1.1, marginBottom: 12 }}>
          3D 멀미, 이제는 그만
        </Heading>
        <Text size="5" color="gray">
          시야 안정 레이아웃으로 방향감과 몰입감을 동시에 지킨다
        </Text>
      </Container>
    </section>
  );
};

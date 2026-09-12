import React from "react";

interface GlassButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  asButton?: boolean;
  /** "md" = padding padrao, "sm" = botao menor para cards */
  size?: "sm" | "md";
}

function useButtonStyle(hovered: boolean, size: "sm" | "md") {
  const pad = size === "sm" ? "10px 18px" : "14px 28px";
  const fontSize = size === "sm" ? "0.75rem" : "0.9375rem";

  const base: React.CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: size === "sm" ? "7px" : "10px",
    padding: pad,
    borderRadius: "9999px",
    fontWeight: 700,
    fontSize,
    letterSpacing: "0.02em",
    color: "#F2F0EA",
    cursor: "pointer",
    textDecoration: "none",
    userSelect: "none" as const,
    whiteSpace: "nowrap" as const,
    border: "1px solid rgba(155, 196, 124, 0.5)",
    outline: "none",
    // Fundo verde sólido como o botão do banner
    background: hovered
      ? "rgba(78, 122, 54, 0.92)"
      : "rgba(78, 122, 54, 0.82)",
    // Glass real por trás
    backdropFilter: "blur(16px) saturate(1.6) brightness(1.05)",
    WebkitBackdropFilter: "blur(16px) saturate(1.6) brightness(1.05)",
    boxShadow: hovered
      ? `inset 0 1px 0 rgba(155,196,124,0.55),
         inset 0 -1px 0 rgba(40,70,25,0.35),
         0 8px 28px rgba(78,122,54,0.55),
         0 2px 6px rgba(0,0,0,0.3)`
      : `inset 0 1px 0 rgba(155,196,124,0.4),
         inset 0 -1px 0 rgba(40,70,25,0.25),
         0 4px 20px rgba(78,122,54,0.4),
         0 1px 3px rgba(0,0,0,0.25)`,
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
  };

  return base;
}

function GlassInner({ children, size }: { children: React.ReactNode; size: "sm" | "md" }) {
  return (
    <>
      {/* Linha de reflexo superior */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(155,196,124,0.8) 35%, rgba(242,240,234,0.6) 65%, transparent)",
          pointerEvents: "none",
        }}
      />
      {/* Brilho radial interno */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "9999px",
          background:
            "radial-gradient(ellipse at 50% -10%, rgba(155,196,124,0.22) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "inline-flex",
          alignItems: "center",
          gap: size === "sm" ? "7px" : "10px",
        }}
      >
        {children}
      </span>
    </>
  );
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  href,
  onClick,
  target,
  rel,
  children,
  className = "",
  id,
  type = "button",
  disabled,
  asButton = false,
  size = "md",
}) => {
  const [hovered, setHovered] = React.useState(false);
  const style = useButtonStyle(hovered, size);

  const events = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  };

  if (asButton || !href) {
    return (
      <button id={id} type={type} onClick={onClick} disabled={disabled}
        className={className} style={style} {...events}>
        <GlassInner size={size}>{children}</GlassInner>
      </button>
    );
  }

  return (
    <a id={id} href={href} target={target} rel={rel}
      onClick={onClick} className={className} style={style} {...events}>
      <GlassInner size={size}>{children}</GlassInner>
    </a>
  );
};

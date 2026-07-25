/**
 * AmbientBackground
 * Relaxing full-page ambient layer with:
 *  - Floating light particles (dots rising + fading)
 *  - Drifting smoke/glow orbs
 *
 * z-index: 10 → floats above section backgrounds, below modals/header.
 * pointer-events: none everywhere — never blocks clicks.
 */

function seeded(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ─── Particles ──────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 40;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const r = (n: number) => seeded(i * 17 + n);
  const hue = r(7) > 0.55 ? 'green' : r(7) > 0.3 ? 'gold' : 'cream';
  const color =
    hue === 'green'
      ? `rgba(124,178,89,${(0.45 + r(8) * 0.45).toFixed(2)})`
      : hue === 'gold'
      ? `rgba(186,157,102,${(0.4 + r(9) * 0.4).toFixed(2)})`
      : `rgba(245,239,221,${(0.25 + r(10) * 0.3).toFixed(2)})`;

  return {
    id: i,
    x: r(1) * 100,            // % from left
    size: 2.5 + r(2) * 4,     // px  — bigger than before
    delay: r(3) * 20,         // s   — staggered starts
    duration: 12 + r(4) * 22, // s   — slow, hypnotic
    swayAmount: 30 + r(6) * 80,
    color,
  };
});

// ─── Smoke orbs ─────────────────────────────────────────────────────────────
const ORBS = [
  { id: 0, x: 8,  y: 15, size: 500, color: 'rgba(124,178,89,0.09)',   duration: 26, delay: 0,  dx:  70, dy: -50 },
  { id: 1, x: 85, y: 55, size: 450, color: 'rgba(186,157,102,0.08)',  duration: 32, delay: 7,  dx: -65, dy:  60 },
  { id: 2, x: 50, y: 80, size: 380, color: 'rgba(124,178,89,0.07)',   duration: 20, delay: 4,  dx:  90, dy: -70 },
  { id: 3, x: 20, y: 65, size: 320, color: 'rgba(245,239,221,0.055)', duration: 38, delay: 13, dx: -80, dy:  35 },
  { id: 4, x: 70, y: 10, size: 420, color: 'rgba(186,157,102,0.07)',  duration: 28, delay: 18, dx:  45, dy:  80 },
  { id: 5, x: 35, y: 40, size: 280, color: 'rgba(124,178,89,0.065)',  duration: 24, delay: 9,  dx: -55, dy: -65 },
];

export function AmbientBackground() {
  return (
    <>
      <style>{`
        @keyframes amb-rise {
          0%   { transform: translateY(0)     translateX(0)                   scale(1);    opacity: 0;   }
          6%   { opacity: 1; }
          48%  { transform: translateY(-42vh) translateX(var(--sway))         scale(0.8);  opacity: 0.95; }
          94%  { opacity: 0.25; }
          100% { transform: translateY(-105vh) translateX(calc(var(--sway) * 0.4)) scale(0.5); opacity: 0; }
        }
        @keyframes amb-orb {
          0%   { transform: translate(0,          0)          scale(1);    opacity: 0.8;  }
          33%  { transform: translate(var(--dx),  var(--dy))  scale(1.10); opacity: 1;    }
          66%  { transform: translate(calc(var(--dx)*-0.5), calc(var(--dy)*0.3)) scale(0.92); opacity: 0.75; }
          100% { transform: translate(0,          0)          scale(1);    opacity: 0.8;  }
        }
      `}</style>

      {/* Fixed wrapper — sits ABOVE section backgrounds, BELOW modals */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* ── Smoke / glow orbs ─────────────────────────────────── */}
        {ORBS.map((orb) => (
          <div
            key={orb.id}
            style={{
              position: 'absolute',
              left: `${orb.x}%`,
              top:  `${orb.y}%`,
              width:  `${orb.size}px`,
              height: `${orb.size}px`,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              filter: 'blur(50px)',
              mixBlendMode: 'screen',
              ['--dx' as string]: `${orb.dx}px`,
              ['--dy' as string]: `${orb.dy}px`,
              animation: `amb-orb ${orb.duration}s ease-in-out ${orb.delay}s infinite`,
            }}
          />
        ))}

        {/* ── Floating particles ────────────────────────────────── */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left:   `${p.x}%`,
              bottom: `-${p.size * 3}px`,
              width:  `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: p.color,
              boxShadow: `0 0 ${p.size * 5}px ${p.size * 2}px ${p.color}`,
              mixBlendMode: 'screen',
              ['--sway' as string]: `${p.swayAmount}px`,
              animation: `amb-rise ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}

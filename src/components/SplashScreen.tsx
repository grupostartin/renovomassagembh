import { useEffect, useState } from 'react';
import splashLogo from '../assets/splash_logo.png';

interface SplashScreenProps {
  onFinished: () => void;
}

export function SplashScreen({ onFinished }: SplashScreenProps) {
  const [phase, setPhase] = useState<'entering' | 'visible' | 'leaving'>('entering');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: fade in (600ms)
    const enterTimer = setTimeout(() => setPhase('visible'), 100);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 40);

    // Phase 2: start leaving after ~3s
    const leaveTimer = setTimeout(() => setPhase('leaving'), 3000);

    // Phase 3: unmount after fade-out (3s + 800ms)
    const doneTimer = setTimeout(() => onFinished(), 3800);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      clearInterval(progressInterval);
    };
  }, [onFinished]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg, #0d1a0f 0%, #1A2418 40%, #16221a 70%, #0f1c12 100%)',
        opacity: phase === 'leaving' ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background orbs */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,178,89,0.07) 0%, transparent 70%)',
        animation: 'pulse-orb 4s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '8%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(186,157,102,0.06) 0%, transparent 70%)',
        animation: 'pulse-orb 5s ease-in-out infinite 1.5s',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,178,89,0.04) 0%, transparent 65%)',
        animation: 'pulse-orb 6s ease-in-out infinite 0.5s',
        pointerEvents: 'none',
      }} />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: i % 3 === 0 ? '3px' : '2px',
            height: i % 3 === 0 ? '3px' : '2px',
            borderRadius: '50%',
            background: i % 2 === 0 ? 'rgba(124,178,89,0.4)' : 'rgba(186,157,102,0.35)',
            left: `${8 + (i * 7.5) % 85}%`,
            top: `${10 + (i * 13) % 80}%`,
            animation: `float-particle ${3 + (i % 4)}s ease-in-out infinite ${(i * 0.4)}s`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Main content card */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '28px',
        padding: '0 24px',
        maxWidth: '420px',
        width: '100%',
        animation: 'slide-up 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both',
      }}>

        {/* Logo / icon container */}
        <div style={{
          position: 'relative',
          width: '120px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Rotating ring */}
          <div style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            border: '1.5px solid transparent',
            borderTopColor: 'rgba(124,178,89,0.5)',
            borderRightColor: 'rgba(124,178,89,0.2)',
            animation: 'spin-slow 3s linear infinite',
          }} />
          <div style={{
            position: 'absolute',
            inset: '-16px',
            borderRadius: '50%',
            border: '1px solid transparent',
            borderBottomColor: 'rgba(186,157,102,0.3)',
            borderLeftColor: 'rgba(186,157,102,0.1)',
            animation: 'spin-slow 5s linear infinite reverse',
          }} />
          {/* Glow behind logo */}
          <div style={{
            position: 'absolute',
            inset: '10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,178,89,0.15) 0%, transparent 70%)',
            animation: 'pulse-orb 2.5s ease-in-out infinite',
          }} />
          <img
            src={splashLogo}
            alt="Renovo Massagem"
            style={{
              width: '90px',
              height: '90px',
              objectFit: 'contain',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 0 12px rgba(124,178,89,0.3))',
            }}
          />
        </div>

        {/* Brand name */}
        <div style={{ textAlign: 'center', lineHeight: 1 }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.2rem, 8vw, 3rem)',
            fontWeight: 500,
            letterSpacing: '0.12em',
            color: '#F5EFDD',
            margin: 0,
            textShadow: '0 0 40px rgba(245,239,221,0.15)',
          }}>
            RENOVO
          </h1>
          <div style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(124,178,89,0.6), rgba(186,157,102,0.6), transparent)',
            margin: '10px 0 10px',
          }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(0.85rem, 3vw, 1rem)',
            fontWeight: 400,
            letterSpacing: '0.35em',
            color: '#BA9D66',
            margin: 0,
            textTransform: 'uppercase',
          }}>
            Massagem &amp; Bem-Estar
          </p>
        </div>

        {/* Tagline */}
        <div style={{ textAlign: 'center', animation: 'fade-in 1s ease 0.6s both' }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
            fontWeight: 300,
            color: 'rgba(245,239,221,0.55)',
            letterSpacing: '0.04em',
            lineHeight: 1.7,
            margin: 0,
            maxWidth: '300px',
          }}>
            Permita-se descansar. Cada toque é um convite ao equilíbrio do corpo e da mente.
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          width: '180px',
          height: '2px',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.08)',
          overflow: 'hidden',
          animation: 'fade-in 0.5s ease 0.4s both',
        }}>
          <div style={{
            height: '100%',
            width: `${Math.min(progress, 100)}%`,
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #4A7C35, #7CB259, #BA9D66)',
            transition: 'width 0.04s linear',
            boxShadow: '0 0 8px rgba(124,178,89,0.5)',
          }} />
        </div>

        {/* Breathing dots */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          animation: 'fade-in 0.5s ease 0.8s both',
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'rgba(124,178,89,0.7)',
                animation: `breathe-dot 1.6s ease-in-out infinite ${i * 0.25}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom tagline */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        textAlign: 'center',
        animation: 'fade-in 1s ease 1s both',
      }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '0.8rem',
          fontStyle: 'italic',
          color: 'rgba(186,157,102,0.45)',
          letterSpacing: '0.06em',
          margin: 0,
        }}>
          "Renovar é cuidar de si."
        </p>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes pulse-orb {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-18px) scale(1.3); opacity: 0.8; }
        }
        @keyframes breathe-dot {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

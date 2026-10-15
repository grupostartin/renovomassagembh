import { useEffect } from 'react';

/* ─── Rolagem suave para links âncora (#secao) ─────────────────────────────
   Intercepta cliques em links internos e anima a rolagem com easing próprio,
   descontando a altura do header fixo. Interrompe se o usuário rolar.
──────────────────────────────────────────────────────────────────────────── */

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function useSmoothAnchorScroll() {
  useEffect(() => {
    let frame = 0;

    const cancel = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const scrollToY = (targetY: number) => {
      cancel();
      const startY = window.scrollY;
      const distance = targetY - startY;
      if (Math.abs(distance) < 2) return;

      // Duração proporcional à distância, sempre suave
      const duration = Math.min(1500, Math.max(700, Math.abs(distance) * 0.45));
      const startTime = performance.now();

      const step = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration);
        window.scrollTo({ top: startY + distance * easeInOutCubic(progress), behavior: 'instant' });
        frame = progress < 1 ? requestAnimationFrame(step) : 0;
      };
      frame = requestAnimationFrame(step);
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) {
        return;
      }
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute('href');
      if (!hash || hash.length < 2) return;

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      // Seções ocultas no breakpoint atual seguem o comportamento padrão
      if (!target || target.getClientRects().length === 0) return;

      event.preventDefault();
      const header = document.querySelector('header');
      const offset = header ? header.getBoundingClientRect().height : 0;
      const targetY =
        hash === '#home' ? 0 : target.getBoundingClientRect().top + window.scrollY - offset;

      scrollToY(Math.max(0, targetY));
      history.pushState(null, '', hash);
    };

    // O usuário assume o controle se rolar durante a animação
    const interrupt = () => frame && cancel();

    document.addEventListener('click', handleClick);
    window.addEventListener('wheel', interrupt, { passive: true });
    window.addEventListener('touchstart', interrupt, { passive: true });
    window.addEventListener('keydown', interrupt);

    return () => {
      cancel();
      document.removeEventListener('click', handleClick);
      window.removeEventListener('wheel', interrupt);
      window.removeEventListener('touchstart', interrupt);
      window.removeEventListener('keydown', interrupt);
    };
  }, []);
}

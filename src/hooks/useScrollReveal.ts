import { useEffect } from 'react';
import { TYPING_TOTAL_MS } from '../components/Hero';

/* ─── Scroll Reveal global ─────────────────────────────────────────────────
   Marca automaticamente os blocos das seções (cabeçalhos, cards de grid,
   listas e imagens) e anima cada um quando entra na viewport, usando a
   Web Animations API — assim não interfere nas transições/hover existentes.
   A Hero ganha uma entrada em cascata assim que a splash começa a sair.
   Com "reduzir movimento" ativo no sistema, tudo vira apenas fade suave.
──────────────────────────────────────────────────────────────────────────── */

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const STAGGER_MS = 90;
const MAX_STAGGER_MS = 540;

type Variant = 'title' | 'up' | 'left' | 'right' | 'zoom' | 'image';

const KEYFRAMES: Record<Variant, Keyframe[]> = {
  title: [
    { opacity: 0, transform: 'translateY(28px)', filter: 'blur(10px)', letterSpacing: '0.08em' },
    { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)', letterSpacing: 'normal' },
  ],
  up: [
    { opacity: 0, transform: 'translateY(36px)', filter: 'blur(6px)' },
    { opacity: 1, transform: 'translateY(0)', filter: 'blur(0px)' },
  ],
  left: [
    { opacity: 0, transform: 'translateX(-56px)', filter: 'blur(6px)' },
    { opacity: 1, transform: 'translateX(0)', filter: 'blur(0px)' },
  ],
  right: [
    { opacity: 0, transform: 'translateX(56px)', filter: 'blur(6px)' },
    { opacity: 1, transform: 'translateX(0)', filter: 'blur(0px)' },
  ],
  zoom: [
    { opacity: 0, transform: 'translateY(40px) scale(0.92)', filter: 'blur(4px)' },
    { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0px)' },
  ],
  image: [
    { opacity: 0, transform: 'scale(1.12)', clipPath: 'inset(12% 8% 12% 8% round 24px)' },
    { opacity: 1, transform: 'scale(1)', clipPath: 'inset(0% 0% 0% 0% round 0px)' },
  ],
};

const FADE_ONLY: Keyframe[] = [{ opacity: 0 }, { opacity: 1 }];

const frames = (variant: Variant) => (reducedMotion() ? FADE_ONLY : KEYFRAMES[variant]);

const DURATION: Record<Variant, number> = {
  title: 1100,
  up: 900,
  left: 1000,
  right: 1000,
  zoom: 950,
  image: 1400,
};

const ROOT_SELECTOR = 'main section:not(#home), footer';

const isExcluded = (el: Element) =>
  !!el.closest('.fixed, [role="dialog"], [aria-modal="true"]') ||
  el.getAttribute('aria-hidden') === 'true' ||
  el.classList.contains('absolute') ||
  el.classList.contains('pointer-events-none');

const hasTaggedAncestor = (el: Element) => !!el.parentElement?.closest('[data-sr]');

const reducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

function tag(el: HTMLElement, variant: Variant, index: number) {
  if (el.dataset.sr || isExcluded(el) || hasTaggedAncestor(el)) return;
  el.dataset.sr = 'pending';
  el.dataset.srVariant = variant;
  el.dataset.srDelay = String(Math.min(index * STAGGER_MS, MAX_STAGGER_MS));
}

function collect(root: ParentNode) {
  const sections = root.querySelectorAll<HTMLElement>(ROOT_SELECTOR);

  sections.forEach((section) => {
    // 1. Cabeçalhos de seção: selo, título e subtítulo em cascata
    section.querySelectorAll<HTMLElement>('h2').forEach((h2) => {
      const header = h2.parentElement;
      if (!header || header === section) return;
      Array.from(header.children).forEach((child, i) => {
        tag(child as HTMLElement, child === h2 ? 'title' : 'up', i);
      });
    });

    // 2. Grids: duas colunas deslizam das laterais, demais sobem em cascata
    section.querySelectorAll<HTMLElement>('[class*="grid-cols"]').forEach((grid) => {
      const items = Array.from(grid.children) as HTMLElement[];
      if (items.length === 2) {
        items.forEach((item, i) => tag(item, i === 0 ? 'left' : 'right', i));
      } else {
        items.forEach((item, i) => tag(item, items.length > 2 ? 'zoom' : 'up', i));
      }
    });

    // 3. Listas verticais (FAQ, contatos etc.)
    section.querySelectorAll<HTMLElement>('[class*="space-y-"]').forEach((list) => {
      Array.from(list.children).forEach((item, i) => tag(item as HTMLElement, 'up', i));
    });

    // 4. Imagens soltas
    section.querySelectorAll<HTMLElement>('img').forEach((img) => tag(img, 'image', 0));
  });
}

function play(el: HTMLElement) {
  const variant = (el.dataset.srVariant as Variant) || 'up';
  const delay = Number(el.dataset.srDelay || 0);
  el.dataset.sr = 'done';
  el.animate(frames(variant), {
    duration: DURATION[variant],
    delay,
    easing: EASE,
    fill: 'backwards',
  });
}

export function useScrollReveal(siteEntering: boolean) {
  // Reveal das seções ao rolar
  useEffect(() => {
    if (!('IntersectionObserver' in window) || !('animate' in Element.prototype)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Elementos que entram juntos reiniciam a cascata a partir do mais alto
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => e.target as HTMLElement)
          .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

        visible.forEach((el) => {
          observer.unobserve(el);
          play(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    const scan = () => {
      collect(document);
      document
        .querySelectorAll<HTMLElement>('[data-sr="pending"]:not([data-sr-observed])')
        .forEach((el) => {
          el.dataset.srObserved = '';
          observer.observe(el);
        });
    };

    scan();

    // Conteúdo que chega depois (avaliações, filtros, abas mobile)
    let raf = 0;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    const main = document.querySelector('main')?.parentElement;
    if (main) mutations.observe(main, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      mutations.disconnect();
      observer.disconnect();
      document.querySelectorAll<HTMLElement>('[data-sr]').forEach((el) => {
        delete el.dataset.sr;
        delete el.dataset.srObserved;
      });
    };
  }, []);

  // Entrada em cascata da Hero quando a splash sai
  useEffect(() => {
    if (!siteEntering || !('animate' in Element.prototype)) return;

    const content = document.querySelector<HTMLElement>('#home .max-w-xl');
    if (!content) return;

    // O título (H1) é digitado pela própria Hero; o selo entra antes dele
    // e o restante surge em cascata quando a digitação termina.
    const blocks = (Array.from(content.children) as HTMLElement[]).filter(
      (block) => block.tagName !== 'H1' && !block.className.includes('grid-cols'),
    );
    const afterTyping = TYPING_TOTAL_MS + 150;
    blocks.forEach((block, i) => {
      block.animate(frames('up'), {
        duration: 1000,
        delay: i === 0 ? 150 : afterTyping + (i - 1) * 160,
        easing: EASE,
        fill: 'backwards',
      });
    });

    // Diferenciais da Hero entram um a um no fim da cascata
    const differentials = content.querySelectorAll<HTMLElement>('[class*="grid-cols"] > *');
    differentials.forEach((item, i) => {
      item.animate(frames('zoom'), {
        duration: 900,
        delay: afterTyping + (blocks.length - 1) * 160 + i * 110,
        easing: EASE,
        fill: 'backwards',
      });
    });

    const heroImage = document.querySelector<HTMLElement>('#home > div:first-child img');
    if (!reducedMotion()) heroImage?.animate(
      [{ transform: 'scale(1.08)' }, { transform: 'scale(1)' }],
      { duration: 2400, easing: EASE, fill: 'backwards' },
    );
  }, [siteEntering]);
}

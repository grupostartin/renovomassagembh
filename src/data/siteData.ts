import { Service, TrustBadge } from '../types';

import heroRenovoAdjustedImg from '../assets/images/hero_renovo_adjusted.webp';
import aboutRenovoSpaceImg from '../assets/images/about_renovo_space.webp';
import serviceRelaxingImg from '../assets/images/service_relaxing_1784953138023.jpg';
import serviceTherapeuticImg from '../assets/images/service_therapeutic_1784953146980.jpg';
import serviceBambuterapiaImg from '../assets/images/service_bambuterapia.png';
import serviceCranioFacialImg from '../assets/images/service_cranio_facial.png';
import serviceVentosaterapiaImg from '../assets/images/service_ventosaterapia.png';

export const WHATSAPP_NUMBER = '5531994046817'; // (31) 99404-6817
export const PHONE_DISPLAY = '(31) 99404-6817';
export const INSTAGRAM_HANDLE = '@renovomassagembh';
export const INSTAGRAM_URL = 'https://instagram.com/renovomassagembh';
export const LOCATION_TEXT = 'Palmares, Belo Horizonte - MG';
export const ADDRESS_FULL = 'R. José Cleto, 200 - Palmares, Belo Horizonte - MG, 31160-470';
export const ADDRESS_DETAIL = 'R. José Cleto, 200 - Palmares, BH - MG | Atendimento com hora marcada';
export const GOOGLE_MAPS_URL = 'https://share.google/jmwzEries0xE3eP6o';
export const GOOGLE_REVIEWS_URL = GOOGLE_MAPS_URL;
export const BUSINESS_HOURS = [
  { day: 'Segunda-feira', hours: '09:00 – 18:00', open: true },
  { day: 'Terça-feira',   hours: '09:00 – 18:00', open: true },
  { day: 'Quarta-feira',  hours: '09:00 – 18:00', open: true },
  { day: 'Quinta-feira',  hours: '09:00 – 18:00', open: true },
  { day: 'Sexta-feira',   hours: '09:00 – 18:00', open: true },
  { day: 'Sábado',        hours: '09:00 – 16:00', open: true },
  { day: 'Domingo',       hours: 'Fechado',        open: false },
];

export const HERO_IMAGES = {
  main: heroRenovoAdjustedImg,
  spaRoom: aboutRenovoSpaceImg,
};

export const SERVICES: Service[] = [
  {
    id: 'bambuterapia',
    title: 'Bambuterapia',
    shortDescription: 'Hastes de bambu deslizam e rolam pelo corpo em uma massagem ritmada, firme e envolvente.',
    fullDescription: 'A bambuterapia combina manobras manuais com hastes de bambu de diferentes tamanhos. Os movimentos de deslizamento, rolamento e pressão são ajustados à sensibilidade de cada pessoa, criando uma experiência corporal dinâmica e profundamente relaxante.',
    category: 'Corporal',
    benefits: [
      'Sensação de relaxamento e bem-estar corporal',
      'Pressão ampla e uniforme sobre a musculatura',
      'Atenção especial às áreas mais sobrecarregadas',
      'Experiência sensorial diferente da massagem manual'
    ],
    indications: ['Cansaço muscular', 'Tensão do dia a dia', 'Preferência por pressão moderada ou firme', 'Momento de autocuidado'],
    image: serviceBambuterapiaImg,
    recommendedFor: 'Quem gosta de uma massagem corporal ritmada, com pressão adaptada'
  },
  {
    id: 'cranio-facial-pes-relax',
    title: 'Crânio Facial + Pés Relax',
    shortDescription: 'Um cuidado combinado para cabeça, face, pés e tornozelos, com toques suaves e profundamente relaxantes.',
    fullDescription: 'A sessão combina a massagem crânio facial, com manobras leves no couro cabeludo, testa, têmporas, face e pescoço, ao Pés Relax, focado em pés e tornozelos. É uma experiência integrada para desacelerar e cuidar de duas regiões muito exigidas pela rotina.',
    category: 'Cabeça, face e pés',
    benefits: [
      'Relaxamento concentrado na cabeça e na face',
      'Sensação de conforto na testa, têmporas e couro cabeludo',
      'Sensação de descanso para pés e tornozelos',
      'Toque suave e acolhedor em uma experiência combinada'
    ],
    indications: ['Cansaço mental', 'Tensão cotidiana na face', 'Pés cansados', 'Preferência por massagem suave'],
    image: serviceCranioFacialImg,
    recommendedFor: 'Quem busca relaxar a cabeça e, na mesma sessão, descansar os pés'
  },
  {
    id: 'relaxante',
    title: 'Massagem Relaxante',
    shortDescription: 'Movimentos suaves e ritmados para aliviar a sensação de tensão e criar uma pausa de tranquilidade.',
    fullDescription: 'A massagem relaxante utiliza movimentos contínuos, suaves e envolventes, com pressão ajustada ao seu conforto. É um momento de pausa para desacelerar, perceber o corpo e sair da sessão com uma agradável sensação de leveza e bem-estar.',
    category: 'Relaxamento',
    benefits: [
      'Sensação de relaxamento físico e mental',
      'Redução da percepção de tensão muscular',
      'Pausa acolhedora para uma rotina intensa',
      'Movimentos e pressão adaptados à sua preferência'
    ],
    indications: ['Estresse do dia a dia', 'Tensão muscular leve', 'Cansaço acumulado', 'Dificuldade para desacelerar'],
    image: serviceRelaxingImg,
    recommendedFor: 'Quem busca desacelerar a rotina e repor energias'
  },
  {
    id: 'ventosaterapia',
    title: 'Ventosaterapia',
    shortDescription: 'Ventosas secas criam uma sucção controlada sobre a pele como complemento ao cuidado corporal.',
    fullDescription: 'Na ventosaterapia seca, ventosas são posicionadas sobre a pele e produzem sucção por um período controlado. A intensidade e o tempo são ajustados após uma conversa inicial. A técnica pode deixar marcas circulares temporárias e é oferecida como prática complementar de bem-estar.',
    category: 'Técnica complementar',
    benefits: [
      'Estímulo sensorial concentrado em áreas específicas',
      'Sensação de relaxamento localizado',
      'Pode complementar outras manobras de massagem',
      'Aplicação ajustada ao conforto de cada pessoa'
    ],
    indications: ['Tensão muscular localizada', 'Quem já conhece a técnica', 'Cuidado corporal complementar', 'Atendimento após triagem'],
    image: serviceVentosaterapiaImg,
    recommendedFor: 'Quem deseja incluir ventosas secas em um atendimento personalizado'
  },
  {
    id: 'desportiva',
    title: 'Massagem Desportiva',
    shortDescription: 'Manobras direcionadas às regiões mais exigidas no treino, adaptadas ao momento e ao objetivo do praticante.',
    fullDescription: 'A massagem desportiva trabalha os tecidos moles com pressão e ritmo definidos conforme a modalidade, a fase do treino e a sensibilidade do praticante. O foco pode estar na preparação, no conforto depois do esforço ou na atenção a grupos musculares mais solicitados.',
    category: 'Recuperação esportiva',
    benefits: [
      'Sensação de recuperação após o esforço físico',
      'Atenção aos grupos musculares mais utilizados',
      'Conforto e relaxamento entre treinos',
      'Pressão adaptada à rotina e ao objetivo esportivo'
    ],
    indications: ['Praticantes de atividade física', 'Pós-treino', 'Rotina frequente de exercícios', 'Sobrecarga muscular do esporte'],
    image: serviceTherapeuticImg,
    recommendedFor: 'Pessoas ativas que desejam cuidado muscular alinhado à rotina de treinos'
  }
];

export const TRUST_BADGES: TrustBadge[] = [
  {
    id: 'climatizado',
    title: 'Ambiente Climatizado',
    subtitle: 'Temperatura agradável, luz de velas e música ambiente suave para o seu conforto.',
    icon: 'Sparkles'
  },
  {
    id: 'produtos',
    title: 'Produtos Premium',
    subtitle: 'Óleos vegetais 100% puros e óleos essenciais terapêuticos de alta qualidade.',
    icon: 'Droplets'
  },
  {
    id: 'higiene',
    title: 'Higiene e Segurança',
    subtitle: 'Rigoroso protocolo de higienização, lençóis descartáveis e toalhas esterilizadas.',
    icon: 'ShieldCheck'
  }
];

export function getWhatsAppLink(customMessage?: string): string {
  const defaultText = 'Olá! Gostaria de agendar uma massagem na Renovo Massagem.';
  const message = customMessage ? customMessage : defaultText;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

import { Service, TrustBadge } from '../types';

import heroRenovoAdjustedImg from '../assets/images/hero_renovo_adjusted.webp';
import aboutRenovoSpaceImg from '../assets/images/about_renovo_space.webp';
import heroMassageImg from '../assets/images/hero_massage_1784953104266.jpg';
import serviceRelaxingImg from '../assets/images/service_relaxing_1784953138023.jpg';
import serviceTherapeuticImg from '../assets/images/service_therapeutic_1784953146980.jpg';
import serviceCranioFacialImg from '../assets/images/service_cranio_facial.png';
import serviceVentosaterapiaImg from '../assets/images/service_ventosaterapia.png';
import serviceHotStonesImg from '../assets/images/service_hot_stones_1784953159084.jpg';
import serviceQuickMassageImg from '../assets/images/service_quick_massage.png';

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
    id: 'desportiva',
    title: 'Massagem Desportiva',
    shortDescription: 'Atendimento direcionado às regiões mais exigidas no treino, com pressão e ritmo ajustados ao praticante.',
    fullDescription: 'A massagem desportiva trabalha os tecidos moles com manobras definidas conforme a modalidade, o momento do treino e a sensibilidade de cada pessoa. O atendimento pode ser mais breve e localizado ou abranger diferentes grupos musculares.',
    category: 'Recuperação esportiva',
    sessionOptions: [
      { durationMinutes: 30 },
      { durationMinutes: 60 },
    ],
    benefits: [
      'Atenção aos grupos musculares mais solicitados',
      'Pressão adaptada ao momento e à rotina de treinos',
      'Sensação de relaxamento depois do esforço físico',
      'Opções de atendimento localizado ou mais abrangente',
    ],
    indications: ['Praticantes de atividade física', 'Pós-treino', 'Rotina frequente de exercícios', 'Sobrecarga muscular do esporte'],
    image: serviceTherapeuticImg,
    recommendedFor: 'Pessoas ativas que desejam um cuidado muscular alinhado à rotina de treinos',
  },
  {
    id: 'alivio-pes-cabeca',
    title: 'Alívio Pés & Cabeça',
    shortDescription: 'Uma sessão focada nos pés e na cabeça, com toques suaves para desacelerar e relaxar.',
    fullDescription: 'O Alívio Pés & Cabeça reúne manobras suaves e cuidadosas nessas duas regiões. A sessão foi pensada como uma pausa acolhedora para quem deseja descansar os pés e aliviar a sensação de tensão acumulada na cabeça.',
    category: 'Cabeça e pés',
    sessionOptions: [{ durationMinutes: 60 }],
    benefits: [
      'Relaxamento concentrado em duas regiões muito exigidas',
      'Sensação de descanso para os pés',
      'Toques suaves na região da cabeça',
      'Experiência combinada em uma única sessão',
    ],
    indications: ['Pés cansados', 'Rotina intensa', 'Dificuldade para desacelerar', 'Preferência por toque suave'],
    image: serviceCranioFacialImg,
    recommendedFor: 'Quem busca relaxar a cabeça e, na mesma sessão, descansar os pés',
  },
  {
    id: 'pedras-quentes',
    title: 'Pedras Quentes',
    shortDescription: 'Pedras aquecidas e manobras relaxantes se combinam em uma experiência corporal acolhedora.',
    fullDescription: 'A sessão combina massagem relaxante com a aplicação de pedras aquecidas em temperatura confortável. A opção de 90 minutos amplia o ritual com escalda-pés, conforme a duração escolhida.',
    category: 'Relaxamento térmico',
    sessionOptions: [
      { durationMinutes: 60 },
      { durationMinutes: 90, note: 'Inclui escalda-pés' },
    ],
    benefits: [
      'Calor confortável durante a massagem',
      'Sensação de relaxamento corporal',
      'Ritual acolhedor para desacelerar',
      'Opção estendida com escalda-pés',
    ],
    indications: ['Cansaço do dia a dia', 'Preferência por calor', 'Momento de autocuidado', 'Relaxamento prolongado'],
    image: serviceHotStonesImg,
    recommendedFor: 'Quem gosta de uma experiência relaxante com o conforto das pedras aquecidas',
  },
  {
    id: 'terapeutica-foco-na-dor',
    title: 'Terapêutica — Foco na Dor',
    shortDescription: 'Atendimento direcionado ao ponto de queixa, com técnicas e pressão ajustadas após uma conversa inicial.',
    fullDescription: 'A massagem terapêutica concentra o atendimento nas regiões de desconforto relatadas na conversa inicial. As manobras, a intensidade e o ritmo são adaptados à sensibilidade de cada pessoa, sempre dentro de uma proposta de cuidado corporal e bem-estar.',
    category: 'Cuidado localizado',
    sessionOptions: [{ durationMinutes: 60 }],
    benefits: [
      'Atenção concentrada nas regiões de maior incômodo',
      'Pressão ajustada à sensibilidade individual',
      'Atendimento definido a partir da queixa relatada',
      'Sensação de relaxamento localizado',
    ],
    indications: ['Tensão localizada', 'Pontos de maior desconforto', 'Rotina com sobrecarga corporal', 'Atendimento após triagem'],
    image: serviceQuickMassageImg,
    recommendedFor: 'Quem deseja um atendimento direcionado a uma região específica do corpo',
  },
  {
    id: 'drenagem-linfatica-convencional',
    title: 'Drenagem Linfática Convencional',
    shortDescription: 'Movimentos leves, lentos e ritmados compõem uma sessão corporal de toque suave e cuidadoso.',
    fullDescription: 'A drenagem linfática convencional é realizada com movimentos manuais leves, lentos e ritmados. Antes da sessão, o atendimento considera as necessidades, o conforto e as condições informadas por cada pessoa.',
    category: 'Toque suave',
    sessionOptions: [{ durationMinutes: 60 }],
    benefits: [
      'Manobras suaves e cadenciadas',
      'Experiência corporal delicada',
      'Atendimento realizado com ritmo tranquilo',
      'Momento de cuidado e pausa na rotina',
    ],
    indications: ['Preferência por toque leve', 'Sensação de corpo cansado', 'Rotina de autocuidado', 'Atendimento após conversa inicial'],
    image: heroMassageImg,
    recommendedFor: 'Quem procura uma técnica manual suave, com movimentos lentos e ritmados',
  },
  {
    id: 'relaxante-com-ventosas',
    title: 'Relaxante + Ventosas',
    shortDescription: 'Massagem corporal relaxante combinada à aplicação controlada de ventosas.',
    fullDescription: 'A sessão reúne manobras de massagem relaxante e a aplicação de ventosas secas em pontos definidos após uma conversa inicial. A intensidade e o tempo são ajustados ao conforto de cada pessoa; as ventosas podem deixar marcas circulares temporárias.',
    category: 'Técnica combinada',
    sessionOptions: [{ durationMinutes: 60 }],
    benefits: [
      'Combinação de massagem manual e ventosas',
      'Sensação de relaxamento corporal',
      'Atenção a regiões selecionadas no atendimento',
      'Aplicação ajustada ao conforto individual',
    ],
    indications: ['Tensão do dia a dia', 'Quem já conhece ventosas', 'Cuidado corporal combinado', 'Atendimento após triagem'],
    image: serviceVentosaterapiaImg,
    recommendedFor: 'Quem deseja combinar uma massagem relaxante com a aplicação de ventosas secas',
  },
  {
    id: 'relaxante',
    title: 'Massagem Relaxante',
    shortDescription: 'Movimentos suaves e ritmados para aliviar a sensação de tensão e criar uma pausa de tranquilidade.',
    fullDescription: 'A massagem relaxante utiliza movimentos contínuos, suaves e envolventes, com pressão ajustada ao seu conforto. É um momento de pausa para desacelerar, perceber o corpo e sair da sessão com uma agradável sensação de leveza e bem-estar.',
    category: 'Relaxamento',
    sessionOptions: [
      { durationMinutes: 60 },
      { durationMinutes: 90 },
    ],
    benefits: [
      'Sensação de relaxamento físico e mental',
      'Redução da percepção de tensão muscular',
      'Pausa acolhedora para uma rotina intensa',
      'Movimentos e pressão adaptados à sua preferência',
    ],
    indications: ['Estresse do dia a dia', 'Tensão muscular leve', 'Cansaço acumulado', 'Dificuldade para desacelerar'],
    image: serviceRelaxingImg,
    recommendedFor: 'Quem busca desacelerar a rotina e repor energias',
  },
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

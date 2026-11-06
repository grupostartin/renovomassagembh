import { Service, TrustBadge } from '../types';

import heroRenovoAdjustedImg from '../assets/images/hero_renovo_adjusted.webp';
import heroSalaImg from '../assets/images/hero_renovo_sala.jpg';
import spaceRenovoSalaImg from '../assets/images/space_renovo_sala.jpg';
import serviceRelaxingImg from '../assets/images/service_relaxing_1784953138023.jpg';
import serviceTherapeuticImg from '../assets/images/service_therapeutic_1784953146980.jpg';
import serviceCranioFacialImg from '../assets/images/service_cranio_facial.png';
import serviceHotStonesImg from '../assets/images/service_hot_stones_1784953159084.jpg';

export const BRAND_TAGLINE = 'Cuidado, Alívio e Bem-estar.';
export const BRAND_CONCEPT = 'Seu corpo também precisa de uma pausa.';

export const WHATSAPP_NUMBER = '5531994046817'; // (31) 99404-6817
export const PHONE_DISPLAY = '(31) 99404-6817';
export const INSTAGRAM_HANDLE = '@renovomassagembh';
export const INSTAGRAM_URL = 'https://instagram.com/renovomassagembh';
export const LOCATION_DISTRICT = 'Palmares';
export const LOCATION_CITY = 'Belo Horizonte - MG';
export const LOCATION_TEXT = 'Palmares, Belo Horizonte - MG';
export const ADDRESS_FULL = 'Rua José Cleto, 200 - Palmares, Belo Horizonte - MG, 31160-470';
export const ADDRESS_DETAIL = 'Rua José Cleto, 200 - Palmares, BH - MG | Atendimento com hora marcada';
export const GOOGLE_MAPS_URL = 'https://share.google/jmwzEries0xE3eP6o';
export const GOOGLE_REVIEWS_URL = GOOGLE_MAPS_URL;

export const BUSINESS_HOURS = [
  { day: 'Segunda-feira', hours: '09:00 – 18:00', open: true },
  { day: 'Terça-feira', hours: '09:00 – 18:00', open: true },
  { day: 'Quarta-feira', hours: '09:00 – 18:00', open: true },
  { day: 'Quinta-feira', hours: '09:00 – 18:00', open: true },
  { day: 'Sexta-feira', hours: '09:00 – 18:00', open: true },
  { day: 'Sábado', hours: '09:00 – 16:00', open: true },
  { day: 'Domingos e Feriados', hours: 'Fechado', open: false },
];

export const HERO_IMAGES = {
  main: heroRenovoAdjustedImg,
  hero: heroSalaImg,
  spaRoom: spaceRenovoSalaImg,
};

// ─── 4. Escolha por Necessidade ───────────────────────────────────────────────
export interface NeedOption {
  id: string;
  title: string;
  subtitle: string;
  relatedServiceIds: string[];
  message: string;
}

export const NEED_OPTIONS: NeedOption[] = [
  {
    id: 'relaxar-descansar',
    title: 'Relaxar e descansar',
    subtitle: 'Quero uma pausa e aliviar as tensões do dia a dia.',
    relatedServiceIds: ['relaxante', 'pedras-quentes'],
    message: 'Olá! Vim pelo site da Renovo. Quero uma pausa para relaxar, descansar e aliviar as tensões do dia a dia.',
  },
  {
    id: 'aliviar-dores',
    title: 'Aliviar dores e tensões',
    subtitle: 'Estou sentindo desconforto ou tensão muscular.',
    relatedServiceIds: ['terapeutica', 'desportiva'],
    message: 'Olá! Vim pelo site da Renovo. Estou sentindo desconforto ou tensão muscular e gostaria de indicação e horários.',
  },
  {
    id: 'desintoxicar-desinchar',
    title: 'Desintoxicar e desinchar',
    subtitle: 'Quero eliminar o inchaço e sentir o corpo mais leve.',
    relatedServiceIds: ['drenagem-linfatica'],
    message: 'Olá! Vim pelo site da Renovo. Gostaria de agendar uma drenagem linfática para desinchar e desintoxicar o corpo.',
  },
  {
    id: 'pes-pernas',
    title: 'Descansar pés e pernas',
    subtitle: 'Quero aliviar o cansaço e a sensação de peso.',
    relatedServiceIds: ['alivio-pes-cabeca'],
    message: 'Olá! Vim pelo site da Renovo. Quero aliviar o cansaço e a sensação de peso nos pés e pernas.',
  },
];

// ─── 5. Catálogo de Massagens ────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id: 'alivio-pes-cabeca',
    title: 'Alívio Pés & Cabeça',
    shortDescription: 'Massagem focada nos pés e na região da cabeça, pescoço e face, promovendo relaxamento profundo em pontos estratégicos de tensão.',
    fullDescription: 'Massagem focada nos pés e na região da cabeça, pescoço e face, promovendo relaxamento profundo em pontos estratégicos de tensão.',
    category: 'Foco e descanso',
    sessionOptions: [
      { durationMinutes: 60 },
    ],
    benefits: [
      'Alívio da tensão',
      'Melhora da circulação',
      'Redução da dor de cabeça',
      'Sensação imediata de leveza e bem-estar',
    ],
    indications: [
      'Pés cansados',
      'Estresse',
      'Cansaço mental',
      'Dores de cabeça tensionais',
      'Distúrbios da ATM',
    ],
    image: serviceCranioFacialImg,
    recommendedFor: 'Pessoas com pés cansados, estresse acumulado, tensão na cabeça ou distúrbios da ATM',
  },
  {
    id: 'desportiva',
    title: 'Massagem Esportiva',
    shortDescription: 'Massagem com técnicas específicas para recuperação muscular, podendo incluir ventosas, liberação miofascial manual e/ou uso de instrumentos.',
    fullDescription: 'Massagem com técnicas específicas para recuperação muscular, podendo incluir ventosas, liberação miofascial manual e/ou uso de instrumentos.',
    category: 'Muscular',
    sessionOptions: [
      { durationMinutes: 60 },
    ],
    benefits: [
      'Reduz dor',
      'Melhora a mobilidade',
      'Acelera a recuperação',
    ],
    indications: [
      'Prática esportiva',
      'Dores pós-treino',
      'Contraturas',
    ],
    contraindications: [
      'Pessoas sensíveis à dor',
    ],
    image: serviceTherapeuticImg,
    recommendedFor: 'Praticantes de esportes, quem tem dores pós-treino ou necessita de recuperação muscular profunda',
  },
  {
    id: 'pedras-quentes',
    title: 'Pedras Quentes',
    shortDescription: 'Escalda pés + Massagem relaxante realizada com uso e aplicação de pedras aquecidas em pontos estratégicos do corpo.',
    fullDescription: 'Escalda pés + Massagem relaxante realizada com uso e aplicação de pedras aquecidas em pontos estratégicos do corpo.',
    category: 'Calor e relaxamento',
    sessionOptions: [
      { durationMinutes: 60 },
      { durationMinutes: 90, note: 'Inclui escalda-pés' },
    ],
    benefits: [
      'Relaxamento muscular profundo',
      'Melhora da circulação',
      'Sensação prolongada de bem-estar',
    ],
    indications: [
      'Tensão muscular intensa',
      'Estresse acumulado',
      'Cansaço profundo',
    ],
    image: serviceHotStonesImg,
    recommendedFor: 'Quem procura alívio profundo de tensões acumuladas com o conforto acolhedor das pedras aquecidas',
  },
  {
    id: 'terapeutica',
    title: 'Massagem Terapêutica – Foco na Dor',
    shortDescription: 'Atendimento direcionado para regiões com dor e tensão muscular, utilizando diferentes técnicas conforme a necessidade do seu corpo.',
    fullDescription: 'Atendimento direcionado para regiões com dor e tensão muscular, utilizando diferentes técnicas conforme a necessidade do seu corpo. Indicada para aliviar desconfortos, reduzir rigidez e melhorar a mobilidade, promovendo recuperação e bem-estar.',
    category: 'Foco na dor',
    sessionOptions: [
      { durationMinutes: 60 },
    ],
    benefits: [
      'Alívio de desconfortos e dores musculares',
      'Redução da rigidez corporal',
      'Melhora da mobilidade',
      'Promoção de recuperação e bem-estar',
    ],
    indications: [
      'Regiões com dor muscular',
      'Tensão muscular concentrada',
      'Rigidez e redução de mobilidade',
      'Desconfortos corporais',
    ],
    image: serviceTherapeuticImg,
    recommendedFor: 'Quem necessita de um atendimento direcionado para soltar regiões de dor, rigidez e tensão muscular',
  },
  {
    id: 'drenagem-linfatica',
    title: 'Drenagem Linfática',
    shortDescription: 'Técnica com movimentos leves e rítmicos que estimulam o sistema linfático.',
    fullDescription: 'Técnica com movimentos leves e rítmicos que estimulam o sistema linfático.',
    category: 'Drenagem',
    sessionOptions: [
      { durationMinutes: 60 },
    ],
    benefits: [
      'Reduz inchaço',
      'Melhora a circulação',
      'Auxilia na eliminação de toxinas',
      'Promove leveza corporal',
    ],
    indications: [
      'Retenção de líquido',
      'Inchaço',
      'Sensação de peso nas pernas',
      'Lipedema',
      'Grávidas a partir de 12 semanas (com liberação médica)',
    ],
    image: serviceRelaxingImg,
    recommendedFor: 'Quem sofre com retenção de líquido, pernas pesadas, inchaço ou gestantes com liberação médica',
  },
  {
    id: 'relaxante',
    title: 'Massagem Relaxante',
    shortDescription: 'Massagem realizada em todo o corpo, com movimentos suaves e contínuos que promovem relaxamento profundo e aliviam as tensões do dia a dia.',
    fullDescription: 'Massagem realizada em todo o corpo, com movimentos suaves e contínuos que promovem relaxamento profundo e aliviam as tensões do dia a dia. Ideal para reduzir o estresse, acalmar a mente e restaurar o equilíbrio.',
    category: 'Relaxamento',
    sessionOptions: [
      { durationMinutes: 60 },
      { durationMinutes: 90 },
    ],
    benefits: [
      'Relaxamento profundo do corpo',
      'Alívio das tensões do dia a dia',
      'Redução do estresse',
      'Acalma a mente e restaura o equilíbrio',
    ],
    indications: [
      'Estresse do dia a dia',
      'Tensão e cansaço',
      'Necessidade de descanso e desaceleração',
      'Busca por equilíbrio físico e mental',
    ],
    image: serviceRelaxingImg,
    recommendedFor: 'Ideal para quem busca reduzir o estresse, acalmar a mente e restaurar o equilíbrio do corpo',
  },
];

// ─── 6. Massagem em Dupla ─────────────────────────────────────────────────────
export const COUPLE_MASSAGE = {
  title: 'Uma pausa para compartilhar',
  description:
    'A massagem é realizada simultaneamente, no mesmo ambiente, para duas pessoas que desejam aproveitar juntas um momento de relaxamento e cuidado. Pode ser realizada por casais, amigos, mães e filhas ou qualquer dupla.',
  buttonText: 'AGENDAR MASSAGEM EM DUPLA',
  whatsappMessage: 'Olá! Gostaria de agendar uma massagem em dupla na Renovo Massagem.',
};

// ─── 8. Mensagem da Fundadora ─────────────────────────────────────────────────
export const FOUNDER_MESSAGE = {
  quote:
    'Para mim, cuidar é uma forma de servir. Sou cristã e acredito que servir ao próximo também está nas coisas simples: receber com respeito, cuidar com atenção e fazer o meu trabalho com dedicação. Foi com esses valores que nasceu a Renovo.',
  author: 'Mari Arruda',
  role: 'Fundadora da Renovo Massagem',
};

// ─── 9. Atendimento Exclusivamente Profissional ──────────────────────────────
export const PROFESSIONAL_CARE_NOTICE =
  'A Renovo oferece serviços voltados ao alívio de tensões, relaxamento e bem-estar. Todos os atendimentos são exclusivamente profissionais e realizados com respeito ao cliente.';

// ─── 10. Ambiente e Conforto ──────────────────────────────────────────────────
export const ENXOVAL_NOTICE =
  'Lençóis de tecido, maca aquecida e ambiente climatizado para o seu máximo conforto.';

// ─── 12. Localização ─────────────────────────────────────────────────────────
export const LOCATION_SECTION_DATA = {
  headline: 'Sua pausa está mais perto do que você imagina.',
  description:
    'O espaço da Renovo fica no coração do bairro Palmares, na Rua José Cleto, uma das principais vias da região, com fácil acesso pela Avenida Bernardo de Vasconcelos e próximo ao Minas Shopping.',
  addressLine1: 'Rua José Cleto, 200',
  addressLine2: 'Palmares - Belo Horizonte/MG',
  highlights: [
    'No coração do bairro Palmares',
    'Fácil acesso pela Av. Bernardo de Vasconcelos',
    'Próximo ao Minas Shopping',
    'Atendimento com horário marcado',
  ],
};

// ─── 13. Dúvidas Frequentes (FAQ) ────────────────────────────────────────────
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Nunca fiz massagem. Qual devo escolher?',
    answer: 'Conte para nós o que está sentindo e ajudamos você a escolher a opção mais adequada.',
  },
  {
    question: 'Preciso tirar a roupa?',
    answer: 'Depende da massagem escolhida. Antes do atendimento, explicamos como ela será realizada e você terá privacidade para se preparar.',
  },
  {
    question: 'Preciso agendar?',
    answer: 'Sim. Trabalhamos com horário marcado.',
  },
  {
    question: 'Como confirmo meu horário?',
    answer: 'Para confirmação da reserva, solicitamos um sinal de 30% do valor do atendimento.',
  },
  {
    question: 'Posso fazer massagem em dupla?',
    answer: 'Sim, somente aos sábados, mediante agendamento e disponibilidade.',
  },
  {
    question: 'Qual o valor do investimento?',
    answer: 'Massagens a partir de R$ 180.',
  },
];

// ─── Diferenciais da Home ────────────────────────────────────────────────────
export const TRUST_BADGES: TrustBadge[] = [
  {
    id: 'acolhedor',
    title: 'Ambiente acolhedor',
    subtitle: 'Um espaço simples, confortável e preparado para receber você.',
    icon: 'Sparkles',
  },
  {
    id: 'qualidade',
    title: 'Massagem de qualidade',
    subtitle: 'Técnica, atenção e cuidado em cada atendimento.',
    icon: 'Award',
  },
  {
    id: 'acesso',
    title: 'Fácil acesso',
    subtitle: 'No coração do bairro Palmares, em uma das principais vias da região.',
    icon: 'MapPin',
  },
];

export function getWhatsAppLink(customMessage?: string): string {
  const defaultText = 'Olá! Gostaria de agendar uma massagem na Renovo Massagem.';
  const message = customMessage ? customMessage : defaultText;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

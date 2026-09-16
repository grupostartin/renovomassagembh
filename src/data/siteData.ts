import { Service, TrustBadge } from '../types';

import heroRenovoAdjustedImg from '../assets/images/hero_renovo_adjusted.webp';
import aboutRenovoSpaceImg from '../assets/images/about_renovo_space.webp';
import serviceRelaxingImg from '../assets/images/service_relaxing_1784953138023.jpg';
import serviceTherapeuticImg from '../assets/images/service_therapeutic_1784953146980.jpg';
import serviceCranioFacialImg from '../assets/images/service_cranio_facial.png';
import serviceHotStonesImg from '../assets/images/service_hot_stones_1784953159084.jpg';
import serviceReflexologyImg from '../assets/images/service_reflexology_1784953168367.jpg';

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
    title: 'RELAXAR E DESCANSAR',
    subtitle: 'Quero uma pausa e aliviar as tensões do dia a dia.',
    relatedServiceIds: ['relaxante', 'pedras-quentes'],
    message: 'Olá! Vim pelo site da Renovo. Quero uma pausa para relaxar, descansar e aliviar as tensões do dia a dia.',
  },
  {
    id: 'aliviar-dores',
    title: 'ALIVIAR DORES E TENSÕES',
    subtitle: 'Estou sentindo desconforto ou tensão muscular.',
    relatedServiceIds: ['terapeutica', 'desportiva'],
    message: 'Olá! Vim pelo site da Renovo. Estou sentindo desconforto ou tensão muscular e gostaria de indicação e horários.',
  },
  {
    id: 'desintoxicar-desinchar',
    title: 'DESINTOXICAR E DESINCHAR',
    subtitle: 'Quero eliminar o inchaço e sentir o corpo mais leve.',
    relatedServiceIds: ['drenagem-linfatica'],
    message: 'Olá! Vim pelo site da Renovo. Gostaria de agendar uma drenagem linfática para desinchar e desintoxicar o corpo.',
  },
  {
    id: 'pes-pernas',
    title: 'DESCANSAR PÉS E PERNAS',
    subtitle: 'Quero aliviar o cansaço e a sensação de peso.',
    relatedServiceIds: ['alivio-pes-cabeca', 'pes-relax'],
    message: 'Olá! Vim pelo site da Renovo. Quero aliviar o cansaço e a sensação de peso nos pés e pernas.',
  },
];

// ─── 5. Catálogo de Massagens ────────────────────────────────────────────────
export const SERVICES: Service[] = [
  {
    id: 'relaxante',
    title: 'Massagem Relaxante',
    shortDescription: 'Para desacelerar, aliviar as tensões do dia a dia e proporcionar relaxamento ao corpo.',
    fullDescription: 'A massagem relaxante utiliza movimentos contínuos, suaves e envolventes, com pressão ajustada ao seu conforto. É uma pausa para desacelerar da rotina, aliviar o estresse acumulado e proporcionar bem-estar e relaxamento ao corpo.',
    category: 'Relaxamento',
    sessionOptions: [
      { durationMinutes: 60, price: 180 },
      { durationMinutes: 90, price: 230 },
    ],
    priceInfo: 'A partir de R$ 180',
    benefits: [
      'Desacelera a mente e relaxa o corpo',
      'Alivia o estresse e tensões do dia a dia',
      'Pressão e ritmo adaptados ao seu conforto',
      'Sensação prolongada de descanso e leveza',
    ],
    indications: ['Estresse do dia a dia', 'Tensão muscular leve', 'Cansaço acumulado', 'Dificuldade para desacelerar'],
    image: serviceRelaxingImg,
    recommendedFor: 'Quem busca uma pausa acolhedora para desacelerar a rotina e relaxar o corpo',
  },
  {
    id: 'drenagem-linfatica',
    title: 'Drenagem Linfática',
    shortDescription: 'A mais procurada para desinchar, desintoxicar o organismo e proporcionar leveza ao corpo.',
    fullDescription: 'A drenagem linfática é realizada com movimentos suaves e rítmicos que estimulam o sistema linfático, ajudando a eliminar o excesso de líquidos e toxinas do organismo. Ideal para reduzir o inchaço, aliviar a sensação de peso e promover leveza e bem-estar duradouros.',
    category: 'Drenagem',
    sessionOptions: [
      { durationMinutes: 60, price: 180 },
      { durationMinutes: 90, price: 230 },
    ],
    priceInfo: 'A partir de R$ 180',
    benefits: [
      'Reduz o inchaço e a retenção de líquidos',
      'Auxilia na desintoxicação do organismo',
      'Sensação de leveza e bem-estar duradoura',
      'Movimentos suaves e muito relaxantes',
    ],
    indications: ['Inchaço e retenção de líquidos', 'Cansaço nas pernas', 'Desintoxicação do organismo', 'Pós-operatório (com indicação médica)'],
    image: serviceRelaxingImg,
    recommendedFor: 'Quem quer desinchar, sentir o corpo mais leve e cuidar do bem-estar de forma gentil',
  },
  {
    id: 'terapeutica',
    title: 'Massagem Terapêutica',
    shortDescription: 'Direcionada às regiões de maior tensão e desconforto, de acordo com a necessidade de cada cliente.',
    fullDescription: 'A massagem terapêutica concentra o atendimento nas áreas de maior incômodo relatadas na conversa inicial. As manobras e a pressão são ajustadas conforme a necessidade e a sensibilidade de cada pessoa para soltar contraturas e aliviar tensões musculares.',
    category: 'Foco na tensão',
    sessionOptions: [
      { durationMinutes: 60, price: 180 },
    ],
    priceInfo: 'R$ 180',
    benefits: [
      'Atenção concentrada nas regiões de maior desconforto',
      'Pressão ajustada à sensibilidade individual',
      'Alívio de dores posturais e contraturas',
      'Atendimento personalizado após conversa inicial',
    ],
    indications: ['Dores na coluna e lombar', 'Tensão na cervical e ombros', 'Contraturas musculares', 'Sobrecarga postural'],
    image: serviceTherapeuticImg,
    recommendedFor: 'Quem sente dores pontuais ou tensão concentrada em regiões específicas do corpo',
  },
  {
    id: 'desportiva',
    title: 'Massagem Desportiva',
    shortDescription: 'Indicada para quem pratica atividade física ou apresenta tensão e sobrecarga muscular.',
    fullDescription: 'A massagem desportiva trabalha a musculatura profunda com manobras precisas, definidas conforme a prática física e a sensibilidade de cada cliente. Ajuda no alívio de sobrecargas e na recuperação muscular.',
    category: 'Muscular',
    sessionOptions: [
      { durationMinutes: 30, price: 120 },
      { durationMinutes: 60, price: 180 },
    ],
    priceInfo: 'A partir de R$ 120',
    benefits: [
      'Atenção aos grupos musculares mais exigidos',
      'Pressão firme adaptada à tolerância do cliente',
      'Alívio da sobrecarga pós-treino ou esforço físico',
      'Opções de sessão de 30 min ou 60 min',
    ],
    indications: ['Praticantes de atividade física', 'Sobrecarga muscular', 'Sensação de rigidez após treinos', 'Manutenção corporal'],
    image: serviceTherapeuticImg,
    recommendedFor: 'Pessoas ativas ou praticantes de exercícios que buscam cuidado e recuperação muscular',
  },
  {
    id: 'pedras-quentes',
    title: 'Pedras Quentes',
    shortDescription: 'Massagem associada ao calor das pedras para proporcionar relaxamento e auxiliar no alívio das tensões musculares.',
    fullDescription: 'A massagem associa manobras relaxantes ao contato confortável de pedras aquecidas. O calor suave penetra nas fibras musculares, potencializando o relaxamento do corpo e auxiliando no alívio das tensões acumuladas.',
    category: 'Calor e relaxamento',
    sessionOptions: [
      { durationMinutes: 60, price: 195 },
      { durationMinutes: 90, price: 240, note: 'Inclui escalda-pés' },
    ],
    priceInfo: 'A partir de R$ 195',
    benefits: [
      'Conforto térmico acolhedor durante toda a massagem',
      'Relaxamento profundo com o auxílio do calor das pedras',
      'Auxilia no alívio de tensões musculares persistentes',
      'Pausa revigorante e muito confortável',
    ],
    indications: ['Cansaço físico geral', 'Sensibilidade ao frio ou rigidez', 'Estresse acumulado', 'Necessidade de descanso profundo'],
    image: serviceHotStonesImg,
    recommendedFor: 'Quem aprecia o conforto do calor para aliviar tensões e descansar o corpo por completo',
  },
  {
    id: 'alivio-pes-cabeca',
    title: 'Alívio Pés & Cabeça',
    shortDescription: 'Uma pausa para aliviar o cansaço e proporcionar uma agradável sensação de descanso.',
    fullDescription: 'Sessão combinada que une toques cuidadosos na cabeça, pescoço e face com manobras focadas nos pés. Ideal para quem passa o dia em frente a telas ou em pé e quer uma pausa focada nas duas extremidades que mais acumulam estresse.',
    category: 'Foco e descanso',
    sessionOptions: [
      { durationMinutes: 60, price: 180 },
    ],
    priceInfo: 'R$ 180',
    benefits: [
      'Alívio da tensão acumulada na cabeça e pescoço',
      'Sensação imediata de descanso para pés cansados',
      'Excelente para quem trabalha em computador ou rotina acelerada',
      'Uma experiência completa de alívio sem sobrecarga',
    ],
    indications: ['Cansaço mental e visual', 'Pés pesados ou doloridos', 'Rotina intensa', 'Desejo de desaceleração pontual'],
    image: serviceCranioFacialImg,
    recommendedFor: 'Quem quer relaxar a cabeça e, na mesma sessão, descansar os pés do peso do dia',
  },
  {
    id: 'pes-relax',
    title: 'Pés Relax',
    shortDescription: 'Massagem nos pés acompanhada de escalda-pés, realizada confortavelmente na poltrona e sem necessidade de retirar a roupa.',
    fullDescription: 'O Pés Relax é realizado em uma confortável poltrona, sem necessidade de retirar a roupa. O atendimento inicia-se com escalda-pés morno e acolhedor, seguido de uma massagem cuidadosa nos pés para aliviar o peso e o cansaço do dia a dia.',
    category: 'Pés e escalda-pés',
    sessionOptions: [
      { durationMinutes: 45, price: 130 },
    ],
    priceInfo: 'R$ 130',
    benefits: [
      'Escalda-pés morno e relaxante no início da sessão',
      'Atendimento prático na poltrona, sem retirar a roupa',
      'Alívio rápido da sensação de pernas e pés pesados',
      'Pausa rápida e extremamente acolhedora',
    ],
    indications: ['Pés cansados e doloridos', 'Rotina que exige muito tempo em pé', 'Preferência por não deitar em maca ou tirar roupa'],
    image: serviceReflexologyImg,
    recommendedFor: 'Quem procura uma pausa prática, confortável e acolhedora com escalda-pés e massagem',
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
  'A Renovo oferece serviços de massoterapia voltados ao alívio de tensões, relaxamento e bem-estar. Todos os atendimentos são exclusivamente profissionais e realizados com respeito aos clientes e às profissionais.';

// ─── 10. Ambiente e Conforto ──────────────────────────────────────────────────
export const ENXOVAL_NOTICE =
  'Lençóis de tecido, maca aquecida e ambiente climatizado para o seu máximo conforto.';

// ─── 12. Localização ─────────────────────────────────────────────────────────
export const LOCATION_SECTION_DATA = {
  headline: 'Sua pausa está mais perto do que você imagina.',
  description:
    'A Renovo está localizada no coração do bairro Palmares, na Rua José Cleto, uma das principais vias da região, com fácil acesso pela Avenida Bernardo de Vasconcelos e próxima ao Minas Shopping.',
  addressLine1: 'Rua José Cleto, 200',
  addressLine2: 'Palmares - Belo Horizonte/MG',
  highlights: [
    'No coração do bairro Palmares',
    'Fácil acesso pela Av. Bernardo de Vasconcelos',
    'Próxima ao Minas Shopping',
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
    answer: 'Sim, mediante agendamento e disponibilidade.',
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

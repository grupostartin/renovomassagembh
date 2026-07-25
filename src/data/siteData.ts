import { Service, Testimonial, Benefit, TrustBadge } from '../types';

import heroMassageImg from '../assets/images/hero_massage_1784953104266.jpg';
import hotStonesZenImg from '../assets/images/hot_stones_zen_1784953117607.jpg';
import renovoSpaRoomImg from '../assets/images/renovo_spa_room_1784953126229.jpg';
import serviceRelaxingImg from '../assets/images/service_relaxing_1784953138023.jpg';
import serviceTherapeuticImg from '../assets/images/service_therapeutic_1784953146980.jpg';
import serviceHotStonesImg from '../assets/images/service_hot_stones_1784953159084.jpg';
import serviceReflexologyImg from '../assets/images/service_reflexology_1784953168367.jpg';

export const WHATSAPP_NUMBER = '5531994046817'; // (31) 99404-6817
export const PHONE_DISPLAY = '(31) 99404-6817';
export const INSTAGRAM_HANDLE = '@renovomassagembh';
export const INSTAGRAM_URL = 'https://instagram.com/renovomassagembh';
export const LOCATION_TEXT = 'Palmares, Belo Horizonte - MG';
export const ADDRESS_FULL = 'R. José Cleto, 200 - Palmares, Belo Horizonte - MG, 31160-470';
export const ADDRESS_DETAIL = 'R. José Cleto, 200 - Palmares, BH - MG | Atendimento com hora marcada';
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=R.+José+Cleto,+200,+Palmares,+Belo+Horizonte,+MG';
export const RATING = 5.0;
export const RATING_COUNT = 237;
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
  main: heroMassageImg,
  zenStones: hotStonesZenImg,
  spaRoom: renovoSpaRoomImg,
};

export const SERVICES: Service[] = [
  {
    id: 'relaxante',
    title: 'Massagem Relaxante',
    shortDescription: 'Alívio do estresse e tensão muscular. Promove relaxamento profundo e bem-estar.',
    fullDescription: 'Desenvolvida com movimentos suaves, ritmados e envolventes combinados com óleos essenciais puros. A Massagem Relaxante acalma o sistema nervoso, alivia o estresse do cotidiano e devolve a sensação de paz ao corpo e à mente.',
    duration: '60 min ou 80 min',
    benefits: [
      'Indução ao relaxamento físico e mental profundo',
      'Alívio imediato da ansiedade e estresse muscular',
      'Estimulação da produção de serotonina e endorfina',
      'Melhora da elasticidade e hidratação da pele'
    ],
    indications: ['Estresse crônico', 'Tensão emocional', 'Insônia e ansiedade', 'Fadiga acumulada'],
    image: serviceRelaxingImg,
    recommendedFor: 'Quem busca desacelerar a rotina e repor energias'
  },
  {
    id: 'terapeutica',
    title: 'Massagem Terapêutica',
    shortDescription: 'Técnicas específicas para dores musculares, tensões e problemas posturais.',
    fullDescription: 'Focada na descompressão muscular e no alívio de nós de tensão (pontos gatilho). Utiliza pressão moderada a firme direcionada para regiões de maior desconforto como cervical, ombros e lombar.',
    duration: '50 min ou 80 min',
    benefits: [
      'Desativação de pontos gatilho dolorosos',
      'Melhora significativa da postura e amplitude de movimento',
      'Aceleração da recuperação muscular pós-esforço',
      'Redução de enxaquecas tensionais'
    ],
    indications: ['Dores nas costas e pescoço', 'Tensão por trabalho no computador', 'Rigidez muscular', 'Postura incorreta'],
    image: serviceTherapeuticImg,
    recommendedFor: 'Pessoas com dores pontuais, contraturas e estresse postural'
  },
  {
    id: 'pedras-quentes',
    title: 'Massagem com Pedras Quentes',
    shortDescription: 'Combinação de calor e técnicas especiais para relaxamento profundo e renovação.',
    fullDescription: 'Uma experiência sensorial inesquecível que combina deslizamentos manuais e o calor reconfortante de pedras vulcânicas aquecidas. O calor penetra profundamente na musculatura, proporcionando alívio térmico imediato e reequilíbrio energético.',
    duration: '75 min',
    benefits: [
      'Vasodilatação profunda e desintoxicação tecidual',
      'Acalma a mente em níveis profundos de meditação',
      'Sensação prolongada de acolhimento e calor vital',
      'Alívio do cansaço muscular acumulado'
    ],
    indications: ['Tensão acumulada grave', 'Sensibilidade ao frio/rigidez', 'Ansiedade e estresse', 'Agotamento físico'],
    image: serviceHotStonesImg,
    recommendedFor: 'Uma pausa revigorante e ritual de puro autocuidado'
  },
  {
    id: 'reflexologia',
    title: 'Reflexologia Podal',
    shortDescription: 'Estimula pontos específicos dos pés que correspondem a órgãos e sistemas do corpo.',
    fullDescription: 'Técnica milenar baseada no estímulo de zonas reflexas nos pés relacionadas a diversos órgãos e estruturas corporais. Promove alívio imediato no peso das pernas e reequilíbrio de todo o organismo.',
    duration: '45 min',
    benefits: [
      'Sensação imediata de leveza nas pernas e pés',
      'Estimulação da drenagem e circulação periférica',
      'Equilíbrio e alívio do estresse acumulado no corpo',
      'Harmonização das funções orgânicas'
    ],
    indications: ['Pés cansados e inchados', 'Retenção de líquidos', 'Ansiedade e insônia', 'Rotina com longos períodos em pé'],
    image: serviceReflexologyImg,
    recommendedFor: 'Alívio rápido do cansaço diário e revitalização global'
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: 'estresse',
    title: 'Alívio do estresse e ansiedade',
    description: 'Reduz os níveis de cortisol no organismo, acalmando os batimentos cardíacos e a mente acelerada.'
  },
  {
    id: 'circulacao',
    title: 'Melhora da circulação sanguínea',
    description: 'Estimula o fluxo de oxigênio e nutrientes para as células, facilitando a eliminação de toxinas.'
  },
  {
    id: 'dores',
    title: 'Redução de dores musculares',
    description: 'Solta nós de tensão e alivia espasmos e contraturas decorrentes de má postura ou esforço.'
  },
  {
    id: 'sono',
    title: 'Melhora da qualidade do sono',
    description: 'Estimula ondas cerebrais de relaxamento, ajudando a combater a insônia e noites agitadas.'
  },
  {
    id: 'energia',
    title: 'Aumento da disposição e energia',
    description: 'Revitaliza o corpo exausto, renovando o vigor físico e mental para a sua rotina.'
  },
  {
    id: 'bem-estar',
    title: 'Promoção do bem-estar geral',
    description: 'Conecta corpo e mente em um momento exclusivo de pausa e cuidado individualizado.'
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

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ana Paula S.',
    location: 'Belo Horizonte, MG',
    rating: 5,
    text: 'Ambiente incrível e profissionais excepcionais! Saio sempre renovada e completamente relaxada. A massagem com pedras quentes é divina.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    serviceUsed: 'Massagem com Pedras Quentes'
  },
  {
    id: '2',
    name: 'Marcos T.',
    location: 'Belo Horizonte, MG',
    rating: 5,
    text: 'Melhor massagem terapêutica que já fiz em BH. Aliviou minhas dores crônicas nas costas e melhorou muito minha qualidade de sono e vida.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    serviceUsed: 'Massagem Terapêutica'
  },
  {
    id: '3',
    name: 'Juliana M.',
    location: 'Belo Horizonte, MG',
    rating: 5,
    text: 'Atendimento personalizado e técnicas incríveis. É meu refúgio de paz no meio da correria da semana. Recomendo de olhos fechados!',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    serviceUsed: 'Massagem Relaxante'
  },
  {
    id: '4',
    name: 'Camila R.',
    location: 'Belo Horizonte, MG',
    rating: 5,
    text: 'A reflexologia podal é maravilhosa! Cheguei cansada com pernas pesadas e saí parecendo que estava pisando em nuvens. Nota 1000!',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    serviceUsed: 'Reflexologia Podal'
  }
];

export function getWhatsAppLink(customMessage?: string): string {
  const defaultText = 'Olá! Gostaria de agendar uma massagem na Renovo Massagem.';
  const message = customMessage ? customMessage : defaultText;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

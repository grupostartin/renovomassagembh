import { Service, TrustBadge } from '../types';

import heroRenovoAdjustedImg from '../assets/images/hero_renovo_adjusted.webp';
import renovoSpaRoomImg from '../assets/images/renovo_spa_room_1784953126229.jpg';
import serviceRelaxingImg from '../assets/images/service_relaxing_1784953138023.jpg';
import serviceTherapeuticImg from '../assets/images/service_therapeutic_1784953146980.jpg';
import serviceReflexologyImg from '../assets/images/service_reflexology_1784953168367.jpg';
import serviceBambuterapiaImg from '../assets/images/service_bambuterapia.png';
import serviceCranioFacialImg from '../assets/images/service_cranio_facial.png';
import serviceEsfoliacaoImg from '../assets/images/service_esfoliacao_corporal.png';
import serviceVentosaterapiaImg from '../assets/images/service_ventosaterapia.png';
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
  spaRoom: renovoSpaRoomImg,
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
    id: 'cranio-facial',
    title: 'Crânio Facial',
    shortDescription: 'Toques suaves na cabeça, face e pescoço para desacelerar e aliviar a sensação de tensão cotidiana.',
    fullDescription: 'Uma massagem focalizada no couro cabeludo, testa, têmporas, face e parte superior do pescoço. As manobras são leves e cuidadosas, pensadas para proporcionar conforto, relaxar a expressão e oferecer uma pausa restauradora em meio à rotina.',
    category: 'Cabeça e face',
    benefits: [
      'Relaxamento concentrado na cabeça e na face',
      'Sensação de conforto na testa, têmporas e couro cabeludo',
      'Pausa relaxante para quem passa muito tempo diante de telas',
      'Toque suave, acolhedor e pouco invasivo'
    ],
    indications: ['Tensão cotidiana na face', 'Rotina intensa de telas', 'Cansaço mental', 'Preferência por massagem suave'],
    image: serviceCranioFacialImg,
    recommendedFor: 'Quem busca uma experiência delicada e focada na região da cabeça'
  },
  {
    id: 'esfoliacao-corporal',
    title: 'Esfoliação Corporal',
    shortDescription: 'Cuidado suave que remove células mortas da superfície e deixa a pele com toque mais liso e renovado.',
    fullDescription: 'O ritual utiliza um esfoliante corporal adequado, aplicado com movimentos suaves e circulares. Depois da remoção do produto, a pele recebe hidratação para preservar o conforto e a maciez. A intensidade é escolhida conforme a sensibilidade e o tipo de pele.',
    category: 'Cuidado da pele',
    benefits: [
      'Remoção suave de células mortas da superfície',
      'Textura mais lisa e toque uniforme',
      'Preparo da pele para a etapa de hidratação',
      'Ritual corporal revigorante e acolhedor'
    ],
    indications: ['Pele áspera ou opaca', 'Renovação do toque da pele', 'Preparação para hidratação', 'Ritual de autocuidado'],
    image: serviceEsfoliacaoImg,
    recommendedFor: 'Quem deseja renovar a textura da pele com um cuidado delicado'
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
  },
  {
    id: 'pes-relax',
    title: 'Pés Relax',
    shortDescription: 'Massagem concentrada nos pés e tornozelos para oferecer descanso, conforto e uma agradável sensação de leveza.',
    fullDescription: 'Pés Relax é um ritual de cuidado focado nos pés e tornozelos. Deslizamentos, pressões confortáveis e mobilizações suaves são combinados para descansar uma região muito exigida pela rotina, sempre com intensidade adaptada à sua sensibilidade.',
    category: 'Pés e tornozelos',
    benefits: [
      'Sensação de descanso para pés cansados',
      'Relaxamento concentrado nos pés e tornozelos',
      'Conforto após longos períodos em pé',
      'Pausa rápida e acolhedora na rotina'
    ],
    indications: ['Pés cansados', 'Rotina em pé', 'Uso prolongado de calçados', 'Preferência por atendimento focalizado'],
    image: serviceReflexologyImg,
    recommendedFor: 'Quem sente os pés sobrecarregados e quer uma pausa de cuidado'
  },
  {
    id: 'quick-massage',
    title: 'Quick Massage',
    shortDescription: 'Sessão expressa, realizada com roupa em cadeira ergonômica, com foco em costas, ombros, braços e pescoço.',
    fullDescription: 'A Quick Massage é uma opção prática para uma pausa breve de bem-estar. A pessoa permanece vestida e acomodada em uma cadeira ergonômica enquanto recebe manobras rápidas nas costas, ombros, braços e pescoço. É especialmente conveniente para rotinas corridas e ações em empresas ou eventos.',
    category: 'Sessão expressa',
    benefits: [
      'Atendimento rápido e sem necessidade de trocar de roupa',
      'Foco nas regiões mais exigidas pela postura sentada',
      'Pausa de relaxamento que cabe em uma rotina corrida',
      'Formato prático para empresas e eventos'
    ],
    indications: ['Rotina de escritório', 'Pouco tempo disponível', 'Tensão em ombros e pescoço', 'Ações corporativas e eventos'],
    image: serviceQuickMassageImg,
    recommendedFor: 'Quem precisa de uma pausa prática, rápida e confortável'
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

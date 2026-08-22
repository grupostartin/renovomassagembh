import { useEffect } from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ADDRESS_FULL, getWhatsAppLink } from '../data/siteData';

type LegalPageKind = 'privacy' | 'terms';

interface LegalPageProps {
  kind: LegalPageKind;
}

const GOOGLE_PRIVACY_URL = 'https://policies.google.com/privacy?hl=pt-BR';
const GOOGLE_TERMS_URL = 'https://policies.google.com/terms?hl=pt-BR';
const GOOGLE_MAPS_TERMS_URL = 'https://maps.google.com/help/terms_maps/';

export function LegalPage({ kind }: LegalPageProps) {
  const isPrivacy = kind === 'privacy';
  const title = isPrivacy ? 'Política de Privacidade' : 'Termos de Uso';

  useEffect(() => {
    document.title = `${title} | Renovo Massagem`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="min-h-screen bg-[#15140C] text-[#F2F0EA] font-sans antialiased">
      <header className="border-b border-[#4D5240]/30 bg-[#15140C]/95">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <BrandLogo href="/" />
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#F2F0EA]/75 hover:text-[#4E7A36] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <p className="text-xs uppercase tracking-[0.2em] text-[#4E7A36] mb-3">Renovo Massagem</p>
        <h1 className="font-serif text-4xl sm:text-5xl mb-3">{title}</h1>
        <p className="text-sm text-[#F2F0EA]/55 mb-12">Última atualização: 22 de agosto de 2026</p>

        {isPrivacy ? (
          <div className="space-y-9 text-[#F2F0EA]/78 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl text-[#F2F0EA] mb-3">1. Informações tratadas</h2>
              <p>
                Este site não exige cadastro. Dados enviados por você pelo WhatsApp são tratados pela própria
                plataforma conforme as escolhas realizadas por você. A Renovo Massagem utiliza essas informações
                somente para responder dúvidas e organizar atendimentos.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-[#F2F0EA] mb-3">2. Avaliações do Google Maps</h2>
              <p>
                A seção de avaliações consulta a Google Places API para exibir conteúdo público do perfil da Renovo
                Massagem, como nota, quantidade de avaliações, nome, foto pública, comentário e data relativa. O site
                não armazena permanentemente esse conteúdo. Cada avaliação oferece acesso à sua fonte no Google Maps.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-[#F2F0EA] mb-3">3. Serviços externos</h2>
              <p>
                O uso deste site pode envolver serviços de terceiros, incluindo Google Maps, Google Fonts, Instagram
                e WhatsApp. Esses serviços possuem políticas próprias. Consulte a{' '}
                <a href={GOOGLE_PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="text-[#4E7A36] underline">
                  Política de Privacidade do Google
                </a>{' '}
                para entender como o Google trata informações.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-[#F2F0EA] mb-3">4. Segurança e retenção</h2>
              <p>
                A chave usada para consultar a Google Places API permanece protegida no servidor e não é enviada ao
                navegador. O site solicita apenas os dados necessários para apresentar as avaliações.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-[#F2F0EA] mb-3">5. Contato</h2>
              <p>
                Para dúvidas sobre esta política ou sobre seus dados, entre em contato com a Renovo Massagem pelo
                WhatsApp. Endereço de atendimento: {ADDRESS_FULL}.
              </p>
            </section>
          </div>
        ) : (
          <div className="space-y-9 text-[#F2F0EA]/78 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl text-[#F2F0EA] mb-3">1. Finalidade do site</h2>
              <p>
                Este site apresenta os serviços, canais de contato e informações da Renovo Massagem. Os conteúdos
                possuem caráter informativo e não substituem avaliação ou orientação de profissionais de saúde.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-[#F2F0EA] mb-3">2. Agendamentos e atendimento</h2>
              <p>
                Solicitações enviadas pelo WhatsApp dependem de confirmação da Renovo Massagem. Horários, duração,
                valores e disponibilidade podem ser ajustados diretamente no atendimento.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-[#F2F0EA] mb-3">3. Conteúdo do Google Maps</h2>
              <p>
                Avaliações, notas, nomes e fotos atribuídos ao Google Maps pertencem aos respectivos autores e são
                exibidos a partir da Google Places API. O uso desse conteúdo também está sujeito aos{' '}
                <a href={GOOGLE_MAPS_TERMS_URL} target="_blank" rel="noopener noreferrer" className="text-[#4E7A36] underline">
                  Termos Adicionais do Google Maps
                </a>{' '}
                e aos{' '}
                <a href={GOOGLE_TERMS_URL} target="_blank" rel="noopener noreferrer" className="text-[#4E7A36] underline">
                  Termos de Serviço do Google
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-[#F2F0EA] mb-3">4. Links externos</h2>
              <p>
                Links para Google Maps, Instagram e WhatsApp levam a serviços independentes. A disponibilidade e o
                funcionamento desses serviços são responsabilidade de seus respectivos fornecedores.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-[#F2F0EA] mb-3">5. Atualizações</h2>
              <p>
                Estes termos podem ser atualizados para acompanhar alterações no site ou nos serviços utilizados. A
                versão vigente será sempre publicada nesta página.
              </p>
            </section>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-[#4D5240]/30">
          <a
            href={getWhatsAppLink('Olá! Tenho uma dúvida sobre o site da Renovo Massagem.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#4E7A36] text-[#F2F0EA] font-semibold hover:bg-[#4D5240] transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Falar com a Renovo
          </a>
        </div>
      </main>
    </div>
  );
}

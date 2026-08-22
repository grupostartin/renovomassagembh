import { useEffect, useRef, useState, type FC } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Quote, Star } from 'lucide-react';
import type { GoogleReview, GoogleReviewsResponse } from '../types';
import { GOOGLE_REVIEWS_URL } from '../data/siteData';
import { getGoogleReviews, GoogleReviewsApiError } from '../services/googleReviewsApi';

const GOOGLE_REVIEW_POLICY_URL =
  'https://support.google.com/contributionpolicy/answer/7400114?hl=pt-BR';

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-[#C4B49A]" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${index < Math.round(rating) ? 'fill-current' : 'opacity-30'}`}
        />
      ))}
    </div>
  );
}

function AuthorAvatar({ review }: { review: GoogleReview }) {
  if (review.authorPhotoUri) {
    return (
      <img
        src={review.authorPhotoUri}
        alt={`Foto de ${review.authorName}`}
        className="w-12 h-12 rounded-full object-cover border-2 border-[#4E7A36]/40"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="w-12 h-12 rounded-full border-2 border-[#4E7A36]/40 bg-[#4D5240]/30 flex items-center justify-center text-[#F2F0EA] font-semibold"
    >
      {review.authorName.charAt(0).toUpperCase()}
    </span>
  );
}

const ReviewCard: FC<{ review: GoogleReview }> = ({ review }) => {
  const author = (
    <>
      <AuthorAvatar review={review} />
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-[#F2F0EA] truncate">{review.authorName}</h3>
        <p className="text-xs text-[#4E7A36]">{review.relativePublishTimeDescription}</p>
      </div>
    </>
  );

  return (
    <article className="p-8 rounded-3xl bg-[#1a1910] border border-[#4D5240]/30 hover:border-[#4E7A36]/50 transition-all duration-300 flex flex-col justify-between shadow-xl relative">
      <Quote className="w-8 h-8 text-[#4D5240]/45 absolute top-6 right-6" aria-hidden="true" />

      <div>
        <div className="mb-4">
          <RatingStars rating={review.rating} />
        </div>
        <p className="text-sm sm:text-base text-[#F2F0EA]/88 font-light leading-relaxed italic mb-6">
          “{review.text}”
        </p>
      </div>

      <div className="pt-4 border-t border-[#4D5240]/30 space-y-4">
        {review.authorUri ? (
          <a
            href={review.authorUri}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4E7A36]"
            aria-label={`Abrir o perfil de ${review.authorName} no Google Maps`}
          >
            {author}
          </a>
        ) : (
          <div className="flex items-center gap-4">{author}</div>
        )}

        <a
          href={review.googleMapsUri}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C4B49A] hover:text-[#F2F0EA] transition-colors"
        >
          Ver avaliação no Google Maps
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
};

function LoadingCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" aria-label="Carregando avaliações">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="h-[310px] rounded-3xl bg-[#1a1910] border border-[#4D5240]/25 animate-pulse"
        />
      ))}
    </div>
  );
}

interface ReviewsUnavailableProps {
  googleMapsUri: string;
  configured: boolean;
}

function ReviewsUnavailable({ googleMapsUri, configured }: ReviewsUnavailableProps) {
  return (
    <div className="max-w-2xl mx-auto rounded-3xl bg-[#1a1910] border border-[#4D5240]/30 p-8 sm:p-10 text-center shadow-xl">
      <div className="flex justify-center mb-4 text-[#C4B49A]">
        <RatingStars rating={5} />
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl text-[#F2F0EA] mb-3">
        Avaliações reais da Renovo Massagem
      </h3>
      <p className="text-sm sm:text-base text-[#F2F0EA]/70 leading-relaxed mb-6">
        {configured
          ? 'O Google Maps está temporariamente indisponível. Você ainda pode consultar todas as avaliações diretamente no perfil oficial.'
          : 'A conexão automática será ativada assim que a chave da Places API for configurada. Enquanto isso, consulte o perfil oficial.'}
      </p>
      <a
        href={googleMapsUri}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#4E7A36] text-[#F2F0EA] font-semibold hover:bg-[#4D5240] transition-colors"
      >
        Ver avaliações no Google Maps
        <ExternalLink className="w-4 h-4" aria-hidden="true" />
      </a>
    </div>
  );
}

export const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reviewsData, setReviewsData] = useState<GoogleReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [configured, setConfigured] = useState(false);
  const [googleMapsUri, setGoogleMapsUri] = useState(GOOGLE_REVIEWS_URL);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;

    getGoogleReviews()
      .then((data) => {
        if (cancelled) return;
        setReviewsData(data);
        setGoogleMapsUri(data.googleMapsUri);
        setConfigured(true);
        setActiveIndex(0);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        if (error instanceof GoogleReviewsApiError) {
          setConfigured(error.configured);
          setGoogleMapsUri(error.googleMapsUri);
        } else {
          setConfigured(true);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [shouldLoad]);

  const reviews = reviewsData?.reviews ?? [];
  const activeReview = reviews[activeIndex] ?? reviews[0];
  const showReviews = reviews.length > 0;

  const nextTestimonial = () => {
    if (reviews.length > 0) setActiveIndex((previous) => (previous + 1) % reviews.length);
  };

  const prevTestimonial = () => {
    if (reviews.length > 0) {
      setActiveIndex((previous) => (previous - 1 + reviews.length) % reviews.length);
    }
  };

  return (
    <section ref={sectionRef} id="depoimentos" className="py-24 bg-[#15140C] text-[#F2F0EA] relative overflow-hidden">
      <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-[#4D5240]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4D5240]/30 border border-[#4E7A36]/30 mb-4">
            <Quote className="w-3.5 h-3.5 text-[#4E7A36]" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#F2F0EA]">
              Avaliações reais
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#F2F0EA] mb-4">
            O que nossos clientes dizem
          </h2>
          <div className="w-12 h-0.5 bg-[#4E7A36] mx-auto mb-4 rounded-full" />
          <p className="text-base sm:text-lg text-[#F2F0EA]/75 font-light">
            {reviewsData
              ? `${reviewsData.rating.toFixed(1).replace('.', ',')} de 5 · ${reviewsData.userRatingCount.toLocaleString('pt-BR')} avaliações no Google Maps`
              : 'Experiências publicadas no perfil oficial da Renovo Massagem'}
          </p>
        </div>

        {loading ? <LoadingCards /> : null}

        {!loading && !showReviews ? (
          <ReviewsUnavailable googleMapsUri={googleMapsUri} configured={configured} />
        ) : null}

        {!loading && showReviews ? (
          <>
            <div className="hidden lg:grid grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {activeReview ? (
              <div className="lg:hidden relative max-w-xl mx-auto">
                <ReviewCard review={activeReview} />

                {reviews.length > 1 ? (
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      {reviews.map((review, index) => (
                        <button
                          key={review.id}
                          onClick={() => setActiveIndex(index)}
                          className={`h-2.5 rounded-full transition-all ${
                            index === activeIndex ? 'w-8 bg-[#4E7A36]' : 'w-2.5 bg-[#4D5240]/50'
                          }`}
                          aria-label={`Ir para avaliação ${index + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={prevTestimonial}
                        className="p-2.5 rounded-full bg-[#1a1910] border border-[#4D5240]/40 text-[#F2F0EA] hover:bg-[#4D5240]/30"
                        aria-label="Avaliação anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextTestimonial}
                        className="p-2.5 rounded-full bg-[#1a1910] border border-[#4D5240]/40 text-[#F2F0EA] hover:bg-[#4D5240]/30"
                        aria-label="Próxima avaliação"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </>
        ) : null}

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-center text-xs text-[#F2F0EA]/55">
          <p>
            Avaliações selecionadas e ordenadas pelo Google Maps por relevância. O Google verifica e remove conteúdo
            falso quando ele é identificado.{' '}
            <a
              href={GOOGLE_REVIEW_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#F2F0EA]"
            >
              Política de avaliações
            </a>
          </p>
          <a
            href={googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            translate="no"
            aria-label="Abrir Renovo Massagem no Google Maps"
            className="text-[#F2F0EA]/80 hover:text-[#F2F0EA] whitespace-nowrap"
            style={{ fontFamily: 'Roboto, Arial, sans-serif', fontSize: '16px' }}
          >
            Google Maps
          </a>
        </div>
      </div>
    </section>
  );
};

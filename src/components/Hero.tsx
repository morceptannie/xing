import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import bannerOpeningImg from '../assets/images/hero_banner_opening_sale_1794557269137.jpg';
import bannerCeramicImg from '../assets/images/hero_banner_ceramic_clean_1794557283779.jpg';
import bannerShowroomImg from '../assets/images/hero_kitchenware_showroom_1794556948475.jpg';
import { ProductCategory } from '../data/products';

interface BannerSlide {
  id: string;
  kicker: string;
  title: string;
  description: string;
  ctaLabel: string;
  targetCategory: ProductCategory;
  secondaryHref: string;
  secondaryLabel: string;
  image: string;
  imageAlt: string;
}

const SLIDES: BannerSlide[] = [
  {
    id: 'slide-opening',
    kicker: '台中北區批發倉直營 · 餐飲開業一站購足',
    title: '商用鍋具與廚房設備，滿件即享批發優惠價',
    description:
      '嚴選 304 不鏽鋼高湯鍋、手工鍛打熟鐵炒鍋與工作台調理盆。支援單件零售與整箱階梯批發價，新店開幕整場配貨歡迎線上詢價。',
    ctaLabel: '立即選購商用鍋具',
    targetCategory: 'cookware',
    secondaryHref: '#wholesale',
    secondaryLabel: '申請開業報價',
    image: bannerOpeningImg,
    imageAlt: '新永成行商用 304 不鏽鋼高湯鍋與鍛打熟鐵炒鍋主視覺橫幅',
  },
  {
    id: 'slide-tableware',
    kicker: '高溫窯變強化瓷 · SGS 檢驗耐摔美耐皿',
    title: '餐廳質感碗盤器皿，常態現貨單顆即可補訂',
    description:
      '提供日式拉麵深碗、平盤、定食便當盒與外帶防漏紙碗。全館單筆消費滿 NT$ 3,000 即享台灣本島免運，亦可選擇台中門市快速自取。',
    ctaLabel: '瀏覽陶瓷與餐皿專區',
    targetCategory: 'tableware',
    secondaryHref: '#catalog',
    secondaryLabel: '查看全部型錄',
    image: bannerCeramicImg,
    imageAlt: '新永成行日式窯變陶瓷碗盤與餐廚用具展示橫幅',
  },
  {
    id: 'slide-showroom',
    kicker: '台中市北區青島路1段24-1號 · 週一至週六營業',
    title: '實體批發倉現場看樣，線上線下同步安心採購',
    description:
      '超過千款餐飲五金、調理器具與免洗耗材現場供應。線上結帳支援 ATM 轉帳、貨到付款與三聯式發票開立，滿足餐飲業者採購報帳需求。',
    ctaLabel: '逛逛全館現貨型錄',
    targetCategory: 'all',
    secondaryHref: '#store',
    secondaryLabel: '查看門市位置',
    image: bannerShowroomImg,
    imageAlt: '新永成行台中北區餐飲器皿批發倉庫賣場實景橫幅',
  },
];

interface HeroProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export default function Hero({ onSelectCategory }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const activeSlide = SLIDES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handleCtaClick = (category: ProductCategory) => {
    onSelectCategory(category);
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="top"
      aria-label="首頁主打活動輪播"
      className="relative bg-[#14181F] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full-Width Responsive Campaign Banner Stage */}
      <div className="relative min-h-[440px] sm:min-h-[480px] lg:min-h-[540px] w-full flex items-center">
        {/* Background Slide Images */}
        {SLIDES.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.imageAlt}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        ))}

        {/* Measured Contrast Scrim for WCAG AA Legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#11151B]/95 via-[#11151B]/70 to-[#11151B]/35 lg:bg-gradient-to-r lg:from-[#11151B]/92 lg:via-[#11151B]/65 lg:to-transparent"
        />

        {/* Foreground Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-12 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-[#5EEAD4] tracking-wide mb-3">
              {activeSlide.kicker}
            </p>

            <h1 className="text-[clamp(1.85rem,3.6vw,3.1rem)] font-bold leading-[1.2] tracking-tight text-white text-balance mb-4">
              {activeSlide.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl mb-7">
              {activeSlide.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => handleCtaClick(activeSlide.targetCategory)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#D94625] hover:bg-[#B8381B] transition-colors rounded-lg whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{activeSlide.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href={activeSlide.secondaryHref}
                className="inline-flex items-center justify-center px-5 py-3 min-h-[44px] text-sm font-semibold text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 transition-colors rounded-lg whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {activeSlide.secondaryLabel}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-300">
              <span>滿 NT$ 3,000 免運</span>
              <span aria-hidden="true">·</span>
              <span>台中門市可自取</span>
              <span aria-hidden="true">·</span>
              <span>測試優惠碼 OPEN100 折百</span>
            </div>
          </div>
        </div>

        {/* Left / Right Carousel Arrows (Desktop & Tablet) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="上一張主打橫幅"
          className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/40 hover:bg-[#0C8CA8] text-white border border-white/20 backdrop-blur-sm transition-colors absolute left-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="下一張主打橫幅"
          className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/40 hover:bg-[#0C8CA8] text-white border border-white/20 backdrop-blur-sm transition-colors absolute right-4 top-1/2 -translate-y-1/2 z-20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Bottom Pagination Dots */}
        <div
          role="tablist"
          aria-label="輪播指示點"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        >
          {SLIDES.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`切換至第 ${index + 1} 張橫幅`}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isActive
                    ? 'w-8 bg-[#D94625]'
                    : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

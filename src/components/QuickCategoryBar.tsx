import { ChevronRight } from 'lucide-react';
import stockpotImg from '../assets/images/prod_stainless_stockpot_1794556947635.jpg';
import ceramicImg from '../assets/images/prod_ceramic_tableware_1794556948145.jpg';
import gnPansImg from '../assets/images/prod_gn_prep_pans_1794556949333.jpg';
import takeoutImg from '../assets/images/prod_takeout_packaging_1794556950208.jpg';
import { ProductCategory } from '../data/products';

interface QuickCategoryItem {
  category: Exclude<ProductCategory, 'all'>;
  title: string;
  subtitle: string;
  image: string;
  blockClass: string;
  subTextClass: string;
}

const QUICK_CATEGORIES: QuickCategoryItem[] = [
  {
    category: 'cookware',
    title: '商用鍋具專區',
    subtitle: '304 高湯鍋 · 鍛打炒鍋',
    image: stockpotImg,
    blockClass: 'bg-[#0B7A96] hover:bg-[#09647B] text-white',
    subTextClass: 'text-cyan-100',
  },
  {
    category: 'tableware',
    title: '陶瓷與美耐皿',
    subtitle: '日式窯變瓷 · 耐摔餐盒',
    image: ceramicImg,
    blockClass: 'bg-[#9E1C63] hover:bg-[#831652] text-white',
    subTextClass: 'text-pink-100',
  },
  {
    category: 'prep',
    title: '不鏽鋼調理器具',
    subtitle: '歐規 GN 份數盆 · 瀝水盤',
    image: gnPansImg,
    blockClass: 'bg-[#D94625] hover:bg-[#BC3A1D] text-white',
    subTextClass: 'text-orange-100',
  },
  {
    category: 'consumables',
    title: '外帶免洗耗材',
    subtitle: '防漏牛皮紙碗 · 餐盒箱購',
    image: takeoutImg,
    blockClass: 'bg-[#B87314] hover:bg-[#9C600E] text-white',
    subTextClass: 'text-amber-100',
  },
];

interface QuickCategoryBarProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

export default function QuickCategoryBar({
  activeCategory,
  onSelectCategory,
}: QuickCategoryBarProps) {
  const handleJump = (category: Exclude<ProductCategory, 'all'>) => {
    onSelectCategory(category);
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="categories"
      aria-label="主題分類快捷入口"
      className="bg-[#D5E6EC] border-b border-[#BACFD7] py-8 sm:py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-[#0B2936]">
            主題分類快速選購
          </h2>
          <button
            type="button"
            onClick={() => {
              onSelectCategory('all');
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#0B2936] hover:text-[#D94625] transition-colors cursor-pointer"
          >
            <span>查看全部商品</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {QUICK_CATEGORIES.map((item) => {
            const isSelected = activeCategory === item.category;
            return (
              <button
                key={item.category}
                type="button"
                onClick={() => handleJump(item.category)}
                className={`group flex flex-col sm:flex-row items-center gap-3.5 p-3 sm:p-4 rounded-xl text-center sm:text-left transition-all cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2936] focus-visible:ring-offset-2 ${
                  item.blockClass
                } ${isSelected ? 'ring-2 ring-[#0B2936] ring-offset-2' : ''}`}
              >
                <div className="w-20 h-16 rounded-lg overflow-hidden bg-[#F3F4F6] shrink-0 border border-white/30">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-bold truncate">
                    {item.title}
                  </div>
                  <div
                    className={`text-xs mt-0.5 truncate ${item.subTextClass}`}
                  >
                    {item.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

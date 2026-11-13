import { Plus, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  CATEGORIES,
  Product,
  ProductCategory,
  ProductVariant,
} from '../data/products';
import { formatTWD } from '../types';

type SortOption = 'default' | 'popular' | 'price-asc' | 'price-desc';

const CATEGORY_TOP_STRIPE: Record<Exclude<ProductCategory, 'all'>, string> = {
  cookware: 'bg-[#0B7A96]',
  tableware: 'bg-[#9E1C63]',
  prep: 'bg-[#D94625]',
  consumables: 'bg-[#C98216]',
};

interface CatalogSectionProps {
  products: Product[];
  activeCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, variant: ProductVariant) => void;
}

export default function CatalogSection({
  products,
  activeCategory,
  onCategoryChange,
  onSelectProduct,
  onQuickAdd,
}: CatalogSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = products.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;

      if (!query) return true;
      const inName = item.name.toLowerCase().includes(query);
      const inSubtitle = item.subtitle.toLowerCase().includes(query);
      const inCategory = item.categoryLabel.toLowerCase().includes(query);
      const inSku = item.variants.some((v) =>
        v.sku.toLowerCase().includes(query)
      );
      return inName || inSubtitle || inCategory || inSku;
    });

    if (sortBy === 'popular') {
      return [...list].sort((a, b) => b.popularity - a.popularity);
    }
    if (sortBy === 'price-asc') {
      return [...list].sort(
        (a, b) => a.variants[0].price - b.variants[0].price
      );
    }
    if (sortBy === 'price-desc') {
      return [...list].sort(
        (a, b) => b.variants[0].price - a.variants[0].price
      );
    }
    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  const handleQuickAddClick = (product: Product) => {
    const defaultVariant = product.variants[0];
    onQuickAdd(product, defaultVariant);
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((current) => (current === product.id ? null : current));
    }, 1200);
  };

  return (
    <section id="catalog" className="bg-[#E4EAEF] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo-Inspired Promo Color Block Banner */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-[#0B7A96] via-[#9E1C63] to-[#D94625] p-5 sm:p-7 text-white shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                精選批發商品型錄 · 多件自動享批發優惠價
              </h2>
              <p className="text-xs sm:text-sm text-white/90 mt-1">
                單品達指定件數由購物車自動切換批發價，全館滿 NT$ 3,000 免運（或台中門市免費自取）。
              </p>
            </div>
            <div className="text-xs sm:text-sm font-medium bg-black/25 px-4 py-2.5 rounded-lg tabular-nums shrink-0 self-start md:self-center">
              目前顯示 {filteredProducts.length} 項商品
            </div>
          </div>
        </div>

        {/* WooCommerce Storefront Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#C8D3DC]">
          {/* Deep Ocean-Teal Category Segmented Bar */}
          <div
            role="tablist"
            aria-label="商品分類篩選"
            className="flex items-center gap-1.5 p-1.5 bg-[#0B2936] rounded-xl overflow-x-auto no-scrollbar"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => onCategoryChange(category.id)}
                  className={`px-3.5 py-2 min-h-[40px] text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] ${
                    isActive
                      ? 'bg-[#D94625] text-white shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜尋商品或型號..."
                aria-label="搜尋商品名稱或型號"
                className="w-full pl-9 pr-3 py-2 min-h-[44px] text-sm bg-[#F7F4EE] border border-[#C8D3DC] rounded-lg text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#0B7A96] focus:ring-1 focus:ring-[#0B7A96]"
              />
            </div>

            <div className="relative shrink-0">
              <SlidersHorizontal
                className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="商品排序方式"
                className="w-full sm:w-auto pl-9 pr-8 py-2 min-h-[44px] text-sm bg-[#F7F4EE] border border-[#C8D3DC] rounded-lg text-slate-800 font-medium focus:outline-none focus:border-[#0B7A96] focus:ring-1 focus:ring-[#0B7A96] cursor-pointer"
              >
                <option value="default">預設排序</option>
                <option value="popular">熱銷優先</option>
                <option value="price-asc">價格：由低到高</option>
                <option value="price-desc">價格：由高到低</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty Search State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#F5EFE4] border border-[#DFD2BC] rounded-xl py-14 px-6 text-center">
            <p className="text-base font-semibold text-slate-900 mb-1">
              找不到符合「{searchQuery}」的商品
            </p>
            <p className="text-sm text-slate-600 mb-5">
              請嘗試切換分類或清除搜尋關鍵字，或直接來電 04-22326063 洽詢倉儲現貨。
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onCategoryChange('all');
              }}
              className="px-4 py-2.5 min-h-[44px] text-sm font-medium text-white bg-[#D94625] hover:bg-[#B8381B] rounded-lg transition-colors cursor-pointer"
            >
              顯示全部商品
            </button>
          </div>
        ) : (
          /* Uniform 3-Column Color-Accented Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const baseVariant = product.variants[0];
              const isAdded = justAddedId === product.id;
              const stripeClass = CATEGORY_TOP_STRIPE[product.category];

              return (
                <article
                  key={product.id}
                  className="group bg-[#F7F4EE] border border-[#CBD5DF] rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {/* Category-Matched Logo Color Top Accent Strip */}
                  <div className={`h-1.5 w-full ${stripeClass}`} aria-hidden="true" />

                  {/* 4:3 Studio Product Stage */}
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-[4/3] w-full bg-[#ECEFF2] overflow-hidden text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0B7A96]"
                  >
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      referrerPolicy="no-referrer"
                    />
                  </button>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Clean Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-slate-600 mb-2">
                      <span className="font-medium">{product.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#0B7A96] font-semibold">
                        {product.stockLabel}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#14181F] leading-snug mb-1">
                      <button
                        type="button"
                        onClick={() => onSelectProduct(product)}
                        className="text-left hover:text-[#D94625] transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
                      >
                        {product.name}
                      </button>
                    </h3>

                    <p className="text-xs text-slate-600 mb-4 line-clamp-1">
                      {product.subtitle}
                    </p>

                    {/* Aligned Price & Wholesale Tier Baseline */}
                    <div className="mt-auto pt-4 border-t border-[#E2DDD2]">
                      <div className="flex items-baseline justify-between gap-2 mb-4">
                        <div>
                          <span className="text-lg font-bold text-[#D94625] tabular-nums">
                            {formatTWD(baseVariant.price)}
                          </span>
                          {product.variants.length > 1 && (
                            <span className="text-xs text-slate-600 ml-1">起</span>
                          )}
                        </div>
                        <span className="text-xs text-slate-700 tabular-nums">
                          {baseVariant.wholesaleMinQty}件起批{' '}
                          <strong className="font-bold text-[#0B7A96]">
                            {formatTWD(baseVariant.wholesalePrice)}
                          </strong>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => onSelectProduct(product)}
                          className="px-3 py-2.5 min-h-[44px] text-xs sm:text-sm font-semibold text-[#0B2936] bg-[#DDE6EC] hover:bg-[#CBD8E0] rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A96]"
                        >
                          查看規格 ({product.variants.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickAddClick(product)}
                          className={`inline-flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A96] ${
                            isAdded
                              ? 'bg-emerald-700 text-white'
                              : 'bg-[#D94625] hover:bg-[#B8381B] text-white'
                          }`}
                        >
                          {!isAdded && (
                            <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
                          )}
                          <span>{isAdded ? '已加入購物車' : '加入購物車'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

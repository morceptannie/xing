import { Check, Minus, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Product, ProductVariant } from '../data/products';
import { formatTWD, getEffectiveUnitPrice } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
}

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedVariantId(product.variants[0].id);
      setQuantity(1);
      setAddedFeedback(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  const effectiveUnitPrice = getEffectiveUnitPrice(activeVariant, quantity);
  const isWholesaleApplied = quantity >= activeVariant.wholesaleMinQty;
  const lineTotal = effectiveUnitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, activeVariant, quantity);
    setAddedFeedback(true);
    window.setTimeout(() => {
      setAddedFeedback(false);
    }, 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-[2px] p-0 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-[#F7F4EE] w-full max-w-4xl max-h-[92vh] sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0B2936] text-white shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">/</span>
            <span className="font-mono-nums text-[#FDE68A]">
              SKU {activeVariant.sku}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="關閉商品規格視窗"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {/* Left Image & Specs */}
            <div className="md:col-span-6 space-y-5">
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F3F4F6] border border-slate-200/80">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Specifications Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 text-xs font-semibold text-slate-700">
                  商品規格說明
                </div>
                <dl className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-12 px-4 py-2.5 gap-2"
                    >
                      <dt className="col-span-4 text-slate-500">{spec.label}</dt>
                      <dd className="col-span-8 text-slate-900 font-medium">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Right Contiguous Purchase Module */}
            <div className="md:col-span-6 flex flex-col">
              <h2
                id="pdp-modal-title"
                className="text-xl sm:text-2xl font-bold text-[#14181F] leading-snug mb-1.5"
              >
                {product.name}
              </h2>
              <p className="text-sm text-slate-600 mb-4">{product.subtitle}</p>

              {/* Price & Availability Row */}
              <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 mb-5 border-b border-slate-200">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-2xl sm:text-3xl font-bold text-[#14181F] tabular-nums">
                    {formatTWD(effectiveUnitPrice)}
                  </span>
                  {isWholesaleApplied && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      {formatTWD(activeVariant.price)}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium text-[#0C8CA8] tabular-nums">
                  {product.stockLabel}（庫存 {activeVariant.stock} 組）
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Variable Product Attribute Selector */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-slate-700 mb-2.5">
                  選擇規格尺寸／包裝單位
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {product.variants.map((variant) => {
                    const isSelected = variant.id === activeVariant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`flex items-center justify-between px-4 py-3 min-h-[44px] rounded-lg border text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#0C8CA8] bg-[#0C8CA8]/5 text-[#14181F]'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                        }`}
                      >
                        <span className="text-sm font-medium">{variant.label}</span>
                        <span className="text-sm font-semibold tabular-nums">
                          {formatTWD(variant.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tiered Wholesale Pricing Table */}
              <div className="mb-6 bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                  <span>階梯批發優惠價（自動套用）</span>
                  {isWholesaleApplied && (
                    <span className="text-emerald-700">已達批發門檻</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div
                    className={`p-2.5 rounded-lg border ${
                      !isWholesaleApplied
                        ? 'bg-white border-slate-300 font-semibold text-slate-900'
                        : 'border-transparent text-slate-500'
                    }`}
                  >
                    <div>1 – {activeVariant.wholesaleMinQty - 1} 組</div>
                    <div className="tabular-nums mt-0.5">
                      {formatTWD(activeVariant.price)} / 組
                    </div>
                  </div>
                  <div
                    className={`p-2.5 rounded-lg border ${
                      isWholesaleApplied
                        ? 'bg-white border-[#0C8CA8] font-semibold text-[#0C8CA8]'
                        : 'border-transparent text-slate-600'
                    }`}
                  >
                    <div>{activeVariant.wholesaleMinQty} 組以上批發價</div>
                    <div className="tabular-nums mt-0.5">
                      {formatTWD(activeVariant.wholesalePrice)} / 組
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mt-auto pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="inline-flex items-center justify-between border border-slate-300 rounded-lg bg-white h-12 px-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="減少數量"
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 cursor-pointer"
                  >
                    <Minus className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <span className="w-12 text-center text-sm font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(activeVariant.stock, q + 1))
                    }
                    aria-label="增加數量"
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-5 h-12 text-sm font-semibold rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C8CA8] focus-visible:ring-offset-2 ${
                    addedFeedback
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#D94625] hover:bg-[#B8381B] text-white'
                  }`}
                >
                  {addedFeedback ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>已加入購物車</span>
                    </>
                  ) : (
                    <span>加入購物車 · {formatTWD(lineTotal)}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

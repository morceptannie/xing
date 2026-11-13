import { Minus, Plus, ShoppingBag, Tag, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CartItem, formatTWD, getEffectiveUnitPrice } from '../types';

export const FREE_SHIPPING_THRESHOLD = 3000;

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  couponCode: string;
  onApplyCoupon: (code: string) => { ok: boolean; message: string };
  onClose: () => void;
  onUpdateQty: (productId: string, variantId: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  items,
  couponCode,
  onApplyCoupon,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
}: CartDrawerProps) {
  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponFeedback, setCouponFeedback] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    setCouponInput(couponCode);
  }, [couponCode]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => {
    const unitPrice = getEffectiveUnitPrice(item.variant, item.quantity);
    return sum + unitPrice * item.quantity;
  }, 0);

  const retailTotal = items.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );
  const wholesaleSavings = Math.max(0, retailTotal - subtotal);

  const couponDiscount =
    couponCode === 'OPEN100' && subtotal > 0
      ? Math.min(100, subtotal)
      : couponCode === 'XYC5' && subtotal > 0
      ? Math.round(subtotal * 0.05)
      : 0;

  const discountedSubtotal = Math.max(0, subtotal - couponDiscount);
  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - discountedSubtotal
  );
  const progressPct = Math.min(
    100,
    Math.round((discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = onApplyCoupon(couponInput.trim().toUpperCase());
    setCouponFeedback(res);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className="w-full max-w-md bg-[#F7F4EE] h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0B2936] text-white shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FDE68A]" aria-hidden="true" />
            <h2
              id="cart-drawer-title"
              className="text-base font-bold text-white"
            >
              採購購物車
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="關閉購物車"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-200 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Free Shipping Progress Strip */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-[#E3EFF3] border-b border-[#C8DCE3] shrink-0">
            <div className="flex items-center justify-between text-xs text-slate-700 mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span>
                  再購{' '}
                  <strong className="font-semibold text-[#0C8CA8] tabular-nums">
                    {formatTWD(remainingForFreeShipping)}
                  </strong>{' '}
                  即享宅配免運（門市自取一律免運）
                </span>
              ) : (
                <span className="font-semibold text-emerald-700">
                  已達 NT$ 3,000 免運費門檻
                </span>
              )}
              <span className="font-mono-nums text-slate-500">
                {progressPct}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0C8CA8] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                <ShoppingBag className="w-6 h-6" aria-hidden="true" />
              </div>
              <p className="text-base font-semibold text-slate-900 mb-1">
                購物車目前是空的
              </p>
              <p className="text-sm text-slate-500 mb-6 max-w-xs">
                挑選商用鍋具、餐瓷或耗材加入購物車，滿件自動套用批發價。
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 min-h-[44px] text-sm font-medium text-white bg-[#14181F] hover:bg-[#0C8CA8] rounded-lg transition-colors cursor-pointer"
              >
                前往逛逛商品型錄
              </button>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice = getEffectiveUnitPrice(
                item.variant,
                item.quantity
              );
              const isWholesale =
                item.quantity >= item.variant.wholesaleMinQty;

              return (
                <div
                  key={`${item.product.id}-${item.variant.id}`}
                  className="flex gap-3.5 pb-4 border-b border-slate-100 last:border-b-0"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.imageAlt}
                    className="w-20 h-16 rounded-lg object-cover bg-[#F3F4F6] border border-slate-200/80 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">
                        {item.product.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() =>
                          onRemoveItem(item.product.id, item.variant.id)
                        }
                        aria-label={`移除 ${item.product.name}`}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.variant.label}
                    </p>

                    <div className="flex items-center justify-between gap-2 mt-2.5">
                      {/* Quantity Stepper */}
                      <div className="inline-flex items-center border border-slate-200 rounded-md bg-white">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.product.id, item.variant.id, -1)
                          }
                          aria-label="減少數量"
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQty(item.product.id, item.variant.id, 1)
                          }
                          aria-label="增加數量"
                          className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#14181F] tabular-nums">
                          {formatTWD(unitPrice * item.quantity)}
                        </div>
                        {isWholesale && (
                          <div className="text-[11px] font-medium text-[#0C8CA8]">
                            已套用批發價
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout Action */}
        {items.length > 0 && (
          <div className="border-t border-slate-200 p-5 bg-slate-50/70 space-y-4 shrink-0">
            {/* WooCommerce Coupon Code */}
            <form onSubmit={handleCouponSubmit} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag
                    className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="優惠券代碼（測試碼 OPEN100）"
                    aria-label="輸入優惠券代碼"
                    className="w-full pl-8 pr-3 py-2 min-h-[40px] text-xs bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0C8CA8]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 min-h-[40px] text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  套用代碼
                </button>
              </div>
              {couponFeedback && (
                <p
                  className={`text-xs ${
                    couponFeedback.ok ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {couponFeedback.message}
                </p>
              )}
            </form>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>商品小計</span>
                <span className="tabular-nums">{formatTWD(subtotal)}</span>
              </div>
              {wholesaleSavings > 0 && (
                <div className="flex justify-between text-[#0C8CA8] text-xs font-medium">
                  <span>多件批發已省下</span>
                  <span className="tabular-nums">
                    -{formatTWD(wholesaleSavings)}
                  </span>
                </div>
              )}
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 text-xs font-medium">
                  <span>優惠券折抵（{couponCode}）</span>
                  <span className="tabular-nums">
                    -{formatTWD(couponDiscount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#14181F] pt-2 border-t border-slate-200">
                <span>預估總額（未含運）</span>
                <span className="tabular-nums">
                  {formatTWD(discountedSubtotal)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-3.5 min-h-[48px] text-sm font-semibold text-white bg-[#D94625] hover:bg-[#B8381B] rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C8CA8] focus-visible:ring-offset-2"
            >
              前往結帳
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

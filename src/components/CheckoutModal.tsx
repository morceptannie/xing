import { CheckCircle2, Store, Truck, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CartItem, formatTWD, getEffectiveUnitPrice } from '../types';
import { FREE_SHIPPING_THRESHOLD } from './CartDrawer';

type ShippingMethod = 'delivery' | 'pickup';
type PaymentMethod = 'atm' | 'cod' | 'card' | 'store-pay';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  couponCode: string;
  onClose: () => void;
  onOrderConfirmed: () => void;
}

interface OrderConfirmation {
  orderNumber: string;
  customerName: string;
  phone: string;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  total: number;
  createdAt: string;
}

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  atm: 'ATM 虛擬帳號轉帳',
  cod: '宅配貨到付款（COD）',
  card: '信用卡線上刷卡',
  'store-pay': '台中門市現場現金／刷卡',
};

export default function CheckoutModal({
  isOpen,
  items,
  couponCode,
  onClose,
  onOrderConfirmed,
}: CheckoutModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [taxId, setTaxId] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('atm');
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] =
    useState<OrderConfirmation | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setFormError('');
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

  const couponDiscount =
    couponCode === 'OPEN100' && subtotal > 0
      ? Math.min(100, subtotal)
      : couponCode === 'XYC5' && subtotal > 0
      ? Math.round(subtotal * 0.05)
      : 0;

  const discountedSubtotal = Math.max(0, subtotal - couponDiscount);

  const shippingFee =
    shippingMethod === 'pickup' ||
    discountedSubtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : 150;

  const grandTotal = discountedSubtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setFormError('請填寫聯絡人姓名與聯絡電話。');
      return;
    }
    if (shippingMethod === 'delivery' && !address.trim()) {
      setFormError('選擇宅配到府時，請填寫完整收件地址。');
      return;
    }

    const orderNum = `XYC-${new Date()
      .toISOString()
      .slice(2, 10)
      .replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;

    setConfirmedOrder({
      orderNumber: orderNum,
      customerName: name.trim(),
      phone: phone.trim(),
      shippingMethod,
      paymentMethod,
      total: grandTotal,
      createdAt: new Date().toLocaleString('zh-TW', { hour12: false }),
    });
    onOrderConfirmed();
  };

  const handleFinishAndReset = () => {
    setConfirmedOrder(null);
    setName('');
    setPhone('');
    setEmail('');
    setTaxId('');
    setAddress('');
    setNote('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/55 backdrop-blur-[2px] p-0 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (confirmedOrder) handleFinishAndReset();
          else onClose();
        }
      }}
    >
      <div className="bg-[#F7F4EE] w-full max-w-4xl max-h-[94vh] sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0B2936] text-white shrink-0">
          <h2
            id="checkout-modal-title"
            className="text-base sm:text-lg font-bold text-white"
          >
            {confirmedOrder ? '訂單已成立' : '結帳與配送設定'}
          </h2>
          <button
            type="button"
            onClick={confirmedOrder ? handleFinishAndReset : onClose}
            aria-label="關閉結帳視窗"
            className="w-10 h-10 inline-flex items-center justify-center rounded-lg text-slate-200 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8">
          {confirmedOrder ? (
            /* Order Confirmation Receipt State */
            <div className="max-w-lg mx-auto py-4 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-[#14181F] mb-2">
                感謝您的訂購，訂單已成立
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                此為新永成行 WooCommerce 線上購物流程展示，實際上線後將同步發送訂單通知信與簡訊。
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">訂單編號</span>
                  <span className="font-mono-nums font-semibold text-[#14181F]">
                    #{confirmedOrder.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">訂購人 / 電話</span>
                  <span className="font-medium text-slate-900 tabular-nums">
                    {confirmedOrder.customerName} · {confirmedOrder.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">取貨／配送方式</span>
                  <span className="font-medium text-slate-900">
                    {confirmedOrder.shippingMethod === 'pickup'
                      ? '台中門市自取（青島路1段24-1號）'
                      : '台灣本島宅配配送'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">付款方式</span>
                  <span className="font-medium text-slate-900">
                    {PAYMENT_LABELS[confirmedOrder.paymentMethod]}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-200 text-base font-bold text-[#14181F]">
                  <span>應付總金額</span>
                  <span className="tabular-nums text-[#0C8CA8]">
                    {formatTWD(confirmedOrder.total)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinishAndReset}
                className="px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#14181F] hover:bg-[#0C8CA8] rounded-lg transition-colors cursor-pointer"
              >
                返回商城繼續瀏覽
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Billing & Shipping Form */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-[#14181F] mb-3">
                    1. 訂購人與發票資訊
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        聯絡人姓名 <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="例：王先生 / 永成餐飲"
                        className="w-full px-3 py-2.5 min-h-[44px] text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0C8CA8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        聯絡電話 <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0912-345-678"
                        className="w-full px-3 py-2.5 min-h-[44px] text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0C8CA8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        電子郵件（接收訂單通知）
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-3 py-2.5 min-h-[44px] text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0C8CA8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        統一編號（需三聯發票請填）
                      </label>
                      <input
                        type="text"
                        maxLength={8}
                        value={taxId}
                        onChange={(e) => setTaxId(e.target.value)}
                        placeholder="選填 8 碼統編"
                        className="w-full px-3 py-2.5 min-h-[44px] text-sm font-mono-nums border border-slate-200 rounded-lg focus:outline-none focus:border-[#0C8CA8]"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div>
                  <h3 className="text-sm font-bold text-[#14181F] mb-3">
                    2. 取貨與配送方式
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
                    <button
                      type="button"
                      onClick={() => setShippingMethod('delivery')}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                        shippingMethod === 'delivery'
                          ? 'border-[#0C8CA8] bg-[#0C8CA8]/5'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Truck
                        className="w-5 h-5 text-[#0C8CA8] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          宅配到府
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 tabular-nums">
                          {discountedSubtotal >= FREE_SHIPPING_THRESHOLD
                            ? '已達免運（NT$ 0）'
                            : '運費 NT$ 150（滿3千免運）'}
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShippingMethod('pickup')}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                        shippingMethod === 'pickup'
                          ? 'border-[#0C8CA8] bg-[#0C8CA8]/5'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <Store
                        className="w-5 h-5 text-[#0C8CA8] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          台中門市自取
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          免運費 · 青島路1段24-1號
                        </div>
                      </div>
                    </button>
                  </div>

                  {shippingMethod === 'delivery' && (
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        收件地址 <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="請輸入縣市、區域、路街巷弄與門牌號碼"
                        className="w-full px-3 py-2.5 min-h-[44px] text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0C8CA8]"
                      />
                    </div>
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-sm font-bold text-[#14181F] mb-3">
                    3. 付款方式
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(Object.keys(PAYMENT_LABELS) as PaymentMethod[]).map(
                      (method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPaymentMethod(method)}
                          className={`px-3.5 py-3 min-h-[44px] rounded-lg border text-left text-sm font-medium transition-colors cursor-pointer ${
                            paymentMethod === method
                              ? 'border-[#0C8CA8] bg-[#0C8CA8]/5 text-[#14181F]'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {PAYMENT_LABELS[method]}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    訂單備註（如希望到貨時段、裝箱需求）
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="選填備註事項..."
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#0C8CA8]"
                  />
                </div>
              </div>

              {/* Right Order Summary */}
              <div className="lg:col-span-5">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sticky top-4 space-y-4">
                  <h3 className="text-sm font-bold text-[#14181F] pb-3 border-b border-slate-200">
                    訂單明細（{items.length} 項商品）
                  </h3>

                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {items.map((item) => {
                      const unitPrice = getEffectiveUnitPrice(
                        item.variant,
                        item.quantity
                      );
                      return (
                        <div
                          key={`${item.product.id}-${item.variant.id}`}
                          className="flex justify-between gap-3 text-xs sm:text-sm"
                        >
                          <div className="min-w-0">
                            <div className="font-medium text-slate-900 truncate">
                              {item.product.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {item.variant.label} × {item.quantity}
                            </div>
                          </div>
                          <div className="font-semibold text-slate-900 tabular-nums shrink-0">
                            {formatTWD(unitPrice * item.quantity)}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-slate-200 space-y-2 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>商品小計</span>
                      <span className="tabular-nums">{formatTWD(subtotal)}</span>
                    </div>
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-emerald-700 text-xs font-medium">
                        <span>優惠券折抵（{couponCode}）</span>
                        <span className="tabular-nums">
                          -{formatTWD(couponDiscount)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>運費</span>
                      <span className="tabular-nums">
                        {shippingFee === 0 ? '免運費' : formatTWD(shippingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-[#14181F] pt-2 border-t border-slate-200">
                      <span>應付總額</span>
                      <span className="tabular-nums text-[#D94625]">
                        {formatTWD(grandTotal)}
                      </span>
                    </div>
                  </div>

                  {formError && (
                    <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 min-h-[48px] text-sm font-semibold text-white bg-[#D94625] hover:bg-[#B8381B] rounded-lg transition-colors cursor-pointer"
                  >
                    確認送出訂單 · {formatTWD(grandTotal)}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

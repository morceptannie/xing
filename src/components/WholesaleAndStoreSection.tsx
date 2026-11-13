import { CheckCircle2, Clock, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

export default function WholesaleAndStoreSection() {
  const [storeName, setStoreName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('餐廳 / 火鍋 / 早午餐');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      id="wholesale"
      className="py-12 sm:py-16 bg-[#0B2936] text-white border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Store Location & Physical Warehouse Info */}
          <div id="store" className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-semibold text-[#5EEAD4] tracking-wide mb-2">
                台中實體批發倉 · 現場看樣取貨
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                門市資訊與批發服務
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
                歡迎餐飲業者、採購人員與居家料理顧客親臨台中北區門市現場挑選尺寸、比對材質，大宗採購提供專人整場報價與市區配送協調。
              </p>
            </div>

            {/* Client Brand Emblem Card */}
            <div className="flex items-center gap-4 p-4 bg-[#F5EFE4] text-[#14181F] rounded-xl shadow-sm">
              <img
                src="/assets/aistudio/image_a350d076.png"
                alt="新永成行餐飲器皿鍋具批發倉"
                className="w-20 h-20 object-contain rounded-full bg-white p-1 border border-slate-200 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-base font-bold text-[#14181F]">
                  新永成行 餐飲器皿鍋具批發倉
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-1">
                  餐飲開業配貨 · 商用鍋具 · 陶瓷美耐皿 · 免洗耗材
                </p>
              </div>
            </div>

            {/* Store Metadata List */}
            <dl className="divide-y divide-white/15 border-t border-b border-white/15 text-sm">
              <div className="py-3.5 flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 text-[#FDE68A] shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs text-slate-300">門市與倉庫地址</dt>
                  <dd className="font-semibold text-white mt-0.5">
                    台中市北區青島路1段24-1號
                  </dd>
                </div>
              </div>

              <div className="py-3.5 flex items-start gap-3">
                <Phone
                  className="w-4 h-4 text-[#FDE68A] shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs text-slate-300">訂貨與報價專線</dt>
                  <dd className="mt-0.5">
                    <a
                      href="tel:0422326063"
                      className="font-mono-nums font-semibold text-white hover:text-[#FDE68A] transition-colors"
                    >
                      04-22326063
                    </a>
                  </dd>
                </div>
              </div>

              <div className="py-3.5 flex items-start gap-3">
                <Clock
                  className="w-4 h-4 text-[#FDE68A] shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs text-slate-300">營業時間</dt>
                  <dd className="font-medium text-white mt-0.5 tabular-nums">
                    週一至週六 09:00 – 18:30（週日公休）
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Right: B2B Bulk Quote Form on Warm Sand-Amber Block */}
          <div className="lg:col-span-7">
            <div className="bg-[#F5EFE4] text-[#14181F] border border-[#E2D4BC] rounded-2xl overflow-hidden shadow-md">
              <div
                aria-hidden="true"
                className="h-2 w-full bg-gradient-to-r from-[#0B7A96] via-[#9E1C63] to-[#D94625]"
              />
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-[#14181F] mb-1.5">
                  餐飲開業／整場批發報價單
                </h3>
                <p className="text-sm text-slate-700 mb-6">
                  若您需要大量訂購、新店開幕全套器皿配置，或尋找特定規格鍋具，請留下需求，門市專員將於營業時段回覆報價。
                </p>

                {submitted ? (
                  <div className="bg-[#EDE4D3] border border-[#CBB99B] rounded-xl p-6 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">
                      詢價單已送出
                    </h4>
                    <p className="text-sm text-slate-700 max-w-md mx-auto">
                      感謝 {contactName} 聯絡新永成行，我們已收到您的批發採購需求，將盡快致電{' '}
                      <span className="font-mono-nums font-semibold">{phone}</span>{' '}
                      與您確認明細與報價。
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setStoreName('');
                        setContactName('');
                        setPhone('');
                        setDetails('');
                      }}
                      className="mt-2 px-5 py-2.5 min-h-[44px] text-sm font-medium text-white bg-[#0B7A96] hover:bg-[#09647B] rounded-lg transition-colors cursor-pointer"
                    >
                      填寫另一筆詢價
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-800 mb-1">
                          餐廳 / 公司寶號（選填）
                        </label>
                        <input
                          type="text"
                          value={storeName}
                          onChange={(e) => setStoreName(e.target.value)}
                          placeholder="例：青島麵食館"
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-[#FCF9F3] border border-[#D4C7B0] rounded-lg focus:outline-none focus:border-[#0B7A96]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-800 mb-1">
                          聯絡人姓名 <span className="text-[#D94625]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="請輸入姓名"
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-[#FCF9F3] border border-[#D4C7B0] rounded-lg focus:outline-none focus:border-[#0B7A96]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-800 mb-1">
                          聯絡電話 <span className="text-[#D94625]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0912-345-678"
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-[#FCF9F3] border border-[#D4C7B0] rounded-lg focus:outline-none focus:border-[#0B7A96]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-800 mb-1">
                          業態類型
                        </label>
                        <select
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-sm bg-[#FCF9F3] border border-[#D4C7B0] rounded-lg focus:outline-none focus:border-[#0B7A96] cursor-pointer"
                        >
                          <option value="餐廳 / 火鍋 / 早午餐">
                            餐廳 / 火鍋 / 早午餐
                          </option>
                          <option value="小吃店 / 攤車 / 便當">
                            小吃店 / 攤車 / 便當
                          </option>
                          <option value="中央廚房 / 學校團膳">
                            中央廚房 / 學校團膳
                          </option>
                          <option value="公司行號 / 居家採購">
                            公司行號 / 居家採購
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        採購需求清單與預計數量
                      </label>
                      <textarea
                        rows={3}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="例：需要 36cm 湯鍋 4 只、7 吋陶瓷麵碗 50 個、外帶湯碗 5 箱..."
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FCF9F3] border border-[#D4C7B0] rounded-lg focus:outline-none focus:border-[#0B7A96]"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                      <span className="text-xs text-slate-700">
                        急件採購歡迎直接來電 04-22326063 查詢現貨
                      </span>
                      <button
                        type="submit"
                        className="px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#D94625] hover:bg-[#B8381B] rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A96]"
                      >
                        送出批發詢價單
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

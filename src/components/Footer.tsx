export default function Footer() {
  return (
    <footer id="guide" className="bg-[#1A1221] text-slate-300">
      <div
        aria-hidden="true"
        className="h-[4px] w-full bg-gradient-to-r from-[#0EA5C6] via-[#B11B6D] to-[#D94625]"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        {/* 4-Column Storefront Info & Shopping Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          <div>
            <h3 className="text-sm font-semibold text-[#5EEAD4] mb-2.5">
              配送與台中門市自取
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              全館單筆滿 NT$ 3,000 即享台灣本島免運（未滿酌收 NT$ 150）。下單亦可選擇「台中門市自取」，備貨完成通知後至北區青島路1段24-1號取貨。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#FDE68A] mb-2.5">
              批發階梯價與三聯發票
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              單一規格達指定件數即由購物車自動套用批發價格；餐飲業者結帳填寫 8 碼統一編號，隨貨開立三聯式發票報帳。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#F9A8D4] mb-2.5">
              售後檢查與破損補寄
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              陶瓷與不鏽鋼商品出貨前均經專人檢視包裝。若宅配運送過程發生破損，請於收貨 48 小時內拍照聯繫 04-22326063 協助補寄。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#FDBA74] mb-2.5">
              165 反詐騙宣導
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              新永成行不會以電話要求您操作 ATM 解除分期付款或提供信用卡安全碼。如有疑慮請撥打門市專線 04-22326063 或 165 反詐騙專線查證。
            </p>
          </div>
        </div>

        {/* Quiet Copyright & Store Identity Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-semibold text-white">新永成行</span>
            <span aria-hidden="true">·</span>
            <span>餐飲器皿鍋具批發倉</span>
            <span aria-hidden="true">·</span>
            <span>台中市北區青島路1段24-1號</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-nums">04-22326063</span>
          </div>
          <p className="text-slate-500">
            © 2026 新永成行 · WordPress / WooCommerce 官網架設 Demo
          </p>
        </div>
      </div>
    </footer>
  );
}

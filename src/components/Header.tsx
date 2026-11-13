import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { href: '#categories', label: '主題分類' },
  { href: '#catalog', label: '精選商品' },
  { href: '#wholesale', label: '批發採購' },
  { href: '#store', label: '門市據點' },
  { href: '#guide', label: '購物須知' },
];

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0B2936] text-white border-b border-white/10 shadow-sm">
      {/* Top 3px accent reflecting the client logo gradient */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-gradient-to-r from-[#0EA5C6] via-[#B11B6D] to-[#E5532D]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Logo + Single-line Wordmark */}
        <a
          href="#top"
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] rounded-md"
        >
          <img
            src="/assets/aistudio/image_a350d076.png"
            alt="新永成行餐飲器皿鍋具批發倉 LOGO"
            className="w-10 h-10 object-contain rounded-full bg-white p-0.5 shrink-0"
            referrerPolicy="no-referrer"
          />
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0">
            新永成行
          </span>
        </a>

        {/* Zone 2: Concise Single-line Navigation Links */}
        <nav
          aria-label="主導覽列"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-200"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-1 hover:text-[#FDE68A] transition-colors whitespace-nowrap shrink-0 border-b-2 border-transparent hover:border-[#FDE68A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action (Cart) + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`開啟購物車，目前有 ${cartCount} 件商品`}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-semibold text-white bg-[#D94625] hover:bg-[#B8381B] transition-colors rounded-lg whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
          >
            <ShoppingBag className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>購物車</span>
            <span className="font-mono-nums text-xs bg-black/25 px-1.5 py-0.5 rounded min-w-[22px] text-center">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? '關閉導覽選單' : '開啟導覽選單'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5EEAD4]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="行動版導覽選單"
          className="md:hidden border-t border-white/10 bg-[#071E28] px-4 py-3 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center min-h-[44px] px-3 rounded-lg text-base font-medium text-slate-100 hover:bg-white/10 hover:text-[#FDE68A] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

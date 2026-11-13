/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X } from 'lucide-react';
import { useState } from 'react';
import CartDrawer from './components/CartDrawer';
import CatalogSection from './components/CatalogSection';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductModal from './components/ProductModal';
import QuickCategoryBar from './components/QuickCategoryBar';
import WholesaleAndStoreSection from './components/WholesaleAndStoreSection';
import { Product, ProductCategory, PRODUCTS, ProductVariant } from './data/products';
import { CartItem } from './types';

export default function App() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      variant: PRODUCTS[0].variants[0],
      quantity: 1,
    },
  ]);
  const [couponCode, setCouponCode] = useState('');

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (
    product: Product,
    variant: ProductVariant,
    quantity: number
  ) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id && item.variant.id === variant.id
      );
      if (existingIndex >= 0) {
        return prev.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                quantity: Math.min(variant.stock, item.quantity + quantity),
              }
            : item
        );
      }
      return [...prev, { product, variant, quantity }];
    });
  };

  const handleQuickAdd = (product: Product, variant: ProductVariant) => {
    handleAddToCart(product, variant, 1);
  };

  const handleUpdateQty = (
    productId: string,
    variantId: string,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.variant.id === variantId
          ) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: Math.min(item.variant.stock, nextQty),
            };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string, variantId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.variant.id === variantId)
      )
    );
  };

  const handleApplyCoupon = (
    code: string
  ): { ok: boolean; message: string } => {
    if (!code) {
      setCouponCode('');
      return { ok: false, message: '請輸入優惠券代碼。' };
    }
    if (code === 'OPEN100') {
      setCouponCode('OPEN100');
      return { ok: true, message: '已套用新店開幕優惠碼：現折 NT$ 100' };
    }
    if (code === 'XYC5') {
      setCouponCode('XYC5');
      return { ok: true, message: '已套用熟客批發折扣碼：全單 95 折' };
    }
    return {
      ok: false,
      message: '無效的優惠碼，可試用 OPEN100 或 XYC5。',
    };
  };

  const handleProceedToCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderConfirmed = () => {
    setCartItems([]);
    setCouponCode('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E4EAEF] text-[#14181F]">
      {/* Slim Dismissible Top Announcement Bar (Logo Plum Block) */}
      {showAnnouncement && (
        <div className="bg-[#8F195A] text-white text-xs py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <p className="truncate">
              台中北區批發倉直營 · 單筆滿 NT$ 3,000 免運 · 優惠碼{' '}
              <span className="font-mono-nums font-semibold text-[#FDE68A]">
                OPEN100
              </span>{' '}
              現折 NT$ 100
            </p>
            <button
              type="button"
              onClick={() => setShowAnnouncement(false)}
              aria-label="關閉公告列"
              className="text-white/80 hover:text-white p-0.5 shrink-0 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        <Hero onSelectCategory={setActiveCategory} />
        <QuickCategoryBar
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <CatalogSection
          products={PRODUCTS}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onQuickAdd={handleQuickAdd}
        />
        <WholesaleAndStoreSection />
      </main>

      <Footer />

      {/* WooCommerce Variable Product Modal (PDP) */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* WooCommerce Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        couponCode={couponCode}
        onApplyCoupon={handleApplyCoupon}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* WooCommerce Standard Checkout & Receipt Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        items={cartItems}
        couponCode={couponCode}
        onClose={() => setCheckoutOpen(false)}
        onOrderConfirmed={handleOrderConfirmed}
      />
    </div>
  );
}

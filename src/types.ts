import { Product, ProductVariant } from './data/products';

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export function getEffectiveUnitPrice(variant: ProductVariant, quantity: number): number {
  return quantity >= variant.wholesaleMinQty ? variant.wholesalePrice : variant.price;
}

export function formatTWD(amount: number): string {
  return `NT$ ${amount.toLocaleString('zh-TW')}`;
}

import stockpotImg from '../assets/images/prod_stainless_stockpot_1794556947635.jpg';
import ceramicImg from '../assets/images/prod_ceramic_tableware_1794556948145.jpg';
import wokImg from '../assets/images/prod_commercial_wok_1794556949403.jpg';
import gnPansImg from '../assets/images/prod_gn_prep_pans_1794556949333.jpg';
import melamineImg from '../assets/images/prod_melamine_set_1794556949564.jpg';
import takeoutImg from '../assets/images/prod_takeout_packaging_1794556950208.jpg';

export type ProductCategory =
  | 'all'
  | 'cookware'
  | 'tableware'
  | 'prep'
  | 'consumables';

export interface ProductVariant {
  id: string;
  label: string;
  sku: string;
  price: number;
  wholesalePrice: number; // Tiered price when qty >= wholesaleMinQty
  wholesaleMinQty: number;
  stock: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: Exclude<ProductCategory, 'all'>;
  categoryLabel: string;
  stockLabel: string;
  image: string;
  imageAlt: string;
  description: string;
  popularity: number;
  variants: ProductVariant[];
  specs: ProductSpec[];
}

export const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: '全部商品' },
  { id: 'cookware', label: '商用鍋具' },
  { id: 'tableware', label: '陶瓷與美耐皿' },
  { id: 'prep', label: '不鏽鋼調理' },
  { id: 'consumables', label: '外帶免洗耗材' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-stockpot-304',
    name: '加厚 304 不鏽鋼商用高湯鍋（附蓋）',
    subtitle: '三層複合導熱底 · 瓦斯 / 電磁爐通用',
    category: 'cookware',
    categoryLabel: '商用鍋具',
    stockLabel: '台中倉現貨',
    image: stockpotImg,
    imageAlt: '加厚 304 不鏽鋼商用高湯鍋附蓋實拍',
    description:
      '專為拉麵店、火鍋店、滷味攤與中央廚房設計的食品級 SUS304 不鏽鋼高湯鍋。鍋壁加厚 1.2mm 搭配實心鉚釘雙耳提把，長時間熬煮不易變形或焦底，支援快速爐與商用 IH 電磁爐。',
    popularity: 98,
    variants: [
      {
        id: '30cm-20l',
        label: '30cm / 約 20L',
        sku: 'XYC-SP304-30',
        price: 1680,
        wholesalePrice: 1450,
        wholesaleMinQty: 4,
        stock: 36,
      },
      {
        id: '36cm-35l',
        label: '36cm / 約 35L',
        sku: 'XYC-SP304-36',
        price: 2280,
        wholesalePrice: 1980,
        wholesaleMinQty: 4,
        stock: 24,
      },
      {
        id: '40cm-50l',
        label: '40cm / 約 50L',
        sku: 'XYC-SP304-40',
        price: 2890,
        wholesalePrice: 2520,
        wholesaleMinQty: 4,
        stock: 18,
      },
    ],
    specs: [
      { label: '鍋體材質', value: '食品級 SUS304 不鏽鋼（鍋底三層複合鋼）' },
      { label: '適用熱源', value: '商用快速爐、家用瓦斯爐、IH 電磁爐' },
      { label: '板材厚度', value: '鍋身 1.2mm / 複合底 4.5mm' },
      { label: '批發包裝', value: '單入附不鏽鋼蓋，4 入以上享批發價' },
    ],
  },
  {
    id: 'prod-ceramic-kiln',
    name: '窯變釉日式商用陶瓷碗盤組',
    subtitle: '高溫燒製耐碰撞 · 可進洗碗機與微波爐',
    category: 'tableware',
    categoryLabel: '陶瓷與美耐皿',
    stockLabel: '批發熱銷',
    image: ceramicImg,
    imageAlt: '窯變釉日式商用陶瓷碗盤組實拍',
    description:
      '針對日式定食、拉麵、居酒屋與簡餐咖啡廳挑選的商用強化瓷器。1300°C 高溫還原燒製，釉面緻密不卡油漬、耐高溫商用洗碗機反覆洗滌，盤緣加厚防缺角設計降低餐廳耗損率。',
    popularity: 95,
    variants: [
      {
        id: 'bowl-10pcs',
        label: '7吋深麵碗（10入箱購）',
        sku: 'XYC-CER-BW10',
        price: 1450,
        wholesalePrice: 1250,
        wholesaleMinQty: 3,
        stock: 42,
      },
      {
        id: 'plate-10pcs',
        label: '9吋平盤（10入箱購）',
        sku: 'XYC-CER-PL10',
        price: 1680,
        wholesalePrice: 1480,
        wholesaleMinQty: 3,
        stock: 30,
      },
      {
        id: 'combo-20pcs',
        label: '碗盤混搭開胃組（20件）',
        sku: 'XYC-CER-MX20',
        price: 2680,
        wholesalePrice: 2380,
        wholesaleMinQty: 2,
        stock: 15,
      },
    ],
    specs: [
      { label: '器皿材質', value: '商用高溫強化瓷（無鉛鎘釉下彩）' },
      { label: '清潔適用', value: '商用洗碗機、消毒櫃、微波爐均適用' },
      { label: '釉色選擇', value: '海藍窯變 / 芝麻米白雙色可混批' },
      { label: '破损補件', value: '台中倉常態備貨，單顆可補訂' },
    ],
  },
  {
    id: 'prod-carbon-wok',
    name: '手工鍛打熟鐵商用炒鍋（附不鏽鋼炒勺）',
    subtitle: '聚熱快鍋氣足 · 傳統中式熱炒首選',
    category: 'cookware',
    categoryLabel: '商用鍋具',
    stockLabel: '現貨供應',
    image: wokImg,
    imageAlt: '手工鍛打熟鐵商用炒鍋與不鏽鋼炒勺實拍',
    description:
      '台式熱炒、便當快炒、麵攤主廚指定用鍋。精鐵鍛打無化學塗層，導熱迅速鎖住食材鍋氣；搭配加長實木防燙握柄與 304 圓底炒勺，久顛手腕不吃力。門市提供開鍋保養諮詢。',
    popularity: 92,
    variants: [
      {
        id: '33cm-home',
        label: '33cm 圓底（附 8兩炒勺）',
        sku: 'XYC-WOK-33',
        price: 980,
        wholesalePrice: 850,
        wholesaleMinQty: 5,
        stock: 48,
      },
      {
        id: '36cm-pro',
        label: '36cm 商用標準（附 10兩炒勺）',
        sku: 'XYC-WOK-36',
        price: 1180,
        wholesalePrice: 1020,
        wholesaleMinQty: 5,
        stock: 52,
      },
      {
        id: '40cm-heavy',
        label: '40cm 大口徑（附 12兩炒勺）',
        sku: 'XYC-WOK-40',
        price: 1420,
        wholesalePrice: 1240,
        wholesaleMinQty: 5,
        stock: 20,
      },
    ],
    specs: [
      { label: '鍋體材質', value: '高純度精鐵鍛打（無化學不沾塗層）' },
      { label: '握柄設計', value: '雙鉚釘加固＋防滑碳化實木柄' },
      { label: '適用熱源', value: '砲爐、鼓風快速爐、中壓瓦斯爐' },
      { label: '附屬配件', value: '含同規格一體成形 304 不鏽鋼炒勺' },
    ],
  },
  {
    id: 'prod-gn-prep-pans',
    name: '歐規 GN 不鏽鋼份數盆／調理盤系列',
    subtitle: '工作台冰箱標準規格 · 捲邊防割手設計',
    category: 'prep',
    categoryLabel: '不鏽鋼調理',
    stockLabel: '台中倉現貨',
    image: gnPansImg,
    imageAlt: '歐規 GN 不鏽鋼份數盆調理盤實拍',
    description:
      '符合國際 Gastronorm 標準尺寸，完美密合市售各品牌不鏽鋼工作台冰箱、自助餐保溫台與蒸烤箱。304 食品級不鏽鋼一體衝壓，圓角好清洗不卡垢，可選購實心盤或沖孔瀝水盤。',
    popularity: 89,
    variants: [
      {
        id: 'gn-1-1-100',
        label: '1/1 全盆 深100mm（3入組）',
        sku: 'XYC-GN11-100',
        price: 1350,
        wholesalePrice: 1180,
        wholesaleMinQty: 4,
        stock: 60,
      },
      {
        id: 'gn-1-2-100',
        label: '1/2 半盆 深100mm（4入組）',
        sku: 'XYC-GN12-100',
        price: 1080,
        wholesalePrice: 920,
        wholesaleMinQty: 5,
        stock: 75,
      },
      {
        id: 'gn-1-3-150',
        label: '1/3 份數盆 深150mm（6入組）',
        sku: 'XYC-GN13-150',
        price: 1260,
        wholesalePrice: 1090,
        wholesaleMinQty: 4,
        stock: 54,
      },
    ],
    specs: [
      { label: '材質規格', value: 'SUS304 食品級不鏽鋼（厚度 0.7mm）' },
      { label: '1/1 尺寸', value: '530 × 325 mm（國際通用工作台規格）' },
      { label: '邊緣工藝', value: '全周捲邊壓平，不刮傷手部與台面' },
      { label: '選配配件', value: '可加購不鏽鋼密合蓋與止水矽膠蓋' },
    ],
  },
  {
    id: 'prod-melamine-bento',
    name: 'A5 美耐皿消光黑定食餐盒與湯碗組',
    subtitle: '耐摔不易碎 · 通過 SGS 食品容器檢驗',
    category: 'tableware',
    categoryLabel: '陶瓷與美耐皿',
    stockLabel: '開店員購熱銷',
    image: melamineImg,
    imageAlt: 'A5 美耐皿消光黑定食餐盒與湯碗組實拍',
    description:
      '採用 100% 純 A5 食品級密胺樹脂製成，耐溫 -20°C 至 +120°C，重量輕且極耐摔碰，大幅降低內用尖峰時段洗碗破損成本。消光磨砂質感呈現日系餐酒與簡餐高級感。',
    popularity: 86,
    variants: [
      {
        id: 'tray-10pcs',
        label: '五格定食餐盒附蓋（10組）',
        sku: 'XYC-MEL-TR10',
        price: 1850,
        wholesalePrice: 1620,
        wholesaleMinQty: 3,
        stock: 32,
      },
      {
        id: 'soupbowl-20pcs',
        label: '磨砂味噌湯碗（20入）',
        sku: 'XYC-MEL-SB20',
        price: 1280,
        wholesalePrice: 1120,
        wholesaleMinQty: 3,
        stock: 64,
      },
    ],
    specs: [
      { label: '原料等級', value: '100% 食品級 A5 美耐皿（非尿素樹脂）' },
      { label: '耐熱範圍', value: '-20°C ~ 120°C（勿進微波爐及烤箱）' },
      { label: '安全檢驗', value: '符合台灣衛福部食品器具容器衛生標準' },
      { label: '適用場景', value: '丼飯專賣、學校團膳、自助餐、員工餐廳' },
    ],
  },
  {
    id: 'prod-takeout-kraft',
    name: '加厚防漏牛皮紙外帶湯碗／摺疊餐盒',
    subtitle: '內層食品級防水淋膜 · 外送平台防灑推薦',
    category: 'consumables',
    categoryLabel: '外帶免洗耗材',
    stockLabel: '箱購免運折抵',
    image: takeoutImg,
    imageAlt: '加厚防漏牛皮紙外帶湯碗與餐盒實拍',
    description:
      '專為外送平台與外帶餐點研發的加厚原漿牛皮紙容器。湯碗採用高扣合度 PP 防霧耐熱蓋，外送顛簸不滲漏；摺疊便當盒一體成型免組裝，提升廚房出餐速度。',
    popularity: 91,
    variants: [
      {
        id: 'bowl-750ml-300',
        label: '750ml 湯碗含蓋（300組/箱）',
        sku: 'XYC-TK-B750',
        price: 1150,
        wholesalePrice: 990,
        wholesaleMinQty: 5,
        stock: 90,
      },
      {
        id: 'bowl-1000ml-300',
        label: '1000ml 大湯碗含蓋（300組/箱）',
        sku: 'XYC-TK-B1000',
        price: 1320,
        wholesalePrice: 1140,
        wholesaleMinQty: 5,
        stock: 80,
      },
      {
        id: 'box-900ml-200',
        label: '900ml 牛皮紙餐盒（200入/箱）',
        sku: 'XYC-TK-M900',
        price: 980,
        wholesalePrice: 860,
        wholesaleMinQty: 5,
        stock: 72,
      },
    ],
    specs: [
      { label: '紙材規格', value: '320g 食品級原漿牛皮紙 + PE/PP 淋膜' },
      { label: '耐熱溫度', value: '湯碗耐熱 100°C / 餐盒可短時微波加熱' },
      { label: '客製服務', value: '單品 10 箱以上可洽詢品牌貼紙或印字' },
      { label: '配送提醒', value: '箱裝材積較大，台中市區可配合專車配送' },
    ],
  },
];

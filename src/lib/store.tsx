import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { books, bundles, bundleBooks, getBookById } from "@/data/books";

export type CartItemKind = "book" | "bundle";
export type CartItemFormat = "digital" | "print";

export interface CartItem {
  id: string;
  kind: CartItemKind;
  format: CartItemFormat;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  items: CartItem[];
  bookIds: string[];
  status: "paid";
}

export interface PrintOrderRecord {
  id: string;
  email: string;
  status: string;
  lulu_print_job_id?: string;
  shipping_level: string;
  shipping_address: Record<string, unknown>;
  line_items: Array<Record<string, unknown>>;
  subtotal: number;
  shipping_cost: number;
  total: number;
  created_at: string;
}

export interface LibraryEntry {
  bookId: string;
  progress: number;
  downloaded: boolean;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  printOrders: PrintOrderRecord[];
  library: LibraryEntry[];
}

const STORAGE_KEY = "english-books-store-v1";

const empty: StoreState = { cart: [], wishlist: [], orders: [], printOrders: [], library: [] };

interface StoreContextValue extends StoreState {
  hydrated: boolean;
  cartCount: number;
  subtotal: number;
  discount: number;
  total: number;
  shippingCost: number;
  promoCode: string | null;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  addToCart: (id: string, kind?: CartItemKind, format?: CartItemFormat) => void;
  removeFromCart: (id: string, format?: CartItemFormat) => void;
  setQuantity: (id: string, quantity: number, format?: CartItemFormat) => void;
  setItemFormat: (id: string, format: CartItemFormat) => void;
  clearCart: () => void;
  setShippingCost: (cost: number) => void;
  toggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  isOwned: (bookId: string) => boolean;
  completeCheckout: () => Order;
  addPrintOrder: (order: PrintOrderRecord) => void;
  markDownloaded: (bookId: string) => void;
  setProgress: (bookId: string, progress: number) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const PROMOS: Record<string, number> = {
  ENGLISH10: 0.1,
  YORLINGO20: 0.2,
};

export function priceOf(item: CartItem) {
  if (item.kind === "bundle") {
    return bundles.find((b) => b.id === item.id)?.price ?? 0;
  }
  const book = getBookById(item.id);
  if (!book) return 0;
  if (item.format === "print" && book.print) {
    return book.print.price;
  }
  return book.price;
}

export function titleOf(item: CartItem) {
  if (item.kind === "bundle") {
    return bundles.find((b) => b.id === item.id)?.name ?? "Bundle";
  }
  return getBookById(item.id)?.title ?? "Book";
}

export function coverOf(item: CartItem) {
  if (item.kind === "bundle") {
    const bundle = bundles.find((b) => b.id === item.id);
    return (bundle ? bundleBooks(bundle)[0]?.cover : undefined) ?? books[0]!.cover;
  }
  return getBookById(item.id)?.cover ?? books[0]!.cover;
}

export function formatLabel(item: CartItem) {
  if (item.kind === "bundle") {
    const count = bundles.find((b) => b.id === item.id)?.bookIds.length ?? 0;
    return `${count} books · PDF`;
  }
  const book = getBookById(item.id);
  if (!book) return "PDF";
  if (item.format === "print") return `Paperback · ${book.pages} pgs`;
  return book.format;
}

export function canPrint(item: CartItem) {
  if (item.kind !== "book") return false;
  return Boolean(getBookById(item.id)?.print);
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(empty);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [shippingCost, setShippingCostState] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...empty, ...(JSON.parse(raw) as StoreState) });
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const addToCart = useCallback(
    (id: string, kind: CartItemKind = "book", format: CartItemFormat = "digital") => {
      const resolvedFormat = kind === "bundle" ? "digital" : format;
      setState((s) => {
        const existing = s.cart.find((i) => i.id === id && i.format === resolvedFormat);
        if (existing) {
          return {
            ...s,
            cart: s.cart.map((i) =>
              i.id === id && i.format === resolvedFormat ? { ...i, quantity: i.quantity + 1 } : i,
            ),
          };
        }
        return { ...s, cart: [...s.cart, { id, kind, format: resolvedFormat, quantity: 1 }] };
      });
    },
    [],
  );

  const removeFromCart = useCallback((id: string, format?: CartItemFormat) => {
    setState((s) => ({
      ...s,
      cart: s.cart.filter((i) => !(i.id === id && (format === undefined || i.format === format))),
    }));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number, format?: CartItemFormat) => {
    setState((s) => ({
      ...s,
      cart: s.cart
        .map((i) =>
          i.id === id && (format === undefined || i.format === format)
            ? { ...i, quantity: Math.max(0, quantity) }
            : i,
        )
        .filter((i) => i.quantity > 0),
    }));
  }, []);

  const setItemFormat = useCallback((id: string, format: CartItemFormat) => {
    setState((s) => ({
      ...s,
      cart: s.cart.map((i) => (i.id === id ? { ...i, format } : i)),
    }));
  }, []);

  const clearCart = useCallback(() => setState((s) => ({ ...s, cart: [] })), []);
  const setShippingCost = useCallback((cost: number) => setShippingCostState(Math.max(0, cost)), []);

  const toggleWishlist = useCallback((bookId: string) => {
    setState((s) => ({
      ...s,
      wishlist: s.wishlist.includes(bookId)
        ? s.wishlist.filter((id) => id !== bookId)
        : [...s.wishlist, bookId],
    }));
  }, []);

  const subtotal = useMemo(
    () => state.cart.reduce((sum, item) => sum + priceOf(item) * item.quantity, 0),
    [state.cart],
  );
  const discount = useMemo(
    () => (promoCode ? subtotal * (PROMOS[promoCode] ?? 0) : 0),
    [promoCode, subtotal],
  );

  const applyPromo = useCallback((code: string) => {
    const key = code.trim().toUpperCase();
    if (PROMOS[key]) {
      setPromoCode(key);
      return true;
    }
    return false;
  }, []);

  const completeCheckout = useCallback(() => {
    const order: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      total: Math.max(0, subtotal - discount),
      items: state.cart.filter((i) => i.format === "digital"),
      bookIds: state.cart
        .filter((i) => i.format === "digital")
        .flatMap((item) =>
          item.kind === "bundle"
            ? (bundles.find((b) => b.id === item.id)?.bookIds ?? [])
            : [item.id],
        ),
      status: "paid",
    };
    setState((s) => {
      const newLibrary = [...s.library];
      for (const bookId of order.bookIds) {
        if (!newLibrary.some((e) => e.bookId === bookId)) {
          newLibrary.push({ bookId, progress: 0, downloaded: false });
        }
      }
      return { ...s, cart: [], orders: [order, ...s.orders], library: newLibrary };
    });
    setPromoCode(null);
    setShippingCostState(0);
    return order;
  }, [state.cart, subtotal, discount]);

  const addPrintOrder = useCallback((order: PrintOrderRecord) => {
    setState((s) => ({
      ...s,
      printOrders: [order, ...s.printOrders],
      cart: s.cart.filter((i) => i.format !== "print"),
    }));
  }, []);

  const value: StoreContextValue = {
    ...state,
    hydrated,
    cartCount: state.cart.reduce((n, i) => n + i.quantity, 0),
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount + shippingCost),
    shippingCost,
    promoCode,
    applyPromo,
    clearPromo: () => setPromoCode(null),
    addToCart,
    removeFromCart,
    setQuantity,
    setItemFormat,
    clearCart,
    setShippingCost,
    toggleWishlist,
    isInWishlist: (bookId) => state.wishlist.includes(bookId),
    isOwned: (bookId) => state.library.some((e) => e.bookId === bookId),
    completeCheckout,
    addPrintOrder,
    markDownloaded: (bookId) =>
      setState((s) => ({
        ...s,
        library: s.library.map((e) => (e.bookId === bookId ? { ...e, downloaded: true } : e)),
      })),
    setProgress: (bookId, progress) =>
      setState((s) => ({
        ...s,
        library: s.library.map((e) => (e.bookId === bookId ? { ...e, progress } : e)),
      })),
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

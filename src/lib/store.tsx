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

export interface CartItem {
  id: string;
  kind: CartItemKind;
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

export interface LibraryEntry {
  bookId: string;
  progress: number;
  downloaded: boolean;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  library: LibraryEntry[];
}

const STORAGE_KEY = "english-books-store-v1";

const empty: StoreState = { cart: [], wishlist: [], orders: [], library: [] };

interface StoreContextValue extends StoreState {
  hydrated: boolean;
  cartCount: number;
  subtotal: number;
  discount: number;
  total: number;
  promoCode: string | null;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
  addToCart: (id: string, kind?: CartItemKind) => void;
  removeFromCart: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  isOwned: (bookId: string) => boolean;
  completeCheckout: () => Order;
  markDownloaded: (bookId: string) => void;
  setProgress: (bookId: string, progress: number) => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const PROMOS: Record<string, number> = {
  ENGLISH10: 0.1,
  YORLINGO20: 0.2,
};

function priceOf(item: CartItem) {
  if (item.kind === "bundle") {
    return bundles.find((b) => b.id === item.id)?.price ?? 0;
  }
  return getBookById(item.id)?.price ?? 0;
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

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(empty);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

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

  const addToCart = useCallback((id: string, kind: CartItemKind = "book") => {
    setState((s) => {
      const existing = s.cart.find((i) => i.id === id);
      if (existing) {
        return {
          ...s,
          cart: s.cart.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i)),
        };
      }
      return { ...s, cart: [...s.cart, { id, kind, quantity: 1 }] };
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((i) => i.id !== id) }));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setState((s) => ({
      ...s,
      cart: s.cart
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i))
        .filter((i) => i.quantity > 0),
    }));
  }, []);

  const clearCart = useCallback(() => setState((s) => ({ ...s, cart: [] })), []);

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
      items: state.cart,
      bookIds: state.cart.flatMap((item) =>
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
    return order;
  }, [state.cart, subtotal, discount]);

  const value: StoreContextValue = {
    ...state,
    hydrated,
    cartCount: state.cart.reduce((n, i) => n + i.quantity, 0),
    subtotal,
    discount,
    total: Math.max(0, subtotal - discount),
    promoCode,
    applyPromo,
    clearPromo: () => setPromoCode(null),
    addToCart,
    removeFromCart,
    setQuantity,
    clearCart,
    toggleWishlist,
    isInWishlist: (bookId) => state.wishlist.includes(bookId),
    isOwned: (bookId) => state.library.some((e) => e.bookId === bookId),
    completeCheckout,
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

CREATE TABLE public.print_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  lulu_print_job_id TEXT,
  tracking_number TEXT,
  shipping_level TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  line_items JSONB NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  shipping_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.print_orders TO authenticated;
GRANT INSERT ON public.print_orders TO anon;
GRANT ALL ON public.print_orders TO service_role;

ALTER TABLE public.print_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Shoppers can place print orders"
ON public.print_orders FOR INSERT TO authenticated, anon
WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_print_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_print_orders_updated_at
BEFORE UPDATE ON public.print_orders
FOR EACH ROW EXECUTE FUNCTION public.update_print_orders_updated_at();
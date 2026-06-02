CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE TABLE public.service_overrides (
  service_key text PRIMARY KEY,
  name text,
  price numeric,
  original numeric,
  deleted boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.service_overrides TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.service_overrides TO authenticated;
GRANT ALL ON public.service_overrides TO service_role;

ALTER TABLE public.service_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can read overrides" ON public.service_overrides
  FOR SELECT USING (true);
CREATE POLICY "admins can insert overrides" ON public.service_overrides
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins can update overrides" ON public.service_overrides
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins can delete overrides" ON public.service_overrides
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.custom_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id text NOT NULL,
  subcategory text,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  original numeric,
  unit text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.custom_services TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.custom_services TO authenticated;
GRANT ALL ON public.custom_services TO service_role;

ALTER TABLE public.custom_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can read custom services" ON public.custom_services
  FOR SELECT USING (true);
CREATE POLICY "admins can insert custom services" ON public.custom_services
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins can update custom services" ON public.custom_services
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins can delete custom services" ON public.custom_services
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

ALTER PUBLICATION supabase_realtime ADD TABLE public.service_overrides;
ALTER PUBLICATION supabase_realtime ADD TABLE public.custom_services;

DO $$
DECLARE
  admin_uid uuid;
BEGIN
  SELECT id INTO admin_uid FROM auth.users WHERE email = 'aamirzaman9900@admin.local';
  IF admin_uid IS NULL THEN
    admin_uid := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, confirmation_token, email_change,
      email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      admin_uid,
      'authenticated',
      'authenticated',
      'aamirzaman9900@admin.local',
      crypt('Apple@9900', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      now(), now(), '', '', '', ''
    );
    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(),
      admin_uid,
      jsonb_build_object('sub', admin_uid::text, 'email', 'aamirzaman9900@admin.local'),
      'email',
      admin_uid::text,
      now(), now(), now()
    );
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (admin_uid, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END $$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
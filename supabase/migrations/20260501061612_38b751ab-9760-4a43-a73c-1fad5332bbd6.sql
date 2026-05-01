
-- Site content key/value JSON store (editable sections)
CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can read site_content"
  ON public.site_content FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "authenticated can insert site_content"
  ON public.site_content FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "authenticated can update site_content"
  ON public.site_content FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "authenticated can delete site_content"
  ON public.site_content FOR DELETE
  TO authenticated
  USING (true);

-- Work portfolio videos
CREATE TABLE public.work_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  client TEXT,
  category TEXT NOT NULL DEFAULT 'Birthdays',
  year TEXT,
  poster_url TEXT,
  video_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.work_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can read active work_videos"
  ON public.work_videos FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "authenticated can insert work_videos"
  ON public.work_videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "authenticated can update work_videos"
  ON public.work_videos FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "authenticated can delete work_videos"
  ON public.work_videos FOR DELETE
  TO authenticated
  USING (true);

-- Authenticated users can also read inactive ones (for admin)
CREATE POLICY "authenticated can read all work_videos"
  ON public.work_videos FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to view leads + quote_requests in admin
CREATE POLICY "authenticated can read leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated can read all quote_requests"
  ON public.quote_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "authenticated can delete leads"
  ON public.leads FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "authenticated can delete quote_requests"
  ON public.quote_requests FOR DELETE
  TO authenticated
  USING (true);

-- Storage bucket for media
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-media', 'site-media', true);

CREATE POLICY "public can read site-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-media');

CREATE POLICY "authenticated can upload site-media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-media');

CREATE POLICY "authenticated can update site-media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-media');

CREATE POLICY "authenticated can delete site-media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-media');

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_site_content_updated_at
  BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER trg_work_videos_updated_at
  BEFORE UPDATE ON public.work_videos
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

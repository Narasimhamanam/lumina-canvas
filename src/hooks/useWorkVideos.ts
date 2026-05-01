import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface WorkVideo {
  id: string;
  title: string;
  client: string | null;
  category: string;
  year: string | null;
  poster_url: string | null;
  video_url: string;
  sort_order: number;
  is_active: boolean;
}

export function useWorkVideos(opts?: { includeInactive?: boolean }) {
  const [videos, setVideos] = useState<WorkVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let on = true;
    let q = supabase.from("work_videos").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
    if (!opts?.includeInactive) q = q.eq("is_active", true);
    q.then(({ data }) => {
      if (!on) return;
      setVideos((data as WorkVideo[]) ?? []);
      setLoading(false);
    });
    return () => {
      on = false;
    };
  }, [refreshKey, opts?.includeInactive]);

  return { videos, loading, refresh: () => setRefreshKey((k) => k + 1) };
}

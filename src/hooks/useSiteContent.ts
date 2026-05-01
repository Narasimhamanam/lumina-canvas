import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DEFAULT_CONTENT, type ContentKey } from "@/lib/contentDefaults";

// Fetch a single editable section, falling back to defaults.
export function useSiteContent<K extends ContentKey>(key: K) {
  const [data, setData] = useState<(typeof DEFAULT_CONTENT)[K]>(DEFAULT_CONTENT[key]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let on = true;
    supabase
      .from("site_content")
      .select("value")
      .eq("key", key)
      .maybeSingle()
      .then(({ data: row }) => {
        if (!on) return;
        if (row?.value) {
          setData({ ...DEFAULT_CONTENT[key], ...(row.value as object) } as (typeof DEFAULT_CONTENT)[K]);
        }
        setLoading(false);
      });
    return () => {
      on = false;
    };
  }, [key]);

  return { data, loading };
}

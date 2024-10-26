import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
const options = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    persistSession: false,
    detectSessionInUrl: true,
  },
  global: {
    headers: { "x-my-custom-header": "GAU-bot" },
  },
};

export async function updateItem(id) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE,
    options
  );

  const { error } = await supabase
    .from("artwork")
    .update({ is_published: true })
    .eq("id", id);
  if (error) console.log(error);
}

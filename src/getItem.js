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

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function getItem() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
    options
  );

  const { data, error } = await supabase
    .from("artwork")
    .select()
    .eq("is_published", false);
  if (error) {
    console.log(error);
  }
  const rndInt = randomIntFromInterval(1, data.length);
  return data[rndInt - 1];
}

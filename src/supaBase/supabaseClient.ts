import { SUPABASE_URL, SUPABASE_KEY } from "@env";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;

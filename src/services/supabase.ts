import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rencklphdevxcyjmpobp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlbmNrbHBoZGV2eGN5am1wb2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4MTMxMjEsImV4cCI6MjAwNjM4OTEyMX0._mr6IYEk7smMcXNp2H7520TG9URGysfOWp4m8utC3Z8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

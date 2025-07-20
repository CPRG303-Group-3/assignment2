// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uwcjyzzyrropzquwmpki.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Y2p5enp5cnJvcHpxdXdtcGtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2MTc3NzgsImV4cCI6MjA2ODE5Mzc3OH0.igroWzdiYx2VSqFZaS2QijfGTIDMQwbGIBOhbAcWLM8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

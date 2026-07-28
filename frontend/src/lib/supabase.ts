import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sgftbfeoeaqenwdpysgq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'PREENCHA_AQUI_NO_VERCEL';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

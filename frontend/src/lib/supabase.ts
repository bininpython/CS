import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sgftbfeoeaqenwdpysgq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnZnRiZmVvZWFxZW53ZHB5c2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMTE4NzUsImV4cCI6MjEwMDc4Nzg3NX0.dw-8d9eYUtRG8CB3VLtj2zsbp32oRa0bnfNltyo9jqk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

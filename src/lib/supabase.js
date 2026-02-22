import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wlqivmannjxypnpmnolg.supabase.co';
const supabaseAnonymousKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndscWl2bWFubmp4eXBucG1ub2xnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1OTc5MjgsImV4cCI6MjA3MTE3MzkyOH0.tFibDzQx6Ev8uvk-yXgLIoIhoLGnkneAFD8V619w_Rk';

export const supabase = createClient(supabaseUrl, supabaseAnonymousKey);

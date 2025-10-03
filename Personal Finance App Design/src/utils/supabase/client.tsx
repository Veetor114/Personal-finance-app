import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { projectId, publicAnonKey } from './info';

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

serve(async () => {
  try {
    // Get expired subscriptions
    const { data: expiredSubscriptions, error: fetchError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('status', 'active')
      .lt('active_until', new Date().toISOString());

    if (fetchError) throw fetchError;

    // Deactivate expired subscriptions
    if (expiredSubscriptions && expiredSubscriptions.length > 0) {
      const { error: updateError } = await supabase
        .from('subscriptions')
        .update({ status: 'inactive' })
        .in('id', expiredSubscriptions.map(sub => sub.id));

      if (updateError) throw updateError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        deactivated: expiredSubscriptions?.length ?? 0 
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
});
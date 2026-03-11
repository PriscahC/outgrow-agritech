const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const audioFile = formData.get('file');
    const language = formData.get('language') || 'auto';

    if (!audioFile) {
      return new Response(
        JSON.stringify({ error: 'Audio file is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get API key from environment
    const apiKey = Deno.env.get('INTEGRATIONS_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare form data for API
    const apiFormData = new FormData();
    apiFormData.append('file', audioFile);
    apiFormData.append('response_format', 'verbose_json');
    if (language !== 'auto') {
      apiFormData.append('language', language);
    }

    // Call Speech-to-Text API
    const response = await fetch(
      'https://app-a5tzymr7g1s1-api-DY8MNQoqOnMa.gateway.appmedo.com/v1/audio/transcriptions',
      {
        method: 'POST',
        headers: {
          'X-Gateway-Authorization': `Bearer ${apiKey}`,
        },
        body: apiFormData
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Speech-to-Text API error:', errorText);
      return new Response(
        JSON.stringify({ error: `Speech-to-Text API error: ${response.status}`, details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in voice-to-text:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

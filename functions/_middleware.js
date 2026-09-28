// ai.adriana.homes is the English home of the inicIA blog.
// Serve the /en/ section at the bare root; the URL stays clean.
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const isEnglishHost = url.hostname === 'ai.adriana.homes';
  const isRoot = url.pathname === '/' || url.pathname === '';
  if (isEnglishHost && isRoot) {
    const target = new URL('/en/', url.origin);
    target.search = url.search;
    const asset = await context.env.ASSETS.fetch(target);
    return new Response(asset.body, asset);
  }
  return context.next();
}

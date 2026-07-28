import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const userAgent = req.headers["user-agent"] || "";

  const isBot =
    userAgent.includes("WhatsApp") ||
    userAgent.includes("facebookexternalhit") ||
    userAgent.includes("Twitterbot") ||
    userAgent.includes("LinkedInBot");

  const { theme, slug, id } = req.query;

  if (!slug || !id) {
    return res.status(400).send("Invalid URL");
  }

  // If normal browser → let React handle it
  if (!isBot) {
    return res.redirect(302, `/${theme}/${slug}/${id}`);
  }

  try {
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY,
    );

    const { data, error } = await supabase
      .from("wedding_invitations")
      .select("data")
      .eq("id", id)
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return res.status(404).send("Invitation not found");
    }

    const invitation = data.data.profile;

    const groom = invitation?.groom || "Groom";
    const bride = invitation?.bride || "Bride";
    const date = invitation?.date || "";
    const venue = invitation?.venue || "";

    const ogImage =
      invitation?.coverImage || "https://digi-vivah.vercel.app/og-image.jpg";

    const fullUrl = `https://digi-vivah.vercel.app/${theme}/${slug}/${id}`;

    const html = `
      <!DOCTYPE html>
      <html>
      
      <head>

<title>${groom} & ${bride} Wedding Invitation</title>

<meta property="og:title" content="${groom} & ${bride} Wedding Invitation" />
<meta property="og:description" content="Join us on ${date} at ${venue}" />

<meta property="og:image" content="${ogImage}" />
<meta property="og:image:secure_url" content="${ogImage}" />
<meta property="og:image:type" content="image/jpeg" />

<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="1200" />

<meta property="og:url" content="${fullUrl}" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />

</head>
      <body></body>
      </html>
    `;

    return res.status(200).send(html);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
}

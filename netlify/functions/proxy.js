// netlify/functions/proxy.js
const fetch = require("node-fetch");

exports.handler = async function (event) {
  try {
    // Strip the Netlify prefix: /.netlify/functions/proxy/
    let path = event.path.replace(/^\/.netlify\/functions\/proxy/, "");

    // 🔑 Strip leading `/api` so `/api/user` → `/user`
    path = path.replace(/^\/api/, "");

    // ✅ Append query string if exists
    const query = event.rawQuery ? `?${event.rawQuery}` : "";
    const targetUrl = `https://api.nuttyvibes.com${path}${query}`;

    console.log(`Proxying request to: ${targetUrl}`);
    console.log("Method:", event.httpMethod);
    console.log("Headers:", event.headers);

    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: {
        ...event.headers,
        host: "api.nuttyvibes.com", // override host
      },
      body:
        event.httpMethod !== "GET" && event.httpMethod !== "HEAD"
          ? event.body
          : undefined,
    });

    console.log("Response Status:", response.status);

    const contentType = response.headers.get("content-type") || "";
    const body = contentType.includes("application/json")
      ? JSON.stringify(await response.json())
      : await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": contentType,
        "Set-Cookie": response.headers.get("set-cookie") || "",
      },
      body,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Proxy failed", details: err.message }),
    };
  }
};

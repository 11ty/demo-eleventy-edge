function setCookie(context, name, value) {
  context.cookies.set({
    name,
    value,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
  });
  
}

export default async (request, context) => {
  let url = new URL(request.url);

  // Save to cookie, redirect back to form
  if(url.pathname === "/appearance/" && request.method === "POST") {
    if(request.headers.get("content-type") === "application/x-www-form-urlencoded") {
      let body = await request.text();
      let postData = Object.fromEntries(new URLSearchParams(body));
      setCookie(context, "appearance", postData.appearance);

      return new Response(null, {
        status: 302,
        headers: {
          location: url.pathname
        }
      });
    }
  }

  return context.next();
};

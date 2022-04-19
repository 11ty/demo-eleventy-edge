export default async (request, context) => {
  let url = new URL(request.url);

  // Save to cookie, redirect back to form
  if(url.pathname === "/forms/" && request.method === "POST") {
    if(request.headers.get("content-type") === "application/x-www-form-urlencoded") {
      let body = await request.clone().formData();
      let postData = Object.fromEntries(body);

      // In a real use case you’d likely use a database to save this
      context.cookies.set({
        name: "username",
        value: postData.username,
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      });

      return new Response(null, {
        status: 302,
        headers: {
          location: url.pathname,
        }
      });
    }
  }

  return context.next();
};

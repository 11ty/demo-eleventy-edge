export default async (request, context) => {
  let url = new URL(request.url);

  // Link to ?repeat-reset will delete the cookie
  if(url.searchParams.get("repeat-reset") === "") {
    // Awkward part here is that delete needs to happen on /
    // (can’t happen on /critical-css/) due to cookie path on root
    context.cookies.delete("repeat");

    return new Response(null, {
      status: 302,
      headers: {
        location: "/critical-css/",
      }
    });
  } else if(!context.cookies.get("repeat")) {
    // This new cookie value won’t be available until the next page request
    context.cookies.set({
      name: "repeat",
      value: 1,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
    });
  }

  return context.next();
};

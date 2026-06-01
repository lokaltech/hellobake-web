// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Initialize Supabase client inside the middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Retrieve the current authenticated session user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isGoingToAdminPage = request.nextUrl.pathname.startsWith("/admin");
  const isGoingToLoginPage = request.nextUrl.pathname === "/admin/login";

  // Case 1: Trying to access dashboard without being logged in
  if (isGoingToAdminPage && !isGoingToLoginPage && !user) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Case 2: Already logged in, trying to go to the login page again -> send to overview
  if (isGoingToLoginPage && user) {
    const dashboardUrl = new URL("/admin", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

// Ensure the middleware only executes on the admin dashboard paths
export const config = {
  matcher: ["/admin/:path*"],
};

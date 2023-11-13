import { Links, LiveReload, Meta, Outlet, Scripts } from "@remix-run/react";

export default function App() {
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Welcome to blog-remix</h1>
        <Outlet />
        <Scripts />
        {/* to make hot-reload work, ref: https://remix.run/docs/en/main/start/quickstart#development-workflow */}
        <LiveReload />
      </body>
    </html>
  );
}

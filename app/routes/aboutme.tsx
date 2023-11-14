import { HeadersFunction } from "@remix-run/node";

export const headers: HeadersFunction = () => ({
  "Some-Custom-Header": "hello world about me page !!!",
});

export default function Page() {
  return (
    <div>
      <h1>About me page</h1>
      <a href="/">Home page</a>
    </div>
  );
}

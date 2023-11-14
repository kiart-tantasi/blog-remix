import { ActionFunctionArgs, HeadersFunction, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

export const headers: HeadersFunction = () => ({
  "Some-Custom-Header": "hello world home page !!!",
});

export async function loader() {
  await new Promise((res) => res("")); // mock fetching
  // why we need to wrap JS object with json() function
  // https://github.com/remix-run/remix/discussions/5620#discussioncomment-5181236
  return json({ message: "Hello World" });
}

export default function Page() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  return (
    <div>
      <h1>Home page</h1>
      <p>useLoaderData(): {JSON.stringify(loaderData)}</p>
      <a href="/aboutme">About me page</a>
      <hr />
      <Form method="POST">
        <input name="first-input" placeholder="first input" />
        <button type="submit">submit form</button>
      </Form>
      {typeof actionData !== "undefined" && (
        <>
          {actionData.isSuccess === true ? (
            <div>Successful !</div>
          ) : (
            <div>Failed !</div>
          )}
        </>
      )}
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  console.log("input received:", form.get("first-input"));
  return json({ isSuccess: Math.random() > 0.5 }); // randomly return true/false
}

import { useState } from "react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { trpc } from "../utils/trpc";

function validURL(url: string) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return pattern.test(url);
}

interface Form {
  url: string;
  slug: string;
}

function LinkForm() {
  const [form, setForm] = useState<Form>({ slug: "", url: "" });
  const [, copy] = useCopyToClipboard();

  const slugCheck = trpc.useQuery(["slugCheck", { slug: form.slug }], {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const createSlug = trpc.useMutation(["createShortner"]);

  const isDisabled =
    slugCheck?.data?.used ||
    !form.slug ||
    !form.url ||
    slugCheck?.isLoading ||
    !validURL(form.url);

  return (
    <div className="w-full mx-auto max-w-md md:max-w-lg">
      <h1 className="text-7xl mb-8">Shortly</h1>
      <div className="rounded-lg border border-white/10 bg-gray-300 bg-opacity-[0.06] px-4 py-6 shadow-lg md:p-16">
        <form
          className="flex w-full flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            createSlug.mutate({ ...form });
          }}
        >
          <fieldset>
            <h2 className="mb-2 text-3xl font-bold">A Simple Link Shortner</h2>
            <div className="mt-8">
              <label
                className="text-sm font-medium text-gray-300"
                htmlFor="slug"
              >
                Slug
              </label>
              {slugCheck.data?.used ? (
                <span className="ml-2 text-sm text-rose-500 font-medium">
                  Slug already in use.
                </span>
              ) : null}
              <input
                className="p-2 mt-2 block w-full rounded border-none bg-white text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-700"
                placeholder="https://shortly.vercel.com/<slug name>"
                type="text"
                id="slug"
                onChange={(e) => {
                  setForm({ ...form, slug: e.target.value });
                  slugCheck.refetch();
                }}
              />
            </div>
            <div className="mt-8">
              <label
                className="block text-sm font-medium text-gray-300"
                htmlFor="link"
              >
                Link
              </label>
              <input
                className="p-2 mt-2 block w-full rounded border-none bg-white bg-[hsl(231deg 84% 67%/var(--tw-bg-opacity))] px-4 py-3 font-medium focus:outline-none focus:ring-gray-300 focus-ring:ring text-gray-900 transition focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-700"
                placeholder="https://google.com"
                type="url"
                id="link"
                onChange={(e) => {
                  setForm({ ...form, url: e.target.value });
                }}
              />
            </div>
            <div className="mt-16">
              {createSlug.status === "success" ? (
                <button
                  onClick={() => {
                    copy(`https://shortly-cwl.vercel.com/${form.slug}`);
                    setForm({ slug: "", url: "" });
                    createSlug.reset();
                  }}
                  className="w-full rounded-md bg-green-600 transition-all px-4 py-3 font-medium text-white hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-700"
                >
                  Copy
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isDisabled}
                  className="w-full rounded-md bg-primary transition-all px-4 py-3 font-medium text-white hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-gray-700"
                >
                  Submit
                </button>
              )}
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default LinkForm;

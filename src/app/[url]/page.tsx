import { find } from "@/actions/url/find";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";

type Params = Promise<{ url: string }>;

type PageProps = {
  params: Params;
};

const Page: FC<PageProps> = async ({ params }) => {
  const { url: shortUrl } = await params;
  const shortened = await find({ shortCode: shortUrl });

  if (!shortened) {
    notFound();
  }

  redirect(shortened.url);
};

export default Page;

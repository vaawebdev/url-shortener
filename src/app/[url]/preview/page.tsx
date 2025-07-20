import { find } from "@/actions/url/find";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";
import { OriginalUrl } from "./original-url";
import { ShortenedUrl } from "./shortened-url";
import { Stats } from "./stats";

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

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto size-12 bg-green-600 rounded-full flex items-center justify-center mb-3">
          <Check className="size-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-green-700">
          URL Shortened Successfully!
        </CardTitle>
        <CardDescription>The link is ready to be shared</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <OriginalUrl shortened={shortened} />
        <ShortenedUrl shortened={shortened} />
        <Button variant="outline" className="w-full" asChild>
          <Link href="/">
            <ArrowLeft />
            Shorten Another URL
          </Link>
        </Button>
        <Stats shortened={shortened} />
        <p className="text-xs text-muted-foreground text-center">
          This shortened URL will redirect to your original link. <br /> Share
          it anywhere!
        </p>
      </CardContent>
    </Card>
  );
};

export default Page;

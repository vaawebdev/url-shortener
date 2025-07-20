import "@/assets/css/index.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "@/env";
import { AlertCircle, LinkIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type Params = Promise<{ url: string }>;

type PageProps = {
  params: Params;
};

const Page: FC<PageProps> = async () => {
  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <div className="mx-auto size-16 bg-red-100 rounded-full flex items-center justify-center mb-3">
          <AlertCircle className="size-8 text-red-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-red-700">
          Link Not Found
        </CardTitle>
        <CardDescription>
          The shortened URL you&apos;re looking for doesn&apos;t exist
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="text-left" variant="destructive">
          <AlertCircle />
          <AlertTitle>Possible reasons:</AlertTitle>
          <AlertDescription>
            <ul className="list-inside list-disc text-sm">
              <li>The link was mistyped or corrupted</li>
              <li>The link was deleted by its creator</li>
            </ul>
          </AlertDescription>
        </Alert>
        <div className="flex flex-col space-y-2">
          <Button variant="outline" asChild>
            <Link href="/">
              <LinkIcon />
              Create New Short URL
            </Link>
          </Button>
        </div>
        <p className="block text-xs text-muted-foreground pt-4 border-t">
          If you believe this is an error, please contact the person who shared
          this link with you.
        </p>
      </CardContent>
    </Card>
  );
};

export default Page;

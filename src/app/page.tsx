import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "@/env";
import { Link } from "lucide-react";
import { FC } from "react";
import { ShortenerForm } from "./shortener-form";

const Page: FC = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto size-12 bg-blue-600 rounded-full flex items-center justify-center mb-3">
          <Link className="size-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold">URL Shortener</CardTitle>
        <CardDescription>
          Transform long URLs into short, shareable links
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ShortenerForm />
      </CardContent>
    </Card>
  );
};

export default Page;

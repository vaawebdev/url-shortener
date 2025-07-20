import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Url } from "@/database/schema";
import { ExternalLink } from "lucide-react";
import { FC } from "react";

type OriginalUrlProps = {
  shortened: Url;
};

export const OriginalUrl: FC<OriginalUrlProps> = ({ shortened }) => {
  return (
    <div className="space-y-2">
      <Label
        htmlFor="originalUrl"
        className="text-sm font-medium text-muted-foreground"
      >
        Original URL:
      </Label>
      <div className="flex items-center space-x-2">
        <Input
          id="originalUrl"
          value={shortened.url}
          readOnly
          className="flex-1 bg-muted text-sm"
        />
        <Button size="icon" variant="outline" asChild className="shrink-0">
          <a href={shortened.url} target="_blank">
            <ExternalLink className="size-4" />
            <span className="sr-only">Visit URL</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

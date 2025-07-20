"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Url } from "@/database/schema";
import { Copy } from "lucide-react";
import { FC, useCallback, useMemo } from "react";
import { useCopyToClipboard } from "react-use";
import { toast } from "sonner";

type ShortenedUrlProps = {
  shortened: Url;
};

export const ShortenedUrl: FC<ShortenedUrlProps> = ({ shortened }) => {
  const [state, copyToClipboard] = useCopyToClipboard();

  const url = useMemo(
    () =>
      new URL(shortened.shortCode, process.env.NEXT_PUBLIC_BASE_URL).toString(),
    [shortened]
  );

  const onCopy = useCallback(() => {
    copyToClipboard(url);
    toast("Copied!", {
      description: "Shortened URL copied to clipboard",
    });
  }, [copyToClipboard, url]);

  return (
    <div className="space-y-2">
      <Label
        htmlFor="shortenedUrl"
        className="text-sm font-medium text-muted-foreground"
      >
        Shortened URL:
      </Label>
      <div className="flex items-center space-x-2">
        <Input
          id="shortenedUrl"
          value={url}
          readOnly
          className="flex-1 bg-blue-50 border-blue-200 text-blue-700"
        />
        {state.noUserInteraction ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                type="button"
                onClick={onCopy}
                className="shrink-0 bg-transparent"
              >
                <Copy />
                <span className="sr-only">Copy to Clipboard</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to Clipboard</p>
            </TooltipContent>
          </Tooltip>
        ) : null}
      </div>
    </div>
  );
};

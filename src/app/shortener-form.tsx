"use client";

import { shorten } from "@/actions/url/shorten";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const SHORTENER_FORM_SCHEMA = z.object({
  url: z.url(),
});

type ShortenerFormValues = z.infer<typeof SHORTENER_FORM_SCHEMA>;

export const ShortenerForm: FC = () => {
  const router = useRouter();

  const form = useForm<ShortenerFormValues>({
    resolver: zodResolver(SHORTENER_FORM_SCHEMA),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = useCallback(
    async (values: ShortenerFormValues) => {
      try {
        const { shortUrl } = await shorten({ url: values.url });
        router.push(`/${shortUrl}/preview`);
      } catch (error) {
        toast.error("Failed to shorten the URL!", {
          description: "Please try again later",
        });
        console.error(error);
      }
    },
    [router]
  );

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  required
                  placeholder="https://example.com/very-long-url"
                  disabled={form.formState.isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? (
            <Loader className="animate-spin" />
          ) : null}
          Shorten URL
        </Button>
      </form>
    </Form>
  );
};

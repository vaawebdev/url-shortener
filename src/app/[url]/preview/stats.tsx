import { Url } from "@/database/schema";
import { FC, ReactNode } from "react";

type StatsProps = {
  shortened: Url;
};

export const Stats: FC<StatsProps> = ({ shortened }) => {
  return (
    <ul className="bg-muted/50 rounded-lg p-4 space-y-2">
      <Stat label="Short Code:" value={shortened.shortCode} />
      <Stat label="Created:" value={shortened.createdAt.toISOString()} />
    </ul>
  );
};

const Stat: FC<{ label: ReactNode; value: ReactNode }> = ({ label, value }) => {
  return (
    <li className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-medium">{value}</span>
    </li>
  );
};

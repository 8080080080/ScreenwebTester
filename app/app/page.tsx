import type { Metadata } from "next";

import { Workspace } from "@/components/app/workspace";
import { isDemoModeEnabled } from "@/lib/env";

export const metadata: Metadata = {
  title: "Workspace",
};

export default function AppPage() {
  return <Workspace demoMode={isDemoModeEnabled()} />;
}

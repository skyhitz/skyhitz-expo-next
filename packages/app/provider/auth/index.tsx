import React, { useEffect } from "react";
import { useAuthStatus } from "app/hooks/useAuthStatus";
import { useLogIn } from "app/hooks/useLogIn";
import { useRouter } from "solito/router";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthStatus();
  return <>{children}</>;
}

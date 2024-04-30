// This is where all providers should be stored
// They should not be put into index.js

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-provider";
import { TextSizeProvider } from "./contexts/text-size-provider";
import { AuthProvider } from "./contexts/auth-provider";

export function Providers({ children }) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <TextSizeProvider>{children}</TextSizeProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

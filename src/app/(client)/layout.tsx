import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

// auth context
import { AuthContext } from "@/auth/authContext";

// metadata
export const metadata: Metadata = {
  title: "Magar Hotel Management System",
  description: "Magar Hotel Management System",
};

// root layout
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
      </head>
      <body>
        <AuthContext>
          <Toaster toastOptions={{ style: { padding: '1rem', fontSize: '1.25rem', borderRadius: '0.5rem', }, }} />
          <main>
            {children}
          </main>
        </AuthContext>
      </body>
    </html>
  );
};

// app/layout.tsx
import '../styles/global.css';

export const metadata = {
  title: 'JSON Builder',
  description: 'Create custom JSON files',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>JSON Builder</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

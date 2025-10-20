export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: 12, borderBottom: '1px solid #eee' }}>
          <strong>Seller Agent</strong>
          <span style={{ marginLeft: 12, color: '#888' }}>License: Unknown</span>
        </header>
        <main style={{ padding: 16 }}>{children}</main>
      </body>
    </html>
  );
}

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="children-container">{children}</div>;
}

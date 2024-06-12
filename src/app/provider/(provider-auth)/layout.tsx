export default function ProviderAuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <div>Provider header</div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        {children}
      </div>
    </>
  );
}

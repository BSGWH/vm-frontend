interface RailsErrorsProps {
  errors: string | null;
}

export function RailsErrorsLogin({
  error,
}: {
  readonly error: RailsErrorsProps;
}) {
  if (!error?.errors) return null;
  return (
    <div className="text-pink-500 text-md italic py-2">{error.errors}</div>
  );
}

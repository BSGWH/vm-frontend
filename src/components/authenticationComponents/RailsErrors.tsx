interface RailsErrorsProps {
  errors: string[] | null;
}

export function RailsErrors({ error }: { readonly error: RailsErrorsProps }) {
  if (!error?.errors || error.errors.length === 0) return null;
  return (
    <div className="text-pink-500 text-md italic py-2">
      {error.errors.map((err, index) => (
        <div key={index}>{err}</div>
      ))}
    </div>
  );
}

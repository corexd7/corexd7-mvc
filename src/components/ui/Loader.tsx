interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export default function Loader({ size = "md", className = "" }: LoaderProps) {
  return (
    <div
      className={`inline-block animate-spin rounded-full border-2 border-primary border-t-transparent ${sizeMap[size]} ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

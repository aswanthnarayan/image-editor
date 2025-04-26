import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function SkeletonCard({
  width,
  height,
  className = "",
}: SkeletonCardProps) {
  // Only apply inline style if width/height are provided
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div className={`flex flex-col space-y-3 ${className}`}>
      <Skeleton
        className="rounded-xl w-full h-full object-cover"
        style={style}
      />
      <div className="space-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-3/4 h-4" />
      </div>
    </div>
  );
}
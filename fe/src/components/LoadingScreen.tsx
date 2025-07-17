import { Loader2 } from "lucide-react";

export default function LoadingScreen({ message = "Loading..."}: {message?: string}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-white" />
        <p className="text-white text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}

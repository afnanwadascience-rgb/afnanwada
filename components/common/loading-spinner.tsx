import { RefreshCw } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-8 text-purple-400">
      <RefreshCw className="w-6 h-6 animate-spin" />
    </div>
  );
};
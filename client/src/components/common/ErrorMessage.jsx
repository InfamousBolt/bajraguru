import { AlertTriangle } from 'lucide-react';

export default function ErrorMessage({ title = 'Something went wrong', message = 'Please try again later.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta/10">
        <AlertTriangle size={24} className="text-terracotta" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 font-heading text-xl font-semibold text-charcoal">
        {title}
      </h3>
      <p className="mt-2 max-w-md font-body text-sm text-warm-gray">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-full bg-sage px-6 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-sage-dark"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

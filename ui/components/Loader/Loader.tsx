export const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-grow inline-block w-8 h-8 dark:bg-slate-300 bg-slate-900 rounded-full opacity-0"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

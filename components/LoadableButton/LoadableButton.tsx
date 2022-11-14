import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { Loading } from '../../components/Icons/Loading';

interface Props {
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  Icon: ReactNode;
  isLoading: boolean;
  onClick?: () => void;
}

export const LoadableButton: React.FC<PropsWithChildren<Props>> = ({
  type,
  Icon,
  onClick,
  isLoading,
  children
}) => {
  return (
    <button
      type={type}
      className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-600 dark:bg-gray-50 py-2 px-4 text-sm font-medium text-white dark:text-gray-500 hover:bg-gray-700 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-progress disabled:bg-indigo-300"
      onClick={onClick}
      disabled={isLoading}
    >
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="w-5 h-5 text-gray-500 group-hover:text-gray-400">
          {isLoading ? <Loading /> : Icon}
        </span>
      </span>
      {children}
    </button>
  );
};

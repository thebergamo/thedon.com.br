import { Loading } from '../Icons/Loading'

export const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-grow inline-block w-8 h-8 dark:bg-gray-300 bg-slate-900 text-white rounded-full opacity-0"
        role="status"
      >
        <Loading />
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}

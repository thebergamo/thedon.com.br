import Link from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { Calendar } from 'components/Icons/Calendar';
import { formatDate } from 'utils/formatDate';
import { Download } from 'components/Icons/Download';
import serialize from 'utils/serializeRichText';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger
} from 'components/Dialog/Dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { formatSize } from 'utils/formatSize';

type Props = {
  filename: string;
  alt: string;
  description: any;
  filesize: number;
  updatedAt: string;
};

export default function MediaCard({
  filename,
  alt,
  description,
  filesize,
  updatedAt
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <h4 className="text-lg md:text-lg font-medium w-full text-gray-900 dark:text-gray-100 tracking-tight hover:underline hover:text-gray-400 dark:hover:text-gray-300">
            {alt}
          </h4>
          <p className="text-sm text-gray-400">
            {new Date(updatedAt).toDateString()}
          </p>
          <hr className="my-4" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-3xl">Download {alt}</DialogTitle>
        <DialogDescription className="text-2xl my-4">
          {serialize(description)}
        </DialogDescription>
        <div className="flex flex-col md:flex-row justify-between">
          <Download />
          <h4 className="text-lg md:text-lg ml-2 font-medium mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 tracking-tight">
            {filename} ({formatSize(filesize)} KB)
          </h4>
        </div>
      </DialogContent>
    </Dialog>
  );
}

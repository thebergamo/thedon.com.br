import { useMedias } from 'api/media';
import { Loader } from 'components/Loader/Loader';
import MediaCard from 'components/Media/MediaCard';
import { Suspense } from 'react';

type Props = {
  blockName: string;
  tag?: TagType[];
};

export const MediaList = ({ blockName, tag = [] }: Props) => {
  const tags: string[] =
    tag
      ?.filter((rawTag) => typeof rawTag !== 'string')
      .map((rawTag) => {
        return (rawTag as Tag).id;
      }) || [];
  const { isLoading, data } = useMedias(20, 1, tags);

  return (
    <div>
      <Suspense fallback={null}>
        {blockName && (
          <h3 className="mt-8 mb-4 text-xl font-bold tracking-tight md:text-2xl">
            {blockName}
          </h3>
        )}
        {isLoading && <Loader />}
        {!isLoading &&
          data?.docs
            .map((media) => {
              if (typeof media === 'string') {
                return null;
              }

              return (
                <MediaCard
                  key={media.id}
                  alt={media.alt}
                  filename={media.filename}
                  description={media.description}
                  filesize={media.filesize}
                  updatedAt={media.updatedAt}
                />
              );
            })
            .filter(Boolean)}
      </Suspense>
    </div>
  );
};

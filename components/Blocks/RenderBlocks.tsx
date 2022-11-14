import { Announcer } from './Announcer';
import { FeaturedPosts } from './FeaturedPosts';
import MediaBlock from './Media';
import { MediaList } from './MediaList';
import { PostList } from './PostList';
import RichText from './RichText';

type LayoutBlocks =
  | 'media'
  | 'announcer'
  | 'richText'
  | 'featuredPosts'
  | 'postList'
  | 'mediaList';

const components: Record<LayoutBlocks, React.FC<any>> = {
  media: MediaBlock,
  announcer: Announcer,
  richText: RichText,
  featuredPosts: FeaturedPosts,
  postList: PostList,
  mediaList: MediaList
};

type Props = {
  layout: Layout[];
  className?: string;
};

const RenderBlocks: React.FC<Props> = ({ layout, className }) => (
  <div className={['container minArea', className].filter(Boolean).join(' ')}>
    {layout.map((block, i) => {
      console.log({ block });
      const Block: React.FC<any> = components[block.blockType];

      if (Block) {
        return (
          <section key={i}>
            <Block {...block} />
          </section>
        );
      }

      return null;
    })}
  </div>
);

export default RenderBlocks;

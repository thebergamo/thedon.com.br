type SearchType = {
  title: string;
  doc: {
    value: string;
    relationTo: string;
  };
};

type SizeDetails = {
  filename: string;
  width: number;
  height: number;
};

type Size = "card" | "square" | "portrait" | "feature";

type MediaType = {
  id: string;
  filename: string;
  alt: string;
  mimeType: string;
  filesize: number;
  width: number;
  description: any;
  height: number;
  updatedAt: string;
  sizes: {
    card?: SizeDetails;
    square?: SizeDetails;
    portrait?: SizeDetails;
    feature?: SizeDetails;
  };
};

type Tag = {
  id: string;
  name: string;
};
type TagType = Tag | string;

type Post = {
  title: string;
  author: UserType;
  publishedDate: string;
  category: CategoryType;
  tags: TagType[];
  excerpt: any;
  content: any;
  status: "draft" | "published";
  memberOnly: MembersOnlyType;
  slug: string;
};

type PostType = Post | string;

type AnnouncerType = {
  blockType: "announcer";
  blockName?: string;
  message?: any;
  membersOnly: boolean;
};

type RichTextType = {
  blockType: "richText";
  blockName?: string;
  content?: any;
  membersOnly: boolean;
};

type FeaturedPostsType = {
  blockType: "featuredPosts";
  blockName?: string;
  posts: PostType[];
};

type PostListType = {
  blockType: "postList";
  blockName?: string;
  title?: string;
  maxPerPage: number;
};

type MediaListType = {
  blockType: "mediaList";
  blockName?: string;
  tag: TagType[];
};

type Layout =
  | MediaType
  | AnnouncerType
  | RichTextType
  | FeaturedPostsType
  | PostListType;

type MetaType = {
  title?: string;
  description?: string;
  keywords?: string;
};

type MembersOnlyType = {
  membersOnly: boolean;
  level: "newbie" | "hacker";
};

type PageType = {
  title: string;
  slug: string;
  image?: MediaType;
  layout: Layout[];
  meta: MetaType;
  membersOnly: MembersOnlyType;
};

type LinkType = {
  type: "page" | "custom";
  label: string;
  page?: PageType | string;
  url?: string;
};

type NavLinkType = {
  link: LinkType;
  membersOnly: MembersOnlyType;
};

type HeaderType = NavLinkType[];

type FooterType = {
  nav: NavLinkType[];
};

type SocialMediaType = {
  links: {
    label: string;
    url: string;
  }[];
};

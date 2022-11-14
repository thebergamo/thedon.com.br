import RichText from './RichText';

export const Announcer = ({ message, ...props }: AnnouncerType) => {
  console.log({ message, ...props });
  return (
    <div className="max-w-screen-md container rounded bg-white text-black p-4">
      <RichText content={message[0].children} />
    </div>
  );
};

import Image from 'next/image';

interface Props {
  name: string;
  avatar: string;
  size?: number;
  className?: string;
}

export default function UserAvatar({ name, avatar, size = 36, className = '' }: Props) {
  return (
    <Image
      src={avatar}
      alt={name}
      width={size}
      height={size}
      className={`rounded-full object-cover ring-2 ring-white ${className}`}
      unoptimized
    />
  );
}

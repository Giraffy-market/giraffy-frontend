'use client';

import './TextContent.scss';

interface AboutContentProps {
  children: React.ReactNode;
  image: React.FC<React.SVGProps<SVGSVGElement>>;
  isReversed?: boolean;
  mobileReverse?: boolean;
}

const TextContent = ({
  children,
  image: Image,
  isReversed,
  mobileReverse,
}: AboutContentProps) => {
  const containerClasses = [
    'text_content',
    isReversed ? 'text_content--reversed' : '',
    mobileReverse ? 'text_content--mobile-rev' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={containerClasses}>
      <div className="block_text">{children}</div>

      <Image
        viewBox="0 0 500 500"
        style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
      />
    </div>
  );
};

export default TextContent;

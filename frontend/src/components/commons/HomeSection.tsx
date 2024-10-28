import { cn } from '../../utils/cn';

interface HomeSectionProps {
  sectionClassName?: string;
  divClassName?: string;
  id: string;
  children: React.ReactElement;
}

export default function HomeSection({
  sectionClassName,
  divClassName,
  id,
  children,
}: HomeSectionProps) {
  return (
    <section className={cn('', sectionClassName)}>
      <div
        className={cn(
          'mx-auto max-w-[56.25rem] py-12 flex flex-col gap-4',
          divClassName
        )}
        id={id}
      >
        {children}
      </div>
    </section>
  );
}

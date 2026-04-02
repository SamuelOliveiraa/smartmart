import { Text } from "./Text";

interface HeaderPageProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
  children?: React.ReactNode;
}

export default function HeaderPage({
  text,
  children,
  ...rest
}: HeaderPageProps) {
  return (
    <header className="w-full flex items-center justify-between" {...rest}>
      <Text size="displayLarge">{text}</Text>
      <div className="flex items-center gap-4">{children}</div>
    </header>
  );
}

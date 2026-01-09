import { Text } from "./Text";

interface HeaderPageProps {
  text: string;
  children?: React.ReactNode;
}

export default function HeaderPage({ text, children }: HeaderPageProps) {
  return (
    <header className="w-full flex items-center justify-between">
      <Text size="displayLarge">{text}</Text>
      <div className="flex items-center gap-4">{children}</div>
    </header>
  );
}

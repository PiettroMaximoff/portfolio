export type StackIcon = "code" | "layers" | "palette" | "wrench" | "rocket" | "people";

export type StackBlock = {
  title: string;
  eyebrow: string;
  icon: StackIcon;
  tags: string[];
};

export type StackSectionContent = {
  kicker: string;
  title: string;
  description: string;
  blocks: StackBlock[];
};

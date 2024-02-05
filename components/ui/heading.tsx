import NavItems from "../shared/NavItems";

interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
      <NavItems />
    </div>
  );
};

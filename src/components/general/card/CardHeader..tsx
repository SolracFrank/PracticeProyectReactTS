interface CardProps {
  title: string;
  toggleExpansion: () => void;
  expanded: boolean;
}

const CardHeader: React.FC<CardProps> = ({
  title,
  toggleExpansion,
  expanded,
}) => {
  return (
    <div className="flex justify-between" onClick={toggleExpansion}>
      <h4 className="text-xl">{title}</h4>
      <h1>
        <svg
          width="30"
          height="30"
          style={{ transform: !expanded ? "rotate(180deg)" : "rotate(0deg)" }} // Rotación del SVG
        >
          <polygon points="15,20 5,10 25,10" fill="lightgray" />
        </svg>
      </h1>
    </div>
  );
};

export default CardHeader;

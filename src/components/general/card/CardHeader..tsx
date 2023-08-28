interface CardProps {
  title: string;
  toggleExpansion: () => void;
  expanded: boolean;
  className?: string;
}

const CardHeader: React.FC<CardProps> = ({
  title,
  toggleExpansion,
  expanded,
  className
}) => {
  return (
    <div className="flex justify-between" onClick={toggleExpansion}>
      <h4 className={`text-xl font-bold text-blue-900 ${className}`}>{title}</h4>
      <h1 className="">
        <svg
          width="30"
          height="30"
          fill="lightgray" 
          style={{ transform: !expanded ? "rotate(180deg)" : "rotate(0deg)" }} // Rotación del SVG ^ v
        >
          <polygon points="15,20 5,10 25,10" className="hover:fill-blue-900" />
        </svg>
      </h1>
    </div>
  );
};

export default CardHeader;

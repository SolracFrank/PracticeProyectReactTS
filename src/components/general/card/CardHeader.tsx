import toggleIcon from "../../../assets/triangle-16.png";
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
  className,
}) => {
  return (
    <div className="flex justify-between" onClick={toggleExpansion}>
      <h4 className={`text-xl font-bold text-blue-900 ${className}`}>
        {title}
      </h4>
      <img
        src={toggleIcon}
        alt="toggleIcon"
        className="h-4"
        style={{ transform: !expanded ? "rotate(0deg)" : "rotate(180deg)" }}
      />
    </div>
  );
};

export default CardHeader;

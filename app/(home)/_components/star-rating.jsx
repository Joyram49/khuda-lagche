import { cn } from "@/lib/utils"; // Import the cn function

const StarRating = ({ rating, maxRating = 5, fontSize = 24, className }) => {
  const fullStars = Math.floor(rating); // Number of fully filled stars
  const partialStar = rating - fullStars; // Fractional part for the last star
  const emptyStars = maxRating - Math.ceil(rating); // Remaining empty stars

  return (
    <div className={cn("star-rating flex", className)}>
      {/* Render fully filled stars */}
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <span
            key={index}
            className={cn("star", "filled", "text-yellow-500")}
            style={{ fontSize: `${fontSize}px` }} // Dynamically set font size
          >
            ★
          </span>
        ))}

      {/* Render the partially filled star */}
      {partialStar > 0 && (
        <span
          className={cn(
            "star",
            "filled",
            "partial",
            "relative text-yellow-500"
          )}
          style={{
            fontSize: `${fontSize}px`,
            "--fill-percent": partialStar * 100 + "%",
          }}
        >
          ★
        </span>
      )}

      {/* Render remaining empty stars */}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <span
            key={index}
            className={cn("star", "empty", "text-gray-300")}
            style={{ fontSize: `${fontSize}px` }} // Dynamically set font size
          >
            ☆
          </span>
        ))}
    </div>
  );
};

export default StarRating;

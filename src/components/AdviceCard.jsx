import { useEffect, useState } from "react";
import iconDice from "../assets/icon-dice.svg";
import dividerMobile from "../assets/pattern-divider-mobile.svg";
import dividerDesktop from "../assets/pattern-divider-desktop.svg";

function AdviceCard() {
  const [advice, setAdvice] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch advice from the Advice Slip API and update states
  const fetchAdvice = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.adviceslip.com/advice");

      // Throw error for non-2xx responses
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      // Extract the advice object from the response JSON
      const data = await response.json();

      // Set advice state with the slip data
      setAdvice(data.slip);
    } catch (error) {
      // Set a user-friendly error message
      setError("Oops! Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch advice on component mount
  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <>
      {(isLoading || error) && (
        <div className="flex items-center justify-center min-h-[300px]">
          {/* Show loading message while advice is being fetched */}
          {isLoading && (
            <p className="text-xl md:text-2xl lg:text-3xl text-center">
              Loading...
            </p>
          )}

          {/* Show error message if fetch fails */}
          {error && (
            <p className="text-md md:text-lg lg:text-xl text-center">{error}</p>
          )}
        </div>
      )}

      {/* Show advice card if data is available and no error */}
      {!isLoading && !error && advice.advice && (
        <article className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-auto px-6 py-8 md:py-10 bg-blue-900 rounded-md md:rounded-lg">
          <h1 className="mb-6 text-[10px] md:text-[11px] lg:text-[12px] font-bold text-green-300 text-center tracking-[0.35em]">
            ADVICE #{advice.id}
          </h1>
          <p className="mb-6 md:mb-10 text-xl md:text-2xl lg:text-3xl font-semibold text-center">
            "{advice.advice}"
          </p>

          {/* Show mobile divider on small screens, desktop divider on md and up */}
          <img
            src={dividerMobile}
            alt="Divider"
            loading="lazy"
            className="w-full mb-6 mx-auto block md:hidden"
          />
          <img
            src={dividerDesktop}
            alt="Divider"
            loading="lazy"
            className="w-full mb-6 mx-auto px-2 hidden md:block"
          />

          {/* Button to fetch new advice on click */}
          <button
            onClick={fetchAdvice}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 p-4 bg-green-300 rounded-full cursor-pointer 
            transition duration-300 hover:shadow-[0_0_30px_8px_rgba(82,255,168,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:white"
          >
            <img src={iconDice} alt="Generate new advice" className="w-5 h-5" />
          </button>
        </article>
      )}

      {/* Fallback if API responds without expected data */}
      {!isLoading && !error && advice && !advice.advice && (
        <p className="text-md md:text-lg lg:text-xl text-center">
          No advice found in the response.
        </p>
      )}
    </>
  );
}

export default AdviceCard;

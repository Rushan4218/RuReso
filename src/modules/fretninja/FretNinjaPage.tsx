import { FretNinjaContent } from "./FretNinjaContent";
import { FretNinjaProvider } from "./providers/FretNinjaProvider";

const FretNinjaPage = () => {
  return (
    <FretNinjaProvider>
      <FretNinjaContent />
    </FretNinjaProvider>
  );
};
export { FretNinjaPage };

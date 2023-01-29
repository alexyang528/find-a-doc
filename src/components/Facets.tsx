import * as React from "react";
import { useSearchState, useSearchActions } from "@yext/search-headless-react";
import Facet from "./Facet";

export const Facets: React.FC = () => {
  const facets = useSearchState((s) => s.filters.facets);

  if (!facets) {
    return <></>;
  }

  return (
    <div className="my-auto py-2 flex flex-wrap gap-x-4 gap-y-2">
      {facets?.map((facet) => {
        return <Facet key={facet.fieldId} {...facet} />;
      })}
    </div>
  );
};

export default Facets;

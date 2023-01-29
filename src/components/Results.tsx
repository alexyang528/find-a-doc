import * as React from "react";
import "../index.css";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  VerticalResults,
  LocationBias,
  ResultsCount,
  Pagination,
  FilterSearch,
  OnSelectParams,
} from "@yext/search-ui-react";
import Facets from "./Facets";
import ProviderCard from "./ExampleProviderCard";
import NoResults from "./NoResults";

const Results = () => {
  const actions = useSearchActions();
  const results = useSearchState((s) => s.vertical.results);

  const handleSearch = (filter: OnSelectParams) => {
    actions.setStaticFilters([
      {
        selected: true,
        filter: filter.newFilter,
        displayName: filter.newDisplayName,
      },
    ]);
    actions.executeVerticalQuery();
  };

  return (
    <div className="px-4 py-8">
      <div className="mx-auto flex max-w-5xl flex-col">
        <FilterSearch
          searchFields={[
            {
              entityType: "healthcareProfessional",
              fieldApiName: "name",
            },
            {
              entityType: "healthcareProfessional",
              fieldApiName: "builtin.location",
            },
            {
              entityType: "healthcareProfessional",
              fieldApiName: "c_specialty.name",
            },
          ]}
          sectioned={true}
          onSelect={handleSearch}
          placeholder="Search by name, location, or specialty..."
        />
        <Facets />
        <ResultsCount
          customCssClasses={{
            resultsCountContainer: "text-sm text-gray-700 font-normal m-0",
          }}
        />
        <VerticalResults
          CardComponent={ProviderCard}
          displayAllOnNoResults={false}
          customCssClasses={{
            verticalResultsContainer:
              "grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          }}
        />
        <Pagination />
        {results && results?.length < 1 && <NoResults />}
        <LocationBias customCssClasses={{ locationBiasContainer: "pt-8" }} />
      </div>
    </div>
  );
};

export default Results;

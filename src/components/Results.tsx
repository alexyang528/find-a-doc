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
  Geolocation,
  Facets,
} from "@yext/search-ui-react";
import ProviderCard from "./ExampleProviderCard";
import NoResults from "./NoResults";
import { StandardFacet } from "@yext/search-ui-react";

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

        <ResultsCount
          customCssClasses={{
            resultsCountContainer: "text-md text-gray-700 font-normal m-0",
          }}
        />
        <div className="flex">
          <Facets customCssClasses={{ facetsContainer: "w-56" }}>
            <StandardFacet
              fieldId="c_specialty.name"
              label="Specialty"
              defaultExpanded={false}
            />
            <StandardFacet
              fieldId="c_specialty.c_relatedConditions.name"
              label="Conditions"
              defaultExpanded={false}
            />
            <StandardFacet
              fieldId="c_specialty.c_relatedProcedures.name"
              label="Procedures"
              defaultExpanded={false}
            />
            <StandardFacet
              fieldId="c_specialty.c_relatedReasonsForVisit.name"
              label="Reasons for Visit"
              defaultExpanded={false}
            />
          </Facets>
          <div className="mx-8">
            <VerticalResults
              CardComponent={ProviderCard}
              displayAllOnNoResults={false}
              customCssClasses={{
                verticalResultsContainer:
                  "grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
              }}
            />
          </div>
        </div>
        <Pagination />
        {results && results?.length < 1 && <NoResults />}
        <Geolocation customCssClasses={{ geolocationContainer: "pt-8" }} />
      </div>
    </div>
  );
};

export default Results;

// src/templates/search.tsx

import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
} from "@yext/pages";
import "../index.css";
import {
  SearchHeadlessProvider,
  useSearchActions,
  provideHeadless,
  HeadlessConfig,
} from "@yext/search-headless-react";
import {
  ApplyFiltersButton,
  SearchBar,
  StandardCard,
  VerticalResults,
  SpellCheck,
  ResultsCount,
  Pagination,
  FilterSearch,
  OnSelectParams,
} from "@yext/search-ui-react";
import ProviderCard from "../components/ExampleProviderCard";
import Results from "../components/Results";

export const getPath: GetPath<TemplateProps> = () => {
  return "search";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Find a Doctor",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const headlessConfig: HeadlessConfig = {
  apiKey: "5472b483d43f25c6dd83c68bb313900f",
  experienceKey: "find-a-doc",
  locale: "en",
  verticalKey: "healthcare_professionals",
};

const searcher = provideHeadless(headlessConfig);

const Search: Template<TemplateRenderProps> = () => {
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <Results />
    </SearchHeadlessProvider>
  );
};

export default Search;

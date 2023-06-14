// src/components/ExampleProviderCard.tsx

import * as React from "react";
import { WindowIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { CardComponent, CardProps } from "@yext/search-ui-react";
import Provider from "../types/healthcare_professionals";

const ProviderCard: CardComponent<Provider> = ({
  result,
}: CardProps<Provider>): JSX.Element => {
  const provider = result.rawData;
  const distance = result.distanceFromFilter
    ? result.distanceFromFilter
    : result.distance;

  // function that takes a date in the format YYYY-MM-DD and returns date in the format Month Day, Year
  const formatDate = (date: string): string => {
    if (!date) return "";

    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <li
      key={provider.id}
      className="col-span-1 flex flex-col rounded-lg bg-white text-center shadow-md"
    >
      <div className="flex flex-1 flex-col py-8 px-4">
        {distance && (
          <div className="flex justify-end">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-800 italic">
              {Math.round(distance * 0.000621371)} mi
            </span>
          </div>
        )}
        {provider.headshot?.url && (
          <img
            className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
            src={provider.headshot?.url}
            alt=""
          />
        )}

        {!provider.headshot?.url && (
          <div className="mx-auto h-32 w-32 flex-shrink-0 rounded-full bg-gray-100" />
        )}

        <h3 className="mt-6 text-sm font-medium text-gray-900">
          {provider.name}
        </h3>

        <dl className="mt-1 flex flex-grow flex-col justify-top">
          <dt className="sr-only">Specialties</dt>
          <dd className="text-sm text-gray-700">
            {provider.c_specialty
              ?.map((specialty) => specialty.name)
              .join(", ")}
          </dd>
          <br />
          <dd className="text-sm text-gray-700">
            {provider.address?.line1}
            {provider.address?.line2 && (
              <>
                <br />
                {provider.address?.line2}
              </>
            )}
            <br />
            {provider.address?.city
              ? `${provider.address?.city}, ${provider.address?.region}`
              : null}
            {provider.address?.postalCode}
          </dd>
        </dl>
      </div>
      <div>
        <div className="flex">
          {provider.mainPhone && (
            <div className="flex w-0 flex-1">
              <a
                href={`tel:${provider.mainPhone}`}
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                <PhoneIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="ml-3">Call</span>
              </a>
            </div>
          )}
          {provider.landingPageUrl && (
            <div className="-ml-px flex w-0 flex-1">
              <a
                href={provider.landingPageUrl}
                className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                <WindowIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="ml-3">Website</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default ProviderCard;

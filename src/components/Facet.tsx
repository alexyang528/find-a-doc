import * as React from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  useSearchActions,
  DisplayableFacet,
} from "@yext/search-headless-react";
import cx from "classnames";
import { BsCaretDownFill } from "react-icons/bs";

const Facet: React.FC<DisplayableFacet> = ({
  fieldId,
  options,
  displayName,
}) => {
  const searchActions = useSearchActions();
  const selectedOptions = options.filter((option) => option.selected);
  const nameOverrides: { [name: string]: string } = {
    "Specialty Name": "Specialty",
    "Specialty Related Conditions Name": "Conditions",
    "Specialty Related Procedures Name": "Procedures",
    "Specialty Related Reasons for Visit Name": "Reasons for Visit",
    "Expertise Filter": "Expertise",
  };
  const overridedName = nameOverrides.hasOwnProperty(displayName)
    ? nameOverrides[displayName]
    : displayName;
  return (
    <div className="my-auto text-xs overflow-none text-neutral-900">
      <Popover>
        <Popover.Button
          className={cx(
            selectedOptions.length > 0 ? "bg-stone-200" : "bg-white",
            "flex flex-row focus:outline-none px-3 py-2 rounded-md border border-neutral-300 shadow-sm text-neutral-dark text-sm font-medium text-left"
          )}
        >
          {selectedOptions.length > 0
            ? `${overridedName} (${selectedOptions.length})`
            : overridedName}
          <BsCaretDownFill className="ml-2 my-auto" />
        </Popover.Button>
        <Transition
          enter="transition duration-250 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-150 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel className="z-50focus:outline-none w-96 absolute top-34 px-2 py-3 bg-white border border-stone-200 rounded-md shadow-md max-h-96 overflow-auto flex flex-col gap-y-2">
            {options.map((option) => {
              return (
                <div
                  key={option.displayName}
                  className="flex items-center space-x-3 peer"
                >
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-primary focus:ring-primary"
                    checked={option.selected}
                    onClick={() => {
                      searchActions.setFacetOption(
                        fieldId,
                        option,
                        !option.selected
                      );
                      searchActions.executeVerticalQuery();
                    }}
                  />
                  <label className="text-neutral text-sm font-normal">
                    <span className="">{option.displayName}</span>
                    <span className="">{` (${option.count})`}</span>
                  </label>
                </div>
              );
            })}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default Facet;

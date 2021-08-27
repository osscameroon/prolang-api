import { forwardRef, Fragment } from 'react';
import classNames from 'classnames';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

type SelectInputOption = {
  label: string;
  value: string;
};

type SelectInputProps = {
  className?: string;
  defaultValue?: SelectInputOption;
  options: SelectInputOption[];
  value: SelectInputOption;
  onChange: (value: SelectInputOption) => void;
};

const SelectInput = forwardRef<HTMLDivElement, SelectInputProps>((props: SelectInputProps, ref) => {
  const { className = 'w-40', onChange, options, value: selectedValue } = props;

  const generateOptionClasses = (isActive: boolean) => {
    return classNames({
      'cursor-default select-none relative py-2 pl-10 pr-4': true,
      'text-gray-900': !isActive,
      'text-purple-900 bg-purple-100': isActive,
    });
  };

  const generateOptionLabelClasses = (isSelected: boolean) => {
    return classNames({
      'block truncate': true,
      'font-medium': isSelected,
      'font-normal': !isSelected,
    });
  };

  return (
    <div ref={ref} className={className}>
      <Listbox value={selectedValue} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{selectedValue.label}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) => generateOptionClasses(active)}
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span className={generateOptionLabelClasses(selected)}>{option.label}</span>
                      {selected ? (
                        <span className={'text-amber-600 absolute inset-y-0 left-0 flex items-center pl-3'}>
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
});

SelectInput.displayName = 'SelectInput';

export { SelectInput };

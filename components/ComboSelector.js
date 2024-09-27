import React, { useState } from 'react';
import { Combobox, Transition, Fragment } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const ComboSelector = ({ data, name, id, value, onChange }) => {
    const [query, setQuery] = useState('');

    const filteredData = query === '' ? data : data.filter( (attr) => {
        return attr.toLowerCase().includes(query.toLowerCase());
    } );

    return (
        <Combobox 
            name={name}
            id={id}
            value={value} 
            onChange={onChange}
        >
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input 
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        value={query}
                        displayValue={value}
                        // onBlur={() => setQuery('')}
                        onChange={(event) => setQuery(event.target.value)} />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    style={{ position: 'absolute', zIndex: 5, width: '100%' }} /* These styles allow dropdown options to "float" over rest of on-screen elements. Prevents dropdown options from "pushing" the rest of the DOM down. */
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options>
                        {filteredData.map((dataItem, idx) => (
                            <Combobox.Option key={idx} value={dataItem} 
                                className={({ active }) => `relative cursor-pointer bg-slate-200 select-none py-2 pl-10 pr-4 ${ active ? 'bg-teal-600 text-white' : 'text-gray-900' }` }
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`block truncate ${ selected ? 'font-medium' : 'font-normal' }`}>
                                            {dataItem}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${ active ? 'text-white' : 'text-teal-600' }`} >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
};

export default ComboSelector;
import React from 'react';

interface OptionsItem {
    value: string;
}

interface FilterProps {
    title?: string;
    label: string;
    htmlFor: string;
    name: string;
    id: string;
    options: OptionsItem[];
    onClear?: () => void; // Optional function to clear active filters
}

interface FilterList {
    filters: FilterProps[];
}

export default function Filter(props: FilterList) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] justify-center items-center  text-white gap-2 mx-2">
            {props.filters && props.filters.length > 0 && props.filters.map((filter, index) => (
                <div key={index} className="flex flex-col bg-white my-2 rounded-md">
                    <label htmlFor={filter.htmlFor} className="text-sm font-medium text-gray-300">
                        {filter.label}
                        <select name={filter.name} id={filter.id} defaultValue="" className="text-black px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="" disabled hidden >
                                
                            </option>
                            {filter.options && filter.options.length > 0 && filter.options.map((option, optIndex) => (
                                <option key={optIndex} value={option.value}>
                                    {option.value.charAt(0).toUpperCase() + option.value.slice(1)}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            ))}
        </div>
    );
}
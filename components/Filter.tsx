import { FilterList } from "@/app/(dashboard)/dashboard/page";
import { useState } from "react";

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
}

interface FilterList {
    filters: FilterProps[];
}

export default function Filter({ filters }: FilterList) {
    // Initialize state object: { filterName: "selectedValue" }
    const [ filterValues, setFilterValues ] = useState<Record<string, string>>(() =>
        filters.reduce((acc, filter) => ({ ...acc, [filter.name]: "" }), {})
    );

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilterValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        console.log('dadadfadaf')
        setFilterValues(
            filters.reduce((acc, filter) => ({ ...acc, [filter.name]: "" }), {})
        );
    };
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3 mx-auto p-4  rounded-xl">
            {filters && filters.length > 0 && filters.map((filter) => (
                <div key={filter.id || filter.name} className="relative flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                    {/* Screen reader only label for accessibility */}
                    <label htmlFor={filter.id} className="sr-only">
                        {filter.label}
                    </label>
                    <select name={filter.name}
                        value={filterValues[filter.name]}
                        id={filter.id}
                        onChange={handleChange}
                        className="appearance-none w-full text-gray-800 text-sm font-medium px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-transparent cursor-pointer">
                        {/* Use the label as the default placeholder text to match the image */}
                        <option value="" disabled hidden>{filter.label}</option>

                        {filter.options && filter.options.length > 0 && filter.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.value.charAt(0).toUpperCase() + option.value.slice(1)}
                            </option>
                        ))}
                    </select>
                    {/* Custom Chevron to replace the default select arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            ))}
            <div onClick={handleReset} className="relative flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                <button type="button" onClick={handleReset}
                    className="flex items-center justify-between w-full sm:w-auto px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 text-gray-800 text-sm font-medium transition-colors outline-none hover:cursor-pointer">
                    <span>Reset filters</span>

                    {/* Counter-clockwise Undo Arrow SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="w-4 h-4 ml-2 text-gray-600" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
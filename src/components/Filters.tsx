import { X, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { FiltersProps, FiltersType } from "../interfaces/homeInterface";

const Filters: React.FC<FiltersProps> = ({  
    handleViewMode, 
    view, 
    filters, 
    updateFilters, 
    filterOptions,
    closeFilter
}) => {
    const [localStatus, setLocalStatus] = useState<string[]>(filters.status || []);
    const [selectedCategory, setSelectedCategory] = useState<"owners" | "law_firms" | "attorneys">("owners");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilters, setSelectedFilters] = useState<string[]>(filters[selectedCategory] || []);

    useEffect(() => {
        const newFilters: FiltersType = { 
            ...filters, 
            status: localStatus, 
            [selectedCategory]: selectedFilters 
        };
        updateFilters(newFilters);
    }, [localStatus, selectedFilters, selectedCategory]);

    const toggleStatus = (status: string) => {
        setLocalStatus((prev) =>
            prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
        );
    };

    const handleFilterSelection = (value: string) => {
        setSelectedFilters((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const filteredOptions = filterOptions[selectedCategory].filter((item: string) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
    );

  

    return (
        <div className="relative h-full overflow-auto">
            <div className="md:hidden absolute top-4 right-4 z-10">
                <button 
                    onClick={() => {closeFilter(false)}}
                    className="p-2 rounded-full bg-gray-100"
                >
                    <X className="h-6 w-6 text-gray-600" />
                </button>
            </div>

            <div className="p-4 space-y-3">
                <div className="px-3 py-6 rounded-lg border bg-white shadow-xl">
                    <h3 className="text-black font-bold text-base mb-3">Status</h3>
                    <div className="flex flex-wrap gap-2">
                        {["All","Registered", "Pending", "Abandoned", "Others"].map((status) => (
                            <button
                                key={status}
                                className={`px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1 ${
                                    localStatus.includes(status)
                                        ? "bg-blue-100 text-blue-600 border border-blue-300"
                                        : "bg-white text-gray-600 border border-gray-300"
                                }`}
                                onClick={() => toggleStatus(status)}
                            >
                                <span
                                    className={`h-2 w-2 rounded-full ${
                                        status === "Registered"
                                            ? "bg-green-500"
                                            : status === "Pending"
                                            ? "bg-yellow-500"
                                            : status === "Abandoned"
                                            ? "bg-red-500"
                                            : status == "Others" 
                                            ?"bg-blue-500"
                                            : "bg-white"
                                    }`}
                                ></span>
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border shadow-xl bg-white rounded-lg px-3 py-6">
                    <div className="flex items-center justify-between mb-3">
                        {(["owners", "law_firms", "attorneys"] as const).map((category) => (
                            <button
                                key={category}
                                className={`text-gray-500 hover:underline ${
                                    selectedCategory === category ? "font-bold text-black" : ""
                                }`}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setSelectedFilters(filters[category] || []);
                                    setSearchQuery("");
                                }}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1).replace("_", " ")}
                            </button>
                        ))}
                    </div>

                    <div className="p-3 rounded-lg space-y-3">
                        <div className="relative">
                            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
                            <input
                                placeholder={`Search ${selectedCategory}`}
                                className="pl-8 text-sm w-full border p-2 rounded-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 mt-2 max-h-40 overflow-y-auto bg-[#F1F1F1] p-2 rounded-lg">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option: any) => (
                                    <div key={option} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={option}
                                            checked={selectedFilters.includes(option)}
                                            onChange={() => handleFilterSelection(option)}
                                        />
                                        <label htmlFor={option} className="text-sm cursor-pointer">
                                            {option}
                                        </label>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No results found</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border shadow-xl bg-white rounded-lg px-3 py-6">
                    <h3 className="font-medium mb-3">Display</h3>
                    <div className="grid grid-cols-2 gap-2 bg-[#F1F1F1] p-2 rounded-lg">
                        <button
                            onClick={() => handleViewMode("grid")}
                            className={`py-2 px-3 text-sm font-normal rounded-md transition-colors ${
                                view === "grid" ? "bg-white text-black shadow-md" : "bg-transparent text-gray-500"
                            }`}
                        >
                            Grid View
                        </button>
                        <button
                            onClick={() => handleViewMode("list")}
                            className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                                view === "list" ? "bg-white text-black shadow-md" : "bg-transparent text-gray-500"
                            }`}
                        >
                            List View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;
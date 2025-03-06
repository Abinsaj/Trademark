import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import { Filter } from 'lucide-react';
import TrademarkList from '../components/TrademarkList';
import Filters from '../components/Filters';
import { getTradeMarkList } from '../api/trademarkService';
import { FiltersType } from '../interfaces/homeInterface';
import { toast } from 'sonner';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [result, setResult] = useState<any[]>([]);
    const [originalResult, setOriginalResult] = useState<any[]>([]);
    const [view, setView] = useState<'grid' | 'list'>('list');
    const [filters, setFilters] = useState<FiltersType>({});

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        setIsLoading(true);
        try {
            const data = await getTradeMarkList(query, filters);
            if (data && data.body) {
                const hits = data.body.hits.hits;
                setResult(hits);
                setOriginalResult(hits);
            } else {
                toast.error(`No results found for ${query}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while fetching trademark data. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }
    
    useEffect(()=>{
        setResult([])
    },[searchQuery])

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    }

    const closeFilter = (val: boolean)=>{
        setShowFilters(val)
      }

    const handleViewMode = (mode: 'grid' | 'list') => {
        setView(mode);
    }

    const updateFilters = (newFilters: FiltersType) => {
        setFilters(newFilters);
        applyFilters(newFilters)
    };

    const applyFilters = (newFilters: FiltersType) => {
        if (!originalResult.length) return;

        let filteredResults = [...originalResult];
        if (newFilters.status && newFilters.status.length > 0) {
            filteredResults = filteredResults.filter(trademark =>
                newFilters.status!.some(status =>
                    status.toLowerCase() === trademark._source.status_type.toLowerCase()
                )
            );
        }
        if (newFilters.owners && newFilters.owners.length > 0) {
            filteredResults = filteredResults.filter(trademark =>
                newFilters.owners!.includes(trademark._source.current_owner)
            );
        }
        if (newFilters.law_firms && newFilters.law_firms.length > 0) {
            filteredResults = filteredResults.filter(trademark =>
                newFilters.law_firms!.includes(trademark._source.law_firm)
            );
        }
        if (newFilters.attorneys && newFilters.attorneys.length > 0) {
            filteredResults = filteredResults.filter(trademark =>
                newFilters.attorneys!.includes(trademark._source.attorney_name)
            );
        }

        setResult(filteredResults);
    };

    const getFilterOptions = (key: keyof FiltersType) => {
        if (!originalResult.length) return [];

        const uniqueOptions = new Set<string>();
        originalResult.forEach(item => {
            let value = '';
            switch (key) {
                case 'status':
                    value = item._source.status_type;
                    break;
                case 'owners':
                    value = item._source.current_owner;
                    break;
                case 'law_firms':
                    value = item._source.law_firm;
                    break;
                case 'attorneys':
                    value = item._source.attorney_name;
                    break;
            }
            if (value) uniqueOptions.add(value);
        });

        return Array.from(uniqueOptions).sort();
    };

    const filterOptions = {
        status: getFilterOptions('status'),
        owners: getFilterOptions('owners'),
        law_firms: getFilterOptions('law_firms'),
        attorneys: getFilterOptions('attorneys')
    };

    return (
        <div className="min-h-screen">
            <div className='w-full px-4 py-6 bg-[#F8FAFE]'>
                <div className='flex flex-col md:flex-row items-center mb-4'>
                    <div className='w-full md:w-auto text-center md:text-left mb-4 md:mb-0 md:mr-8'>
                        <img
                            src="https://s3-alpha-sig.figma.com/img/29e3/a292/59a6875d50b71e2c1320ab20e9a4c855?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=egt6iaHgtob4Vbms~MrCi60XbKrQ4Lk-iE2F8YCRkxyx7w-5bjIRZYnb5jvCjqJG~279uz4BaFAVZpV3s-Mva7P6yNpzc0JlaTTd7J58OVwzyUJZhKK-BYoRgTJuUtQ9oatLmdcAeCQpOhfIIM5FajOKnF9t5dsg-8gIjorzLscnKLP0qzh~bgtw-nm8ndALjbq0WSv~nCtFryaTAa0QK9xB-lHhnXRTRyO9e3Lks6LjPJYBJfSOT2lfTmdJ-W~01eLPfHSfsGLcF5CL8P5-A9IeII9MLXAo5vm3VYp2qO3jyTiZwlOnSxoGIIiFvPFbJjNdUl~gjLvDuRnuCYioHA__"
                            alt="Trademarkia"
                            className="h-8 mx-auto md:mx-0"
                            onError={(e) => {
                                e.currentTarget.src = "https://placeholder.svg?height=32&width=150&text=Trademarkia"
                            }}
                        />
                    </div>
                    <div className='flex-1 w-full'>
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
            </div>
            <div className='h-2 bg-[#EAF1FF]'></div>

            <div className='flex w-full items-center justify-center px-5 bg-[#FEFEFE]'>
                <div className="w-full max-w-[1370px] space-y-3 my-3 relative">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                        <div className='mb-4 md:mb-0'>
                            {isLoading == true ? (
                                <p className='font-bold text-gray-600 text-lg'>"Searching..."</p>
                            ) : (
                                <>
                                    {result.length > 0 ? (
                                        <p className="text-gray-700 font-bold text-center md:text-left">
                                            About {result.length} Trademarks found for {searchQuery}
                                        </p>
                                    ) : searchQuery !=='' && result.length == 0 ? (
                                        <p className='font-bold text-gray-600 text-lg'>"No data have been found.."</p>
                                    ):(
                                        <p></p>
                                    )}
                                </>
                            )}
                        </div>
                        <button
                            className="flex items-center border rounded-lg px-4 py-2 gap-2 mx-auto md:mx-0"
                            onClick={toggleFilters}
                        >
                            <Filter className="h-4 w-4" />
                            <span>Filter</span>
                        </button>
                    </div>
                    <div className='flex flex-col md:flex-row w-full'>
                        <div className='flex flex-col w-full'>
                            <TrademarkList viewMode={view} results={result} />
                        </div>
                        <div className={`
                            fixed md:sticky top-0 right-0 w-[352px] max-w-full h-full z-50 
                            transform transition-transform duration-300 ease-in-out
                            ${showFilters ? 'translate-x-0' : 'translate-x-full'}
                            md:translate-x-0 md:block md:max-w-[352px] md:min-w-[352px]
                            bg-white shadow-lg md:shadow-none overflow-y-auto
                        `}>
                            <Filters
                                isVisible={showFilters}
                                handleViewMode={handleViewMode}
                                view={view}
                                filters={filters}
                                updateFilters={updateFilters}
                                filterOptions={filterOptions}
                                closeFilter={closeFilter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
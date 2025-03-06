import { Button, Chip, Skeleton } from "@nextui-org/react";
import formatTimestamp from "../config/dateConfig";
import { Monitor, RefreshCw } from "lucide-react";

interface TrademarkListProps {
    viewMode: string;
    results: any;
}

const TrademarkList = ({ viewMode, results }: TrademarkListProps) => {
    const renderEmptyState = () => (
        <div className="flex w-full h-full justify-center items-center">
            <h1 className="text-gray-500 font-bold">" Search on Trademarkia....."</h1>
        </div>
    );

    const TrademarkImage = ({ src, alt }: { src: string; alt: string }) => {
        if (src == '') {
          return (
            <Skeleton className="rounded-lg">
              <div className="h-[82px] w-[82px] bg-default-200 rounded-lg"></div>
            </Skeleton>
          )
        }
    
        return (
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            className="shadow-lg rounded-lg"
            width={82}
            height={82}
            onError={(e) => {
              e.currentTarget.style.display = "none"
              e.currentTarget.parentElement?.classList.add("skeleton-fallback")
            }}
          />
        )
      }

    const renderGridView = () => {
        if (results.length === 0) return renderEmptyState();

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {results.map((result: any, index: number) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="flex  justify-between items-start">
                            <div className="bg-gray-100 rounded-lg border">
                            <TrademarkImage src={result._source.image_url || ""} alt='' />
                                <h2 className="text-2xl font-bold mb-1">
                                    {result._source.mark_identification}
                                </h2>
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <span className={`h-2 w-2 rounded-full pt-2 ${result._source.status_type == 'registered' ? 'bg-green-500' : 'bg-red-600'}`}></span>
                                    <Chip 
                                        className={`${result._source.status_type == 'registered' ? 'text-green-500' : 'text-red-600'} font-semibold text-lg`} 
                                        size="sm"
                                    >
                                        {result._source.status_type}
                                    </Chip>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    on {formatTimestamp(result._source.registration_date)}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-medium">{result._source.current_owner}</p>
                                    <p className="text-xs text-gray-500">
                                        {result._id} • {formatTimestamp(result._source.first_use_anywhere_date)}
                                    </p>
                                </div>
                                
                                <div className="flex pt-2">
                                    <RefreshCw size={16} className="text-red-600" color="currentColor" />
                                    <p className="text-xs text-gray-900 font-bold">
                                        {formatTimestamp(result._source.renewal_date)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-1">
                                {result._source.class_codes.map((cls: any, clsIndex: number) => (
                                    <span
                                        key={clsIndex}
                                        className="text-xs flex flex-col text-gray-600 px-2 py-0.5"
                                    >
                                        <Monitor className="h-4 w-4 pr-1 text-gray-600" />Class {cls}
                                    </span>
                                ))}
                            </div>

                            <div className="items-center justify-between pt-4">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <p className="text-xs">
                                        {result._source.mark_description_description[0].substring(0, 70)}
                                    </p>
                                </div>
                                <Button
                                    size="sm"
                                    variant="bordered"
                                    className="text-blue-600 border-blue-600 border rounded-md mt-2"
                                >
                                    View
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderListView = () => {
        if (results.length === 0) return renderEmptyState();

        return (
            <div className="overflow-x-auto p-4">
                <table className="w-full table-fixed">
                    <thead className="border-b border-gray-300">
                        <tr>
                            <th className="text-start font-medium p-2">Mark</th>
                            <th className="text-start font-medium p-2">Details</th>
                            <th className="text-start font-medium p-2 w-40">Status</th>
                            <th className="text-start font-medium p-2 w-[300px]">Class/Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        {results.map((result: any) => (
                            <tr key={result.id} className="py-4">
                                <td className="p-2 text-center">
                                    <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded border">
                                    <TrademarkImage src={result._source.image_url || ""} alt='' />
                                    </div>
                                </td>
                                <td className="p-2 text-start">
                                    <div>
                                        <h3 className="font-bold text-lg">{result._source.mark_identification}</h3>
                                        <p className="text-sm text-gray-600 pb-4">{result._source.current_owner}</p>
                                        <p className="text-md text-gray-900 font-bold mt-1">{result._id}</p>
                                        <p className="text-xs text-gray-500">
                                            {formatTimestamp(result._source.first_use_anywhere_date)}
                                        </p>
                                    </div>
                                </td>
                                <td className="p-2 text-start w-40">
                                    <div className="flex items-center gap-1">
                                        <span className={`h-2 w-2 rounded-full pt-2 ${result._source.status_type == 'registered' ? 'bg-green-500' : 'bg-red-600'}`}></span>
                                        <Chip 
                                            className={`${result._source.status_type == 'registered' ? 'text-green-500' : 'text-red-600'} font-semibold text-lg`} 
                                            size="sm"
                                        >
                                            {result._source.status_type}
                                        </Chip>
                                    </div>
                                    <p className="text-xs text-gray-900 pl-3 font-bold">
                                        on {formatTimestamp(result._source.registration_date)}
                                    </p>
                                    <div className="flex pt-8">
                                        <RefreshCw size={16} className="text-red-600" color="currentColor" />
                                        <p className="text-xs text-gray-900 font-bold">
                                            {formatTimestamp(result._source.renewal_date)}
                                        </p>
                                    </div>
                                </td>
                                <td className="p-2 text-start w-[300px]">
                                    <p className="text-sm font-normal text-gray-600">
                                        {result._source.mark_description_description[0].substring(0, 70)}
                                    </p>
                                    {result && result._source.class_codes && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {result._source.class_codes.map((cls: any, index: number) => (
                                                <Chip 
                                                    key={index} 
                                                    className="text-sm font-bold text-gray-500" 
                                                    size="sm"
                                                >
                                                    Class {cls}
                                                </Chip>
                                            ))}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const determineViewMode = () => {
        return window.innerWidth < 1024 ? 'grid' : viewMode;
    };

    return determineViewMode() === 'grid' ? renderGridView() : renderListView();
};

export default TrademarkList;
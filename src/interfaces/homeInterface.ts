export interface TrademarkResult {
    id: string;
    name: string;
    owner: string;
    date: string;
    description: string;
    image?: string;
    status: string;
    classes: string[];
}

export interface FiltersType {
    input_query_type?: string;
    status?: string[];
    exact_match?: boolean;
    date_query?: boolean;
    owners?: string[];
    attorneys?: string[];
    law_firms?: string[];
    mark_description_description?: string[];
    classes?: string[];
    page?: number;
    rows?: number;
    sort_order?: "asc" | "desc";
    states?: string[];
    counties?: string[];
  }


export interface FiltersProps {
    isVisible: ()=>void;
    handleViewMode: (mode: "grid" | "list") => void;
    view: "grid" | "list";
    filters: FiltersType;
    updateFilters: (newFilters: FiltersType) => void;
    filterOptions: any
};
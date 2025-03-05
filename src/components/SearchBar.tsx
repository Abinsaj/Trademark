import { Search } from 'lucide-react'
import { useState } from 'react'

interface SearchBarProps{
    onSearch: (query: string)=>void
}

const SearchBar = ({onSearch}: SearchBarProps) => {
    const [query, setQuery] = useState("")

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault()
        if(query.trim()){
            onSearch(query)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex w-full max-w-3xl gap-2'>
            <div className='relative flex-1'>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className='h-6 w-6 text-gray-400'/>
                </div>
                <input
                    type="text"
                    placeholder="Search Trademark Here eg. Mickey Mouse"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 h-12 rounded-xl border w-full focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
            <button 
                type="submit" 
                className="h-12 px-4 md:px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
            >
                Search
            </button>
        </form>
    )
}

export default SearchBar
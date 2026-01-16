interface SearchBoxProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
}

export default function SearchBox({ placeholder = 'Search...', value, onChange }: SearchBoxProps) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
      <span className="search-icon">🔍</span>
    </div>
  )
}

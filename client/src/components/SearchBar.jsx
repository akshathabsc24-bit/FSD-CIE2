function SearchBar({ search, setSearch }) {
    return (
        <div style={{ marginBottom: "20px" }}>
            <input
                type="text"
                placeholder="🔍 Search recipes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "14px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    fontSize: "16px",
                    boxSizing: "border-box"
                }}
            />
        </div>
    );
}

export default SearchBar;
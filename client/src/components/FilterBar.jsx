function FilterBar({ category, setCategory }) {
    return (
        <div
            style={{
                display: "flex",
                gap: "12px",
                marginBottom: "30px",
                flexWrap: "wrap"
            }}
        >
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                    padding: "12px 15px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "15px",
                    background: "white"
                }}
            >
                <option value="All">All Categories</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
            </select>
        </div>
    );
}

export default FilterBar;
import "../Styles/FilterSelect.css"

const FilterSelect = ({ value, onChange }) => {
    return (
        <div className="filter-select">
            <select value={value} onChange={e => onChange(e.target.value)}>
                <option value="">All</option>
                <option value="todo">todo</option>
                <option value="In progress">In progress</option>
                <option value="done">done</option>
            </select>
        </div>
    );
}
export default FilterSelect;
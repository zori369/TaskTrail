import '../App.scss';

function SortTasks() {
    return (
        <div className="tasks__sort">
            <h3 className="sort__title">Sort tasks by:</h3>
            <div className="sort__dropdown">
                <div className="dropdown__options">
                    <p className="option">Priority (High to Low)</p>
                    <p className="option">Priority (Low to High)</p>
                    <p className="option">Recently added</p>
                    <p className="option">Oldest added</p>
                    <p className="option">Deadline (Soonest first)</p>
                    <p className="option">Deadline (Latest first)</p>
                    <p className="option">Name (A - Z)</p>
                    <p className="option">Name (Z - A)</p>
                </div>
                <img className="dropdown__arrow" alt="arrow" src="/Images/arrow-up.svg"/>
            </div>
        </div>
    );
}

export default SortTasks;

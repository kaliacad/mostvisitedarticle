export const ListItems = ({ item }) => {
    return (
        <div className='item-list'>
            <h1>Liste des Items</h1>
            <div className='item-header'>
                <span className='header-rank'>Rang</span>
                <span className='header-page'>Page</span>
                <span className='header-modifications'>Modifications</span>
                <span className='header-editors'>Rédacteurs</span>
                <span className='header-views'>Pages vues</span>
                <span className='header-action'>Action</span>
            </div>

            {item.map((element, i) => (
                <div className='item' key={i}>
                    <span className='item-rank'>{element.rank}</span>
                    <span className='item-page'>{element.page}</span>
                    <span className='item-modifications'>{element.modifications}</span>
                    <span className='item-editors'>{element.editors}</span>
                    <span className='item-views'>{element.views}</span>
                    <button className='action-btn'>Voir plus</button>
                </div>
            ))}
        </div>
    );
};

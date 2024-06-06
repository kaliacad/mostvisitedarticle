export const Menu = ({ data, title }) => {
    return (
        <div className='selection'>
            <label className='country'>{title}</label>
            <select id='pays' name='pays' className='pays'>
                <option>Cliquer pour selectionner</option>
                {data.map((el, i) => (
                    <option key={i} value={el}>
                        {el}
                    </option>
                ))}
            </select>
        </div>
    );
};

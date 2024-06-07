const TableauResultat = ({ articles }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Pays</th>
                    <th>Article</th>
                    <th>Visites</th>
                </tr>
            </thead>
            <tbody>
                {articles.map((article, index) => (
                    <tr key={index}>
                        <td>{article.country}</td>
                        <td>{article.title}</td>
                        <td>{article.visits}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableauResultat;

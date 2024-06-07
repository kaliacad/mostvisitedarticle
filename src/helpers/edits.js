async function getEditCount(articleTitle, project) {
    const url = `https://wikimedia.org/api/rest_v1//metrics/edits/per-page/${project}/${encodeURIComponent(articleTitle)}/all-editor-types/daily/20220401/20240601`;
    // metrics/edits/per-page/${encodeURIComponent(articleTitle)}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items) {
            const editCount = data.items[0].results;
            return editCount.reduce((acc, item) => acc + item.edits, 0);
        } else return 'not found';
    } catch (error) {
        return `Erreur lors de la récupération du nombre d'éditions: ${error}`;
    }
}

export default getEditCount;

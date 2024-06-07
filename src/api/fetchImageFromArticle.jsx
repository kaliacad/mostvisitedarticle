import axios from 'axios';

const fetchImageFromArticle = async (project, title) => {
    try {
        const response = await axios.get(`https://${project}.org/w/api.php`, {
            params: {
                action: 'query',
                prop: 'images',
                titles: title,
                formatversion: 2,
                format: 'json',
                origin: '*',
            },
        });

        const pages = response.data.query.pages;
        if (!pages || Object.keys(pages).length === 0) {
            throw new Error('No pages found');
        }

        const page = pages[Object.keys(pages)[0]];
        if (!page.images || page.images.length === 0) {
            throw new Error('No images found');
        }
        const imageTitle = page.images[0].title;
        const imageResponse = await axios.get(`https://${project}.org/w/api.php`, {
            params: {
                action: 'query',
                prop: 'imageinfo',
                titles: imageTitle,
                iiprop: 'mediatype|size|timestamp|url',
                formatversion: 2,
                format: 'json',
                origin: '*',
            },
        });
        const imageURL = imageResponse.data.query.pages[0].imageinfo[0].url;

        return imageURL;
    } catch (error) {
        return null;
    }
};

export default fetchImageFromArticle;

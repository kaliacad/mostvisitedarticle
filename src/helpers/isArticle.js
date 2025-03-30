const PREFIXES = ['Special', 'Wikipedia', 'Media'];
export default function isArticle(title, wikiInfo) {
    const skip = ['-', '404.php', 'XHamster', wikiInfo.mainpage];

    const prefixes = PREFIXES.concat(wikiInfo.namespaces);

    if (skip.includes(title)) {
        return false;
    }

    for (const prefix of prefixes) {
        if (title.startsWith(prefix + ':')) {
            return false;
        }
    }

    return true;
}

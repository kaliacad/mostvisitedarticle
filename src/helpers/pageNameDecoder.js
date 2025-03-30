const pageNameDecoder = (page) => {
    if (page !== undefined && page !== null) {
        return page?.includes('_') ? page.replace(/_/g, ' ') : page;
    } else {
        return 'N/A';
    }
};

export default pageNameDecoder;

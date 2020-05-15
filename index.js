const NOT_ANSWERED_REGEX = /^(not\sanswered)$/i;

const parseRating = (val, options = {}) => {
    const { min = 0, max = 10 } = options;
    const numberVal = parseInt(val);

    if (numberVal >= min && numberVal <= max) {
        return numberVal;
    }

    return '';
};

const trim = (str) => {
    return str.trim();
};

const isDefined = (val) => {
    return typeof val !== 'undefined' && val !== null;
};

const formatStringResponse = (val) => {
    if (!isDefined(formattedVal)) {
        return '';
    }

    const formattedVal = trim(val);
    if (NOT_ANSWERED_REGEX.test(formattedVal)) {
        return '';
    }

    return formattedVal;
};

const getValueOrFallback = (val) => {
    if (!isDefined(formattedVal)) {
        return '';
    }

    const arr = val
        .split('|')
        .map(trim)
        .filter((str) => !NOT_ANSWERED_REGEX.test(str));

    if (arr[0]) {
        return arr[0];
    }

    return '';
};

module.exports.format = (event, context, callback) => {
    try {
        const data = JSON.parse(event.body);

        const recommendHutson = parseRating(data.recommendHutson);

        const onlineRating = parseRating(data.onlineRating);

        const partsRating = parseRating(data.partsRating);

        const serviceRating = parseRating(data.serviceRating);

        const salesRating = parseRating(data.salesRating);

        const offeredPartsAlternatives = formatStringResponse(
            data.offeredPartsAlternatives
        );

        const accurateQuote = formatStringResponse(data.accurateQuote);

        const contactedAfterPurchase = formatStringResponse(
            data.contactedAfterPurchase
        );

        const onlineSuggestions = formatStringResponse(data.onlineSuggestions);

        const comments = formatStringResponse(data.comments);

        const changesForHigherRating = formatStringResponse(
            data.changesForHigherRating
        );

        const needToContact = getValueOrFallback(data.needToContact);

        const name = getValueOrFallback(data.name);

        const company = getValueOrFallback(data.company);

        const address = getValueOrFallback(data.address);

        const phone = getValueOrFallback(data.phone);

        const email = getValueOrFallback(data.email);

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                recommendHutson,
                onlineRating,
                partsRating,
                serviceRating,
                salesRating,
                offeredPartsAlternatives,
                accurateQuote,
                contactedAfterPurchase,
                onlineSuggestions,
                comments,
                changesForHigherRating,
                needToContact,
                name,
                company,
                address,
                phone,
                email,
            }),
        });
    } catch (error) {
        callback(Error(error));
    }
};

function convertFormData(obj) {
    const formData = new FormData();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            // Handle File objects separately
            if (value instanceof File) {
                formData.append(key, value, value.name);
            } else {
                formData.append(key, value);
            }
        }
    }

    return formData;
}

function replaceSpecialCharacters(value) {
    const specialCharacters = {
        'á': 'a',
        'à': 'a',
        'ả': 'a',
        'ã': 'a',
        'ạ': 'a',
        'ă': 'a',
        'ắ': 'a',
        'ằ': 'a',
        'ẳ': 'a',
        'ẵ': 'a',
        'ặ': 'a',
        'â': 'a',
        'ấ': 'a',
        'ầ': 'a',
        'ẩ': 'a',
        'ẫ': 'a',
        'ậ': 'a',
        'đ': 'd',
        'é': 'e',
        'è': 'e',
        'ẻ': 'e',
        'ẽ': 'e',
        'ẹ': 'e',
        'ê': 'e',
        'ế': 'e',
        'ề': 'e',
        'ể': 'e',
        'ễ': 'e',
        'ệ': 'e',
        'í': 'i',
        'ì': 'i',
        'ỉ': 'i',
        'ĩ': 'i',
        'ị': 'i',
        'ó': 'o',
        'ò': 'o',
        'ỏ': 'o',
        'õ': 'o',
        'ọ': 'o',
        'ô': 'o',
        'ố': 'o',
        'ồ': 'o',
        'ổ': 'o',
        'ỗ': 'o',
        'ộ': 'o',
        'ơ': 'o',
        'ớ': 'o',
        'ờ': 'o',
        'ở': 'o',
        'ỡ': 'o',
        'ợ': 'o',
        'ú': 'u',
        'ù': 'u',
        'ủ': 'u',
        'ũ': 'u',
        'ụ': 'u',
        'ư': 'u',
        'ứ': 'u',
        'ừ': 'u',
        'ử': 'u',
        'ữ': 'u',
        'ự': 'u',
        'ý': 'y',
        'ỳ': 'y',
        'ỷ': 'y',
        'ỹ': 'y',
        'ỵ': 'y',
    };

    return value.toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/./g, (char) => specialCharacters[char] || char) + '.html'; // Replace special characters
}

async function cleanUnusedImages(api, path, data, folder) {
    let publicIds = [];

    if (data) {
        const publicIdRegex = /^.+\.cloudinary\.com\/(?:[^/]+\/)(?:(image|video)\/)?(?:(upload|fetch)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^.\s]+)(?:\.(.+))?$/;
        const urlRegex = /https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/[^/]+\/[^/]+\/[^/]+(?:\/[^/]+,[^/]+)?\/[^"]+/g;
        const urls = data.match(urlRegex);
        publicIds = urls?.map(item => item.match(publicIdRegex)[4]);
    }

    const link = `${path}?publicIds=${publicIds}${folder && `&folder=${folder}`}`;

    await api.delete(link);
}

async function cleanUnusedFolders(api, path, folders) {
    const link = `${path}?folders=${folders}`;

    await api.delete(link);
}

export { convertFormData, replaceSpecialCharacters, cleanUnusedImages, cleanUnusedFolders };
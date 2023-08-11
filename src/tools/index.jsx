/**
 * Convert object to formData
 * @param {*} obj 
 * @returns formData with obj values
 */
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

/**
 * Convert given value (in special characters of Vietnamese) to lowercase English in a link format (an-vui.html)
 * @param {*} value Vietnamese or English text
 * @returns an English link format of the given text
 */
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

/**
 * Call the delete method to clean any unused urls from CKEditor Form.
 * @param {*} api the axios instance to handle request
 * @param {*} path the endpoint for api
 * @param {*} data the raw data of ckeditor
 * @param {*} folder the folder to be cleaned (is the create_time of the object for uniqueness and easy access)
 */
async function cleanUnusedImages(api, path, data, folder) {
    let publicIds = [];

    if (data) {
        //regex to get the publicId of url
        const publicIdRegex = /^.+\.cloudinary\.com\/(?:[^/]+\/)(?:(image|video)\/)?(?:(upload|fetch)\/)?(?:(?:[^_/]+_[^,/]+,?)*\/)?(?:v(\d+|\w{1,2})\/)?([^.\s]+)(?:\.(.+))?$/;
        //regex to get the url
        const urlRegex = /https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/[^/]+\/[^/]+\/[^/]+(?:\/[^/]+,[^/]+)?\/[^"]+/g;
        const urls = data.match(urlRegex);
        const ids = urls?.map(item => item.match(publicIdRegex)[4]);
        //in case ids is undefined
        publicIds = ids ? ids : [];
    }

    const link = `${path}?publicIds=${publicIds}${folder && `&folder=${folder}`}`;

    await api.delete(link);
}

export { convertFormData, replaceSpecialCharacters, cleanUnusedImages };
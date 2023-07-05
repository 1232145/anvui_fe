export const componentToHex = (color) => {
    return Math.round(color).toString(16).padStart(2, '0');
}
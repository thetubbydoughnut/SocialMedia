export const getImageOrPlaceholder = (src, placeholder) => {
    const img = new Image();
    img.src = src;
    img.onerror = () => {
        img.src = placeholder;
    };
    return img.src;
};
export const getImageOrPlaceholder = (src, placeholder) => {
    if (!src) return placeholder;
    const img = new Image();
    img.src = src;
    img.onerror = () => {
        img.src = placeholder;
    };
    return img.src;
};
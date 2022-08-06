let types = ['jpeg', 'png'];


export const JicCompress = function (sourceImage: any, quality: any, outputFormat = 'jpg') {
    let mimeType;
    let canvas;
    let newImageData;
    let resultImage;

    if (outputFormat === 'jpg')
        mimeType = 'image/jpeg';
    else if (isSupported(outputFormat))
        mimeType = `image/${outputFormat}`;
    else
        throw new SyntaxError('This output format is not supported. ' +
            `Input: '${outputFormat}'. Expected: jpg, jpeg, png`);

    canvas = createCanvas(sourceImage);
    newImageData = canvas.toDataURL(mimeType, quality/100);
    resultImage = new Image();
    resultImage.src = newImageData;

    return resultImage;
}


function createCanvas(sourceImage: any) {
    let canvas: any = document.createElement('canvas');
    canvas.width = sourceImage.width;
    canvas.height = sourceImage.height;
    canvas.getContext('2d').drawImage(sourceImage, 0, 0);
    return canvas;
}

/**
 * Checks if the informated output format is supported
 * @param {String} outputFormat
 * @return {Boolean} true if it's is supported
 */
function isSupported(outputFormat: any) {
    return types.indexOf(outputFormat) >= 0;
}

function extractClientTypeFromImageUrl(imageUrl) {
    // const imageUrl = '/uploads/463b3794-d4cc-487b-98e2-c8c8015215ee_mobile.webp';

    // Extract the file name from the URL
    const fileName = imageUrl.split('/').pop();

    // Extract the client type from the file name
    const clientType = fileName.split('_').slice(-1)[0].split('.')[0];

    console.log(fileName); // Output: 463b3794-d4cc-487b-98e2-c8c8015215ee_mobile.webp
    console.log(clientType); // Output: mobile
    return { fileName, clientType };
}
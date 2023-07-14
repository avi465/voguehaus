export default function toCamelCase(word) {
    try {
        // Split the word into an array of characters
        const characters = word.split('');

        // Capitalize the first character
        characters[0] = characters[0].toUpperCase();

        // Convert the remaining characters to lowercase
        for (let i = 1; i < characters.length; i++) {
            characters[i] = characters[i].toLowerCase();
        }

        // Join the characters back into a string
        const camelCaseWord = characters.join('');

        return camelCaseWord;
    } catch (error) {
        console.log(error);
    }
}
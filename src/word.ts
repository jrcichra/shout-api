declare var SHOUT: KVNamespace;

export async function getRandomWord(): Promise<string | undefined> {
    // grab the list of words
    const words = await SHOUT.get('_words');
    let word: string | undefined;
    if (words) {

        // split the word by newlines
        const wordList = words.split('\n');

        let found = false;
        const attempts = 10;
        let attempt = 0;
        while (!found && attempt < attempts) {
            // pick a random word
            const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
            // make sure it's not aleady used
            const exists = await SHOUT.get(randomWord);
            if (exists === null) {
                // return the word
                word = randomWord;
                found = true;
            } else {
                attempt++;
            }
        }
    }
    return word;
}
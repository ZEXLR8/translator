const form = document.getElementById('translator-form');
const codeInput = document.getElementById('code');
const result = document.getElementById('result');
const reverseToggle = document.getElementById('reverse');
let reverseEnabled = false;

reverseToggle.addEventListener('click', () => {
    reverseEnabled = !reverseEnabled;
    reverseToggle.textContent = `Reverse: ${reverseEnabled ? 'On' : 'Off'}`;
    reverseToggle.setAttribute('aria-pressed', String(reverseEnabled));
});

function translateToCustomLanguage(text) {
    const source = 'ABCDEFGHIJKLMNOPQRSTUVWXY';
    const target = '1ABC2EFG3IJKLM4OPQRS5UVWXY';

    return Array.from(text, (character) => {
        const isLowercase = character >= 'a' && character <= 'z';
        const letter = isLowercase ? character.toUpperCase() : character;
        const index = source.indexOf(letter);

        if (index === -1) {
            return character;
        }

        const translated = target[index];
        // The provided example gives Y the two-character translation "XY".
        const output = letter === 'Y' ? 'XY' : translated;
        return isLowercase ? output.toLowerCase() : output;
    }).join('');
}

function translateFromCustomLanguage(text) {
    const source = 'ABCDEFGHIJKLMNOPQRSTUVWXY';
    const target = '1ABC2EFG3IJKLM4OPQRS5UVWXY';
    const reverseMap = new Map();

    Array.from(source).forEach((letter, index) => {
        reverseMap.set(target[index], letter);
    });

    let translated = '';
    for (let index = 0; index < text.length; index += 1) {
        const character = text[index];
        const isLowercase = character >= 'a' && character <= 'z';
        const upperCharacter = character.toUpperCase();

        if (upperCharacter === 'X' && text[index + 1]?.toUpperCase() === 'Y') {
            translated += isLowercase ? 'y' : 'Y';
            index += 1;
            continue;
        }

        const original = reverseMap.get(upperCharacter);
        translated += original
            ? (isLowercase ? original.toLowerCase() : original)
            : character;
    }

    return translated;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const translate = reverseEnabled
        ? translateFromCustomLanguage
        : translateToCustomLanguage;
    result.textContent = translate(codeInput.value);
});

form.addEventListener('reset', () => {
    result.textContent = '';
    reverseEnabled = false;
    reverseToggle.textContent = 'Reverse: Off';
    reverseToggle.setAttribute('aria-pressed', 'false');
});

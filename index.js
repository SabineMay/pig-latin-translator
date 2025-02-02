/*
MAIN ISSUES:
1. A "set" of letters with a vowel, such as "qu" are, as expected, not translated correctly. "quiet" should be "ietquay", not "uietquay".
 */

/*
All variables refer to the letters/word as before the translation to Pig Latin unless:

1.) has "remaining" -- refers to the letters/word during/in translation
2.) has "translated" -- refers to the letters/word as translated

*fC stands for firstConsonants
* pL stands for pigLatin

 */

var lowerLetters = ["a", "b", "c", "d", "e", "f", "g",
    "h", "i", "j", "k", "l", "m", "n", "o", "p",
    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var upperLetters = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P",
    "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var vowels = ["a", "A", "e", "E", "i", "I", "o", "O", "u", "U", "y", "Y"];

//the splice() method was not written by me
if (!String.prototype.splice) {
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

//isUpperCase checks whether the original word had a beginning capital letter
var isUpperCase = function(word) {
    for (var a = 0; a < upperLetters.length; a++) {
        if (word[0] === upperLetters[a]) {
            return true;
        }

    }
    return false;
};

///toLowerCase returns every word's first letter as lowercase no matter if it was a capital to begin with
var toLowerCase = function(word) {
    for (var b = 0; b < upperLetters.length; b++) {
        if (word[0] === upperLetters[b]) {
            return lowerLetters[b]
        }
    }
    for (var c = 0; c < lowerLetters.length; c++) {
        if (word[0] === lowerLetters[c]) {
            return lowerLetters[c]
        }
    }
};

/*toUpperCase upperCases the first letter of the lowerCaseWord if the original word had a capital first letter.
If not, it returns the lowerCaseWord. There needs to be two paramaters here, not just word, because when calling this function with
remainingWord, it takes the place of the parameter lowerCaseWord, and at that point lowerCaseWord and word will have different values should
toUpperCase return lowerCaseWord.
 */
var toUpperCase = function(lowerCaseWord, word) {
    if (isUpperCase(word) === true) {
        for (var c = 0; c < lowerLetters.length; c++) {
            if (lowerCaseWord[0] === lowerLetters[c]) {
                var letter = upperLetters[c];
                return lowerCaseWord.splice(0, 1, letter)
            }

        }
    }
    return lowerCaseWord;
};

//pLWordConvert takes a word from pLSentenceConvert, converts it to pig latin, and returns it.
pLWordConvert = function(word) {
    var fC = "";
    var character = "";
    var x;

    if (word === "" || word === undefined) {   /*When there is a case of double punctuation, this ensures that the lack of a word between them is not
     mistaken for a word and returned with a strange undefined or empty string + yay.
*/
        return "";
    }

    if (word[0] === "q" || word[0] === "Q") {
        vowels = ["a", "A", "e", "E", "i", "I", "o", "O", "y", "Y"]
    }

    if (word[0] === "y" || word[0] === "Y") {
        vowels = ["a", "A", "e", "E", "i", "I", "o", "O", "u", "U"]; /*Due to the fact that 'y' is mostly a consonant at the beginning of words, this removes it from
        the vowel list and therefore treats it as a consonant.
        */
    }



    var lowerCaseWord = word.splice(0, 1, toLowerCase(word)); /* splices the original word with the lowercase letter provided by toLowerCase
    */


    for (var l = 0; l < lowerCaseWord.length; l++) { //loops through the letters of the word
        character = lowerCaseWord[l];
        var isVowel = false;

        for (x = 0; x < vowels.length; x++) { //loops through the vowels array
            if (character === vowels[x] && l === 0) { /*if the word begins with a vowel, return it + yay (you do not need to specify
            if it is lowercase or not because you are not modifying the order of the letters of the original word, just adding yay to the end).
            */
                return word /*notlowerCaseWord b/c want to return the word exactly as written/with correct capitilization*/ + "yay";
            }
            if (character === vowels[x]) { /*if the character is the vowel that x currently specifies, break out of the loop. If not, it will
            increment x and test again. The break; is not necessary, but stops the program from checking every vowel to the character if the
            character has already been identified as a certain vowel. (The character can not be two vowels at once, so it is unnecessary.
            */
                isVowel = true;
                break;
            }

        }
        if (character !== vowels[x] && l === word.length - 1) { /*if on the last letter of the word, the character of the word is not a vowel,
        then it is a word with no vowels, and so should just return the original word + ay.
            */
            return word + "ay";
        }
        if (isVowel === false) { /*if the character is not a vowel (isVowel is set to true if is IS a vowel), then add it to the variable
        fC (which stands for firstConsonants (before the first vowel)).
        */
            fC += character
        }
        else {
            break;
        }

    }


    var fCLength = fC.length;
    var wordLength = lowerCaseWord.length; //again, lowerCaseWord is just used for consistency; it affects nothing.
    var fCAndAy = fC + "ay"; //add ay to the end of the firstConsonants.
    var remainingWord = lowerCaseWord.substring(fCLength, wordLength); /*this takes the substring from the first vowel to the word end and
    assigns it the variable remainingWord.
    */
    var remainingWordCased = toUpperCase(remainingWord, word); /*This upper cases the first letter of remainingWord (which would be the first vowel) if the word
    was originally capital, and keeps it lower case if it was not.
    */
    return remainingWordCased + fCAndAy
};


pLSentenceConvert = function(sentence) {
    var sentenceStart = 0;
    var sentenceEnd;
    var accumulateTranslatedSentence = "";
    var character = "";
    var isPunc = true;
    var phraseNoPunc = "";
    var translatedWord = "";



    var alphabet = ["A", "a", "B", "b", "C", "c", "D", "d", "E", "e", "F", "f", "G", "g", "H", "h", "I", "i", "J", "j", "K", "k", "L", "l", "M", "m", "N", "n", "O", "o", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "u", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z"];
    for (var l = 0; l < sentence.length; l++) { //Loops through the letters of the sentence.
        isPunc = true;  //declares isPunc to true with every new letter, because it assumes that isPunc is true unless the character is found equal to the value of an alphabetical letter
        character = sentence[l];
        for (var x = 0; x < alphabet.length; x++) { //Loops through the letters of the alphabet
            if (character === alphabet[x]) {
                isPunc = false; //If the character is a letter, it is not punctuation
                break; //again, this break is not necessary but stops the code from checking the rest of the letters if the character has already been determined as a letter
            }

        }/*NOTE: After understanding the next code, realize this: there can be more than one sentence, or a sentence with a comma, in pLSentenceConvert because when it reaches punctuation
            it breaks out of the inner loop, translates to pig latin according to the below code, BUT STAYS IN THE OUTER LOOP,
            so it can translate again after the first punctuation mark until the whole string (multiple sentences or no) has been completed.
            */
        if (isPunc === true || l === sentence.length - 1) { /* If the character is punctuation or it is the last character of the string given to pLSentenceConvert, set the variable
            sentenceEnd to the numerical index of the last letter in the sentence
            */
            sentenceEnd = l;
            if (l === sentence.length - 1 && isPunc !== true) { //If the character is punctuation AND is the last character of the string given to pLSentenceConvert, add one to sentenceEnd
                sentenceEnd += 1;
                character = ""; //set the character to an empty string
            }
            /*
            Distinguishing between:

            when the character is punctuation or is the last character of the string
            and
            when the character is punctuation AND the last character of the string

            is important because if the character is JUST the last character of the string, we want to make sure that sentenceEnd has the index of the character AFTER that (which would be
            undefined or something weird) because the ending constraint for .substring(), see below, is EXCLUSIVE. We do not want to exclude the last character, if it is not punctuation.
            If it IS punctuation, we want to exclude it. (pLWordConvert can only return the correct results when it is given words with no punctuation.)
             */
            phraseNoPunc = sentence.substring(sentenceStart, sentenceEnd); //take a substring of the pLSentenceConvert string (it will just be the word, no punctuation). Assign to phraseNoPunc.
            sentenceStart = sentenceEnd + 1; /*make sentenceStart one more than sentenceEnd (sentenceStart is inclusive is .substring() sentenceStart will be needed again if there is more than
            one piece of punctuation. For the first go, it was set to 0 at the start
            */
            translatedWord = pLWordConvert(phraseNoPunc); /*take phraseNoPunc and send it to pLWordConvert for translation (it will be returned completely translated by pLWordConvert). Assign
            to translatedWord.
            */
            accumulateTranslatedSentence += translatedWord + character; /*accumulateTranslatedSentence was set to an empty string at the start. Add the translatedWord, then the character.
            The character is punctuation, if the current sentence/section that was being translated ended with punctuation (spaces are considered punctuation, as they are not part of the alphabet).
            If the character was the last character of pLSentenceConvert's string, then character has already been set to an empty string, and will correctly add no punctuation to the translated
            bit.
            */
        }

    }
    return accumulateTranslatedSentence;
};


var buttonHandler = function() { //buttonHandler is used by the HTML -- look up more info on these types of HTML stuffs.
    //buttonHandler, when called by HTML, changes the text in the "pigLatin" text box to match that of the translation.
    var englishTextArea = document.getElementById("english");
    var englishString = englishTextArea.value;
    document.getElementById("pigLatin").value = pLSentenceConvert(englishString);
};






var testFunction = function() { /*just a function testing some common conditions when translating. Automatically tests and prints to the console when the page is loaded, and tells you of any
glaring problems with the translation. Tells you either that a certain translating condition was "good", or that is expected this and got that.
*/
    var space = pLSentenceConvert(" ");
    if (space === " ") {
        console.log("space is good")
    }
    else {
        console.log("space: expected ' ' and got " + space)
    }
    var doublePunc = pLSentenceConvert("..");
    if (doublePunc === "..") {
        console.log("doublePunc is good");
    }
    else {
        console.log("doublePunc: expected '..' and got " + doublePunc);
    }
    var emptyString = pLSentenceConvert("");
    if (emptyString === "") {
        console.log("emptyString is good");
    }
    else {
        console.log("emptyString: expected '' and got " + emptyString);
    }

    var wordAllConsonants = pLSentenceConvert("nth");
    if (wordAllConsonants === "nthay") {
        console.log("wordAllConsonants is good");
    }
    else {
        console.log("wordAllConsonants: expected 'nthay' and got " + wordAllConsonants);
    }
    var wordAllVowels = pLSentenceConvert("ooo");
    if (wordAllVowels === "oooyay") {
        console.log("wordAllVowels is good");
    }
    else {
        console.log("wordAllVowels: expected 'oooyay' and got " + wordAllVowels);
    }
    var beginningCapital = pLSentenceConvert("Dog");
    if (beginningCapital === "Ogday") {
        console.log("beginningCapital is good");
    }
    else {
        console.log("beginningCapital: expected 'Ogday' and got " + beginningCapital);
    }

    var middleCapital = pLSentenceConvert("dOg");
    if (middleCapital === "Ogday") {
        console.log("middleCapital is good");
    }
    else {
        console.log("middleCapital: expected 'Ogday' and got " + middleCapital);
    }

};

testFunction();







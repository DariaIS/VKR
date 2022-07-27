const translitRuEn = (lit) => {
    const letters = [
        ["а", "A"],
        ["a", "A"],
        ["А", "A"],
        ["в", "B"],
        ["В", "B"],
        ["е", "E"],
        ["e", "E"],
        ["Е", "E"],
        ["к", "K"],
        ["k", "K"],
        ["К", "K"],
        ["м", "M"],
        ["М", "M"],
        ["н", "H"],
        ["Н", "H"],
        ["о", "O"],
        ["o", "O"],
        ["О", "O"],
        ["р", "P"],
        ["p", "P"],
        ["Р", "P"],
        ["с", "C"],
        ["c", "C"],
        ["С", "C"],
        ["т", "T"],
        ["Т", "T"],
        ["у", "y"],
        ["У", "y"],
        ["Y", "y"],
        ["х", "X"],
        ["x", "X"],
        ["Х", "X"],
    ]

    let result = lit;
    for (let i = 0; i < lit.length; i++) {
        for (let j = 0; j < letters.length; j++) {
            if (lit[i] === letters[j][0]) {
                result = result.replace(result[i], letters[j][1]);
            }
        }
    }
    return result;
}

module.exports = translitRuEn;
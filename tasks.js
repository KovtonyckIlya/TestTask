function task_1(array) {
        let reserved = [];
        for (let i = array.length; i > 0; i--) {
                reserved.push(array[i - 1]);
        }
        return reserved;
}

const task_2 = (array1, array2) => !!array1.find((el) => array2.includes(el));

const  task_3 = (data) => {
        const isGenerator = type => str => typeof str === type;

        const isString = isGenerator('string');
        const isNumber = isGenerator('number');

        const getElementType = type => {
                switch (true) {
                        case isString(type):
                                return 'string';
                        case isNumber(type):
                                return 'number';
                        default:
                                return `unknown`;
                }
        }

        const gatherFieldTypes = input => input.reduce((total, {
                id,
                value
        }) => {
                const previous = total[id] || {
                        number: 0,
                        string: 0,
                        history: []
                };
                const type = getElementType(value);
                const isNewItem = !previous.history.includes(value);
                if (isNewItem) {
                        const result = {
                                ...previous,
                                history: [...previous.history, value],
                                [type]: previous[type] + 1
                        };
                        return {
                                ...total,
                                [id]: result
                        };
                } else {
                        return total;
                }
        }, {})

        const getPairs = input => Array.from(Object.entries(gatherFieldTypes(input)), ([id, {
                number,
                string
        }]) => ({
                id,
                number,
                string
        }));

        return getPairs(data)
}

const task_4 = (integers) => {
        const isEven = (v) => v % 2 === 0;
        const { even, odd } = integers.reduce(
            (total, digit, index) => ({
                    ...total,
                    ...(isEven(index)
                        ? {
                                even: total.even + digit,
                        }
                        : {
                                odd: total.odd + digit,
                        }),
            }),
            {
                    even: 0,
                    odd: 0,
            }
        );
        return even - odd;
};
const task_5 = (string, substring) => {
        let croppedString = string;
        let saveIndex = 0;
        const indexes = [];
        while (croppedString.length >= 0) {
                const index = croppedString.indexOf(substring);
                if (index === -1) {
                        break;
                }
                saveIndex += index;
                indexes.push(saveIndex);
                croppedString = croppedString.slice(
                    index + substring.length,
                    string.length
                );
        }
        return indexes;
};
const task_7 = (data) => {
        const format = (currencies) =>
            currencies.reduce(
                (total, { currency, value }) => [...total, `${currency}: ${value}`],
                []
            );
        const gatheredCurrencies = data.reduce(
            (total, { currency, value }) => ({
                    ...total,
                    [currency]: value + (total[currency] || 0),
            }),
            {}
        );
        const mappedCurrencies = Array.from(
            Object.entries(gatheredCurrencies),
            ([currency, value]) => ({ currency, value })
        );
        return format(mappedCurrencies);
};
function task_6(string1, string2) {
        let searchString = (string1 + string2).toLowerCase();
        const freq = {};
        for (let i = 0; i < searchString.length; i++) {
                let character = searchString.charAt(i);
                if (freq[character]) {
                        freq[character]++;
                } else {
                        freq[character] = 1;
                }
        }

        return Math.max.apply(Math, Object.values(freq));
}
const task_8 = (data) => {
        const isString = (str) => typeof str === "string";
        const isNumber = (num) => typeof num === "number";
        return data.reduce(
            (total, item) => (isString(item) || isNumber(item) ? total + item : total),
            ""
        );
};
function task_9(data) {
        let values = [];
        let checker = (arr) => arr.every(Boolean);
        for (const { done: done } of data) {
                if (typeof done === "boolean") {
                        values.push(done);
                }
        }
        return checker(values);
}
const task_10 = (str, step) => [...str].reduce((total, char) => {
        const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
        const indexInAlphabet = ALPHABET.indexOf(char.toLowerCase());
        if (indexInAlphabet === -1) {
                return total + char;
        }
        const saveIndex = indexInAlphabet - step < 1 ? ALPHABET.length - indexInAlphabet - step : indexInAlphabet - step;
        return total + ALPHABET[saveIndex];
}, '');

module.exports = { task_1,task_2,task_3,task_4,task_5,task_6,task_7,task_8,task_9,task_10}

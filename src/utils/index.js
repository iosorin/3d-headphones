/**
 * findArraySibling - Find a sibling of the current element in array
 *
 * @param {Array}   arr      Array
 * @param {Object}  current  Current element
 * @param {String}  pName    Property name
 * @param {Boolean} forward  Which way to search (next element or previous)
 *
 * @return {Object} Array element
*/
const findArraySibling = ({
    arr = [], current = {}, forward = true, pName = 'name'
} = {}) => {
    const currentIdx = arr.findIndex(i => i[pName] === current[pName]);

    const lastIdx = arr.length - 1;

    const nextIdx = () => {
        if (forward) {
            return currentIdx === lastIdx ? 0 : currentIdx + 1;
        }

        return currentIdx === 0 ? lastIdx : currentIdx - 1;
    };

    return arr[nextIdx()];
};

export {
    findArraySibling
};

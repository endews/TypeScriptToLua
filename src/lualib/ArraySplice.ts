// https://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf
function __TS__ArraySplice<T>(list: T[], start: number, deleteCount: number, ...items: T[]) {
    // 1. 2.
    const len = list.length;

    let actualStart;

    // 4.
    if (start <  0) {
        actualStart = Math.max(len + start, 0);
    } else {
        actualStart = Math.min(start, len);
    }

    // 13.
    // 14.
    const itemCount = items.length;

    // 5. - 7.
    let actualDeleteCount: number;

    if (!start) {
        actualDeleteCount = 0;
    } else if (!deleteCount) {
        actualDeleteCount = len - actualStart;
    } else {
        actualDeleteCount = Math.min(Math.max(deleteCount, 0), len - actualStart);
    }

    // 8. ignored

    // 9.
    const out: T[] = [];

    // 10.
    let k = 0;

    // 11.
    for (k = 0; k < actualDeleteCount; k++) {
        const from = actualStart + k;

        if (list[from]) {
            out[k] = list[from];
        }
    }

    // 15.
    if (itemCount < actualDeleteCount) {
        // a. b.
        for (k = actualStart; k < len - actualDeleteCount; k++) {
            const from = k + actualDeleteCount;
            const to = k + itemCount;

            if (list[from]) {
                list[to] = list[from];
            } else {
                list[to] = undefined;
            }
        }
        // c. d.
        for (k = len; k > len - actualDeleteCount + itemCount; k--) {
            list[k] = undefined;
        }
    // 16.
    } else if (itemCount > actualDeleteCount) {

        for (k = len - actualDeleteCount; k > actualStart; k--) {
            const from = k + actualDeleteCount - 1;
            const to = k + itemCount - 1;

            if (list[from]) {
                list[to] = list[from];
            } else {
                list[to] = undefined;
            }

        }
    }

    // 17.
    // 18.
    for (k = actualStart; k < items.length; k++) {
        const e = items[k];
        list[k] = e;
    }

    // 19.
    for (k = list.length; k > len - actualDeleteCount + itemCount; k--) {
        list[k] = undefined;
    }

    // 20.
    return out;
}

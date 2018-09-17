export const throttle = (func, timer = 1000) => {
    let before = Date.now();
    return (...arg) => {
        let now = Date.now();
        if (now > timer+before) {
            func.call(null, arg);
            before = now;
        }
    }
}
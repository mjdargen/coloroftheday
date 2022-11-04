function loadColor() {
    // get elements
    let body = document.getElementsByTagName("body")[0];
    let hexResponse = document.getElementById("hexColor");
    let rgbResponse = document.getElementById("rgbColor");

    // retrieve date information
    const d = new Date();
    const year = d.getFullYear();   // Get year as a four digit number (yyyy)
    const month = d.getMonth();     // Get month as a number (0-11)
    const day = d.getDate();        // Get day as a number (1-31)
    const weekDay = d.getDay();     // Get weekday as a number (0-6)

    // randomly generate colors for testing
    // const year = Math.floor(Math.random() * 2022);  // Get year as a four digit number(yyyy)
    // const month = Math.floor(Math.random() * 11);   // Get month as a number(0 - 11)
    // const day = Math.floor(Math.random() * 30) + 1; // Get day as a number(1 - 31)
    // const weekDay = Math.floor(Math.random() * 6);  // Get weekday as a number (0-6)

    // testing repeat loop
    for (let i = 2000; i < 2023; i++) {
        for (let j = 0; j < 12; j++) {
            for (let k = 1; k < 32; k++) {
                for (let l = 0; l < 7; l++) {
                    let r = i - 2000 << 6 * 3 | j << 6 * 2 | k << 6 * 1 | l;
                    let g = j << 6 * 3 | k << 6 * 2 | l << 6 * 1 | i - 2000;
                    let b = i << 6 * 3 | l << 6 * 2 | j - 2000 << 6 * 1 | k;
                    if (true) {
                        r = mulberry32(r);
                        g = mulberry32(g);
                        b = mulberry32(b);
                        console.log(`rgb(${r}, ${g}, ${b})`);
                    }
                    else {
                        if (r === g)
                            console.log("1", i, j, k, l);
                        if (r === b)
                            console.log("2", i, j, k, l);
                        if (g === b)
                            console.log("3", i, j, k, l);
                    }
                }
            }
        }
    }

    // compute pseudorandom colors for each day
    let r = year - 2000 << 6 * 3 | month << 6 * 2 | day << 6 * 1 | weekDay;
    let g = month << 6 * 3 | day << 6 * 2 | weekDay << 6 * 1 | year - 2000;
    let b = year << 6 * 3 | weekDay << 6 * 2 | month - 2000 << 6 * 1 | day;
    r = mulberry32(r);
    g = mulberry32(g);
    b = mulberry32(b);

    // compute rgb/hex and complementary value
    let bgColor = `rgb(${r}, ${g}, ${b})`;
    let bgHex = "#" + hexConversion(r) + hexConversion(g) + hexConversion(b);
    let color = computeColor(r, g, b);

    // assign color values
    body.style.backgroundColor = bgColor;
    body.style.color = color;
    hexResponse.textContent = bgHex;
    rgbResponse.textContent = bgColor;
}

// pseudorandom number algorithm
// produces same result for identical seed
// modified to return value between 0-255
function mulberry32(a) {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    t = ((t ^ t >>> 14) >>> 0) / 4294967296
    return Math.floor(t * 255);
}

// converts to hex value
function hexConversion(n) {
    let result;
    if (n < 16) result = "0" + n.toString(16);
    else result = n.toString(16);
    return result.toUpperCase();
}

// computes best complimentary color for font
// either black or white based on distance vector
function computeColor(r, g, b) {
    let d1 = Math.sqrt((r - 0) ** 2 + (g - 0) ** 2 + (b - 0) ** 2);
    let d2 = Math.sqrt((r - 255) ** 2 + (g - 255) ** 2 + (b - 255) ** 2);
    if (d1 > d2) return "black";
    else return "white";
}
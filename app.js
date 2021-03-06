let bars = document.querySelectorAll(".bar");
let arr_test = [10, 7, 8, 9, 1, 5];
let currentAlgo = "";
let estart = 0;
let eend = 0;

/* dom variables */
const bubble_div = document.getElementById("bubble");
const merge_div = document.getElementById("merge");
const quick_div = document.getElementById("quick");
const selection_div = document.getElementById("selection");
const newArray_div = document.getElementById("new-array");
const sort_div = document.getElementById("sort");
const container = document.querySelector(".data-container");

const len_of_arr = 20;
const container_width = 600;
const container_height = 384;

// arr stores array element
// itmd stores intermediate values
// visities stores sorted elements
var arr = [], itmd = [], visited = [];


function generateBars(num = 20) {
    for (let i = 0; i < num; i += 1) {
        const randVal = Math.floor(Math.random() * 100) + 1;

        // create a "div" element
        const bar = document.createElement("div");

        // add bar to bar div
        bar.classList.add("bar");

        // add height and x axis
        bar.style.height = `${randVal * 3}px`;
        bar.style.transform = `translateX(${i * 30}px)`;

        // create a "label" element
        const barLabel = document.createElement("label");

        // add bar_id to label
        barLabel.classList.add("bar_id");

        // assign randVal to label
        barLabel.innerHTML = randVal;

        // append "label" to "div"
        bar.appendChild(barLabel);

        // append "div" to "data-container div"
        container.appendChild(bar);
    }
}

function selectAlgo(algo) {
    currentAlgo = algo;
    console.log(currentAlgo);
}

function resetArray() {
    window.location.reload();
}

function sort() {

    if (currentAlgo === "") {
        alert("Please select an algorithm.");
    }
    
    else if (currentAlgo === "bubble") {
        bubbleSort(200);
    }

    else if (currentAlgo === "merge") {
        let bars = document.querySelectorAll(".bar");
        console.log(arr)
        mergeSort(50, 0, bars.length - 1);
    }

    else if (currentAlgo === "quick") {
        let bars = document.querySelectorAll(".bar");
        quickSort(200, 0, bars.length - 1);
    }

    else if (currentAlgo === "selection") {
        selectionSort(200);
    }

    console.log(`sorting with ${currentAlgo}`)
}

async function bubbleSort(delay) {
    let bars = document.querySelectorAll(".bar");

    for (var i = 0; i < bars.length; i++) {

        for (var j = 0; j < bars.length -i -1; j++) {
            bars[j].style.backgroundColor = "white";
            bars[j + 1].style.backgroundColor = "white";

            // pauses code for duration of delay
            await timeout(delay);

             // store current j value
             var curr_j = parseInt(bars[j].childNodes[0].innerHTML);
             // stores minimum value so far
             var next_j = parseInt(bars[j + 1].childNodes[0].innerHTML);

             if (curr_j > next_j) {

                swap(bars, j, j + 1);
                await timeout(delay);

            }
            if (j === bars.length -i -2) {
                // make last bar green
                bars[j].style.backgroundColor = "salmon";
                bars[j + 1].style.backgroundColor = "rgb(208, 255, 192)";
            }
            else {
            // make bars salmon again
            bars[j].style.backgroundColor = "salmon";
            bars[j + 1].style.backgroundColor = "salmon";
            }
        }
        // makes first bar green on completion
        if ((i + 1) === bars.length) {
            bars[0].style.backgroundColor = "rgb(208, 255, 192)";
        }
    }
}

async function merge(start, end) {

    // set up bounds
    let mid = parseInt((start + end) >> 1);
    let start1 = start, start2 = mid + 1;
    let end1 = mid, end2 = end;

    // initial index of merged subarray
    let index = start;

    // loop until one list is exhausted
    while (start1 <= end1 && start2 <= end2) {
        if (arr[start1] <= arr[start2]) {
            itmd[index] = arr[start1]
            index = index + 1
            start1 = start1 + 1
        }
        else if (arr[start1] > arr[start2]) {
            itmd[index] = arr[start2]
            index = index + 1
            start2 = start2 + 1
        }
    }
  
    // Copy the remaining elements of
    // arr[], if there are any
    while (start1 <= end1) {
        itmd[index] = arr[start1]
        index = index + 1
        start1 = start1 + 1
    }
  
    while (start2 <= end2) {
        itmd[index] = arr[start2]
        index = index + 1
        start2 = start2 + 1
    }
  
    // transfers itmd to arr
    index = start
    while (index <= end) {
        arr[index] = itmd[index];
        index++;
    }
}

function msArrays() {

    let bars = document.querySelectorAll(".bar");

    for (let i = 0; i < len_of_arr; i++) {
        arr.push(bars[i].childNodes[0].innerHTML);
        console.log(bars[i].childNodes[0].innerHTML);
    }

    // initialize itmd and visited with zeros
    for (let i = 0; i < len_of_arr; i++) {
        itmd.push(0);
        visited.push(0);
    }
}

function drawBars(delay, start, end) {
    let bars = document.querySelectorAll(".bar");
    for (let i = 0; i < len_of_arr; i++) {

        if (visited[i]) {
            bars[i].style.backgroundColor = "white";
        }
    }

    for (let i = start; i <= end; i++) {
        bars[i].style.backgroundColor = "red";
        visited[i] = 1;
    }
    estart = start;
    eend = end;
}

async function mergeSort(delay, start, end) {

    if (start < end) {
        let mid = parseInt((start + end) >> 1)
        await mergeSort(delay, start, mid)
        await mergeSort(delay, mid + 1, end)
        await merge(start, end)
        await drawBars(delay, start, end)

        await timeout(delay)
    }
}

async function partition(delay, low, high) {
    let bars = document.querySelectorAll(".bar");
    // stores minimum value so far
    var pivot_val = parseInt(bars[high].childNodes[0].innerHTML);

    // i starts before first index
    let i = low - 1;

    // color pivot blue
    bars[high].style.backgroundColor = "rgb(119, 158, 255)";

    // pauses code for duration of delay
    await timeout(delay);

    // stops before pivot which is last bar
    for (let j = low; j <= high - 1; j++) {

        // change current j to white
        bars[j].style.backgroundColor = "white";

        // store current j value
        var j_val = parseInt(bars[j].childNodes[0].innerHTML);
        await timeout(delay);

        // increments i then swaps i and j
        if (j_val < pivot_val) {
            if (i >= low && bars[i].style.backgroundColor != "rgb(208, 255, 192)") {
                bars[i].style.backgroundColor = "salmon";
            }
            i++;
            // i colored red
            bars[i].style.backgroundColor = "red";
            await timeout(delay);

            swap(bars, i, j);
            await timeout(delay);
        }

        // change j back to salmon
        bars[j].style.backgroundColor = "salmon";
    }

    // swaps pivot with i + 1
    swap(bars, i + 1, high);

    // change i and high back to salmon
    if (i >= 0) {
        bars[i].style.backgroundColor = "salmon";
    }
    bars[high].style.backgroundColor = "salmon";

    // change pivot to green
    bars[i + 1].style.backgroundColor = "rgb(208, 255, 192)";
    await timeout(delay);

    return i + 1;
}

async function quickSort(delay, low, high) {
    let bars = document.querySelectorAll(".bar");
    if (low < high) {
        let pivot = await partition(delay, low, high);
        console.log(`pivot index = ${pivot}`);

        await quickSort(delay, low, pivot - 1);
        for (let i = low; i < pivot; i++) {
            bars[i].style.backgroundColor = "rgb(208, 255, 192)";
        }
        await quickSort(delay, pivot + 1, high);
        for (let i = pivot + 1; i < high + 1; i++) {
            bars[i].style.backgroundColor = "rgb(208, 255, 192)";
        }
        bars[pivot].style.backgroundColor = "rgb(208, 255, 192)";
    }
}

async function selectionSort(delay) {
    let bars = document.querySelectorAll(".bar");

    var min_idx = 0;

    for (var i = 0; i < bars.length; i++) {
        // assign i to min_idx
        min_idx = i;
        // current index is blue
        bars[i].style.backgroundColor = "rgb(119, 158, 255)";

        for (var j = i + 1; j < bars.length; j++) {

            // jth bar is white
            bars[j].style.backgroundColor = "white";

            // pauses code for duration of delay
            await timeout(delay);

            // store current j value
            var current = parseInt(bars[j].childNodes[0].innerHTML);

            // stores minimum value so far
            var min = parseInt(bars[min_idx].childNodes[0].innerHTML);
                
            if (current < min) {
                // if min index isn't the current i index
                if (min_idx !== i) {
                    // change color of min from white back to salmon, we've found a smaller int
                    bars[min_idx].style.backgroundColor = "salmon";
                }
                // set new min_idx
                min_idx = j;
            } else {

                // change color from white back to salmon
                bars[j].style.backgroundColor = "salmon";
            }
        }

        swap(bars, i, min_idx);

        // pauses code for duration of delay
        await timeout(delay);

        // reset (min_idx)th bar to salmon
        bars[min_idx].style.backgroundColor = "salmon";

        // change in place bar to light green
        bars[i].style.backgroundColor = "rgb(208, 255, 192)";
        // light green "rgb(49, 226, 13)"
    }
}

function swap(bars, i, j) {
    // store j attributes
    var temp_height = bars[j].style.height;
    var temp_text = bars[j].childNodes[0].innerText;
    // j takes i attributes
    bars[j].style.height = bars[i].style.height;
    bars[j].childNodes[0].innerText = bars[i].childNodes[0].innerText;
    // i takes j attributes
    bars[i].style.height = temp_height;
    bars[i].childNodes[0].innerText = temp_text;
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function main() {

    generateBars();

    msArrays();

    bubble_div.addEventListener("click", () => selectAlgo("bubble"));

    merge_div.addEventListener("click", () => selectAlgo("merge"));

    quick_div.addEventListener("click", () => selectAlgo("quick"));

    selection_div.addEventListener("click", () => selectAlgo("selection"));

    newArray_div.addEventListener("click", () => resetArray());

    sort_div.addEventListener("click", () => sort());
}

main();

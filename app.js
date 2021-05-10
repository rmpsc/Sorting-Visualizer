let arr_test = [10, 7, 8, 9, 1, 5];
let currentAlgo = "";

/* dom variables */
const bubble_div = document.getElementById("bubble");
const merge_div = document.getElementById("merge");
const quick_div = document.getElementById("quick");
const selection_div = document.getElementById("selection");
const newArray_div = document.getElementById("new-array");
const sort_div = document.getElementById("sort");
const container = document.querySelector(".data-container");

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
        alert("Merge sort is currently in development. Will be on the way shortly!");
    }

    else if (currentAlgo === "quick") {
        // alert("Quick sort is currently in development. Will be on the way shortly!");
        // console.log(arr_test);
        // quickSortNorm(arr_test, 0, arr_test.length - 1);
        // console.log(arr_test);
        let bars = document.querySelectorAll(".bar");
        quickSort(200, arr_test, 0, bars.length - 1);
    }

    else if (currentAlgo === "selection") {
        selectionSort(200);
    }

    console.log(`sorting with ${currentAlgo}`)
}

function bubbleSortNorm(arr) {
    for (var i = 0; i < arr.length; i++) {

        // Last i elements are already in place  
        for (var j = 0; j < ( arr.length -i -1); j++){
            
            // Checking if the item at present iteration 
            // is greater than the next iteration
            if (arr[j] > arr[j+1]) {
                // If the condition is true then swap them
                var temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
    // Print the sorted array
    console.log(arr);
}

async function bubbleSort(delay) {
    let bars = document.querySelectorAll(".bar");

    for (var i = 0; i < bars.length; i++) {

        for (var j = 0; j < bars.length -i -1; j++) {
            bars[j].style.backgroundColor = "white";
            bars[j + 1].style.backgroundColor = "white";

            // pauses code for duration of delay
            await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, delay)
            );

             // store current j value
             var curr_j = parseInt(bars[j].childNodes[0].innerHTML);
             // stores minimum value so far
             var next_j = parseInt(bars[j + 1].childNodes[0].innerHTML);

             if (curr_j > next_j) {

                swap(bars, j, j + 1);

                // To pause the execution of code for 300 milliseconds
                await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
                );
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

function partitionNorm(arr, low, high) {
    let pivot = arr[high]; // pivot becomes last element in arr
    let i = low - 1; // i starts before first index

    for (let j = low; j <= high - 1; j++) {

        if (arr[j] < pivot) {
            i++;
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
}

async function partition(delay, arr, low, high) {
    let bars = document.querySelectorAll(".bar");
    // stores minimum value so far
    var pivot_val = parseInt(bars[high].childNodes[0].innerHTML);

    let i = low - 1;

    // pivot colored blue
    bars[high].style.backgroundColor = "rgb(119, 158, 255)";

    // pauses code for duration of delay
    await new Promise((resolve) =>
        setTimeout(() => {
        resolve();
        }, delay)
    );

    for (let j = low; j <= high - 1; j++) {

        // change current j to white
        bars[j].style.backgroundColor = "white";

        // store current j value
        var j_val = parseInt(bars[j].childNodes[0].innerHTML);

        // pauses code for duration of delay
        await new Promise((resolve) =>
            setTimeout(() => {
            resolve();
            }, delay)
        );

        // increments i then swaps i and j
        if (j_val < pivot_val) {
            if (i >= low) {
                bars[i].style.backgroundColor = "salmon";
            }
            i++;
            // i colored red
            bars[i].style.backgroundColor = "red";
            // pauses code for duration of delay
            await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, delay)
            );

            swap(bars, i, j);

            // pauses code for duration of delay
            await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, delay)
            );
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


    // pauses code for duration of delay
    await new Promise((resolve) =>
        setTimeout(() => {
        resolve();
        }, delay)
    );

    return i + 1;
}

async function quickSort(delay, arr, low, high) {
    let bars = document.querySelectorAll(".bar");
    if (low < high) {
        let pivot = await partition(delay, arr, low, high);
        console.log(`pivot index = ${pivot}`);

        await quickSort(delay, arr, low, pivot - 1);
        for (let i = low; i < pivot; i++) {
            bars[i].style.backgroundColor = "rgb(208, 255, 192)";
        }
        await quickSort(delay, arr, pivot + 1, high);
        for (let i = pivot + 1; i < high + 1; i++) {
            bars[i].style.backgroundColor = "rgb(208, 255, 192)";
        }
    }
}

function quickSortNorm(arr, low, high) {
    if (low < high) {
        let pivot = partitionNorm(arr, low, high);

        quickSortNorm(arr, low, pivot - 1);
        quickSortNorm(arr, pivot + 1, high);
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
            await new Promise((resolve) =>
                setTimeout(() => {
                resolve();
                }, delay)
            );

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

        // To pause the execution of code for 300 milliseconds
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, delay)
        );

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

function main() {

    generateBars();

    bubble_div.addEventListener("click", () => selectAlgo("bubble"));

    merge_div.addEventListener("click", () => selectAlgo("merge"));

    quick_div.addEventListener("click", () => selectAlgo("quick"));

    selection_div.addEventListener("click", () => selectAlgo("selection"));

    newArray_div.addEventListener("click", () => resetArray());

    sort_div.addEventListener("click", () => sort());
}

main();

let arr = [1, 3, 4, 2, 3, 4, 5, 2];
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
        bubbleSort(300);
    }

    else if (currentAlgo === "selection") {
        selectionSort(100);
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

             // store current j value
             var curr_j = parseInt(bars[j].childNodes[0].innerHTML);

             // stores minimum value so far
             var next_j = parseInt(bars[j + 1].childNodes[0].innerHTML);

        }
    }
}

async function selectionSort(delay) {
    let bars = document.querySelectorAll(".bar");

    var min_idx = 0;

    for (var i = 0; i < bars.length; i++) {
        // assign i to min_idx
        min_idx = i;
        // current index is red
        bars[i].style.backgroundColor = "red";

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
                    // change color from red back to salmon, we've found a smaller int
                    bars[min_idx].style.backgroundColor = "salmon";
                }
                // set new min_idx
                min_idx = j;
            } else {

                // change color from white back to salmon
                bars[j].style.backgroundColor = "salmon";
            }
        }

        // To swap ith and (min_idx)th bar
        var temp1 = bars[min_idx].style.height;
        var temp2 = bars[min_idx].childNodes[0].innerText;
        bars[min_idx].style.height = bars[i].style.height;
        bars[i].style.height = temp1;
        bars[min_idx].childNodes[0].innerText = bars[i].childNodes[0].innerText;
        bars[i].childNodes[0].innerText = temp2;
        
        // To pause the execution of code for 300 milliseconds
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, delay)
        );

        // reset (min_idx)th bar to salmon
        bars[min_idx].style.backgroundColor = "salmon";

        // change in place bar to light green
        bars[i].style.backgroundColor = " rgb(49, 226, 13)";
    }
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

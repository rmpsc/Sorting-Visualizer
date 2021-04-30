let arr = [1, 3, 4, 2, 3, 4, 5, 2];
let currentAlgo = "";

/* dom variables */
const bubble_div = document.getElementById("bubble");
const merge_div = document.getElementById("merge");
const quick_div = document.getElementById("quick");
const newArray_div = document.getElementById("new-array");
const sort_div = document.getElementById("sort");

function selectAlgo(algo) {
    currentAlgo = algo;
    console.log(currentAlgo);
}

function resetArray() {
    console.log(arr);
    console.log("reset array");
}

function sort() {

    if (currentAlgo === "") {
        console.log("no algo selected");
    } 
    
    else if (currentAlgo === "bubble") {
        bubbleSort(arr);
    }

    console.log(`sorting with ${currentAlgo}`)
}

function bubbleSort(arr) {
    for (var i = 0; i < arr.length; i++) {

        // Last i elements are already in place  
        for (var j = 0; j < ( arr.length - i - 1 ); j++){
            
            // Checking if the item at present iteration 
            // is greater than the next iteration
            if (arr[j] > arr[j + 1]) {
                // If the condition is true then swap them
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    // Print the sorted array
    console.log(arr);
}

function main() {
    bubble_div.addEventListener("click", () => selectAlgo("bubble"));

    merge_div.addEventListener("click", () => selectAlgo("merge"));

    quick_div.addEventListener("click", () => selectAlgo("quick"));

    newArray_div.addEventListener("click", () => resetArray());

    sort_div.addEventListener("click", () => sort());
}

main();

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
        for (var j = 0; j < ( arr.length -i -1 ); j++){
            
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

async function selectionSort(delay = 300) {
    let bars = document.querySelectorAll(".bar");
// Assign 0 to min_idx
var min_idx = 0;
for (var i = 0; i < bars.length; i += 1) {

	// Assign i to min_idx
	min_idx = i;

	// Provide darkblue color to the ith bar
	bars[i].style.backgroundColor = "darkblue";
	for (var j = i + 1; j < bars.length; j += 1) {

	// Provide red color to the jth bar
	bars[j].style.backgroundColor = "red";
		
	// To pause the execution of code for 300 milliseconds
	await new Promise((resolve) =>
		setTimeout(() => {
		resolve();
		}, 300)
	);

	// To store the integer value of jth bar to var1
	var val1 = parseInt(bars[j].childNodes[0].innerHTML);

	// To store the integer value of (min_idx)th bar to var2
	var val2 = parseInt(bars[min_idx].childNodes[0].innerHTML);
		
	// Compare val1 & val2
	if (val1 < val2) {
		if (min_idx !== i) {

		// Provide skyblue color to the (min-idx)th bar
		bars[min_idx].style.backgroundColor = " rgb(24, 190, 255)";
		}
		min_idx = j;
	} else {

		// Provide skyblue color to the jth bar
		bars[j].style.backgroundColor = " rgb(24, 190, 255)";
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
	}, 300)
	);

	// Provide skyblue color to the (min-idx)th bar
	bars[min_idx].style.backgroundColor = " rgb(24, 190, 255)";

	// Provide lightgreen color to the ith bar
	bars[i].style.backgroundColor = " rgb(49, 226, 13)";
}
}
function main() {

    generateBars();

    bubble_div.addEventListener("click", () => selectAlgo("bubble"));

    merge_div.addEventListener("click", () => selectAlgo("merge"));

    quick_div.addEventListener("click", () => selectAlgo("quick"));

    selection_div.addEventListener("click", () => selectionSort());

    newArray_div.addEventListener("click", () => resetArray());

    sort_div.addEventListener("click", () => sort());
}

main();


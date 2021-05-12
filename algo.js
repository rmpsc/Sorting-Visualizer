// all normal versions of implemented algorithms

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

function quickSortNorm(arr, low, high) {
    if (low < high) {
        let pivot = partitionNorm(arr, low, high);

        quickSortNorm(arr, low, pivot - 1);
        quickSortNorm(arr, pivot + 1, high);
    }
}

function mergeSortNorm(arr, l, r) {
    if (l < r) {
        let m = (l + r) / 2;

        mergeSortNorm(arr, 1, m);
        mergeSortNorm(arr, m + 1, r);
        mergeNorm(arr, l, m, r);
    }
}

function mergeNorm(arr, l, m, r) {
    let l_size = m - l + 1;
    let r_size = r - m;

    let l_temp = [];
    let r_temp = [];

    for (let i = 0; i < l_size; i++) {
        l_temp[i] = arr[l + i];
    }

    for (let j = 0; j < r_size; j++) {
        r_temp[j] = arr[m + 1 + j];
    }

    // merge temp arrays back into arr[l..r]
    let i = 0;
    let j = 0;
    let k = l; // index of merged subarray

    while (i < l_size && j < r_size) {
        if (l_temp[i] <= r_temp[j]) {
            arr[k] = l_temp[i];
            i++;
        }
        else {
            arr[k] = r_temp[j];
            j++;
        }
        k++;
    }

    // copy remaining elements
    while (i < l_size) {
        arr[k] = l_temp[i];
        i++;
        k++;
    }

    while (j < r_size) {
        arr[k] = r_temp[j];
        j++;
        k++;
    }

}
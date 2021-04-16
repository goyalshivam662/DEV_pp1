// Sample Input:
// [
//   { name: "Roorkee", rainfall: [5, 6, 5, 5, 4, 7, 8] },
//   { name: "Pauri", rainfall: [3, 3, 3, 1, 2, 2, 2] },
// ];

// Sample Output:
// [
//   { name: "Roorkee", avgRainfall: 5.714285714285714 },
//   { name: "Pauri", avgRainfall: 2.2857142857142856 },
// ];

let input = [
   { name: "Roorkee", rainfall: [5, 6, 5, 5, 4, 7, 8] },
   { name: "Pauri", rainfall: [3, 3, 3, 1, 2, 2, 2] },
     ];
    
getavgRainfall(input);

function getavgRainfall(input){

let modifiedata = input.map(function(inputobj){   // inputobj = {} of  input array

  let obj = {};
  obj.name = inputobj.name;

  let sum = inputobj.rainfall.reduce(function(total,current){  // rainfall => convert sum
   return total+current ;
  });

  obj.avgRainfall = sum / inputobj.rainfall.length;

  return obj;
});

console.log(modifiedata);
} // function















//  let values = [1,2,3,4,5,6];

//  let modifiedvalues = values.map(function(val){
//   return val*val;
//  })
//  console.log(modifiedvalues);

//  let finalvalue = values.reduce(function(total,current){
//   return total+current;
//  });

//  console.log(finalvalue);
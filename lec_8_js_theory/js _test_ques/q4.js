// sample Input:
// {
//   newObj: {
//     obj2: {
//       obj5: {
//         one: 1,
//       },
//     },
//   },
//   obj3: {
//     obj4: { two: 2 },
//   },
// };

// Sample Output:
// { 'newObj.obj2.obj5.one': 1, 'obj3.obj4.two': 2 }
let obj = {
              newObj: {
            obj2: {
              obj5: {
                one: 1,
              },
            },
           },
            obj3: {
            obj4: { two: 2 },
            },
         };
let flatobject = {};
function flattenobject(obj,flatobject,keytillnow){
   for(key in obj){

        if( typeof obj[key]  == 'object'){
       
       keytillnow = keytillnow + key +"."  
      flattenobject(obj[key],flatobject,keytillnow);

        }else{
            keytillnow = keytillnow + key ;
            flatobject[keytillnow] = obj[key];
   
        }


    } //for


} // function

flattenobject(obj,flatobject,"");
console.log(flatobject);
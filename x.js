// const xs = [1, 2, 3, 4, 5, 6];
// const pool = 3;
// const worker = n => {
//     return new Promise(rez => setTimeout(() => rez(n + ''), 1000));
// };

// // Add results of mapping workers over xs, but do not exceed the pool
// const exec = new Promise(rez => {
//     let current = [];
//     current = xs;
//     let i = 0;
//     const f = ix => v => {
//         current = current.map((x, _ix) => {
//             if (typeof x === 'number' && i < pool) {
//                 i++;
//                 return worker(x).then(f(_ix));
//             } else if (ix === _ix) {
//                 i--;
//                 return v;
//             } else {
//                 return x;
//             }
//         });
//         console.log(current);
//         current.every(x => typeof x === 'string') && rez(current);
//     };

//     f()();
// });

// exec.then(console.log);

// // const f = async function*() {
// //     yield;
// //     setTimeout(() => console.log(1), 200);
// //     yield;
// //     yield await new Promise(rez => setTimeout(rez, 100000));
// // };

// // const it = f();
// // it.next();
// // it.next();
// // it.next();

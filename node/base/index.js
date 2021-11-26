const _ = require("lodash");

const array = ["a", "b", "c", "d"];
//chunk对数组中的元素进行分组
//参数一 要进行操作的数组
//参数二 每一组中包含的元素个数
console.log(_.chunk(array, 2));//[ [ 'a', 'b' ], [ 'c', 'd' ] ] 
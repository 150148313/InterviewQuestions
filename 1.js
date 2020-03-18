/*1，输入：“get1_install2_app3_list4_by5_android6”
（每个单词后面总会携带一个数字，只有偶数才删掉），我不用循环只用正则怎么实现输出"get1InstallApp3ListBy5Android"？*/
let str = 'get1_install2_app3_list4_by5_android6';
str = str.replace(/[A-Za-z]*[0-9]/g, (val, index) => {
  if (index !== 0) {
    val = val.replace(/[A-Za-z]{1}/, (val) => val.toLocaleUpperCase())
  }
  if (((val.substring(val.length - 1, val.length)) ^ 0) % 2 === 0) {
    return val.substring(0, val.length - 1)
  } else {
    return val
  }
}).replace(/_/g, '')
/*2，不能使用任何循环控制语句和迭代器的情况下实现一个0到1000的数组赋值。*/
let arr1 = []
function deep(val) {
    if (arr1.length > 1000) {
    return null
    }
  arr1.push(val)
  deep(++val)
}
deep(0)

/*3，判断两个对象（注意特殊对象的处理）找出不一致的是哪个变量，返回的格式类似："root变量-父变量-...-不一致的变量"的字符串；*/
function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return Object.prototype.toString.call(value)
}
const isObject = ['[object Array]', '[object Object]']
function judge(objA, objB) {
  if (!isObject.includes(getTag(objA)) || !isObject.includes(getTag(objB))) {
  return 'No Support'
  }
  let list = []
  let index = -1
  let unEqual = []
  function deep(objA, objB, le, parent) {
    le = le || 0
    parent = parent || null
    function check(objOne, objTwo) {
      let strEqualKey = []
      for (let key1 in objOne) {
      if(objTwo[key1]) {
          strEqualKey.push(key1)
        }
      }
      return strEqualKey
    }
    const isEqual =  check(objA, objB)
    for (let i = 0; i < isEqual.length; i++) {
      let level = le;
      let val = isEqual[i]
      if (objA[val] !== objB[val]) {
        unEqual.push({level, val, parent})
        if (isObject.includes(getTag(objA[val])) && isObject.includes(getTag(objB[val]))) {
          deep(objA[val], objB[val], ++level, val)
        }
      }
    }
  }
  deep(objA, objB)
  unEqual = unEqual.filter(val => {
    const child = unEqual.filter(mapVal => val.val === mapVal.parent)
    val.child = child.length > 0 ? child : null
    return !val.parent
  })
  deepChild(unEqual)
  function deepChild(tree) {
    tree.forEach(val => {
      if (val.level === 0) {
        console.log(val.level)
        list.push([val.val])
        index++
      } else {
        list[index].push(val.val)
      }
      if (val.child) {
        deepChild(val.child)
      }
    })
  }
  return list
}

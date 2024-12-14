# JavaScript

::: tip 温馨提示
高阶应用学习可前往 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript" target="_blank">MDN 官网</a>
:::

## 递归运用

### 1. 扁平化

```js
// 示例数据
const treeData = [
  {
    id: 1,
    name: "Node 1",
    children: [
      { id: 2, name: "Node 2", children: [] },
      {
        id: 3,
        name: "Node 3",
        children: [{ id: 4, name: "Node 4", children: [] }],
      },
    ],
  },
];
function flattTree(tree) {
  let result = [];
  for (let node of tree) {
    result.push({ ...node });
    if (node.children) {
      result = result.concat(flattTree(node.children));
    }
  }
  return result;
}

let a = flattTree(treeData);
console.log(a);
// [
//   { id: 1, name: "Node 1", children: [[Object], [Object]] },
//   { id: 2, name: "Node 2", children: [] },
//   { id: 3, name: "Node 3", children: [[Object]] },
//   { id: 4, name: "Node 4", children: [] },
// ];
```

### 2. 表单校验

```js
function validateTree(tree) {
  for (let node of tree) {
    if (!node.name) return false;
    if (node.children && validateTree(node.children)) return false;
  }
  return true;
}
// 示例数据
const treeData = [
  {
    id: 1,
    name: "Node 1",
    children: [
      { id: 2, name: "", children: [] }, // 无效
      { id: 3, name: "Node 3", children: [] },
    ],
  },
];
// 使用
const isValid = validateTree(treeData);
console.log(isValid); // false
```

### 3. 累加

```js
// 示例数据
const treeData = [
  {
    id: 1,
    value: 10,
    weight: 5,
    children: [
      { id: 2, value: 20, weight: 10, children: [] },
      {
        id: 3,
        value: 30,
        weight: 15,
        children: [{ id: 4, value: 40, weight: 20, children: [] }],
      },
    ],
  },
];
function sumFnc(tree, attr) {
  let sum = 0;
  for (let node of tree) {
    sum += node[attr] || 0;
    if (node.children) {
      sum += sumFnc(node.children, attr);
    }
  }
  return sum;
}
// 使用：累加 `weight` 属性
const totalWeight = sumFnc(treeData, "weight");
console.log(totalWeight); // 输出: 50
```

### 4. 查找数据

```js
// 示例数据
const treeData = [
  {
    id: 1,
    name: "Node 1",
    children: [
      { id: 2, name: "Node 2", children: [] },
      {
        id: 3,
        name: "Node 3",
        children: [{ id: 4, name: "Node 4", children: [] }],
      },
    ],
  },
];
function queryId(tree, id) {
  let result = {};
  for (let node of tree) {
    if (node.id === id) return (result = { ...node });
    if (node.children) {
      return queryId(node.children, id);
    }
  }
  return result;
}
let result = queryId(treeData, 4);
console.log(result);
```

### 5. 面包屑

```js
function generateBreadCrumb(node) {
  const breadcrumb = [];
  let current = node.parent;
  while (node) {
    breadcrumb.unshift(node.name); // 从当前节点往根节点方向收集名称
    current = node.parent;
  }
  return breadcrumb;
}

// 示例数据
const currentNode = {
  id: 4,
  name: "Sub-subcategory 1",
  parent: {
    id: 3,
    name: "Subcategory 2",
    parent: {
      id: 1,
      name: "Category 1",
      parent: null,
    },
  },
};

// 使用
const breadcrumb = generateBreadCrumb(currentNode);
console.log(breadcrumb);
// 输出: ['Category 1', 'Subcategory 2', 'Sub-subcategory 1']
```

## 节流

::: tip 动作
保证在一定时间间隔内最多执行一次
:::
::: danger 场景
滚动，鼠标拖拽
:::

### 完整版

```js
/**
 * @param {Function} fn 需要节流的函数
 * @param {number} wait 等待时间（毫秒）
 * @param {Object} options 配置选项
 * @param {boolean} [options.leading=true] 是否立即执行
 * @param {boolean} [options.trailing=true] 是否在等待时间结束后执行
 */
export function throttle(fn, wait, options = {}) {
  let timer = null;
  let previous = 0; // 上次执行时间

  // 默认配置
  const { leading = true, trailing = true } = options;

  return function (...args) {
    const now = Date.now();

    // 如果是第一次调用且不需要首次执行
    if (!previous && leading === false) {
      previous = now;
    }

    const remaining = wait - (now - previous); // 剩余等待时间

    // 如果已经到了等待时间或者是第一次调用
    if (remaining <= 0 || remaining > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      fn.apply(this, args);
    } else if (!timer && trailing) {
      // 如果还在等待时间内，且允许尾部执行，设置定时器
      timer = setTimeout(() => {
        previous = leading ? Date.now() : 0;
        timer = null;
        fn.apply(this, args);
      }, remaining);
    }
  };
}
```

### 丐版

```js
/* 等待执行 */
function throrrle(fnc, wait) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fnc(...args);
        timer = null;
      }, wait);
    }
  };
}
/* 立即执行 */
function throttle(fnc, wait) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      fnc(...args);
      lastTime = now;
    }
  };
}
```

## 防抖

::: tip 动作
在 n 秒内多次执行，只执行最后一次，如果在 n 秒内再次触发，则重新计时
:::
::: danger 场景
搜索框输入，窗口大小改变
:::

### 完整版

```js
/**
 * @param {Function} fn 需要防抖的函数
 * @param {number} wait 等待时间（毫秒）
 * @param {Object} options 配置选项
 *
 */
export function debounce(fn, wait, options = {}) {
  let timer = null;

  // 默认配置
  const { leading = false, trailing = true } = options;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    if (leading) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) {
        fn.apply(this, args);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, wait);
    }
  };
}
```

### 丐版

```js
function debounce(fn, wait) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}
```

## 元素类型判断选择

- ### 基本数据类型判断

```tex
选择 typeof 性能优于 Object.prototype.toString.call()
- typeof的缺陷
console.log(typeof null); // "object" (这是 JS 的历史遗留问题)
console.log(typeof {}); // "object"
console.log(typeof []); // "object" (数组也是对象)
```

- ### 数据类型不确定，且要求精确度

```js
选择 Object.prototype.toString.call()
console.log(Object.prototype.toString.call(123)); // "[object Number]"
console.log(Object.prototype.toString.call('hello')); // "[object String]"
console.log(Object.prototype.toString.call(true)); // "[object Boolean]"
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
console.log(Object.prototype.toString.call(null)); // "[object Null]"
console.log(Object.prototype.toString.call([])); // "[object Array]"
console.log(Object.prototype.toString.call({})); // "[object Object]"
console.log(Object.prototype.toString.call(function(){})); // "[object Function]"
console.log(Object.prototype.toString.call(new Date())); // "[object Date]"
console.log(Object.prototype.toString.call(/abc/)); // "[object RegExp]"
```

- ### 数组

```tex
选择Array.isArray()最高效标准
```

## 数据比较

### 1. 浮点数对比

::: danger 提示

直接使用 `===` 比较浮点数可能会导致意外结果。推荐使用一个容忍误差的比较方法。

:::

```js
function areNumbersEqual(num1, num2, precision = 1e-10) {
  return Math.abs(num1 - num2) < precision;
}

console.log(areNumbersEqual(0.1 + 0.2, 0.3)); // 输出: true
console.log(areNumbersEqual(0.1 + 0.2, 0.3000000001)); // 输出: false
```

::: tip 业务场景较多，建议使用

**专业的数字处理库**（如 `Decimal.js` 或 `BigNumber.js`）来进行高精度计算

:::

| 特性           | Decimal.js                                      | BigNumber.js                            |
| -------------- | ----------------------------------------------- | --------------------------------------- |
| **精度**       | 高精度的浮点数计算，支持任意精度                | 高精度的数字处理，支持任意精度          |
| **性能**       | 性能较慢，适合需要高精度的应用                  | 性能较好，尤其是在处理较大数值时        |
| **库体积**     | 相对较大                                        | 相对较小                                |
| **兼容性**     | 支持现代浏览器和 Node.js，需引入额外的 Polyfill | 支持现代浏览器和 Node.js，无需 Polyfill |
| **API 风格**   | 提供了类似数值的 API                            | 提供了更为传统的链式 API                |
| **使用场景**   | 需要高精度、浮动计算的场景，如金融计算          | 需要高精度、快速计算的场景，如大数计算  |
| **API 易用性** | API 简单，类似数学运算                          | API 也较为简单，但支持更多的自定义操作  |
| **依赖性**     | 无依赖                                          | 无依赖                                  |

**Decimal.js 示例**

```javascript
// 引入 Decimal.js
import Decimal from "decimal.js";

// 创建 Decimal 实例
const num1 = new Decimal(0.1);
const num2 = new Decimal(0.2);

// 加法操作
const result = num1.plus(num2);

console.log(result.toString()); // 输出 "0.3"
```

**BigNumber.js 示例**

```
javascript复制代码// 引入 BigNumber.js
import BigNumber from 'bignumber.js';

// 创建 BigNumber 实例
const num1 = new BigNumber(0.1);
const num2 = new BigNumber(0.2);

// 加法操作
const result = num1.plus(num2);

console.log(result.toString()); // 输出 "0.3"
```

::: warning 总结

- **Decimal.js** 更适合于需要极高精度的计算，特别是在金融、科学计算等领域。
- **BigNumber.js** 更适合快速处理大数值计算，且性能较优。

:::

### 2.数据对比

::: info 场景

用户个人信息修改时的检查

:::

#### 2.1 数据量较小的情况下

::: danger 提醒

数据量超过 1000，频繁触发，就会出现性能问题

:::

```js
function compareData(localData, remoteData) {
  // 比较两个数组中的对象，找出差异
  let added = localData.filter((item) => !remoteData.includes(item));
  let removed = remoteData.filter((item) => !localData.includes(item));
  let updated = localData.filter(
    (item) =>
      remoteData.includes(item) &&
      item !== remoteData.find((d) => d.id === item.id)
  );
  return { added, removed, updated };
}
```

#### 2.2 降低时间复杂度

```js
// 方案1 使用Set数据结构
// 差异检测：通过比较 id 来找出新增和删除的记录，使用 JSON.stringify() 来深度比较对象的内容，避免了对象属性顺序不同的问题。对于复杂的对象比较，可以根据需要自定义深度比较的方式。
function compareData(localData, remoteData) {
  const added = [];
  const removed = [];
  const updated = [];

  const localDataMap = new Map(localData.map((item) => [item.id, item]));
  const remoteDataMap = new Map(remoteData.map((item) => [item.id, item]));

  // 遍历本地数据
  for (const [id, localItem] of localDataMap) {
    const remoteItem = remoteDataMap.get(id);

    if (!remoteItem) {
      added.push(localItem); // 新增的记录
    } else if (JSON.stringify(localItem) !== JSON.stringify(remoteItem)) {
      updated.push(localItem); // 更新的记录
    }
  }

  // 遍历远程数据，找出删除的记录
  for (const [id, remoteItem] of remoteDataMap) {
    if (!localDataMap.has(id)) {
      removed.push(remoteItem); // 删除的记录
    }
  }

  return { added, removed, updated };
}
// 方案2 进阶 一次遍历
function compareData(localData, remoteData) {
  const added = [];
  const removed = [];
  const updated = [];

  const localDataMap = new Map(localData.map((item) => [item.id, item]));
  const remoteDataMap = new Map(remoteData.map((item) => [item.id, item]));

  // 遍历本地数据
  for (const [id, localItem] of localDataMap) {
    const remoteItem = remoteDataMap.get(id);

    if (!remoteItem) {
      added.push(localItem); // 新增的记录
    } else if (JSON.stringify(localItem) !== JSON.stringify(remoteItem)) {
      updated.push(localItem); // 更新的记录
    }
  }

  // 遍历远程数据，找出删除的记录
  for (const [id, remoteItem] of remoteDataMap) {
    if (!localDataMap.has(id)) {
      removed.push(remoteItem); // 删除的记录
    }
  }

  return { added, removed, updated };
}
```

### 3. 数据合并

**对象合并**

```js
function mergeData(oldData, newData) {
  for (let key in newData) {
    if (newData[key] !== oldData[key]) {
      oldData[key] = newData[key]; // 更新旧数据
    }
  }
  return oldData;
}
```

::: info 场景：数组对象合并

检查 `形参1` 中是否有与 `形参2` 匹配的 `id`，如果没有匹配到，就将 `形参2` 中的对象添加到 `形参1` 中。最终结果是：将 `形参2` 中的数据合并到 `形参1` 中，同时保证所有的 `id` 都被包含

:::

```js
function mergeArrays(arr1, arr2) {
  // 将 arr1 和 arr2 合并，首先合并 arr1 中已有的匹配项
  arr2.forEach((item2) => {
    // 查找 arr1 中是否有与 item2 相同 id 的项
    const index = arr1.findIndex((item1) => item1.id === item2.id);

    if (index !== -1) {
      // 如果找到匹配项，则合并数据
      arr1[index] = { ...arr1[index], ...item2 };
    } else {
      // 如果没有匹配项，则将 item2 添加到 arr1
      arr1.push(item2);
    }
  });

  return arr1;
}

// 示例数据
const arr1 = [
  { id: 1, name: "John", age: 28 },
  { id: 2, name: "Jane", age: 24 },
];

const arr2 = [
  { id: 1, name: "John名字改变了", address: "New York" }, // [!code error]
  { id: 2, address: "Los Angeles" },
  { id: 3, name: "Tom", age: 30 },
];

// 调用 mergeArrays 函数
const mergedResult = mergeArrays(arr1, arr2);

// 输出合并后的结果
console.log(mergedResult);
[
  {
    id: 1,
    name: "John名字改变了",
    age: 28,
    address: "New York",
  },
  {
    id: 2,
    name: "Jane",
    age: 24,
    address: "Los Angeles",
  },
  {
    id: 3,
    name: "Tom",
    age: 30,
  },
];
```

### 4. 数组去重

#### 4.1 一维 数据量庞大

::: tip
当数组的数量非常大时，性能最佳的去重方案通常依赖于使用 Set 或 Map 数据结构，因为它们在大多数情况下能提供常数时间复杂度 (O(1)) 的查找和插入操作。
:::

```js
function removeDuplicatesById(arr) {
  const seen = new Map();
  const result = [];

  for (const item of arr) {
    if (!seen.has(item.id)) {
      seen.set(item.id, true); // 只要没有这个 id，就插入 Map
      result.push(item);
    }
  }
  return result;
}
const arr = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Alice Updated" },
  { id: 3, name: "Charlie" },
  { id: 2, name: "Bob Updated" },
  { id: 4, name: "David" },
];

const uniqueArr = removeDuplicatesById(arr);
console.log(uniqueArr);
// 输出: [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' },
//   { id: 3, name: 'Charlie' },
//   { id: 4, name: 'David' }
// ]
```

#### 4.2 多维

::: tip 数组对象中，有多级嵌套

1 先递归处理

2 在展平数组的过程中，我们使用 `Map` 或 `Set` 来确保每个 `id` 只出现一次。

:::

```js
function flattenArray(arr) {
  const result = [];

  // 递归扁平化数组
  arr.forEach((item) => {
    result.push(item); // 加入当前对象
    if (item.children && item.children.length > 0) {
      result.push(...flattenArray(item.children)); // 递归扁平化 children 数组
    }
  });

  return result;
}

function removeDuplicatesById(arr) {
  const flattenedArr = flattenArray(arr); // 扁平化处理
  const seen = new Map();
  const result = [];

  for (const item of flattenedArr) {
    if (item && item.id && !seen.has(item.id)) {
      seen.set(item.id, true); // 使用 Map 按 id 去重
      result.push(item);
    }
  }

  return result;
}
const arr = [
  {
    id: 1,
    name: "Alice",
    children: [
      {
        id: 4,
        name: "David",
        children: [
          {
            id: 5,
            name: "Eva",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Bob",
  },
  {
    id: 3,
    name: "Alice Updated",
  },
  {
    id: 1,
    name: "Alice Duplicate",
    children: [],
  },
];

const uniqueArr = removeDuplicatesById(arr);
console.log(uniqueArr);
// [
//   { id: 1, name: "Alice", children: [[Object]] },
//   { id: 2, name: "Bob" },
//   { id: 3, name: "Alice Updated" },
//   { id: 4, name: "David", children: [[Object]] },
//   { id: 5, name: "Eva", children: [] },
// ];
```

### 5.树形结构数据映射

:::tip 场景
树形控件，勾选的节点数据，映射到另外一个树形控件，且子夫关系要包含进去。左：默认值范围，右：默认值
:::

```js
// 源树的数据
const sourceData = [
  {
    label: "节点1",
    id: 1,
    children: [
      {
        label: "子节点1-1",
        id: 11,
        children: [{ label: "子节点1-1-1", id: 111 }],
      },
      { label: "子节点1-2", id: 12 },
    ],
  },
  {
    label: "节点2",
    id: 2,
    children: [
      { label: "子节点2-1", id: 21 },
      { label: "子节点2-2", id: 22 },
    ],
  },
];

// 用于存储选中节点的 ID 数组
let checkedNodeIds = [1, 11, 111, 22]; // 假设选中了节点1、子节点1-1、子节点1-1-1 和 子节点2-2

// 递归函数：根据选中的节点生成目标树
function createNode(node, selectedNodeIds) {
  // 如果节点为空，则返回 null
  if (!node) return null;

  // 判断当前节点是否被选中
  const isSelected = selectedNodeIds.includes(node.id);

  // 递归处理子节点，确保每层子节点都正确处理
  const children = node.children
    ? node.children
        .map((childNode) => createNode(childNode, selectedNodeIds))
        .filter(Boolean)
    : [];

  // 如果当前节点被选中，或者它有选中的子节点，则将其添加到目标树
  if (isSelected || children.length > 0) {
    return {
      ...node,
      children, // 保持子节点关系
    };
  }

  return null;
}

// 遍历源树数据，生成目标树
function generateTargetTree(sourceData, checkedNodeIds) {
  return sourceData
    .map((rootNode) => createNode(rootNode, checkedNodeIds))
    .filter(Boolean); // 过滤掉没有选中或无子节点的节点
}

// 生成目标树的数据
const targetData = generateTargetTree(sourceData, checkedNodeIds);

// 输出目标树的数据
console.log("目标树数据：", JSON.stringify(targetData, null, 2));
// 目标树数据： [
//   {
//     "label": "节点1",
//     "id": 1,
//     "children": [
//       {
//         "label": "子节点1-1",
//         "id": 11,
//         "children": [
//           {
//             "label": "子节点1-1-1",
//             "id": 111
//           }
//         ]
//       }
//     ]
//   },
//   {
//     "label": "节点2",
//     "id": 2,
//     "children": [
//       {
//         "label": "子节点2-2",
//         "id": 22
//       }
//     ]
//   }
// ]
```

## 函数柯里化

::: tip 作用
一个多参数的函数转换成一系列每次接受一个参数的函数，并且返回接收余下参数的新函数
:::
**例子**

```jsx
function add(a, b) {
  return a + b;
}
```

**如果我们使用柯里化，将其转换成一系列接受单一参数的函数：**

```jsx
function curriedAdd(a) {
  return function (b) {
    return a + b;
  };
}
```

**封装**

```js
function curry(fn) {
  const arity = fn.length; // 获取原函数的参数个数
  return function curried(...args) {
    if (args.length >= arity) {
      return fn(...args); // 参数满足数量，执行原函数
    } else {
      return function (...next) {
        return curried(...args, ...next); // 继续接收参数
      };
    }
  };
}
```

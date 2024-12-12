# JavaScript

::: tip 温馨提示
高阶应用学习可前往 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript" target="_blank">MDN 官网</a>
:::

## 递归运用

### 1. 数据校验

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
```

### 2. 数据校验

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


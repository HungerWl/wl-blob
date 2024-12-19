---
title: Element
---

# ![](./work.assets/element.svg)

## 树形控件

示例：[codePen](https://codepen.io/ijrbpwdk-the-sans/pen/VYZpdLX) 请给点个小 ❤ ❤
关键代码：映射函数
:::tip 
nodes 完整树json <br>
selectedKeys 选中节点 id 数组
:::

```js
 rangeMapping(nodes, selectedKeys) {
      // 初始化返回数组
      const ret = [];

      // 遍历每个节点
      nodes.forEach((node) => {
        // 创建一个新节点，复制原节点的所有属性
        const newNode = { ...node };

        // 删除新节点的children属性，以避免递归时的无限循环
        delete newNode.children;

        // 处理子节点，如果原节点有children属性
        if (node.children) {
          newNode.children = this.rangeMapping(node.children, selectedKeys);
        }

        // 检查新节点的DICTIONARIES_ID是否在selectedKeys中，或是否有子节点
        const isSelected = selectedKeys.includes(newNode.DICTIONARIES_ID);
        const hasChildren = newNode.children && newNode.children.length > 0;

        // 如果新节点被选中或有子节点，则将其添加到返回数组中
        if (isSelected || hasChildren) {
          ret.push(newNode);
        }
      });

      // 返回处理后的节点数组
      return ret;
    },
```

⚠️当el-table里面嵌套el-tree组件的时候，fixed属性会导致无法正常获取实例，比如this.$refs.tree.getCheckedNodes(true)失效

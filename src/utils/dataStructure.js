/**
 * 二叉搜索树(BSTTree)
 * 特点：
 *      不稳定，最坏情况退化成链表。
 *      最好情况为自平衡二叉搜索树
 * @returns 
 * @举例
  const tree = new BSTTree() // 创建树
  tree.insert(7) // 插入节点，数据为7
  tree.insert(1) // 插入节点，数据为1
  tree.insert(5) // 插入节点，数据为5
  tree.insert(10) // 插入节点，数据为10
  tree.insert(2) // 插入节点，数据为2
  tree.remove(1) // 删除节点，数据为1
  const curNode= tree.find(7) // 寻找数据为7的节点
  console.log(curNode)
  tree.traverse(tree.root, 'center', v => true, (v) => {console.log(v)})
 */
export function BSTTree() {
  let root = null
  const createNode = data => ({ data, left: null, right: null }) // 创建节点
  /**
   * 插入数据
   * @param {*} data 需要插入的数据
   * @param {*} fn 获取数据的函数，可以允许拿其中特定字段比较
   */
  function insert(data, fn = v => v) {
    const newNode = createNode(data)
    if (!root) {
      root = newNode
      return
    }
    let current = root
    while (true) {
      if (fn(data) < fn(current.data)) {
        if (!current.left) {
          current.left = newNode
          break
        }
        current = current.left
      } else {
        if (!current.right) {
          current.right = newNode
          break
        }
        current = current.right
      }
    }
  }
  /**
   * 遍历树
   * @param {*} node 从哪个节点开始遍历
   * @param {*} type 遍历类型  center：中序遍历  prev：前序遍历  next：后序遍历  
   * @param {*} search 匹配函数
   * @param {*} fn 匹配到之后的执行函数
   */
  function traverse(node = root, type = 'center', search = v => true, fn = console.log) {
    if (!node) return
    const data = node.data
    // 提前计算是否需要执行 fn
    const executeFn = search(data) && fn
    if (type === 'prev' && executeFn) fn(data) // 前序遍历
    traverse(node.left, type, search, fn)
    if (type === 'center' && executeFn) fn(data) // 中序遍历
    traverse(node.right, type, search, fn)
    if (type === 'next' && executeFn) fn(data) // 后序遍历
  }
  // 删除节点
  function remove(data, fn = v => v) {
    function removeNode(node, data) {
      if (!node) return null
      const nodeData = fn(node.data)
      const compData = fn(data)
      if (compData < nodeData) {
        node.left = removeNode(node.left, data)
      } else if (compData > nodeData) {
        node.right = removeNode(node.right, data)
      } else {
        // 找到要删除的节点
        if (!node.left && !node.right) {
          return null // 情况1: 该节点没有子节点
        }
        if (!node.left) {
          return node.right // 情况2: 该节点只有右子节点
        }
        if (!node.right) {
          return node.left // 情况3: 该节点只有左子节点
        }
        // 情况4: 该节点有两个子节点
        let minNode = findMin(node.right)
        node.data = minNode.data
        node.right = removeNode(node.right, minNode.data)
      }
      return node
    }
    root = removeNode(root, data)
  }
  // 查找树中的最小值
  function findMin(node) {
    while (node.left) { node = node.left }
    return node
  }
  // 查找节点
  function find(data, fn = v => v) {
    let current = root
    const compData = fn(data)
    while (current) {
      const currentData = fn(current.data)
      if (compData === currentData) {return current}
      current = compData < currentData ? current.left : current.right
    }
    return null // 找不到节点，返回null
  }

  return { insert, traverse, remove, find, getRoot: () => root }
}
/**
 * 自平衡的二叉搜索树（AVLTree）
 * 特点：
 *      查询、修改快↑
 *      新增和删除慢↓。因为新增和删除会导致更多的旋转
 * @returns 
 * @举例
  const tree = new AVLTree() // 创建树
  tree.insert(7) // 插入节点，数据为7
  tree.insert(1) // 插入节点，数据为1
  tree.insert(5) // 插入节点，数据为5
  tree.insert(10) // 插入节点，数据为10
  tree.insert(2) // 插入节点，数据为2
  tree.remove(1) // 删除节点，数据为1
  const curNode= tree.find(7) // 寻找数据为7的节点
  console.log(curNode)
  tree.traverse(tree.root, 'center', v => true, (v) => {console.log(v)})
 */
export function AVLTree() {
  let root = null
  const createNode = (data) => ({ data, left: null, right: null, height: 1 })
  const getHeight = (node) => node ? node.height : 0
  const updateHeight = (node) => node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1
  // 计算节点的平衡因子
  const getBalanceFactor = (node) => getHeight(node.left) - getHeight(node.right)
  // 右旋
  const rightRotate = (y) => {
    const x = y.left
    const T2 = x.right
    x.right = y
    y.left = T2
    updateHeight(y)
    updateHeight(x)
    return x
  }
  // 左旋
  const leftRotate = (x) => {
    const y = x.right
    const T2 = y.left
    y.left = x
    x.right = T2
    updateHeight(x)
    updateHeight(y)
    return y
  }
  // 插入节点
  function insert(data, fn = v => v) {
    root = insertNode(root, data, fn)
  }
  function insertNode(node, data, fn) {
    if (!node) return createNode(data)
    if (fn(data) < fn(node.data)) {
      node.left = insertNode(node.left, data, fn)
    } else if (fn(data) > fn(node.data)) {
      node.right = insertNode(node.right, data, fn)
    } else {
      return node // 重复数据，跳过插入
    }
    updateHeight(node)
    const balance = getBalanceFactor(node)
    if (balance > 1) {
      if (fn(data) < fn(node.left.data)) return rightRotate(node) // 左左情况
      node.left = leftRotate(node.left) // 左右情况
      return rightRotate(node)
    }
    if (balance < -1) {
      if (fn(data) > fn(node.right.data)) return leftRotate(node) // 右右情况
      node.right = rightRotate(node.right) // 右左情况
      return leftRotate(node)
    }
    return node // 不需要旋转，直接返回
  }
  // 查找节点
  function find(data, fn = v => v) {
    let current = root
    while (current) {
      const currentData = fn(current.data)
      if (fn(data) === currentData) return current // 找到节点
      current = fn(data) < currentData ? current.left : current.right
    }
    return null // 没找到
  }
  // 遍历树
  function traverse(node = root, type = 'center', search = v => true, fn = console.log) {
    if (!node) return
    const data = node.data
    const executeFn = search(data) && fn
    if (type === 'prev' && executeFn) fn(data) // 前序遍历
    traverse(node.left, type, search, fn)
    if (type === 'center' && executeFn) fn(data) // 中序遍历
    traverse(node.right, type, search, fn)
    if (type === 'next' && executeFn) fn(data) // 后序遍历
  }
  // 删除节点
  function remove(data, fn = v => v) {
    root = removeNode(root, data, fn)
  }
  function removeNode(node, data, fn) {
    if (!node) return null
    if (fn(data) < fn(node.data)) {
      node.left = removeNode(node.left, data, fn)
    } else if (fn(data) > fn(node.data)) {
      node.right = removeNode(node.right, data, fn)
    } else {
      if (!node.left || !node.right) {
        node = node.left || node.right // 一个子节点或没有子节点
      } else {
        const successor = getMinNode(node.right)
        node.data = successor.data
        node.right = removeNode(node.right, successor.data, fn)
      }
    }
    if (!node) return null // 删除后返回空节点
    updateHeight(node)
    const balance = getBalanceFactor(node)
    if (balance > 1) {
      if (getBalanceFactor(node.left) >= 0) return rightRotate(node) // 左左情况
      node.left = leftRotate(node.left) // 左右情况
      return rightRotate(node)
    }
    if (balance < -1) {
      if (getBalanceFactor(node.right) <= 0) return leftRotate(node) // 右右情况
      node.right = rightRotate(node.right) // 右左情况
      return leftRotate(node)
    }
    return node
  }
  // 获取树中的最小节点
  function getMinNode(node) {
    while (node.left) node = node.left
    return node
  }
  return { insert, remove, find, traverse, getRoot: () => root }
}
/**
 * 红黑树
 * 特点：
 *      查询、修改快↑
 *      新增和删除慢↓。因为新增和删除会导致更多的旋转
 * @returns 
 * @举例
  const tree = new RedBlackTree() // 创建树
  tree.insert(7) // 插入节点，数据为7
  tree.insert(1) // 插入节点，数据为1
  tree.insert(5) // 插入节点，数据为5
  tree.insert(10) // 插入节点，数据为10
  tree.insert(2) // 插入节点，数据为2
  tree.remove(1) // 删除节点，数据为1
  const curNode= tree.find(7) // 寻找数据为7的节点
  console.log(curNode)
  tree.traverse(tree.root, 'center', v => true, (v) => {console.log(v)})
 */
export function RedBlackTree() {
  const RED = 'RED'
  const BLACK = 'BLACK'
  let root = null
  const createNode = (data, color = RED, parent = null) => ({ data, color,left: null,right: null,parent })
  // 左旋
  function leftRotate(x) {
    const y = x.right
    x.right = y.left
    if (y.left) y.left.parent = x
    y.parent = x.parent
    if (!x.parent) {
      root = y
    } else if (x === x.parent.left) {
      x.parent.left = y
    } else {
      x.parent.right = y
    }
    y.left = x
    x.parent = y
  }
  // 右旋
  function rightRotate(y) {
    const x = y.left
    y.left = x.right
    if (x.right) x.right.parent = y
    x.parent = y.parent
    if (!y.parent) {
      root = x
    } else if (y === y.parent.left) {
      y.parent.left = x
    } else {
      y.parent.right = x
    }
    x.right = y
    y.parent = x
  }
  // 插入节点
  function insert(data, fn = v => v) {
    let node = createNode(data)
    let y = null
    let x = root
    while (x) {
      y = x
      if (fn(data) < fn(x.data)) {
        x = x.left
      } else if (fn(data) > fn(x.data)) {
        x = x.right
      } else {
        return // 重复值不插入
      }
    }
    node.parent = y
    if (!y) {
      root = node
    } else if (fn(data) < fn(y.data)) {
      y.left = node
    } else {
      y.right = node
    }
    fixInsert(node)
  }
  // 插入修复
  function fixInsert(z) {
    while (z.parent && z.parent.color === RED) {
      const gp = z.parent.parent
      if (z.parent === gp.left) {
        const y = gp.right
        if (y && y.color === RED) {
          z.parent.color = BLACK
          y.color = BLACK
          gp.color = RED
          z = gp
        } else {
          if (z === z.parent.right) {
            z = z.parent
            leftRotate(z)
          }
          z.parent.color = BLACK
          gp.color = RED
          rightRotate(gp)
        }
      } else {
        const y = gp.left
        if (y && y.color === RED) {
          z.parent.color = BLACK
          y.color = BLACK
          gp.color = RED
          z = gp
        } else {
          if (z === z.parent.left) {
            z = z.parent
            rightRotate(z)
          }
          z.parent.color = BLACK
          gp.color = RED
          leftRotate(gp)
        }
      }
    }
    root.color = BLACK
  }
  function transplant(u, v) {
    if (!u.parent) {
      root = v
    } else if (u === u.parent.left) {
      u.parent.left = v
    } else {
      u.parent.right = v
    }
    if (v) v.parent = u.parent
  }

  function minimum(node) {
    while (node.left) node = node.left
    return node
  }

  function remove(data) {
    let z = find(data)
    if (!z) return

    let y = z
    let yOriginalColor = y.color
    let x

    if (!z.left) {
      x = z.right
      transplant(z, z.right)
    } else if (!z.right) {
      x = z.left
      transplant(z, z.left)
    } else {
      y = minimum(z.right)
      yOriginalColor = y.color
      x = y.right
      if (y.parent === z) {
        if (x) x.parent = y
      } else {
        transplant(y, y.right)
        y.right = z.right
        y.right.parent = y
      }
      transplant(z, y)
      y.left = z.left
      y.left.parent = y
      y.color = z.color
    }

    if (yOriginalColor === BLACK) fixRemove(x, z.parent)
  }

  function fixRemove(x, parent) {
    while (x !== root && (!x || x.color === BLACK)) {
      if (x === (parent?.left)) {
        let w = parent.right
        if (w && w.color === RED) {
          w.color = BLACK
          parent.color = RED
          leftRotate(parent)
          w = parent.right
        }
        if ((!w.left || w.left.color === BLACK) && (!w.right || w.right.color === BLACK)) {
          w.color = RED
          x = parent
          parent = x.parent
        } else {
          if (!w.right || w.right.color === BLACK) {
            if (w.left) w.left.color = BLACK
            w.color = RED
            rightRotate(w)
            w = parent.right
          }
          w.color = parent.color
          parent.color = BLACK
          if (w.right) w.right.color = BLACK
          leftRotate(parent)
          x = root
        }
      } else {
        let w = parent.left
        if (w && w.color === RED) {
          w.color = BLACK
          parent.color = RED
          rightRotate(parent)
          w = parent.left
        }
        if ((!w.right || w.right.color === BLACK) && (!w.left || w.left.color === BLACK)) {
          w.color = RED
          x = parent
          parent = x.parent
        } else {
          if (!w.left || w.left.color === BLACK) {
            if (w.right) w.right.color = BLACK
            w.color = RED
            leftRotate(w)
            w = parent.left
          }
          w.color = parent.color
          parent.color = BLACK
          if (w.left) w.left.color = BLACK
          rightRotate(parent)
          x = root
        }
      }
    }
    if (x) x.color = BLACK
  }

  // 查找节点
  function find(data, fn = v => v) {
    let current = root
    const compData = fn(data)
    while (current) {
      const currentData = fn(current.data)
      if (compData === currentData) {return current}
      current = compData < currentData ? current.left : current.right
    }
    return null // 找不到节点，返回null
  }
 /**
 * 遍历树
 * @param {*} node 从哪个节点开始遍历
 * @param {*} type 遍历类型  center：中序遍历  prev：前序遍历  next：后序遍历  
 * @param {*} search 匹配函数
 * @param {*} fn 匹配到之后的执行函数
 */
  function traverse(node = root, type = 'center', search = v => true, fn = console.log) {
    if (!node) return
    const data = node.data
    // 提前计算是否需要执行 fn
    const executeFn = search(data) && fn
    if (type === 'prev' && executeFn) fn(data) // 前序遍历
    traverse(node.left, type, search, fn)
    if (type === 'center' && executeFn) fn(data) // 中序遍历
    traverse(node.right, type, search, fn)
    if (type === 'next' && executeFn) fn(data) // 后序遍历
  }
  return { insert, remove, find, traverse, getRoot: () => root }
}
/**
 * 链表
 * @returns 
 * @举例
  const list = NodeList()
  list.append(1)
  list.append(2)
  list.prepend(0)
  list.insert(1, 1.5) // 在索引1插入1.5
  list.removeAt(2) // 删除索引2的节点
  console.log(list.toArray()) // [0, 1.5, 2]
 */
export function NodeList() {
  let head = null
  let length = 0
  const createNode = (data) => ({ data, next: null })
  function append(data) {
    const node = createNode(data)
    if (!head) {
      head = node
    } else {
      let current = head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    length++
  }
  function prepend(data) {
    const node = createNode(data)
    node.next = head
    head = node
    length++
  }
  function insert(index, data) {
    if (index < 0 || index > length) return false
    if (index === 0) {
      prepend(data)
      return true
    }
    let prev = head
    for (let i = 0; i < index - 1; i++) {
      prev = prev.next
    }
    const node = createNode(data)
    node.next = prev.next
    prev.next = node
    length++
    return true
  }
  function removeAt(index) {
    if (index < 0 || index >= length) return null
    let removed = null
    if (index === 0) {
      removed = head
      head = head.next
    } else {
      let prev = head
      for (let i = 0; i < index - 1; i++) {
        prev = prev.next
      }
      removed = prev.next
      prev.next = removed.next
    }
    length--
    return removed.data
  }
  function find(callback) {
    let current = head
    while (current) {
      if (callback(current.data)) return current
      current = current.next
    }
    return null
  }
  function traverse(fn = console.log) {
    let current = head
    while (current) {
      fn(current.data)
      current = current.next
    }
  }
  function toArray() {
    const arr = []
    traverse(data => arr.push(data))
    return arr
  }
  function size() {
    return length
  }
  function isEmpty() {
    return length === 0
  }
  return { append, prepend, insert, removeAt, find, traverse, toArray, size, isEmpty, getHead: () => head,}
}

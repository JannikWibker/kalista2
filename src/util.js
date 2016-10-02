let gen_hash = (length) => {
  let n = new Date().valueOf().toString(), result = '', p = 0, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for(let i = length; i > 0; --i) {
    result += ((i & 1) && n.charAt(p) ? n.charAt(p) : chars[Math.floor(Math.random() * chars.length)])
    if(i & 1) p++
  }
  return result
}

let gen_id_from_tree = (tree, path='', n=0, force=false) => {
  let l_path = path + '.' + n
  if(force)  tree['__id__'] = l_path  // redoing the whole tree can be forced by setting 'force' to true
  if(!force) tree['__id__'] = tree['__id__'] ? tree['__id__'] : l_path
  if(tree.children) {
    tree.children.forEach((item, i) => {
      if(!tree.children[i]['__id__'] || force) {
        tree.children[i] = gen_id_from_tree(tree.children[i], l_path, i)
      }
    })
  }
  return tree
}

let component_hierarchy = (tree, text='') => {
  if(tree.componentName && tree.children) {
    text += tree.componentName + ' > '
  } else if(!tree.componentName && tree.children) {
    text += tree.tag + ' > '
  } else if(tree.componentName && !tree.children){
    text += tree.componentName
  } else if(!tree.componentName && !tree.children){
    text += tree.tag
  }
  if(tree.children) {
    let texts = tree.children.map((item) => {
      return component_hierarchy(item)
    })
    if(texts.length > 1) {
      text += '| ' + texts.join(', ') + ' |'
    } else {
      text += texts[0]
    }
  }
  return text
}

export { gen_hash, gen_id_from_tree, component_hierarchy }

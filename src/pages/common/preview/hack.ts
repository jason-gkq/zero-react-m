export function readOnlyInput(ref: any) {
  let root = ref.value;
  if (root) {
    let nodes = root.querySelectorAll('input');
    for (let node of nodes) {
      node && !node.readOnly && (node.readOnly = true);
    }
    document.activeElement && (document.activeElement as any)?.blur();
  }
}

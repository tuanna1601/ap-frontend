const arrayHasId = (arr, id) => {
  if (arr) {
    for (const i of arr) {
      if (i._id === id) {
        return i;
      }
    }
  }
  return false;
};

export default (arr, src) => {
  if (!arr || !src) {
    return false;
  }
  const added = arr.filter(i => !arrayHasId(src, i._id));
  const updated = arr.filter(i => {
    const matched = arrayHasId(src, i._id);
    if (!matched) {
      return false;
    }
    return matched.text !== i.text;
  });
  const deleted = src.filter(i => !arrayHasId(arr, i._id));
  return {
    added,
    updated,
    deleted
  };
};

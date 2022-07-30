import { MenuItemProps } from '../components/menu/types';

function fieldAreSame(obj1: MenuItemProps, obj2: MenuItemProps) {
  'worklet';

  const keys = Object.keys(obj1);

  return keys.every(key => {
    // @ts-ignore
    const val1 = obj1[key];
    // @ts-ignore
    const val2 = obj2[key];

    if (val1 !== val2) return false;

    return true;
  });
}

function deepEqual(array1: MenuItemProps[], array2: MenuItemProps[]) {
  'worklet';

  const areArrays = Array.isArray(array1) && Array.isArray(array2);
  const areSameLength = areArrays && array2 && array1.length === array2.length;

  if (areArrays && areSameLength && array2) {
    return array1.every((menuItem: MenuItemProps, index) => {
      const obj1 = menuItem;
      const obj2 = array2[index];

      return fieldAreSame(obj1, obj2);
    });
  }

  return false;
}

export { deepEqual };

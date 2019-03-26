export class ObjectUtils {

  static cleanObject(obj): void {
    const propNames = Object.getOwnPropertyNames(obj);
    for (let i = 0; i < propNames.length; i++) {
      const propName = propNames[i];
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
        delete obj[propName];
      }
    }
  }
}

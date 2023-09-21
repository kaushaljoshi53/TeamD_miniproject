 export default function hasNullValues(data: any): boolean {
    for (const key in data) {
      if (data[key] === null) {
        return true;
      } else if (typeof data[key] === 'object' && hasNullValues(data[key])) {
        return true;
      }
    }
    return false;
  }
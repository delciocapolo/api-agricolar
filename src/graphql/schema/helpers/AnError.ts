export default function AnError<T extends object>(row: T) {
    if ("error" in row) {
      return true;
    }

    return false;
}
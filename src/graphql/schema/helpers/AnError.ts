export default function AnError(row: object) {
    if (!row || Object.keys(row).includes("error")) {
      return true;
    }

    return false;
}
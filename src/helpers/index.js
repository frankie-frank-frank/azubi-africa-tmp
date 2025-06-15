export function splitAfterDotEvery300Chars(text) {
    const result = [];
    let start = 0;

    while (start < text.length) {
      let searchFrom = start + 300;

      if (searchFrom >= text.length) {
        result.push(text.slice(start).trim());
        break;
      }
      let dotIndex = text.indexOf('.', searchFrom);
      if (dotIndex === -1) {
        result.push(text.slice(start).trim());
        break;
      }

      result.push(text.slice(start, dotIndex + 1).trim());
      start = dotIndex + 1;
    }

    return result;
}

export function commaSeparatedPrice(input) {
  const withCommas = input
    .split("")
    .reverse()
    .reduce((acc, char, idx) => {
      if (idx > 0 && idx % 3 === 0) {
        acc.push(",");
      }
      acc.push(char);
      return acc;
    }, [])
    .reverse()
    .join("");
  return withCommas;
}

export const popupModalWrapper = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "end",
  padding: "0px 200px",
  alignItems: "center",
  zIndex: 1000,
}
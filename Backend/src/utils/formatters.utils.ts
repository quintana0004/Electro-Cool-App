function titleCase(str: string): string {
  if (!str) {
    return "";
  }

  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function formatPhoneNumber(phoneNumberString: string): string {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return "";
}

function formatStringToISOFormat(dateText: string) {
  const [dateValues, timeValues] = dateText.split(" ");

  const [month, day, year] = dateValues.split("/");
  const [hours, minutes, seconds] = timeValues.split(":");

  const date = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);

  return date.toISOString();
}

export { titleCase, formatPhoneNumber, formatStringToISOFormat };

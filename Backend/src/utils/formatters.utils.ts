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
  //checks if empty, null, or undefined
  if (phoneNumberString && phoneNumberString.trim() !== "") {
    var cleaned = phoneNumberString.replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return match[1] + match[2] + match[3];
    }
  }
  return "NaPN";
}

export { titleCase, formatPhoneNumber };

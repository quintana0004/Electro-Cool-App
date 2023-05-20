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
    const cleaned = phoneNumberString.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return match[1] + match[2] + match[3];
    }
  }
  return "NaPN";
}

function formatName(fullName: string): string {
  if (!fullName) {
    return "";
  }

  return fullName
    .replace(/\s+/g, " ")
    .trim()
    .replace(/(^|[\s.])\S/g, (match: string) => match.toUpperCase())
    .replace(/[\s.](\S)/g, (match: string) => match.toLowerCase());
}

function formatLicensePlate(licensePlate: string): string {
  const validCharacters = /[^A-Za-z0-9]/g;
  const formattedString = licensePlate
    .toUpperCase()
    .replace(validCharacters, "");

  if (formattedString.length === 0) {
    return "";
  }

  return formattedString;
}

export { titleCase, formatPhoneNumber, formatName, formatLicensePlate };

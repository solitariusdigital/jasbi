export function convertNumber(number) {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function fourGenerator() {
  return Math.floor(1000 + Math.random() * 9000);
}

export function sixGenerator() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/windows phone/i.test(userAgent)) {
    return "windows";
  }

  if (/android/i.test(userAgent)) {
    return "android";
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "ios";
  }
}

export function convertDate(date) {
  return new Date(date).toLocaleDateString("fa-IR");
}

export function abbreviateNumber(num) {
  return new Intl.NumberFormat("en-GB", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}

export function calculatePercentage(percentage, value) {
  return value * (percentage / 100);
}

export function getMonthName(number) {
  const date = new Date();
  date.setMonth(monthNumber + 2);
  return date.toLocaleString("fa-IR", { month: "long" });
}

export function faToEnDigits(input) {
  if (input == undefined) return;
  var returnModel = "",
    symbolMap = {
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
      "۰": "0",
    };
  input = input.toString();
  for (var i = 0; i < input.length; i++)
    if (symbolMap[input[i]]) returnModel += symbolMap[input[i]];
    else returnModel += input[i];
  return returnModel;
}

export function enToFaDigits(input) {
  if (input == undefined) return;
  var returnModel = "",
    symbolMap = {
      1: "۱",
      2: "۲",
      3: "۳",
      4: "۴",
      5: "۵",
      6: "۶",
      7: "۷",
      8: "۸",
      9: "۹",
      0: "۰",
    };
  input = input.toString();
  for (var i = 0; i < input.length; i++)
    if (symbolMap[input[i]]) returnModel += symbolMap[input[i]];
    else returnModel += input[i];
  return returnModel;
}

export function onlyLettersAndNumbers(str) {
  return Boolean(str.match(/^[A-Za-z0-9]*$/));
}

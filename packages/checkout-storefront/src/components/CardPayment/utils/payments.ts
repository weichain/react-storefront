import Payment from "payment";

function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

export function formatCreditCardNumber(value: string) {
  if (!value) {
    return value;
  }
  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
    case "amex":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(
        10,
        15
      )}`;
      break;
    case "dinersclub":
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 10)} ${clearValue.slice(
        10,
        14
      )}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(
        8,
        12
      )} ${clearValue.slice(12, 16)}`;
      break;
  }

  return nextValue.trim();
}

export function formatCVC(value: string) {
  const clearValue = clearNumber(value);
  const maxLength = 3;

  return clearValue.slice(0, maxLength);
}

export function formatExpirationDate(value: string) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    Payment.fns.validateCardExpiry(`${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`);
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}

export function checkExpiryDate(value: string) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 4) {
    return Payment.fns.validateCardExpiry(`${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`);
  }
}

export function checkCreditCardType(value: string) {
  const issuer = Payment.fns.cardType(value);
  return issuer;
}

export const formatCardName = (value: string) => /^[a-zA-Z '.-]*$/.test(value);

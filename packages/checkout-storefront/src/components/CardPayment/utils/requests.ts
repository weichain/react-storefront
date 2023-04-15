export const createChargeRequest = (amount: string, currency: string, token: any) =>
  fetch("http://localhost:3000/api/pay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      currency,
      token: token.id,
    }),
  });

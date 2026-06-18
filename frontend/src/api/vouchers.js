const API = process.env.REACT_APP_API_URL;

export async function getVouchers() {
  const response = await fetch(`${API}/vouchers`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

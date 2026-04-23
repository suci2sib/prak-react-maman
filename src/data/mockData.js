export const ordersData = Array.from({ length: 30 }, (_, i) => ({
  id: `ORD-2026-${100 + i}`,
  customerName: ["Suci Ramadani", "Ahmad Fauzi", "Rian Hidayat", "Siti Aminah", "Budi Santoso"][i % 5],
  status: i % 3 === 0 ? "Pending" : i % 3 === 1 ? "Completed" : "Cancelled",
  totalPrice: (Math.random() * 200 + 50).toFixed(2),
  date: `2026-04-${(i % 28) + 1}`,
}));

export const customersData = Array.from({ length: 30 }, (_, i) => ({
  id: `CST-${500 + i}`,
  name: ["Samantha", "Suci Ramadani", "Budi Santoso", "Dewi Lestari", "Andi Wijaya"][i % 5],
  email: `user${i}@sedap.com`,
  phone: `0812-3456-${7000 + i}`,
  loyalty: i % 3 === 0 ? "Bronze" : i % 3 === 1 ? "Silver" : "Gold",
}));
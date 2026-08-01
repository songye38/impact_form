export interface Booking {
  group: string;
  time: string;
  bookedAt: string;
}

const STORAGE_KEY = "rehab-home-booking";

export function getBooking(): Booking | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Booking;
    if (!parsed.group || !parsed.time) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveBooking(booking: Omit<Booking, "bookedAt">): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...booking, bookedAt: new Date().toISOString() }),
    );
  } catch {
    // Storage unavailable (private mode, etc.) — booking simply won't persist.
  }
}

export function clearBooking(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}

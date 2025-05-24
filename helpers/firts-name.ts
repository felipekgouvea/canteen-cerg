export function getFirstName(fullName: string): string {
  if (!fullName) return "";

  const [firstName] = fullName.trim().split(" ");
  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
}

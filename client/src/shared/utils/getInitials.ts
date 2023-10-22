export function getInitials(str: string) {
  // Split the input string into words
  const words = str.split(' ');
  let initials = '';

  // Iterate through the words and extract the initials
  for (const word of words) {
    if (word.length > 0) {
      initials += word[0].toUpperCase();
    }
  }

  return initials;
}

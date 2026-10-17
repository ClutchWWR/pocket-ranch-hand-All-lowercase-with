
function parseVoice(s) {
  let t = s.trim()
    .replace(/[.!?]+$/, '')
    .replace(/^(?:(?:hey|okay|ok)\s+)?(?:pocket\s+)?ranch hand[,\s]*/i, '')
    .replace(/^(?:please\s+)?(?:remember(?:\s+that)?|don't forget(?:\s+that)?|make a note(?:\s+that)?|save(?:\s+that)?)\s+/i, '')
    .trim();

  let m = t.match(/^(?:(?:I|we)\s+)?(?:put|left|stored|kept|placed|hid|stashed)\s+(?:my\s+|the\s+|a\s+)?(.+?)\s+(in|inside|on|under|behind|at|by|near|next to)\s+(.+)$/i);

  if (!m) {
    m = t.match(/^(?:my|the)\s+(.+?)\s+(?:is|are)\s+(in|inside|on|under|behind|at|by|near|next to)\s+(.+)$/i);
  }

  if (m) {
    document.getElementById('itemName').value = m[1];
    document.getElementById('itemLocation').value = m[2] + ' ' + m[3];
    return true;
  }
  return false;
}
  
function parseVoice(s) {
  let t = s.trim()
    .replace(/[.!?]+$/, '')
    .replace(/^(?:(?:hey|hi|okay|ok)\s+)?(?:pocket\s+)?ranch\s+hand[,\s]*/i, '')
    .replace(/^(?:please\s+)?(?:remember(?:\s+that)?|don't forget(?:\s+that)?|make a note(?:\s+that)?|save(?:\s+that)?|note(?:\s+that)?)[,\s]*/i, '')
    .trim();
  const place = '(inside|in|on|under|behind|at|by|near|beside|next to)';
  let m;
  m = t.match(new RegExp('^(?:I\\s+)?moved\\s+(?:my\\s+|the\\s+)?(.+?)\\s+from\\s+.+?\\s+to\\s+(.+)$', 'i'));
  if (m) return fill(m[1], 'at ' + m[2]);
  m = t.match(new RegExp('^(?:(?:I|we)\\s+)?(?:put|left|stored|kept|placed|hid|stashed|have)\\s+(?:my\\s+|the\\s+|a\\s+)?(.+?)\\s+' + place + '\\s+(.+)$', 'i'));
  if (m) return fill(m[1], m[2] + ' ' + m[3]);
  m = t.match(new RegExp('^(?:my|the)\\s+(.+?)\\s+(?:is|are)\\s+' + place + '\\s+(.+)$', 'i'));
  if (m) return fill(m[1], m[2] + ' ' + m[3]);
  return false;
  function fill(item, location) {
    document.getElementById('itemName').value = item.trim();
    document.getElementById('itemLocation').value = location.trim();
    return true;
  }
}
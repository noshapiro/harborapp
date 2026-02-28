/**
 * Sea-themed nickname generator — "[Adjective] [Noun]"
 */

const adjectives = [
  'Misty', 'Northern', 'Lunar', 'Hollow', 'Silver', 'Amber',
  'Drifting', 'Sunken', 'Pale', 'Ancient', 'Quiet', 'Distant',
  'Shallow', 'Deep', 'Stormy', 'Calm', 'Broken', 'Wandering',
  'Fading', 'Glowing', 'Still', 'Rising', 'Lost', 'Forgotten',
  'Waning', 'Dark', 'Lantern', 'Ember', 'Frosted', 'Twilight',
  'Muted', 'Weathered', 'Salt', 'Tidal', 'Iron', 'Copper',
  'Ashen', 'Golden', 'Crimson', 'Slate',
];

const nouns = [
  'Shore', 'Flame', 'Tide', 'Crest', 'Harbour', 'Drift',
  'Current', 'Fog', 'Wake', 'Depth', 'Swell', 'Mast',
  'Reef', 'Wreck', 'Helm', 'Gale', 'Beacon', 'Vessel',
  'Horizon', 'Knot', 'Abyss', 'Siren', 'Anchor', 'Compass',
  'Lantern', 'Kelp', 'Brine', 'Stone', 'Shoal', 'Hollow',
  'Arch', 'Wave', 'Cliff', 'Sand', 'Pearl', 'Coral',
  'Bay', 'Passage', 'Light', 'Wharf',
];

export function generateSeaName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  if (adj.toLowerCase() === noun.toLowerCase()) return generateSeaName();
  return `${adj} ${noun}`;
}

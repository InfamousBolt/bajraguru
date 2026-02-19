const categoryLabels = {
  'khada': 'Khada',
  'prayer-flags': 'Prayer Flags',
  'butter-lamp-pooja': 'Butter Lamp & Pooja Accessories',
  'incense': 'Incense',
  'home-lifestyle': 'Home & Lifestyle',
  'keychains-bracelets': 'Keychains & Bracelets',
  'wooden-products': 'Wooden Products',
};

export function getCategoryLabel(slug) {
  return categoryLabels[slug] || slug;
}

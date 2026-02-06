export const ALL_ITEMS = [
    // Tops
    { id: 'basic-tee', name: 'Basic Tee', category: 'top', price: 0, color: '#ffffff', texture: '/assets/basic-tee.png?v=1', description: 'A classic white tee.' },
    { id: 'sparkle-top', name: 'Sparkle Top', category: 'top', price: 50, color: '#ff00ff', texture: '/assets/sparkle-top.png?v=1', description: 'Shines bright like a diamond.' },
    { id: 'denim-jacket', name: 'Denim Jacket', category: 'top', price: 100, color: '#3366cc', texture: '/assets/denim-jacket.png?v=1', description: 'Cool and casual.' },

    // Bottoms
    { id: 'jeans', name: 'Blue Jeans', category: 'bottom', price: 0, color: '#3366cc', texture: '/assets/jeans-fabric.png', description: 'Comfortable denim.' },
    { id: 'neon-skirt', name: 'Neon Skirt', category: 'bottom', price: 60, color: '#ccff00', texture: '/assets/neon-fabric.png', description: 'Hard to miss!' },
    { id: 'leather-pants', name: 'Leather Pants', category: 'bottom', price: 120, color: '#222222', texture: '/assets/leather-fabric.png', description: 'Rockstar vibes.' },

    // Shoes
    { id: 'sneakers', name: 'White Sneakers', category: 'shoes', price: 0, color: '#eeeeee', texture: '/assets/sneakers.png', description: 'Good for running.' },
    { id: 'boots', name: 'Chunky Boots', category: 'shoes', price: 80, color: '#000000', texture: '/assets/leather-fabric.png', description: 'Stomp around.' },
    { id: 'heels', name: 'Pink Heels', category: 'shoes', price: 90, color: '#ff66b2', texture: '/assets/heels.png', description: 'Fancy footwear.' },

    // Hair
    { id: 'default-hair', name: 'Messy Bun', category: 'hair', price: 0, color: '#884400', description: 'Simple and practical.' },
    { id: 'blue-hair', name: 'Blue Bob', category: 'hair', price: 150, color: '#00ffff', description: 'A bold look.' },

    // Nails
    { id: 'default-nails', name: 'Natural Pink', category: 'nails', price: 0, color: '#ffccdd', description: 'Clean and natural.' },
    { id: 'red-nails', name: 'Classic Red', category: 'nails', price: 40, color: '#ff0000', description: 'Bold and confident.' },
    { id: 'blue-nails', name: 'Cool Blue', category: 'nails', price: 50, color: '#0088ff', description: 'Icy cool.' },
    { id: 'gold-nails', name: 'Gold Sparkle', category: 'nails', price: 100, color: '#ffd700', description: 'So shiny!' },
    { id: 'black-nails', name: 'Rock Black', category: 'nails', price: 60, color: '#222222', description: 'Edgy.' },
]

export const SHOP_ITEMS = ALL_ITEMS.filter(item => item.price > 0)
export const STARTING_ITEMS = ALL_ITEMS.filter(item => item.price === 0).map(i => i.id)

// Helper to get item by ID
export const getItemById = (id) => ALL_ITEMS.find(item => item.id === id)


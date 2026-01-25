export const lessons = [
    // --- PHASE 1: The Basics (Training Camp) ---
    {
        id: 'p1-l1',
        phase: 1,
        title: 'Left Foot Forward',
        description: 'Master the left hand home row keys.',
        keys: ['a', 's', 'd', 'f'],
        content: 'asdf asdf fdsa fdsa ad ds af sf dad sad fad',
        criteria: { minWpm: 10, maxErrors: 5 },
        rewards: { coins: 50, unlockId: null }
    },
    {
        id: 'p1-l2',
        phase: 1,
        title: 'Right Foot Forward',
        description: 'Master the right hand home row keys.',
        keys: ['j', 'k', 'l', ';'],
        content: 'jkl; jkl; ;lkj ;lkj jk kl l; jl k; all fall',
        criteria: { minWpm: 10, maxErrors: 5 },
        rewards: { coins: 50, unlockId: null }
    },
    {
        id: 'p1-l3',
        phase: 1,
        title: 'The Strut',
        description: 'Combine both hands for a smooth walk.',
        keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
        content: 'asdf jkl; lad fad dad sad all fall ask flask',
        criteria: { minWpm: 12, maxErrors: 4 },
        rewards: { coins: 75, unlockId: 'basic-tee' } // Example unlock
    },
    {
        id: 'p1-l4',
        phase: 1,
        title: 'Basic Accessories',
        description: 'Simple words to accessorize your walk.',
        keys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
        content: 'a sad lad; a dad falls; ask a flask; all dads fall; as a sad lad;',
        criteria: { minWpm: 15, maxErrors: 3 },
        rewards: { coins: 100, unlockId: null }
    },

    // --- PHASE 2: Reaching Out (Fashion Week Prep) ---
    {
        id: 'p2-l1',
        phase: 2,
        title: 'Look Up',
        description: 'Reaching for E and I.',
        keys: ['e', 'i'],
        content: 'deed seed feed keel leaf feel idea side slide life',
        criteria: { minWpm: 15, maxErrors: 4 },
        rewards: { coins: 60, unlockId: null }
    },
    {
        id: 'p2-l2',
        phase: 2,
        title: 'Strike a Pose',
        description: 'Extending to R and U.',
        keys: ['r', 'u'],
        content: 'fur rug run use due rue sure real read rule',
        criteria: { minWpm: 15, maxErrors: 4 },
        rewards: { coins: 60, unlockId: null }
    },
    {
        id: 'p2-l3',
        phase: 2,
        title: 'Capital Fashion',
        description: 'Use the Shift key for proper nouns.',
        keys: ['Shift'],
        content: 'Lilly Dark Sara Karl Paul Red Blue Silk Lake Park',
        criteria: { minWpm: 18, maxErrors: 3 },
        rewards: { coins: 120, unlockId: 'glitter-skirt' }
    },

    // --- PHASE 3: The Full Collection (World Tour) ---
    {
        id: 'p3-l1',
        phase: 3,
        title: 'Shoe Collection',
        description: 'Mastering the bottom row.',
        keys: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'],
        content: 'van cab ban man can zen mix axe cave name maze',
        criteria: { minWpm: 20, maxErrors: 4 },
        rewards: { coins: 150, unlockId: 'platform-boots' }
    },
    {
        id: 'p3-l2',
        phase: 3,
        title: 'Price Tags',
        description: 'Numbers and symbols for shopping.',
        keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '$'],
        content: 'Buy 1 get 2; $50 off; Size 8; 100% Silk; 1999 Collection;',
        criteria: { minWpm: 20, maxErrors: 3 },
        rewards: { coins: 200, unlockId: 'diamond-tiara' }
    }
]

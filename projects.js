const projects = [
    {
        id: 'dawn-and-dusk',
        year: 2025,
        month: 3,
        title: 'Dawn and Dusk',
        description: 'Dawn and Dusk is the best way to track sunrise and sunset. Sync your soul with the sun with two notifications before these two times of day that are fundamental for our human biology. Like a prayer bell for the sun.',
        image: './images/dawn and dusk.webp',
        links: [
            {
                text: 'Download on App Store',
                url: 'https://apps.apple.com/us/app/dawn-and-dusk/id6736839971'
            }
        ]
    },
    {
        id: 'local-kitchens-mobile-app',
        year: 2024,
        month: 11,
        title: 'Local Kitchens Mobile App',
        description: 'The Local Kitchens mobile app, a multibrand ordering experience for the Local Kitchens restaurants. An online hawker hall experience to discover food from beloved chefs from all over the world, serving their unique dishes in the Local Kitchens restaurants.',
        image: './images/local kitchens mobile app.webp',
        links: [
            {
                text: 'Download on App Store',
                url: 'https://apps.apple.com/us/app/local-kitchens/id1592013238'
            }
        ]
    },
    {
        id: 'multi-brand-ordering',
        year: 2024,
        month: 10,
        title: 'Multi-Brand Ordering',
        description: 'An ordering experience that allows customers to order from multiple restaurant brands in a single transaction.',
        image: './images/multi-brand ordering.webp',
        links: []
    },
    {
        id: 'brand-page-storytelling',
        year: 2024,
        month: 9,
        title: 'Brand Page Storytelling',
        description: 'Restaurant brand pages with rich storytelling features to showcase the chef, cuisine, and brand history.',
        image: './images/brand page - storytelling.webp',
        links: []
    },
    {
        id: 'local-kitchens-kiosk',
        year: 2024,
        month: 7,
        title: 'Local Kitchens Kiosk',
        description: 'The Local Kitchens in-store ordering kiosk, a multibrand ordering experience for the Local Kitchens restaurants. A modern hawker hall experience to discover food from beloved chefs from all over the world, serving their unique dishes in the Local Kitchens restaurants.',
        image: './images/kiosk.webp',
        links: [
            {
                text: 'Find a restaurant',
                url: 'https://maps.apple.com/?address=San%20Francisco%20Bay%20Area,%20CA,%20United%20States&auid=17686758198201699014&ll=37.789,-122.419&lsp=9902&q=Local%20Kitchens&t=h'
            }
        ]
    },
    {
        id: 'kitchenos-tv',
        year: 2023,
        month: 9,
        title: 'KitchenOS TV Display',
        description: 'Kitchen display system for order management and status tracking on large screen TVs.',
        image: './images/tv.webp',
        links: []
    },
    {
        id: 'peek-cook',
        year: 2023,
        month: 8,
        title: 'Peek - Cook View',
        description: 'Cook view in the Peek order management system, showing detailed cooking instructions and timers.',
        image: './images/Peek - cook.webp',
        links: []
    },
    {
        id: 'next-feed',
        year: 2023,
        month: 7,
        title: 'Next Feed',
        description: 'Feed-based interface showing upcoming tasks and notifications for kitchen staff.',
        image: './images/Next feed.webp',
        links: []
    },
    {
        id: 'create-issue',
        year: 2023,
        month: 6,
        title: 'Issue Creator',
        description: 'Tool for creating and tracking issues in the kitchen operations system.',
        image: './images/Create issue.webp',
        links: []
    },
    {
        id: 'kitchenos-copilot',
        year: 2023,
        month: 5,
        title: 'KitchenOS CoPilot',
        description: 'The Local Kitchens recipe training tool from KitchenOS, an operating system for on-demand commercial kitchens. Designed to help new cooks learn dishes quickly, and to speed up all cooks training for dish swaps and new dishes.',
        image: './images/copilot training.webp',
        links: []
    },
    {
        id: 'authentication-redesign',
        year: 2023,
        month: 3,
        title: 'Authentication Redesign',
        description: 'Redesigned authentication flow for KitchenOS systems with improved security and user experience.',
        image: './images/authentication redesign  2.webp',
        links: []
    },
    {
        id: 'kitchenos-login',
        year: 2023,
        month: 2,
        title: 'KitchenOS Login',
        description: 'Login screen for the KitchenOS platform.',
        image: './images/kitchenOS login.webp',
        links: []
    },
    {
        id: 'kitchen-comp',
        year: 2022,
        month: 10,
        title: 'Kitchen Computer',
        description: 'The Local Kitchens kitchen computer, used for order management and kitchen displays.',
        image: './images/kitchen comp.webp',
        links: []
    },
    {
        id: 'all-day-view',
        year: 2022,
        month: 9,
        title: 'All Day View',
        description: 'Comprehensive view showing all orders for the day in a kitchen management system.',
        image: './images/all day view.webp',
        links: []
    },
    {
        id: 'line-item-reviews',
        year: 2022,
        month: 7,
        title: 'Line Item Reviews',
        description: 'Interface for reviewing individual line items in kitchen orders.',
        image: './images/line item reviews.webp',
        links: []
    },
    {
        id: 'mobile-ordering',
        year: 2022,
        month: 6,
        title: 'Mobile Ordering',
        description: 'Mobile ordering experience for restaurant customers.',
        image: './images/mobile ordering.webp',
        links: []
    },
    {
        id: 'go-to-market',
        year: 2022,
        month: 5,
        title: 'Go To Market',
        description: 'Go-to-market strategy visualization for new product launches.',
        image: './images/go to market.webp',
        links: []
    },
    {
        id: 'client-side-printer',
        year: 2022,
        month: 4,
        title: 'Client-Side Printer Config',
        description: 'Configuration interface for client-side printer management in restaurant systems.',
        image: './images/client side printer config.webp',
        links: []
    },
    {
        id: 'supplyhound-team-tool',
        year: 2021,
        month: 10,
        title: 'SupplyHound Team Tool',
        description: 'Team management tool for SupplyHound inventory management system.',
        image: './images/supplyhound team tool.webp',
        links: []
    },
    {
        id: 'supplyhound-list',
        year: 2021,
        month: 7,
        title: 'SupplyHound List',
        description: 'List view for SupplyHound inventory management system.',
        image: './images/supplyhound list.webp',
        links: []
    },
    {
        id: 'supplyhound-shortcuts',
        year: 2021,
        month: 3,
        title: 'SupplyHound Shortcuts',
        description: 'Quick action shortcuts for SupplyHound inventory management system.',
        image: './images/supplyhound shortcuts.webp',
        links: []
    },
    {
        id: 'line-mogul-pos',
        year: 2019,
        month: 6,
        title: 'Line Mogul Point of Sale',
        description: 'Point of sale system for Line Mogul restaurant management platform.',
        image: './images/line mogul point of sale.webp',
        links: []
    },
    {
        id: 'line-mogul-mobile',
        year: 2018,
        month: 9,
        title: 'Line Mogul Mobile Ordering',
        description: 'Mobile ordering system for Line Mogul restaurant management platform.',
        image: './images/line mogul mobile ordering.webp',
        links: []
    }
]; 
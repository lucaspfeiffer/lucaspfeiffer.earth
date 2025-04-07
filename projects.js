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
        month: 9,
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
        month: 1,
        title: 'Multi-Brand Ordering',
        description: 'An ordering experience that allows customers to order from multiple restaurant brands in a single transaction.',
        image: './images/multi-brand ordering.webp',
        links: []
    },
    {
        id: 'brand-page-storytelling',
        year: 2023,
        month: 9,
        title: 'Brand Page Storytelling',
        description: 'Enhanced storytelling at strategic points in the ordering journey to showcase the chef, cuisine, and brand history.',
        image: './images/brand page - storytelling-3.webp',
        links: []
    },
    {
        id: 'local-kitchens-kiosk',
        year: 2024,
        month: 3,
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
        id: 'status-board',
        year: 2023,
        month: 9,
        title: 'Status Board',
        description: 'The Local Kitchens status board is a front of resturant status board for guests and delivery partners to track the status of their order.',
        image: './images/tv.webp',
        links: []
    },
    {
        id: 'peek-cook',
        year: 2023,
        month: 5,
        title: 'Peek - Cook View',
        description: 'Peek is a live service recipe reference tool, a spin off from CoPilot, designed to put all recipe details at a cooks fingertips to avoid best guess, with the anti-goal of decreasing throughput.',
        image: './images/Peek - cook.webp',
        links: []
    },
    {
        id: 'next-feed',
        year: 2023,
        month: 6,
        title: 'Next Feed',
        description: 'Next is a mobile mobile app for Local Kitchens resturant managers to aggregate tasks across different apps',
        image: './images/Next feed-2.webp',
        links: []
    },
    {
        id: 'create-issue',
        year: 2023,
        month: 6,
        title: 'Issue Creator',
        description: 'Create an issue for your support teams from the Next mobile app.',
        image: './images/Create issue-2.webp',
        links: []
    },
    {
        id: 'kitchenos-copilot',
        year: 2023,
        month: 3,
        title: 'KitchenOS CoPilot',
        description: 'The Local Kitchens recipe training tool from KitchenOS, an operating system for on-demand commercial kitchens. Designed to help new cooks learn dishes quickly, and to speed up all cooks training for dish swaps and new dishes.',
        image: './images/copilot training.webp',
        links: []
    },
    {
        id: 'authentication-redesign',
        year: 2024,
        month: 3,
        title: 'Authentication Redesign',
        description: 'Redesigned authentication flow for Local Kitchens online guests',
        image: './images/authentication redesign  2.webp',
        links: []
    },
    {
        id: 'kitchenos-login',
        year: 2023,
        month: 2,
        title: 'KitchenOS Login',
        description: 'KitchenOS is an operating system for on-demand commercial kitchens. This is the login screen for the Kitchen Display System in KitchenOS, the displays in the prep and live service lines.',
        image: './images/kitchenOS login.webp',
        links: []
    },
    {
        id: 'kitchen-comp',
        year: 2023,
        month: 5,
        title: 'Kitchen Computer',
        description: 'A kitchen level competition integrated into the Kitchen Display Systems at Local Kitchens resturants. Designed to leverage item level reviews in real time, with a focus on the team before the individual.',
        image: './images/kitchen comp.webp',
        links: []
    },
    {
        id: 'all-day-view',
        year: 2022,
        month: 9,
        title: 'All Day View',
        description: 'All Day View, a feature in the Kitchen Display System in KitchenOS designed to give expo more context on the current state of the kitchen',
        image: './images/all day view.webp',
        links: []
    },
    {
        id: 'line-item-reviews',
        year: 2022,
        month: 7,
        title: 'Line Item Reviews',
        description: 'A post order survery built at a hackathon at Local Kitchens to review individual line items in kitchen orders, giving us more granular feedback on the quality of the food for operational improvements.',
        image: './images/line item reviews-3.webp',
        links: []
    },
    {
        id: 'mobile-ordering',
        year: 2023,
        month: 7,
        title: 'Mobile Ordering',
        description: 'Top of funnel feature tile in the Local Kitchens guest ordering apps to feature contextual promotions, new brands, and specials.',
        image: './images/mobile ordering.webp',
        links: []
    },
    {
        id: 'go-to-market',
        year: 2022,
        month: 5,
        title: 'Go To Market',
        description: 'Features across the Local Kitchens guest mobile ordering platforms to bring new brands to market.',
        image: './images/go to market.webp',
        links: []
    },
    {
        id: 'client-side-printer',
        year: 2022,
        month: 4,
        title: 'Client-Side Printer Config',
        description: 'A clever solution to have connected printers with Client-Side Printers, a feature in the Kitchen Display System in KitchenOS.',
        image: './images/client side printer config.webp',
        links: []
    },
    {
        id: 'supplyhound-team-tool',
        year: 2021,
        month: 10,
        title: 'SupplyHound Team Tool',
        description: 'SupplyHounds Team Tool for sending reminders to jobsite workers to request materials as they need them to avoid delays.',
        image: './images/supplyhound team tool.webp',
        links: []
    },
    {
        id: 'supplyhound-list',
        year: 2021,
        month: 7,
        title: 'SupplyHound List',
        description: 'SupplyHound mobile app for managing jobsite materials and placing materials orders throughout the day. Avoid sending the team off site to the supply store for ods and ends, and get an amazon like, 2 hour delivery experience at the jobsite.',
        image: './images/supplyhound list.webp',
        links: []
    },
    {
        id: 'supplyhound-shortcuts',
        year: 2021,
        month: 3,
        title: 'SupplyHound Shortcuts',
        description: 'SupplyHound list shortcuts for jobsite matierals and supplies ordering. SupplyHound is built for pros who do not like to dig though a catalog, so shortcuts help speed up data entry for the open list format',
        image: './images/supplyhound shortcuts.webp',
        links: []
    },
    {
        id: 'line-mogul-pos',
        year: 2019,
        month: 6,
        title: 'Line Mogul Point of Sale',
        description: 'Line Mogul Point of sale system for live events.',
        image: './images/line mogul point of sale.webp',
        links: []
    },
    {
        id: 'line-mogul-mobile',
        year: 2018,
        month: 9,
        title: 'Line Mogul Mobile Ordering',
        description: 'Mobile ordering for a no wait event experience. See wait times to pick the shortest line, or choose to pay to use the VIP line.',
        image: './images/line mogul mobile ordering.webp',
        links: []
    }
]; 
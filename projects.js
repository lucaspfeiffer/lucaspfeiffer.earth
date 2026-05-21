const projects = [
    {
        id: 'tacwu-summer-collection',
        year: 2026,
        month: 4,
        title: 'Tools a Cowboy Would Use — 2026 Summer Collection',
        description: 'Limited time collection by Tools a Cowboy Would Use. Each item is hand embroidered, hand drawn artwork, with a patch for when it was made. This collection elevates Dawn and Dusk by Tools a Cowboy Would Use into a category of legendary tools.',
        image: './images/tacwu summer collection.webp',
        links: [
            {
                text: 'Learn more',
                url: 'https://toolsacowboywoulduse.com/?view=store'
            }
        ]
    },
    {
        id: 'tacwu-site',
        year: 2025,
        month: 3,
        title: 'toolsacowboywoulduse.com',
        description: 'Tools a Cowboy Would Use is an art project, often described as a clothing brand that makes consumer apps as accessories.',
        image: './images/tacwu site.webp',
        links: [
            {
                text: 'toolsacowboywoulduse.com',
                url: 'https://toolsacowboywoulduse.com'
            }
        ]
    },
    {
        id: 'open-mobile-apps',
        year: 2025,
        month: 9,
        title: 'Open Mobile Apps',
        description: 'The Open mobile app is a product for restaurants that enables them to launch their own mobile app on the iOS and Google Play stores. This product helps restaurants offer a world class ‘hero online ordering experience,’ where customers explore the latest menu with beautiful merchandising, make purchases with best-in-class conversion, earn and spend loyalty cash, refer friends, send gift cards, get notified/browse/apply the latest promotions, and more.',
        image: './images/open mobile apps.webp',
        links: [
            {
                text: 'Open',
                url: 'https://getopen.com'
            }
        ]
    },
    {
        id: 'open-ordering-websites',
        year: 2025,
        month: 12,
        title: 'Open Ordering Websites',
        description: 'Open web ordering and catering is a product Open built for restaurants, enabling them to offer their customers a world class online ordering experience, and to take orders directly from these customers. Especially serves new customers coming from social media, ads, Google, and the marketing website.',
        image: './images/open ordering websites.webp',
        links: [
            {
                text: 'Open',
                url: 'https://getopen.com'
            }
        ]
    },
    {
        id: 'open-promotions-loyalty',
        year: 2025,
        month: 6,
        title: 'Open Promotions, Loyalty, Gift Cards & Referrals',
        description: 'Open Promotions, Loyalty, Gift Cards, Referrals, and more are tools the team at Open designed, built, and has iterated on to help restaurants migrate online customers from marketplaces like Uber Eats and DoorDash to their own direct ordering channels, get them engaged, and grow LTV.',
        image: './images/open growth.webp',
        links: [
            {
                text: 'Open',
                url: 'https://getopen.com'
            }
        ]
    },
    {
        id: 'open-sdk',
        year: 2026,
        month: 5,
        title: 'Open SDK',
        description: 'The Open SDK is a set of product design and engineering packages used to leverage Open’s ordering primitives to build a completely unique and personalized web ordering experience for any restaurant. The Open SDK helps design and build the best marketing website and web ordering experience, then helps maintain, make edits, scale, and improve over time.',
        image: './images/open sdk.webp',
        links: [
            {
                text: 'Open',
                url: 'https://getopen.com'
            }
        ]
    },
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
        links: []
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
        links: []
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
        id: 'art-of-sport-brand',
        year: 2019,
        month: 7,
        title: 'Art of Sport Brand - Summer 2019 Target Launch',
        description: 'Art of Sport is an athlete-focused skincare and body care line from Kobe Bryant based in Los Angeles. In the summer of 2019, Art of Sport redeveloped the brand and packaging for a nationwide launch at all Target retail stores.',
        image: './images/art of sport.webp',
        links: [
            {
                text: 'Forbes article',
                url: 'https://www.forbes.com/sites/joanverdon/2020/09/21/art-of-sport-the-skincare-line-backed-by-kobe-bryant-plans-retail-expansion/'
            }
        ]
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
    },
    {
        id: 'woodworking-high-school',
        year: 2016,
        month: 12,
        title: 'Woodworking',
        description: 'Wooden cooler made as a senior project in high school.',
        image: './images/woodworking high school.webp',
        links: []
    },
    {
        id: 'woodworking-2015',
        year: 2015,
        month: 12,
        title: 'Woodworking Making',
        description: 'General woodworking and building things in the shop.',
        image: './images/woodworking 2015.webp',
        links: []
    }
];
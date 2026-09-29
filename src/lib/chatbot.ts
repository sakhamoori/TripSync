interface CityData {
  itinerary: string[]
  restaurants: string[]
  hotels: string[]
  tips: string[]
}

const CITY_DATA: Record<string, CityData> = {
  paris: {
    itinerary: [
      'Day 1: Eiffel Tower in the morning, walk along the Seine, lunch in Le Marais, afternoon at the Louvre, dinner in Saint-Germain.',
      'Day 2: Montmartre and Sacre-Coeur, Moulin Rouge area, lunch at a local bistro, afternoon at Musee d\'Orsay, sunset cruise on the Seine.',
      'Day 3: Palace of Versailles day trip (take the RER C), return for dinner in the Latin Quarter.',
      'Day 4: Notre-Dame area, Shakespeare and Company bookshop, Sainte-Chapelle, afternoon shopping on Champs-Elysees, farewell dinner at a rooftop restaurant.',
    ],
    restaurants: [
      'Le Bouillon Chartier - Classic Parisian brasserie, affordable and iconic.',
      'Breizh Cafe - Best crepes in the Marais district.',
      'Chez Janou - Known for their chocolate mousse, cozy atmosphere.',
      'Pink Mamma - Trendy Italian spot in the 10th, book ahead.',
      'Le Comptoir du Pantheon - Great for lunch near the Pantheon.',
    ],
    hotels: [
      'Hotel des Arts Montmartre - Boutique hotel near Sacre-Coeur, moderate price.',
      'Maison Souquet - Luxury boutique hotel in Pigalle.',
      'Hotel Fabric - Trendy design hotel in Oberkampf, great value.',
      'Le Petit Paris - Cozy boutique hotel in the Latin Quarter.',
    ],
    tips: [
      'Get a Navigo weekly pass for unlimited metro/bus rides.',
      'Most museums are free on the first Sunday of each month.',
      'Avoid the restaurant touts near major attractions.',
      'Bakeries close on Mondays; plan your croissant stops accordingly.',
    ],
  },
  tokyo: {
    itinerary: [
      'Day 1: Shibuya Crossing, Meiji Shrine, Harajuku (Takeshita Street), lunch at a ramen shop, Shinjuku at night for Golden Gai.',
      'Day 2: Senso-ji Temple in Asakusa, Tokyo Skytree, Ueno Park, Akihabara electronics town, dinner in Yurakucho under the train tracks.',
      'Day 3: Tsukiji Outer Market for sushi breakfast, teamLab Borderless, Odaiba area, Robot Restaurant show in the evening.',
      'Day 4: Day trip to Nikko or Kamakura, return for farewell dinner in Roppongi.',
    ],
    restaurants: [
      'Ichiran Ramen - Customizable tonkotsu ramen in private booths.',
      'Sushi Dai (Toyosu Market) - Worth the early morning queue.',
      'Gonpachi Nishi-Azabu - The "Kill Bill" restaurant, great yakitori.',
      'Fuunji - Tsukemen (dipping noodles) near Shinjuku station.',
      'Afuri - Light yuzu shio ramen, multiple locations.',
    ],
    hotels: [
      'Park Hotel Tokyo - Art-themed rooms, views of Tokyo Tower.',
      'UNPLAN Shinjuku - Modern hostel, great for solo travelers.',
      'Hotel Gracery Shinjuku - Famous for the Godzilla on the roof.',
      'Nui. Hostel & Bar Lounge - Stylish budget option in Kuramae.',
    ],
    tips: [
      'Get a Suica or Pasmo IC card for trains and convenience stores.',
      'Carry cash; many smaller restaurants are cash only.',
      'Don\'t tip; it\'s considered rude.',
      'Buy a JR Pass if planning day trips to Kyoto, Osaka, or Nikko.',
    ],
  },
  'new york': {
    itinerary: [
      'Day 1: Central Park morning walk, Metropolitan Museum of Art, lunch at a deli, Times Square, Broadway show in the evening.',
      'Day 2: Statue of Liberty and Ellis Island, Brooklyn Bridge walk, DUMBO for lunch, Brooklyn Heights Promenade.',
      'Day 3: High Line, Chelsea Market lunch, 9/11 Memorial, Wall Street, dinner in Little Italy or Chinatown.',
      'Day 4: MoMA, Fifth Avenue shopping, Grand Central Terminal, rooftop bar at sunset, dinner in the West Village.',
    ],
    restaurants: [
      'Joe\'s Pizza - Classic New York slice in Greenwich Village.',
      'Peter Luger Steak House - Legendary steakhouse in Williamsburg.',
      'Los Tacos No. 1 - Incredible tacos in Chelsea Market.',
      'Russ & Daughters Cafe - Iconic Jewish deli, try the lox bagel.',
      'Di Fara Pizza - Worth the trip to Brooklyn for a legendary pie.',
    ],
    hotels: [
      'The Pod 51 - Micro-hotel with a great rooftop, Midtown.',
      'The Jane Hotel - Historic boutique hotel in the West Village.',
      'citizenM New York Bowery - Modern design, great Lower East Side location.',
      'The Standard High Line - Trendy hotel with Hudson River views.',
    ],
    tips: [
      'Get a 7-day unlimited MetroCard for subway and buses.',
      'TKTS booth in Times Square sells discounted Broadway tickets.',
      'Visit museums on their free/pay-what-you-wish evenings.',
      'Walk the Brooklyn Bridge from Brooklyn to Manhattan for the best views.',
    ],
  },
  bali: {
    itinerary: [
      'Day 1: Arrive in Seminyak, beach sunset, dinner at a beachfront restaurant, explore the nightlife.',
      'Day 2: Ubud day - Tegallalang Rice Terraces, Monkey Forest, art galleries, traditional dance show.',
      'Day 3: Uluwatu Temple at sunset, Kecak fire dance, seafood dinner at Jimbaran Bay.',
      'Day 4: Nusa Penida day trip - Kelingking Beach, Angel\'s Billabong, Crystal Bay snorkeling.',
    ],
    restaurants: [
      'Locavore - Award-winning fine dining in Ubud.',
      'Warung Babi Guling Ibu Oka - Famous roast suckling pig.',
      'La Laguna - Bohemian beachfront restaurant in Canggu.',
      'Naughty Nuri\'s - Legendary BBQ ribs in Ubud.',
      'Old Man\'s - Casual beachfront hangout in Canggu.',
    ],
    hotels: [
      'Komaneka at Bisma - Luxury boutique resort in Ubud.',
      'The Lawn Canggu - Stylish beachfront accommodation.',
      'Alila Villas Uluwatu - Cliffside luxury with ocean views.',
      'Puri Saron Hotel Seminyak - Mid-range with great location.',
    ],
    tips: [
      'Rent a scooter to get around (international license required).',
      'Haggle at markets but be respectful about it.',
      'Carry small bills; many places don\'t have change.',
      'Temple visits require sarongs; most temples provide free loaners.',
    ],
  },
  rome: {
    itinerary: [
      'Day 1: Colosseum and Roman Forum, lunch in Monti, Trevi Fountain, Spanish Steps, dinner in Trastevere.',
      'Day 2: Vatican Museums and Sistine Chapel (book ahead), St. Peter\'s Basilica, Castel Sant\'Angelo, Piazza Navona.',
      'Day 3: Pantheon, Piazza Navona, Campo de\' Fiori market, Villa Borghese gardens, Borghese Gallery.',
      'Day 4: Day trip to Pompeii or Tivoli, farewell dinner with a view at Terrazza Borromini.',
    ],
    restaurants: [
      'Da Enzo al 29 - Authentic Roman trattoria in Trastevere.',
      'Roscioli - Incredible pasta and wine bar.',
      'Suppli - Best arancini (fried rice balls) in Rome.',
      'Pizzarium - Gourmet pizza al taglio near the Vatican.',
      'Armando al Pantheon - Classic Roman dishes, book ahead.',
    ],
    hotels: [
      'Hotel Raphael - Rooftop terrace overlooking Piazza Navona.',
      'Hotel Santa Maria - Charming courtyard hotel in Trastevere.',
      'The Fifteen Keys Hotel - Boutique hotel in the Salario district.',
      'Hotel Campo de\' Fiori - Great location above the famous market.',
    ],
    tips: [
      'Book Colosseum and Vatican tickets well in advance to skip lines.',
      'Drinking fountains (nasoni) provide free clean water throughout the city.',
      'Avoid restaurants with picture menus near tourist spots.',
      'Dress modestly for churches; shoulders and knees must be covered.',
    ],
  },
  sydney: {
    itinerary: [
      'Day 1: Sydney Opera House tour, Circular Quay, The Rocks market, Harbour Bridge walk, dinner at Darling Harbour.',
      'Day 2: Bondi to Coogee coastal walk, beach time, Bronte for lunch, evening in Surry Hills for dinner.',
      'Day 3: Taronga Zoo (ferry ride with harbor views), afternoon in Manly Beach, sunset drinks at The Corso.',
      'Day 4: Royal Botanic Garden, Art Gallery of NSW, Paddington markets, farewell dinner in Barangaroo.',
    ],
    restaurants: [
      'Quay - Fine dining with Opera House views.',
      'Bourke Street Bakery - Famous pastries and pies in Surry Hills.',
      'Chat Thai - Legendary Thai food in the CBD.',
      'Mary\'s - Underground burger joint in Newtown.',
      'The Grounds of Alexandria - Brunch destination with a garden setting.',
    ],
    hotels: [
      'QT Sydney - Quirky design hotel in the CBD.',
      'Ovolo Woolloomooloo - Converted wharf hotel, rock-n-roll theme.',
      'The Old Clare Hotel - Boutique hotel in Chippendale.',
      'YHA Sydney Harbour - Budget option with million-dollar views.',
    ],
    tips: [
      'Get an Opal card for trains, buses, and ferries.',
      'Free walking tours depart from Town Hall daily.',
      'Swim between the flags at the beach; rips are real.',
      'The Blue Mountains make an excellent day trip from Sydney.',
    ],
  },
  'cape town': {
    itinerary: [
      'Day 1: Table Mountain cable car (go early), V&A Waterfront, Robben Island tour, dinner at the Waterfront.',
      'Day 2: Cape Peninsula drive - Chapman\'s Peak, Boulders Beach penguins, Cape of Good Hope, Simon\'s Town.',
      'Day 3: Kirstenbosch Botanical Gardens, Constantia wine tasting, Camps Bay sunset, dinner in Sea Point.',
      'Day 4: Bo-Kaap colorful houses, Neighbourgoods Market, District Six Museum, farewell dinner on Long Street.',
    ],
    restaurants: [
      'The Test Kitchen - Award-winning fine dining (book months ahead).',
      'Mzansi Restaurant - Authentic South African cuisine.',
      'Harbour House V&A - Seafood with waterfront views.',
      'Olympia Cafe - Popular brunch spot in Kalk Bay.',
      'Gold Restaurant - African cuisine with live entertainment.',
    ],
    hotels: [
      'Cape Grace Hotel - Luxury at the V&A Waterfront.',
      'POD Camps Bay - Boutique hotel with Atlantic views.',
      'Daddy Long Legs - Quirky art hotel on Long Street.',
      'Once in Cape Town - Stylish budget option in Kloof Street.',
    ],
    tips: [
      'Book Table Mountain tickets online; weather can close the cable car.',
      'Rent a car for the Cape Peninsula drive.',
      'Uber is reliable and affordable throughout the city.',
      'Visit Stellenbosch or Franschhoek for world-class wine tasting.',
    ],
  },
  bangkok: {
    itinerary: [
      'Day 1: Grand Palace and Wat Phra Kaew, Wat Pho (reclining Buddha), lunch at Tha Maharaj, Wat Arun at sunset.',
      'Day 2: Chatuchak Weekend Market, lunch at Or Tor Kor Market, Jim Thompson House, evening at Khao San Road.',
      'Day 3: Floating markets (Damnoen Saduak or Amphawa), afternoon Thai cooking class, rooftop bar at sunset.',
      'Day 4: Chinatown (Yaowarat Road) for street food, MBK or Siam shopping, farewell dinner cruise on Chao Phraya.',
    ],
    restaurants: [
      'Jay Fai - Michelin-starred street food, famous crab omelette.',
      'Thipsamai - Best pad Thai in Bangkok, long queue worth it.',
      'Gaggan Anand - Progressive Indian cuisine, multi-course experience.',
      'Raan Jay Fai (Silom) - Authentic Thai street food experience.',
      'Nai Mong Hoi Thod - Crispy oyster omelette on Yaowarat.',
    ],
    hotels: [
      'The Siam - Luxury riverside retreat with Art Deco design.',
      'Riva Arun - Budget-friendly with Wat Arun views.',
      'Lub d Silom - Modern hostel in the business district.',
      'Chakrabongse Villas - Intimate riverside boutique hotel.',
    ],
    tips: [
      'Use the BTS Skytrain and MRT to avoid traffic.',
      'Always negotiate tuk-tuk prices before getting in.',
      'Street food is safe and delicious; follow the crowds.',
      'Dress conservatively for temple visits (no shorts or tank tops).',
    ],
  },
  reykjavik: {
    itinerary: [
      'Day 1: Hallgrimskirkja church, Harpa Concert Hall, Laugavegur shopping street, lunch downtown, Blue Lagoon in the evening.',
      'Day 2: Golden Circle tour - Thingvellir National Park, Geysir geothermal area, Gullfoss waterfall.',
      'Day 3: South Coast - Seljalandsfoss and Skogafoss waterfalls, Reynisfjara black sand beach, Vik village.',
      'Day 4: Whale watching tour from Reykjavik harbor, National Museum, farewell dinner with lamb at a local restaurant.',
    ],
    restaurants: [
      'Baejarins Beztu Pylsur - Iceland\'s famous hot dog stand.',
      'Grillid - Fine dining with panoramic city views.',
      'Rok Restaurant - Icelandic cuisine with a modern twist.',
      'Sea Baron (Saegreifinn) - Legendary lobster soup at the harbor.',
      'Cafe Loki - Traditional Icelandic dishes next to Hallgrimskirkja.',
    ],
    hotels: [
      'Hotel Ranga - Countryside luxury, great for Northern Lights.',
      'Kex Hostel - Trendy social hostel in downtown Reykjavik.',
      'Canopy by Hilton Reykjavik - Modern hotel in the city center.',
      'ION Adventure Hotel - Design hotel near Thingvellir.',
    ],
    tips: [
      'Rent a car for the Golden Circle and South Coast.',
      'Layer up; weather changes fast and is always windy.',
      'Tap water is safe and tastes great; don\'t buy bottled.',
      'Northern Lights are best September to March, away from city lights.',
    ],
  },
  dubai: {
    itinerary: [
      'Day 1: Burj Khalifa observation deck (book in advance), Dubai Mall and aquarium, Dubai Fountain show at sunset.',
      'Day 2: Old Dubai - Al Fahidi district, Dubai Creek abra ride, Gold Souk, Spice Souk, dinner at Al Seef.',
      'Day 3: Desert safari - dune bashing, camel ride, BBQ dinner under the stars, belly dancing show.',
      'Day 4: Palm Jumeirah, Atlantis Aquaventure, beach time, farewell dinner at a rooftop restaurant in Marina.',
    ],
    restaurants: [
      'Al Mallah - Shawarma institution in Al Dhiyafah Road.',
      'Ravi Restaurant - Legendary Pakistani food, unbeatable value.',
      'Zuma - Japanese fine dining at DIFC.',
      'Pierchic - Seafood on a pier at Al Qasr hotel.',
      'Arabian Tea House - Traditional Emirati breakfast in Al Fahidi.',
    ],
    hotels: [
      'Atlantis The Palm - Iconic resort with waterpark access.',
      'Rove Downtown - Affordable design hotel near Burj Khalifa.',
      'Al Seef Heritage Hotel - Boutique hotel on Dubai Creek.',
      'JA Ocean View Hotel - Beachfront mid-range in JBR.',
    ],
    tips: [
      'Friday is the holy day; many places have late openings.',
      'The metro is clean, fast, and covers all major attractions.',
      'Dress modestly in public areas (shoulders and knees covered).',
      'Book Burj Khalifa tickets online to save money and skip queues.',
    ],
  },
  'mexico city': {
    itinerary: [
      'Day 1: Zocalo and Metropolitan Cathedral, Palacio Nacional (Diego Rivera murals), Templo Mayor, lunch at Mercado de San Juan.',
      'Day 2: Chapultepec Castle, National Museum of Anthropology, afternoon in Roma Norte, mezcal bar hopping in the evening.',
      'Day 3: Frida Kahlo Museum (Casa Azul, book ahead), Coyoacan market, Xochimilco floating gardens.',
      'Day 4: Teotihuacan pyramids day trip (go early), return for farewell dinner in Condesa.',
    ],
    restaurants: [
      'Pujol - World-renowned modern Mexican fine dining.',
      'El Huequito - Al pastor tacos since 1959.',
      'Contramar - Legendary seafood, famous tuna tostadas.',
      'Mercado Roma - Gourmet food hall in Roma Norte.',
      'Los Cocuyos - Late-night taco stand near Zocalo.',
    ],
    hotels: [
      'Casa Decu - Art Deco boutique hotel in Roma Norte.',
      'Hotel Carlota - Design hotel with a pool in Cuauhtemoc.',
      'Chaya B&B - Cozy guesthouse in Coyoacan.',
      'Downtown Mexico - Boutique hotel in a restored 17th-century palace.',
    ],
    tips: [
      'Use Uber; it\'s safer and more reliable than street taxis.',
      'Book Frida Kahlo Museum tickets online weeks in advance.',
      'Drink bottled water; avoid tap water.',
      'Street food is best from busy stalls with high turnover.',
    ],
  },
  london: {
    itinerary: [
      'Day 1: Tower of London, Tower Bridge, Borough Market lunch, Tate Modern, walk along the South Bank.',
      'Day 2: British Museum (free), Covent Garden, afternoon tea, West End theater show.',
      'Day 3: Buckingham Palace (changing of the guard at 11am), Westminster Abbey, Big Ben, Churchill War Rooms.',
      'Day 4: Notting Hill and Portobello Market, Kensington Palace, Hyde Park, farewell dinner in Soho.',
    ],
    restaurants: [
      'Dishoom - Bombay-inspired breakfast and dining, King\'s Cross.',
      'Borough Market - London\'s best food market, open Thu-Sat.',
      'Padella - Fresh pasta with queues around the block, worth it.',
      'The Wolseley - Grand European cafe for a classic experience.',
      'Bao - Taiwanese steamed buns in Soho.',
    ],
    hotels: [
      'The Hoxton Shoreditch - Trendy design hotel in East London.',
      'CitizenM Tower of London - Modern hotel with city views.',
      'The Zetter Townhouse - Quirky boutique hotel in Clerkenwell.',
      'Generator London - Stylish hostel near King\'s Cross.',
    ],
    tips: [
      'Get an Oyster card or use contactless for tube and buses.',
      'Most major museums are free (British Museum, Tate, V&A, etc.).',
      'Book West End tickets on TodayTix for last-minute deals.',
      'Avoid the Tube during rush hour (8-9:30am, 5-7pm).',
    ],
  },
  'salt lake city': {
    itinerary: [
      'Day 1: Temple Square, Natural History Museum of Utah, lunch downtown, afternoon at Liberty Park, dinner on Main Street.',
      'Day 2: Big Cottonwood Canyon — hike to Lake Blanche or Donut Falls, lunch in Cottonwood Heights, afternoon at Red Butte Garden.',
      'Day 3: Day trip to Park City — Olympic Park, Main Street shops and galleries, lunch on Historic Main, ski or mountain bike depending on season.',
      'Day 4: Great Salt Lake visit, Antelope Island State Park, sunset from Ensign Peak, farewell dinner in the 9th & 9th neighborhood.',
    ],
    restaurants: [
      'Red Iguana - Legendary Mexican moles, two locations, always a line.',
      'The Copper Onion - Modern American bistro downtown, excellent brunch.',
      'Takashi - Top-tier sushi and Japanese cuisine.',
      'Handle - Farm-to-table small plates in Park City.',
      'Lucky 13 - Best burgers in Salt Lake, great craft beer selection.',
      'Feldman\'s Deli - Classic New York-style deli, pastrami sandwiches.',
    ],
    hotels: [
      'Grand America Hotel - Luxury downtown hotel with a spa.',
      'Kimpton Hotel Monaco - Boutique hotel in a restored building.',
      'AC Hotel by Marriott - Modern mid-range near the convention center.',
      'Snowbird Mountain Resort - Stay on the mountain, 30 min from downtown.',
    ],
    tips: [
      'Utah liquor laws require ordering food with alcohol at restaurants.',
      'The ski resorts (Snowbird, Alta, Park City) are only 30-45 min from downtown.',
      'Altitude is 4,300 ft — drink plenty of water and take it easy day one.',
      'TRAX light rail is free in the downtown Free Fare Zone.',
    ],
  },
  santorini: {
    itinerary: [
      'Day 1: Explore Fira town, walk the caldera path to Imerovigli, sunset at Oia castle.',
      'Day 2: Red Beach and Akrotiri archaeological site, wine tasting at Santo Wines, dinner in Ammoudi Bay.',
      'Day 3: Catamaran cruise around the caldera, hot springs, snorkeling, BBQ on board at sunset.',
      'Day 4: Perissa Black Beach morning, Ancient Thera hike, farewell dinner in Pyrgos village.',
    ],
    restaurants: [
      'Ammoudi Fish Tavern - Fresh seafood at the bottom of Oia\'s steps.',
      'Metaxy Mas - Locals\' favorite in Exo Gonia, book ahead.',
      'Pelican Kipos - Garden restaurant in Kamari with creative Greek dishes.',
      'Roka - Traditional dishes with a caldera view in Oia.',
    ],
    hotels: [
      'Katikies Hotel - Iconic infinity pool overlooking the caldera.',
      'Astra Suites - Boutique suites in Imerovigli with stunning views.',
      'Vedema Resort - Luxury in the wine village of Megalochori.',
      'Caveland Hostel - Budget-friendly cave hostel in Karterados.',
    ],
    tips: [
      'Book Oia sunset spots early — it gets extremely crowded.',
      'Rent an ATV or car; buses are infrequent and packed.',
      'Shoulder season (May, October) has great weather and fewer crowds.',
      'Wear sturdy shoes — the cobblestone paths are steep and slippery.',
    ],
  },
  barcelona: {
    itinerary: [
      'Day 1: Sagrada Familia (book tickets ahead), Park Guell, lunch in Gracia, evening stroll down La Rambla.',
      'Day 2: Gothic Quarter, Barcelona Cathedral, Picasso Museum, El Born for tapas, Magic Fountain show at night.',
      'Day 3: Barceloneta Beach, seafood lunch, afternoon at Casa Batllo and Casa Mila, rooftop drinks at sunset.',
      'Day 4: Montjuic Castle and gardens, Joan Miro Foundation, Boqueria Market, farewell dinner in El Raval.',
    ],
    restaurants: [
      'Cal Pep - Legendary tapas bar at the counter, no reservations.',
      'La Boqueria Market - Iconic food market on La Rambla.',
      'Can Culleretes - Barcelona\'s oldest restaurant, Catalan classics since 1786.',
      'Tickets - Albert Adria\'s playful tapas bar, book weeks ahead.',
      'La Pepita - Gourmet sandwiches and craft beer in Gracia.',
    ],
    hotels: [
      'Hotel Casa Fuster - Modernist building on Passeig de Gracia.',
      'Generator Barcelona - Stylish hostel in Gracia neighborhood.',
      'Hotel Neri - Boutique hotel in the Gothic Quarter.',
      'W Barcelona - Beachfront sail-shaped tower with sea views.',
    ],
    tips: [
      'Buy Sagrada Familia tickets online at least 2 weeks ahead.',
      'Pickpocketing is common on La Rambla and in the metro — stay alert.',
      'T-Casual card gives you 10 metro/bus rides at a discount.',
      'Dinner starts at 9pm; restaurants are empty before 8:30.',
    ],
  },
  'grand canyon': {
    itinerary: [
      'Day 1: South Rim arrival, Mather Point overlook, Rim Trail walk, sunset at Hopi Point.',
      'Day 2: Hike Bright Angel Trail (to 3-Mile Resthouse or further), afternoon at Yavapai Geology Museum.',
      'Day 3: Desert View Drive, Grandview Point, Tusayan Ruins Museum, helicopter tour (optional).',
      'Day 4: Sunrise at Mather Point, South Kaibab Trail to Ooh Aah Point, depart via Route 66 through Williams.',
    ],
    restaurants: [
      'El Tovar Dining Room - Fine dining right on the South Rim.',
      'Arizona Room - Steaks and southwestern food with canyon views.',
      'Bright Angel Restaurant - Casual dining in the historic lodge.',
      'We Cook Pizza and Pasta - Solid Italian in Tusayan.',
      'Plaza Bonita - Good Mexican food in Tusayan, near the park entrance.',
    ],
    hotels: [
      'El Tovar Hotel - Historic luxury lodge on the rim, book 6+ months ahead.',
      'Bright Angel Lodge - Historic cabins and rooms right on the rim.',
      'Phantom Ranch - At the bottom of the canyon, accessible by mule or foot.',
      'Best Western Premier Grand Canyon Squire Inn - Comfortable option in Tusayan.',
    ],
    tips: [
      'Carry at least 1 liter of water per person per hour of hiking.',
      'The canyon is 20 degrees hotter at the bottom than the rim.',
      'Book rim-side lodges 13 months in advance — they sell out immediately.',
      'Free park shuttle buses run along the South Rim; use them to avoid parking hassles.',
    ],
  },
  singapore: {
    itinerary: [
      'Day 1: Marina Bay Sands SkyPark, Gardens by the Bay (Supertree Grove), lunch at Lau Pa Sat hawker center, evening light show.',
      'Day 2: Chinatown (Buddha Tooth Relic Temple), Little India, Kampong Glam/Arab Street, Haji Lane shopping.',
      'Day 3: Sentosa Island — Universal Studios or S.E.A. Aquarium, beach, cable car ride back.',
      'Day 4: Singapore Botanic Gardens, Orchard Road shopping, Newton Food Centre for farewell hawker dinner.',
    ],
    restaurants: [
      'Hawker Chan - World\'s cheapest Michelin-starred meal (soy sauce chicken).',
      'Jumbo Seafood - Famous chili crab, book ahead.',
      'Tian Tian Hainanese Chicken Rice - Maxwell Food Centre legend.',
      'Burnt Ends - Modern Australian BBQ, one of Asia\'s best.',
      'Zam Zam - Legendary murtabak since 1908 in Kampong Glam.',
    ],
    hotels: [
      'Marina Bay Sands - Iconic rooftop infinity pool.',
      'The Fullerton Hotel - Colonial-era luxury on the waterfront.',
      'Hotel Mono - Minimalist boutique hotel in Chinatown.',
      'Lloyd\'s Inn - Design-forward boutique near Orchard Road.',
    ],
    tips: [
      'Hawker centers are the best and cheapest way to eat — locals eat there daily.',
      'The MRT (metro) is fast, clean, and covers the whole island.',
      'Chewing gum is banned — don\'t bring it in.',
      'Gardens by the Bay light show at 7:45pm and 8:45pm is free.',
    ],
  },
  'rio de janeiro': {
    itinerary: [
      'Day 1: Christ the Redeemer (go early), Santa Teresa neighborhood, lunch at a boteco, Lapa Arches at night.',
      'Day 2: Sugarloaf Mountain cable car, Copacabana Beach, lunch at a juice bar, Ipanema sunset.',
      'Day 3: Tijuca Forest hike, Botanical Gardens, afternoon at Leblon Beach, dinner in Leblon.',
      'Day 4: Escadaria Selaron steps, Confeitaria Colombo for coffee, Maracana stadium tour, farewell at a samba club.',
    ],
    restaurants: [
      'Confeitaria Colombo - Stunning Art Nouveau tearoom, pastries since 1894.',
      'Aprazivel - Treehouse restaurant in Santa Teresa with city views.',
      'Marius Degustare - Legendary all-you-can-eat seafood rodizio.',
      'Bar do Mineiro - Authentic feijoada in Santa Teresa.',
      'Cervantes - Famous sandwiches with pineapple, open late in Copacabana.',
    ],
    hotels: [
      'Belmond Copacabana Palace - Iconic beachfront luxury.',
      'Hotel Santa Teresa - Boutique hotel in a hilltop mansion.',
      'Yoo2 Rio de Janeiro - Modern design hotel in Botafogo.',
      'Selina Lapa - Budget-friendly social hostel in Lapa.',
    ],
    tips: [
      'Don\'t flash expensive phones or jewelry on the beach.',
      'Use Uber instead of taxis — it\'s safer and cheaper.',
      'Visit Christ the Redeemer early morning for clear skies and smaller crowds.',
      'Carnival is in February/March — book hotels 6+ months ahead.',
    ],
  },
  'machu picchu': {
    itinerary: [
      'Day 1: Arrive in Cusco, acclimatize to altitude, explore Plaza de Armas, San Pedro Market.',
      'Day 2: Sacred Valley — Ollantaytambo ruins, Pisac Market, Moray terraces.',
      'Day 3: Train to Aguas Calientes, afternoon hot springs, early night before Machu Picchu.',
      'Day 4: Sunrise at Machu Picchu, guided tour, optional Huayna Picchu climb, train back to Cusco.',
    ],
    restaurants: [
      'Chicha by Gaston Acurio - Upscale Peruvian in Cusco.',
      'Cicciolina - Tapas and cocktails in a colonial courtyard.',
      'Jack\'s Cafe - Hearty breakfasts in Cusco, popular with travelers.',
      'Indio Feliz - Cozy French-Peruvian in Aguas Calientes.',
      'Mr. Soup - Budget-friendly soups near San Pedro Market.',
    ],
    hotels: [
      'Belmond Sanctuary Lodge - Only hotel at the Machu Picchu entrance.',
      'Inkaterra Machu Picchu Pueblo Hotel - Cloud forest luxury in Aguas Calientes.',
      'Palacio del Inka - Luxury in a converted Cusco monastery.',
      'Pariwana Hostel Cusco - Social backpacker hostel near the plaza.',
    ],
    tips: [
      'Spend 2-3 days in Cusco first to acclimatize to 11,000 ft altitude.',
      'Coca tea helps with altitude sickness — drink it freely.',
      'Book Machu Picchu entry tickets and Huayna Picchu months in advance.',
      'The Inca Trail requires permits booked 6+ months ahead; the train is easier.',
    ],
  },
}

const CITY_ALIASES: Record<string, string> = {
  nyc: 'new york',
  'new york city': 'new york',
  'cape town': 'cape town',
  'mexico city': 'mexico city',
  reykjavik: 'reykjavik',
  iceland: 'reykjavik',
  slc: 'salt lake city',
  utah: 'salt lake city',
  greece: 'santorini',
  spain: 'barcelona',
  arizona: 'grand canyon',
  peru: 'machu picchu',
  cusco: 'machu picchu',
  rio: 'rio de janeiro',
  brazil: 'rio de janeiro',
}

function findCity(input: string): string | null {
  const lower = input.toLowerCase()
  for (const [alias, city] of Object.entries(CITY_ALIASES)) {
    if (lower.includes(alias)) return city
  }
  for (const city of Object.keys(CITY_DATA)) {
    if (lower.includes(city)) return city
  }
  return null
}

type Intent = 'itinerary' | 'restaurants' | 'hotels' | 'tips' | 'general' | 'greeting' | 'unknown'

function detectIntent(msg: string): Intent {
  const lower = msg.toLowerCase()
  if (/\b(hi|hello|hey|howdy|what can you|help)\b/.test(lower)) return 'greeting'
  if (/\b(itinerary|plan|schedule|day by day|things to do|activities|sightseeing|visit|see|places to go)\b/.test(lower)) return 'itinerary'
  if (/\b(eat|food|restaurant|restaurants|dining|cuisine|meal|lunch|dinner|breakfast|brunch|where to eat|best food)\b/.test(lower)) return 'restaurants'
  if (/\b(hotel|hotels|stay|accommodation|sleep|hostel|lodge|where to stay|resort)\b/.test(lower)) return 'hotels'
  if (/\b(tip|tips|advice|know|should i|recommend|suggestion|hack|tricks|budget)\b/.test(lower)) return 'tips'
  return 'general'
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

let msgCounter = 0
function makeId(): string {
  return `msg-${++msgCounter}`
}

export function getBotReply(userMsg: string): string {
  const intent = detectIntent(userMsg)
  const city = findCity(userMsg)

  if (intent === 'greeting') {
    return 'Hi there! I\'m your travel assistant. I can help you plan itineraries, find great restaurants, recommend hotels, and share travel tips for popular destinations.\n\nJust ask me something like:\n- "Plan a 4-day itinerary for Tokyo"\n- "Where should I eat in Rome?"\n- "Best hotels in Bali"\n- "Travel tips for Paris"'
  }

  if (!city) {
    if (intent === 'unknown' || intent === 'general') {
      return 'I\'d love to help you plan your trip! Tell me a destination and what you need:\n\n- Itinerary ideas (e.g. "Plan my trip to Paris")\n- Restaurant recommendations (e.g. "Where to eat in Tokyo")\n- Hotel suggestions (e.g. "Hotels in Bali")\n- Travel tips (e.g. "Tips for London")\n\nI have detailed info for Paris, Tokyo, New York, Bali, Rome, Sydney, Cape Town, Bangkok, Reykjavik, Dubai, Mexico City, London, Salt Lake City, Santorini, Barcelona, Grand Canyon, Singapore, Rio de Janeiro, and Machu Picchu.'
    }
    return `I can help with that! Which city are you planning to visit? I have detailed recommendations for Paris, Tokyo, New York, Bali, Rome, Sydney, Cape Town, Bangkok, Reykjavik, Dubai, Mexico City, London, Salt Lake City, Santorini, Barcelona, Grand Canyon, Singapore, Rio de Janeiro, and Machu Picchu.`
  }

  const data = CITY_DATA[city]
  if (!data) {
    return `I don't have detailed data for that destination yet, but I'd recommend checking travel blogs and local guides for the best tips!`
  }

  const cityName = city.charAt(0).toUpperCase() + city.slice(1)

  switch (intent) {
    case 'itinerary':
      return `Here's a suggested itinerary for ${cityName}:\n\n${data.itinerary.map((d) => '- ' + d).join('\n\n')}`

    case 'restaurants':
      return `Top restaurants in ${cityName}:\n\n${data.restaurants.map((r) => '- ' + r).join('\n')}`

    case 'hotels':
      return `Recommended hotels in ${cityName}:\n\n${data.hotels.map((h) => '- ' + h).join('\n')}`

    case 'tips':
      return `Travel tips for ${cityName}:\n\n${data.tips.map((t) => '- ' + t).join('\n')}`

    case 'general':
    default:
      return `Here's what I know about ${cityName}:\n\n**Itinerary highlights:**\n${data.itinerary.slice(0, 2).map((d) => '- ' + d).join('\n')}\n\n**Top places to eat:**\n${data.restaurants.slice(0, 3).map((r) => '- ' + r).join('\n')}\n\n**Where to stay:**\n${data.hotels.slice(0, 2).map((h) => '- ' + h).join('\n')}\n\nAsk me for more details about itineraries, restaurants, hotels, or tips!`
  }
}

export function createMessage(role: 'user' | 'assistant', text: string): ChatMessage {
  return { id: makeId(), role, text }
}

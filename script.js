// Navbar scroll logic
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Simple smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Unsplash API Access Key (Replace with your own key from unsplash.com/developers)
    const UNSPLASH_ACCESS_KEY = 'UUSvA580Y4ruZVN8CewhcfsJRWwGjzXfuaenWwNv2Mw';

    // City Carousel initialization with Unsplash API
    document.querySelectorAll('.carousel-container').forEach(async container => {
        const city = container.dataset.city;
        const track = container.querySelector('.carousel-track');
        const indicatorsContainer = container.querySelector('.carousel-indicators');

        let imageUrls = [];

        // Attempt to fetch photos of the city from Unsplash API
        try {
            if (UNSPLASH_ACCESS_KEY && UNSPLASH_ACCESS_KEY !== 'YOUR_UNSPLASH_ACCESS_KEY') {
                const response = await fetch(`https://api.unsplash.com/search/photos?query=${city} albania city&per_page=5&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    imageUrls = data.results.map(img => img.urls.regular);
                }
            }
        } catch (error) {
            console.error(`Error fetching Unsplash images for ${city}:`, error);
        }

        // Fallback to picsum.photos if Unsplash API fails or no key is provided
        if (imageUrls.length === 0) {
            for (let i = 1; i <= 5; i++) {
                imageUrls.push(`https://picsum.photos/seed/${city}-movela-${i}/1200/800`);
            }
        }

        let slidesHtml = '';
        let indicatorsHtml = '';

        imageUrls.forEach((imgUrl, i) => {
            slidesHtml += `<div class="carousel-slide" style="background-image: url('${imgUrl}');"></div>`;
            indicatorsHtml += `<div class="indicator ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`;
        });

        track.innerHTML = slidesHtml;
        indicatorsContainer.innerHTML = indicatorsHtml;

        let currentIndex = 0;
        const slides = track.querySelectorAll('.carousel-slide');
        const indicators = indicatorsContainer.querySelectorAll('.indicator');
        const totalSlides = slides.length;

        function goToSlide(index) {
            if (totalSlides === 0) return;
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            indicators.forEach(ind => ind.classList.remove('active'));
            if (indicators[currentIndex]) {
                indicators[currentIndex].classList.add('active');
            }
        }

        container.querySelector('.prev').addEventListener('click', () => goToSlide(currentIndex - 1));
        container.querySelector('.next').addEventListener('click', () => goToSlide(currentIndex + 1));

        indicators.forEach(ind => {
            ind.addEventListener('click', (e) => {
                goToSlide(parseInt(e.target.dataset.index));
            });
        });
    });

    // Language Switcher Logic
    const translations = {
        fr: {
            nav_ride: "Trajet",
            nav_drive: "Conduire",
            nav_safety: "Sécurité",
            nav_cities: "Villes",
            nav_download: "Télécharger",
            hero_badge: "Maintenant en Albanie et au Kosovo",
            hero_title: "Votre Trajet,<br>Vos Règles.",
            hero_subtitle: "Commandez un trajet rapide en ville ou partagez votre voyage pour traverser les frontières. Découvrez l'application de mobilité premium conçue pour notre région.",
            services_title: "Allez partout avec Movela",
            services_subtitle: "Plusieurs options pour vous rendre là où vous devez être.",
            city_rides_title: "Trajets en Ville",
            city_rides_desc: "Demandez un trajet dans votre ville et soyez pris en charge par un chauffeur de premier ordre en quelques minutes. Parfait pour les trajets quotidiens ou les soirées.",
            btn_learn_more: "En savoir plus",
            carpool_title: "Covoiturage",
            carpool_desc: "Vous voyagez entre différentes villes ? Partagez un trajet avec d'autres personnes se dirigeant dans votre direction. Divisez les coûts et faites de nouvelles rencontres.",
            btn_explore: "Explorer",
            cities_title: "Meilleures Villes",
            cities_subtitle: "Découvrez Movela dans vos destinations préférées en Albanie.",
            city_tirana: "Tirana",
            city_durres: "Durrës",
            city_vlore: "Vlorë",
            city_shkoder: "Shkodër",
            faq_title: "Questions Fréquentes",
            faq_subtitle: "Tout ce que vous devez savoir pour voyager avec Movela.",
            faq_q1: "Comment puis-je commander un trajet ?",
            faq_a1: "Téléchargez simplement l'application Movela, créez un compte, entrez votre destination et choisissez votre option de trajet préférée. Un chauffeur vous sera attribué sous peu.",
            faq_q2: "Les prix sont-ils fixes ?",
            faq_a2: "Oui, Movela propose un prix fixe à l'avance avant que vous ne confirmiez votre trajet, vous savez donc toujours exactement ce que vous paierez sans aucune surprise.",
            faq_q3: "Comment fonctionne le covoiturage interurbain ?",
            faq_a3: "Vous pouvez rechercher des conducteurs voyageant entre les principales villes d'Albanie et du Kosovo. Réservez une place dans leur voiture pour partager le voyage et diviser les frais.",
            faq_q4: "Movela est-elle sûre ?",
            faq_a4: "La sécurité est notre priorité absolue. Tous les conducteurs sont soumis à des vérifications des antécédents et à des inspections de véhicules. Notre application dispose également d'un suivi des trajets et d'un bouton d'urgence 24/7.",
            download_title: "Prêt à bouger ?",
            download_subtitle: "Téléchargez l'application Movela dès aujourd'hui et découvrez l'avenir de la mobilité en Albanie et au Kosovo."
        },
        al: {
            nav_ride: "Udhëtim",
            nav_drive: "Ngas",
            nav_safety: "Siguria",
            nav_cities: "Qytetet",
            nav_download: "Shkarkoni",
            hero_badge: "Tani në Shqipëri dhe Kosovë",
            hero_title: "Udhëtimi Juaj,<br>Rregullat Tuaja.",
            hero_subtitle: "Porosisni një udhëtim të shpejtë në qytet ose ndani udhëtimin tuaj. Zbuloni aplikacionin premium të lëvizshmërisë të ndërtuar për rajonin tonë.",
            services_title: "Shkoni kudo me Movela",
            services_subtitle: "Opsione të shumta për të shkuar aty ku duhet.",
            city_rides_title: "Udhëtime në Qytet",
            city_rides_desc: "Kërkoni një makinë në qytetin tuaj dhe merruni nga një shofer i vlerësuar lart brenda pak minutash. E përkryer për udhëtime ditore ose dalje në mbrëmje.",
            btn_learn_more: "Mëso më shumë",
            carpool_title: "Bashkëudhëtim",
            carpool_desc: "Udhëtoni midis qyteteve? Ndani një udhëtim me të tjerët që shkojnë në rrugën tuaj. Ndani kostot dhe bëni miq të rinj në rrugë.",
            btn_explore: "Eksploro",
            cities_title: "Qytetet Kryesore",
            cities_subtitle: "Zbuloni Movela në destinacionet tuaja të preferuara në të gjithë Shqipërinë.",
            city_tirana: "Tiranë",
            city_durres: "Durrës",
            city_vlore: "Vlorë",
            city_shkoder: "Shkodër",
            faq_title: "Pyetjet më të Shpeshta",
            faq_subtitle: "Gjithçka që duhet të dini për të udhëtuar me Movela.",
            faq_q1: "Si mund të kërkoj një udhëtim?",
            faq_a1: "Thjesht shkarkoni aplikacionin Movela, krijoni një llogari, shkruani destinacionin tuaj dhe zgjidhni opsionin tuaj të preferuar të udhëtimit. Një shofer do të përputhet me ju së shpejti.",
            faq_q2: "A janë çmimet fikse?",
            faq_a2: "Po, Movela ofron një çmim fiks përpara se të konfirmoni udhëtimin tuaj, kështu që gjithmonë e dini saktësisht se çfarë do të paguani pa asnjë surprizë.",
            faq_q3: "Si funksionon bashkëudhëtimi ndërqytetas?",
            faq_a3: "Mund të kërkoni shoferë që udhëtojnë midis qyteteve kryesore në Shqipëri dhe Kosovë. Rezervoni një vend në makinën e tyre për të ndarë udhëtimin dhe kostot.",
            faq_q4: "A është e sigurt Movela?",
            faq_a4: "Siguria është prioriteti ynë kryesor. Të gjithë shoferët i nënshtrohen kontrolleve të historikut dhe inspektimeve të automjeteve. Aplikacioni ynë gjithashtu përmban ndjekjen e udhëtimit dhe një buton emergjence 24/7.",
            download_title: "Gati për të lëvizur?",
            download_subtitle: "Shkarkoni aplikacionin Movela sot dhe përjetoni të ardhmen e lëvizshmërisë në Shqipëri dhe Kosovë."
        },
        en: {
            nav_ride: "Ride",
            nav_drive: "Drive",
            nav_safety: "Safety",
            nav_cities: "Cities",
            nav_download: "Download",
            hero_badge: "Now in Albania & Kosova",
            hero_title: "Your Ride,<br>Your Rules.",
            hero_subtitle: "Order a quick ride in the city or share your journey across borders. Discover the premium mobility app built for our region.",
            services_title: "Go anywhere with Movela",
            services_subtitle: "Multiple options to get you where you need to be.",
            city_rides_title: "City Rides",
            city_rides_desc: "Request a ride in your city and get picked up by a top-rated driver within minutes. Perfect for daily commutes or nights out.",
            btn_learn_more: "Learn more",
            carpool_title: "Carpooling",
            carpool_desc: "Traveling between cities? Share a ride with others heading your way. Split the costs and make new friends on the road.",
            btn_explore: "Explore routes",
            cities_title: "Top Cities",
            cities_subtitle: "Discover Movela in your favorite destinations across Albania.",
            city_tirana: "Tirana",
            city_durres: "Durrës",
            city_vlore: "Vlorë",
            city_shkoder: "Shkodër",
            faq_title: "Frequently Asked Questions",
            faq_subtitle: "Everything you need to know about riding with Movela.",
            faq_q1: "How do I request a ride?",
            faq_a1: "Simply download the Movela app, create an account, enter your destination, and choose your preferred ride option. A driver will be matched with you shortly.",
            faq_q2: "Are the prices fixed?",
            faq_a2: "Yes, Movela provides an upfront fixed price before you confirm your ride, so you always know exactly what you'll pay without any surprises.",
            faq_q3: "How does intercity carpooling work?",
            faq_a3: "You can search for drivers traveling between major cities in Albania and Kosova. Book a seat in their car to share the journey and split the costs.",
            faq_q4: "Is Movela safe?",
            faq_a4: "Safety is our top priority. All drivers undergo background checks and vehicle inspections. Our app also features ride sharing tracking and a 24/7 emergency button.",
            download_title: "Ready to move?",
            download_subtitle: "Download the Movela app today and experience the future of mobility in Albania and Kosova."
        }
    };

    const langSwitcher = document.getElementById('langSwitcher');

    // Function to apply translations
    function updateContent(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
    }

    // Set initial language and add listener
    if (langSwitcher) {
        updateContent(langSwitcher.value);
        langSwitcher.addEventListener('change', (e) => {
            updateContent(e.target.value);
        });
    }

    // FAQ Accordion Logic
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;

            // Close other open items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });

            // Toggle current item
            faqItem.classList.toggle('active');
        });
    });
});

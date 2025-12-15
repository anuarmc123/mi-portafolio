// ===================================
// DATA STORAGE (LocalStorage)
// ===================================
const Storage = {
    get(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    remove(key) {
        localStorage.removeItem(key);
    }
};

// ===================================
// INITIAL DATA
// ===================================
function initializeData() {
    // Initialize Rooms if not exists
    if (!Storage.get('rooms')) {
        const rooms = [
            {
                id: 1,
                name: 'Suite Presidencial',
                type: 'Suite',
                price: 350,
                capacity: 4,
                description: 'Lujo absoluto con vistas panorámicas, sala de estar privada y amenidades premium.',
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                amenities: ['WiFi', 'TV 4K', 'Jacuzzi', 'Minibar', 'Vista Panorámica'],
                status: 'available'
            },
            {
                id: 2,
                name: 'Habitación Deluxe',
                type: 'Deluxe',
                price: 220,
                capacity: 2,
                description: 'Elegancia y confort con acabados de primera calidad y todas las comodidades.',
                image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
                amenities: ['WiFi', 'TV', 'Aire Acondicionado', 'Caja Fuerte'],
                status: 'available'
            },
            {
                id: 3,
                name: 'Habitación Premium',
                type: 'Premium',
                price: 180,
                capacity: 2,
                description: 'Espacio moderno y acogedor con todas las amenidades necesarias.',
                image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
                amenities: ['WiFi', 'TV', 'Escritorio', 'Minibar'],
                status: 'available'
            },
            {
                id: 4,
                name: 'Habitación Standard',
                type: 'Standard',
                price: 120,
                capacity: 2,
                description: 'Comodidad esencial con excelente relación calidad-precio.',
                image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
                amenities: ['WiFi', 'TV', 'Aire Acondicionado'],
                status: 'available'
            },
            {
                id: 5,
                name: 'Suite Familiar',
                type: 'Suite',
                price: 280,
                capacity: 5,
                description: 'Amplio espacio para toda la familia con habitaciones separadas.',
                image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800',
                amenities: ['WiFi', 'TV', 'Cocina', 'Sala de Estar', 'Balcón'],
                status: 'available'
            },
            {
                id: 6,
                name: 'Habitación Ejecutiva',
                type: 'Deluxe',
                price: 250,
                capacity: 2,
                description: 'Diseñada para viajeros de negocios con área de trabajo dedicada.',
                image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
                amenities: ['WiFi', 'Escritorio Ejecutivo', 'Impresora', 'Minibar'],
                status: 'available'
            }
        ];
        Storage.set('rooms', rooms);
    }

    // Initialize Services if not exists
    if (!Storage.get('services')) {
        const services = [
            {
                id: 1,
                name: 'WiFi de Alta Velocidad',
                description: 'Conexión a internet de fibra óptica en todas las áreas del hotel.',
                icon: 'wifi'
            },
            {
                id: 2,
                name: 'Piscina Infinity',
                description: 'Piscina climatizada con vista panorámica abierta todo el año.',
                icon: 'pool'
            },
            {
                id: 3,
                name: 'Restaurante Gourmet',
                description: 'Cocina internacional de primer nivel con chef ejecutivo.',
                icon: 'restaurant'
            },
            {
                id: 4,
                name: 'Spa & Wellness',
                description: 'Centro de relajación con masajes, sauna y tratamientos.',
                icon: 'spa'
            },
            {
                id: 5,
                name: 'Gimnasio 24/7',
                description: 'Equipamiento de última generación disponible todo el día.',
                icon: 'gym'
            },
            {
                id: 6,
                name: 'Estacionamiento',
                description: 'Parking privado y seguro para todos nuestros huéspedes.',
                icon: 'parking'
            }
        ];
        Storage.set('services', services);
    }

    // Initialize Gallery if not exists
    if (!Storage.get('gallery')) {
        const gallery = [
            {
                id: 1,
                title: 'Suite Presidencial',
                category: 'rooms',
                image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
            },
            {
                id: 2,
                title: 'Piscina Infinity',
                category: 'facilities',
                image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800'
            },
            {
                id: 3,
                title: 'Restaurante',
                category: 'dining',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800'
            },
            {
                id: 4,
                title: 'Lobby Principal',
                category: 'facilities',
                image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800'
            },
            {
                id: 5,
                title: 'Habitación Deluxe',
                category: 'rooms',
                image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800'
            },
            {
                id: 6,
                title: 'Vista Exterior',
                category: 'exterior',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'
            }
        ];
        Storage.set('gallery', gallery);
    }

    // Initialize Bookings if not exists
    if (!Storage.get('bookings')) {
        Storage.set('bookings', []);
    }
}

// ===================================
// NAVIGATION
// ===================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const section = document.querySelector(href);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                navMenu.classList.remove('active');

                // Update active link
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// ===================================
// UTILITY FUNCTIONS
// ===================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function formatCurrency(amount) {
    return `$${amount.toLocaleString()}`;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

// ===================================
// RENDER FUNCTIONS
// ===================================
function renderRooms() {
    const roomsGrid = document.getElementById('roomsGrid');
    if (!roomsGrid) return;

    const rooms = Storage.get('rooms') || [];

    roomsGrid.innerHTML = rooms.map(room => `
        <div class="room-card">
            <div class="room-image">
                <img src="${room.image}" alt="${room.name}" loading="lazy">
                <div class="room-badge">${room.type}</div>
            </div>
            <div class="room-content">
                <div class="room-header">
                    <div>
                        <h3 class="room-title">${room.name}</h3>
                        <p class="room-type">${room.capacity} ${room.capacity === 1 ? 'Persona' : 'Personas'}</p>
                    </div>
                    <div class="room-price">
                        <div class="price-amount">${formatCurrency(room.price)}</div>
                        <div class="price-period">por noche</div>
                    </div>
                </div>
                <p class="room-description">${room.description}</p>
                <div class="room-amenities">
                    ${room.amenities.map(amenity => `<span class="amenity">${amenity}</span>`).join('')}
                </div>
                <div class="room-footer">
                    <button class="btn-primary" onclick="openBookingModal(${room.id})">
                        <span>Reservar</span>
                    </button>
                    <button class="btn-secondary" onclick="viewRoomDetails(${room.id})">
                        <span>Detalles</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;

    const services = Storage.get('services') || [];
    const iconMap = {
        wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><path d="M12 20h.01"/>',
        pool: '<circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/>',
        restaurant: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
        spa: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
        gym: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11M3 12h3M18 12h3M12 3v3M12 18v3"/>',
        parking: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7h5a3 3 0 0 1 0 6H8V7z"/>'
    };

    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${iconMap[service.icon] || iconMap.wifi}
                </svg>
            </div>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    const gallery = Storage.get('gallery') || [];

    galleryGrid.innerHTML = gallery.map(item => `
        <div class="gallery-item">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <h4 class="gallery-title">${item.title}</h4>
            </div>
        </div>
    `).join('');
}

// ===================================
// BOOKING MODAL
// ===================================
function openBookingModal(roomId = null) {
    const modal = document.getElementById('bookingModal');
    const roomTypeSelect = document.getElementById('roomType');

    if (!modal || !roomTypeSelect) return;

    // Populate room types
    const rooms = Storage.get('rooms') || [];
    roomTypeSelect.innerHTML = '<option value="">Seleccionar</option>' +
        rooms.map(room => `<option value="${room.id}" ${roomId === room.id ? 'selected' : ''}>${room.name} - ${formatCurrency(room.price)}/noche</option>`).join('');

    // Set minimum dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').setAttribute('min', today);
    document.getElementById('checkOut').setAttribute('min', today);

    modal.classList.add('active');
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.getElementById('bookingForm').reset();
    }
}

// Handle booking form submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            id: Date.now(),
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            guests: document.getElementById('guests').value,
            roomId: parseInt(document.getElementById('roomType').value),
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            specialRequests: document.getElementById('specialRequests').value,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // Get room details
        const rooms = Storage.get('rooms') || [];
        const room = rooms.find(r => r.id === formData.roomId);
        formData.roomName = room ? room.name : '';
        formData.roomPrice = room ? room.price : 0;

        // Calculate nights and total
        const checkInDate = new Date(formData.checkIn);
        const checkOutDate = new Date(formData.checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        const total = nights * formData.roomPrice;

        // Save booking
        const bookings = Storage.get('bookings') || [];
        bookings.push(formData);
        Storage.set('bookings', bookings);

        // Send confirmation email
        sendBookingConfirmationEmail(formData, room, nights, total);

        // Show success message
        alert('¡Reserva realizada con éxito! Recibirás un correo de confirmación en breve.');
        closeBookingModal();
    });
}

// ===================================
// EMAIL SENDING FUNCTIONS
// ===================================

// Función para enviar confirmación de reserva AL CLIENTE
function sendBookingConfirmationEmail(booking, room, nights, total) {
    // Verificar si EmailJS está disponible
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS no está cargado. El correo no se enviará.');
        return;
    }

    // Formatear fechas
    const checkInFormatted = formatDate(booking.checkIn);
    const checkOutFormatted = formatDate(booking.checkOut);

    // Preparar los parámetros del email PARA EL CLIENTE
    const templateParams = {
        to_name: booking.fullName,
        to_email: booking.email,  // Email del CLIENTE
        from_name: 'EasyHotel',
        reply_to: 'remixteamsas@gmail.com',
        room_name: booking.roomName,
        check_in: checkInFormatted,
        check_out: checkOutFormatted,
        guests: booking.guests,
        nights: nights,
        price_per_night: formatCurrency(booking.roomPrice),
        total_price: formatCurrency(total),
        phone: booking.phone,
        special_requests: booking.specialRequests || 'Ninguna',
        booking_id: booking.id,
        booking_date: formatDate(new Date().toISOString().split('T')[0])
    };

    // IMPORTANTE: Configurar tu Service ID y Template ID de EmailJS
    // Este template debe estar configurado para enviar AL CLIENTE ({{to_email}})
    const SERVICE_ID = 'service_y4q2t8l';  // Tu Service ID
    const TEMPLATE_ID = 'template_3op4yay'; // Template para confirmación al cliente

    // Enviar el email AL CLIENTE
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
        .then(function (response) {
            console.log('✅ Email de confirmación enviado al cliente!', response.status, response.text);
        }, function (error) {
            console.error('❌ Error al enviar email al cliente:', error);
        });

    // OPCIONAL: También enviar notificación a la empresa
    sendBookingNotificationToHotel(booking, room, nights, total);
}

// Función para enviar notificación de reserva AL HOTEL
function sendBookingNotificationToHotel(booking, room, nights, total) {
    if (typeof emailjs === 'undefined') return;

    const checkInFormatted = formatDate(booking.checkIn);
    const checkOutFormatted = formatDate(booking.checkOut);

    const templateParams = {
        to_email: 'remixteamsas@gmail.com',  // Email del HOTEL
        customer_name: booking.fullName,
        customer_email: booking.email,
        customer_phone: booking.phone,
        room_name: booking.roomName,
        check_in: checkInFormatted,
        check_out: checkOutFormatted,
        guests: booking.guests,
        nights: nights,
        total_price: formatCurrency(nights * booking.roomPrice),
        special_requests: booking.specialRequests || 'Ninguna',
        booking_id: booking.id
    };

    // Template diferente para notificación al hotel
    const HOTEL_TEMPLATE_ID = 'template_hotel_notification'; // Crear este template en EmailJS

    emailjs.send('service_y4q2t8l', HOTEL_TEMPLATE_ID, templateParams)
        .then(function (response) {
            console.log('✅ Notificación enviada al hotel!', response.status);
        }, function (error) {
            console.error('❌ Error al enviar notificación al hotel:', error);
        });
}

// Función para enviar mensajes del formulario de contacto AL HOTEL
function sendContactMessage(formData) {
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS no está cargado. El mensaje no se enviará.');
        return Promise.reject('EmailJS no disponible');
    }

    const templateParams = {
        to_email: 'remixteamsas@gmail.com',  // Email del HOTEL
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        message: formData.message,
        reply_to: formData.email
    };

    // Template para mensajes de contacto
    const CONTACT_TEMPLATE_ID = 'template_contact_message'; // Crear este template en EmailJS

    return emailjs.send('service_y4q2t8l', CONTACT_TEMPLATE_ID, templateParams);
}

// Close modal on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// ===================================
// CONTACT FORM
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener los datos del formulario
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            phone: contactForm.querySelector('input[type="tel"]').value,
            message: contactForm.querySelector('textarea').value
        };

        // Deshabilitar el botón mientras se envía
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        // Enviar el mensaje
        sendContactMessage(formData)
            .then(function (response) {
                console.log('✅ Mensaje de contacto enviado!', response.status);
                alert('¡Gracias por contactarnos! Hemos recibido tu mensaje y te responderemos pronto.');
                contactForm.reset();
            })
            .catch(function (error) {
                console.error('❌ Error al enviar mensaje:', error);
                alert('Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente o contáctanos por teléfono.');
            })
            .finally(function () {
                // Rehabilitar el botón
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            });
    });
}

// ===================================
// VIEW ROOM DETAILS
// ===================================
function viewRoomDetails(roomId) {
    const rooms = Storage.get('rooms') || [];
    const room = rooms.find(r => r.id === roomId);

    if (room) {
        alert(`${room.name}\n\n${room.description}\n\nPrecio: ${formatCurrency(room.price)} por noche\nCapacidad: ${room.capacity} personas\n\nAmenidades:\n${room.amenities.join('\n')}`);
    }
}

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    renderRooms();
    renderServices();
    renderGallery();
});

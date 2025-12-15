// ===================================
// ADMIN AUTHENTICATION
// ===================================
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('adminAuth');
    const loginContainer = document.getElementById('loginContainer');
    const adminContainer = document.getElementById('adminContainer');

    if (isAuthenticated === 'true') {
        if (loginContainer) loginContainer.style.display = 'none';
        if (adminContainer) adminContainer.style.display = 'flex';
        loadDashboard();
    } else {
        if (loginContainer) loginContainer.style.display = 'flex';
        if (adminContainer) adminContainer.style.display = 'none';
    }
}

// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            sessionStorage.setItem('adminAuth', 'true');
            checkAuth();
        } else {
            alert('Credenciales incorrectas. Por favor, intenta de nuevo.');
        }
    });
}

function logout() {
    sessionStorage.removeItem('adminAuth');
    checkAuth();
}

// ===================================
// NAVIGATION
// ===================================
function showSection(sectionName) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionName) {
            item.classList.add('active');
        }
    });

    // Update active section
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName).classList.add('active');

    // Update title
    const titles = {
        dashboard: 'Dashboard',
        rooms: 'Gestión de Habitaciones',
        bookings: 'Gestión de Reservas',
        services: 'Gestión de Servicios',
        gallery: 'Gestión de Galería'
    };
    document.getElementById('sectionTitle').textContent = titles[sectionName] || sectionName;

    // Load section data
    switch (sectionName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'rooms':
            loadRoomsTable();
            break;
        case 'bookings':
            loadBookingsTable();
            break;
        case 'services':
            loadServicesTable();
            break;
        case 'gallery':
            loadGalleryAdmin();
            break;
    }
}

// Setup navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        if (section) {
            showSection(section);
        }
    });
});

// ===================================
// DASHBOARD
// ===================================
function loadDashboard() {
    const rooms = Storage.get('rooms') || [];
    const bookings = Storage.get('bookings') || [];
    const services = Storage.get('services') || [];
    const gallery = Storage.get('gallery') || [];

    // Update stats
    document.getElementById('totalRooms').textContent = rooms.length;
    document.getElementById('totalBookings').textContent = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length;
    document.getElementById('totalServices').textContent = services.length;
    document.getElementById('totalGallery').textContent = gallery.length;

    // Load recent bookings
    const recentBookings = document.getElementById('recentBookings');
    const recentBookingsList = bookings.slice(-5).reverse();

    if (recentBookingsList.length === 0) {
        recentBookings.innerHTML = '<p style="color: var(--gray); text-align: center; padding: 2rem;">No hay reservas recientes</p>';
    } else {
        recentBookings.innerHTML = recentBookingsList.map(booking => `
            <div class="recent-item">
                <h4>${booking.fullName}</h4>
                <p>${booking.roomName} - ${formatDate(booking.checkIn)} al ${formatDate(booking.checkOut)}</p>
                <span class="status-badge ${booking.status}">${getStatusText(booking.status)}</span>
            </div>
        `).join('');
    }
}

// ===================================
// ROOMS MANAGEMENT
// ===================================
function loadRoomsTable() {
    const rooms = Storage.get('rooms') || [];
    const tbody = document.getElementById('roomsTable');

    if (rooms.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--gray);">No hay habitaciones registradas</td></tr>';
        return;
    }

    tbody.innerHTML = rooms.map(room => `
        <tr>
            <td>#${room.id}</td>
            <td>${room.name}</td>
            <td>${room.type}</td>
            <td>${formatCurrency(room.price)}</td>
            <td>${room.capacity} ${room.capacity === 1 ? 'persona' : 'personas'}</td>
            <td><span class="status-badge ${room.status}">${room.status === 'available' ? 'Disponible' : 'Ocupada'}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon edit" onclick="editRoom(${room.id})" title="Editar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="btn-icon delete" onclick="deleteRoom(${room.id})" title="Eliminar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openRoomModal(roomId = null) {
    const modal = document.getElementById('roomModal');
    const form = document.getElementById('roomForm');
    const title = document.getElementById('roomModalTitle');

    if (roomId) {
        const rooms = Storage.get('rooms') || [];
        const room = rooms.find(r => r.id === roomId);

        if (room) {
            title.textContent = 'Editar Habitación';
            document.getElementById('roomId').value = room.id;
            document.getElementById('roomName').value = room.name;
            document.getElementById('roomType').value = room.type;
            document.getElementById('roomPrice').value = room.price;
            document.getElementById('roomCapacity').value = room.capacity;
            document.getElementById('roomDescription').value = room.description;
            document.getElementById('roomImage').value = room.image;
            document.getElementById('roomAmenities').value = room.amenities.join(', ');
        }
    } else {
        title.textContent = 'Nueva Habitación';
        form.reset();
    }

    modal.classList.add('active');
}

function closeRoomModal() {
    const modal = document.getElementById('roomModal');
    modal.classList.remove('active');
    document.getElementById('roomForm').reset();
}

function editRoom(roomId) {
    openRoomModal(roomId);
}

function deleteRoom(roomId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta habitación?')) {
        const rooms = Storage.get('rooms') || [];
        const updatedRooms = rooms.filter(r => r.id !== roomId);
        Storage.set('rooms', updatedRooms);
        loadRoomsTable();
        loadDashboard();
    }
}

// Room form handler
const roomForm = document.getElementById('roomForm');
if (roomForm) {
    roomForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const rooms = Storage.get('rooms') || [];
        const roomId = document.getElementById('roomId').value;
        const amenitiesString = document.getElementById('roomAmenities').value;

        const roomData = {
            id: roomId ? parseInt(roomId) : Date.now(),
            name: document.getElementById('roomName').value,
            type: document.getElementById('roomType').value,
            price: parseFloat(document.getElementById('roomPrice').value),
            capacity: parseInt(document.getElementById('roomCapacity').value),
            description: document.getElementById('roomDescription').value,
            image: document.getElementById('roomImage').value,
            amenities: amenitiesString.split(',').map(a => a.trim()).filter(a => a),
            status: 'available'
        };

        if (roomId) {
            // Update existing room
            const index = rooms.findIndex(r => r.id === parseInt(roomId));
            if (index !== -1) {
                rooms[index] = { ...rooms[index], ...roomData };
            }
        } else {
            // Add new room
            rooms.push(roomData);
        }

        Storage.set('rooms', rooms);
        closeRoomModal();
        loadRoomsTable();
        loadDashboard();
    });
}

// ===================================
// BOOKINGS MANAGEMENT
// ===================================
function loadBookingsTable() {
    const bookings = Storage.get('bookings') || [];
    const tbody = document.getElementById('bookingsTable');

    if (bookings.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem; color: var(--gray);">No hay reservas registradas</td></tr>';
        return;
    }

    tbody.innerHTML = bookings.map(booking => `
        <tr>
            <td>#${booking.id}</td>
            <td>${booking.fullName}</td>
            <td>${booking.roomName}</td>
            <td>${formatDate(booking.checkIn)}</td>
            <td>${formatDate(booking.checkOut)}</td>
            <td>${booking.guests}</td>
            <td><span class="status-badge ${booking.status}">${getStatusText(booking.status)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon edit" onclick="updateBookingStatus(${booking.id}, 'confirmed')" title="Confirmar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </button>
                    <button class="btn-icon delete" onclick="updateBookingStatus(${booking.id}, 'cancelled')" title="Cancelar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function updateBookingStatus(bookingId, status) {
    const bookings = Storage.get('bookings') || [];
    const booking = bookings.find(b => b.id === bookingId);

    if (booking) {
        booking.status = status;
        Storage.set('bookings', bookings);
        loadBookingsTable();
        loadDashboard();
    }
}

function getStatusText(status) {
    const statusMap = {
        pending: 'Pendiente',
        confirmed: 'Confirmada',
        cancelled: 'Cancelada'
    };
    return statusMap[status] || status;
}

// ===================================
// SERVICES MANAGEMENT
// ===================================
function loadServicesTable() {
    const services = Storage.get('services') || [];
    const tbody = document.getElementById('servicesTable');

    if (services.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--gray);">No hay servicios registrados</td></tr>';
        return;
    }

    tbody.innerHTML = services.map(service => `
        <tr>
            <td>#${service.id}</td>
            <td>${service.name}</td>
            <td>${service.description}</td>
            <td>${service.icon}</td>
            <td>
                <div class="table-actions">
                    <button class="btn-icon edit" onclick="editService(${service.id})" title="Editar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="btn-icon delete" onclick="deleteService(${service.id})" title="Eliminar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openServiceModal(serviceId = null) {
    const modal = document.getElementById('serviceModal');
    const form = document.getElementById('serviceForm');
    const title = document.getElementById('serviceModalTitle');

    if (serviceId) {
        const services = Storage.get('services') || [];
        const service = services.find(s => s.id === serviceId);

        if (service) {
            title.textContent = 'Editar Servicio';
            document.getElementById('serviceId').value = service.id;
            document.getElementById('serviceName').value = service.name;
            document.getElementById('serviceDescription').value = service.description;
            document.getElementById('serviceIcon').value = service.icon;
        }
    } else {
        title.textContent = 'Nuevo Servicio';
        form.reset();
    }

    modal.classList.add('active');
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    modal.classList.remove('active');
    document.getElementById('serviceForm').reset();
}

function editService(serviceId) {
    openServiceModal(serviceId);
}

function deleteService(serviceId) {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
        const services = Storage.get('services') || [];
        const updatedServices = services.filter(s => s.id !== serviceId);
        Storage.set('services', updatedServices);
        loadServicesTable();
        loadDashboard();
    }
}

// Service form handler
const serviceForm = document.getElementById('serviceForm');
if (serviceForm) {
    serviceForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const services = Storage.get('services') || [];
        const serviceId = document.getElementById('serviceId').value;

        const serviceData = {
            id: serviceId ? parseInt(serviceId) : Date.now(),
            name: document.getElementById('serviceName').value,
            description: document.getElementById('serviceDescription').value,
            icon: document.getElementById('serviceIcon').value
        };

        if (serviceId) {
            const index = services.findIndex(s => s.id === parseInt(serviceId));
            if (index !== -1) {
                services[index] = { ...services[index], ...serviceData };
            }
        } else {
            services.push(serviceData);
        }

        Storage.set('services', services);
        closeServiceModal();
        loadServicesTable();
        loadDashboard();
    });
}

// ===================================
// GALLERY MANAGEMENT
// ===================================
function loadGalleryAdmin() {
    const gallery = Storage.get('gallery') || [];
    const grid = document.getElementById('galleryAdminGrid');

    if (gallery.length === 0) {
        grid.innerHTML = '<p style="color: var(--gray); text-align: center; padding: 2rem; grid-column: 1/-1;">No hay imágenes en la galería</p>';
        return;
    }

    grid.innerHTML = gallery.map(item => `
        <div class="gallery-admin-item">
            <div class="gallery-admin-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="gallery-admin-info">
                <h4>${item.title}</h4>
                <p>${item.category}</p>
                <div class="gallery-admin-actions">
                    <button class="btn-icon delete" onclick="deleteGalleryItem(${item.id})" title="Eliminar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openGalleryModal() {
    const modal = document.getElementById('galleryModal');
    document.getElementById('galleryForm').reset();
    modal.classList.add('active');
}

function closeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
}

function deleteGalleryItem(itemId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta imagen?')) {
        const gallery = Storage.get('gallery') || [];
        const updatedGallery = gallery.filter(item => item.id !== itemId);
        Storage.set('gallery', updatedGallery);
        loadGalleryAdmin();
        loadDashboard();
    }
}

// Gallery form handler
const galleryForm = document.getElementById('galleryForm');
if (galleryForm) {
    galleryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const gallery = Storage.get('gallery') || [];

        const galleryData = {
            id: Date.now(),
            title: document.getElementById('galleryTitle').value,
            category: document.getElementById('galleryCategory').value,
            image: document.getElementById('galleryImage').value
        };

        gallery.push(galleryData);
        Storage.set('gallery', gallery);
        closeGalleryModal();
        loadGalleryAdmin();
        loadDashboard();
    });
}

// ===================================
// INITIALIZE ADMIN
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
});

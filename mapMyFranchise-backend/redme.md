create-api-flow

1. create route -> usecase name -> create usecase file
2. export it into usecase-index file
3. create controller file 
4. export it into controller-index file
5. add it to router.js
6. add api to api.json file and error code to its json file




-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    profile_image_url TEXT,
    date_of_birth DATE,
    nationality VARCHAR(100),
    preferred_currency VARCHAR(10),
    preferred_language VARCHAR(10),
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_date TIMESTAMP,
    account_status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, SUSPENDED, DELETED
    verification_level INTEGER DEFAULT 0,
    stripe_customer_id VARCHAR(255),
    is_host BOOLEAN DEFAULT FALSE
);

-- User Verification Documents Table
CREATE TABLE user_verification_documents (
    document_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    document_type VARCHAR(50), -- PASSPORT, DRIVER_LICENSE, ID_CARD
    document_number VARCHAR(100),
    document_image_front_url TEXT,
    document_image_back_url TEXT,
    verification_status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, VERIFIED, REJECTED
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP
);

-- Property/Listing Table
CREATE TABLE properties (
    property_id SERIAL PRIMARY KEY,
    host_id INTEGER REFERENCES users(user_id),
    property_type VARCHAR(50), -- APARTMENT, HOUSE, VILLA, ROOM
    accommodation_type VARCHAR(50), -- ENTIRE_PLACE, PRIVATE_ROOM, SHARED_ROOM
    title VARCHAR(255) NOT NULL,
    description TEXT,
    total_occupancy INTEGER NOT NULL,
    total_bedrooms INTEGER NOT NULL,
    total_bathrooms NUMERIC(3,1) NOT NULL,
    country VARCHAR(100),
    street_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zipcode VARCHAR(20),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    base_price NUMERIC(10,2) NOT NULL,
    weekly_discount NUMERIC(5,2),
    monthly_discount NUMERIC(5,2),
    cleaning_fee NUMERIC(7,2),
    security_deposit NUMERIC(10,2),
    min_nights INTEGER DEFAULT 1,
    max_nights INTEGER DEFAULT 30,
    instant_bookable BOOLEAN DEFAULT FALSE,
    listing_status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, DRAFT, INACTIVE
    published_at TIMESTAMP
);

-- Property Amenities Table
CREATE TABLE property_amenities (
    property_id INTEGER REFERENCES properties(property_id),
    amenity_type VARCHAR(100), -- WIFI, KITCHEN, PARKING, etc.
    PRIMARY KEY (property_id, amenity_type)
);

-- Property Images Table
CREATE TABLE property_images (
    image_id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(property_id),
    image_url TEXT NOT NULL,
    is_cover_image BOOLEAN DEFAULT FALSE,
    upload_order INTEGER
);

-- Availability Calendar Table
CREATE TABLE property_availability (
    availability_id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(property_id),
    available_date DATE NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    blocked_reason VARCHAR(100),
    custom_price NUMERIC(10,2),
    UNIQUE(property_id, available_date)
);

-- Bookings Table
CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(property_id),
    guest_id INTEGER REFERENCES users(user_id),
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_guests INTEGER NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    cleaning_fee NUMERIC(7,2),
    service_fee NUMERIC(7,2),
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, CONFIRMED, CANCELLED, COMPLETED
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cancellation_reason TEXT,
    payment_status VARCHAR(20) DEFAULT 'UNPAID' -- UNPAID, PAID, REFUNDED
);

-- Reviews Table
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(booking_id),
    reviewer_id INTEGER REFERENCES users(user_id),
    reviewee_id INTEGER REFERENCES users(user_id),
    review_type VARCHAR(20), -- HOST_REVIEW, GUEST_REVIEW
    rating NUMERIC(3,2) NOT NULL,
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(booking_id),
    amount NUMERIC(10,2) NOT NULL,
    payment_method VARCHAR(50),
    stripe_transaction_id VARCHAR(255),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, SUCCESSFUL, FAILED
    currency VARCHAR(10)
);

-- Messaging Table
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(user_id),
    receiver_id INTEGER REFERENCES users(user_id),
    booking_id INTEGER REFERENCES bookings(booking_id),
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Indexes for performance optimization
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_properties_host ON properties(host_id);
CREATE INDEX idx_bookings_property ON bookings(property_id);
CREATE INDEX idx_bookings_guest ON bookings(guest_id);
CREATE INDEX idx_property_availability ON property_availability(property_id, available_date);
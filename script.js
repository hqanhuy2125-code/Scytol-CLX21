// Đợi DOM load xong mới chạy
document.addEventListener('DOMContentLoaded', function() {

    // ===== CART FUNCTIONALITY =====
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');

    // Khởi tạo giỏ hàng ban đầu
    if (cartCountElement) {
        cartCountElement.style.display = 'none';
    }

    // Add to cart khi click vào CÁC NÚT
    function setupCartButtons() {
        // Tìm TẤT CẢ các nút Read More và Select Options
        const allButtons = document.querySelectorAll('.btn-read-more, .btn-select');
        
        console.log(`Found ${allButtons.length} buttons`); // Debug
        
        allButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Tăng số lượng giỏ hàng
                cartCount++;
                updateCartCount();
                showCartAnimation();
                showNotification('✅ Đã thêm vào giỏ hàng!');
                
                console.log('Cart count:', cartCount); // Debug
            });
        });
    }

    // Gọi hàm setup
    setupCartButtons();

    // Update cart count display
    function updateCartCount() {
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.style.display = 'flex';
        }
    }

    // Animation when add to cart
    function showCartAnimation() {
        const cartWrapper = document.querySelector('.cart-wrapper');
        if (cartWrapper) {
            cartWrapper.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartWrapper.style.transform = 'scale(1)';
            }, 300);
        }
    }

    // Show notification
    function showNotification(message) {
        // Xóa notification cũ nếu có
        const oldNotification = document.querySelector('.cart-notification');
        if (oldNotification) {
            oldNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            z-index: 9999;
            box-shadow: 0 4px 20px rgba(76, 175, 80, 0.4);
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== SCROLL ANIMATIONS =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Áp dụng animation cho tất cả grid items
    document.querySelectorAll('.grid-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(item);
    });

    // Áp dụng animation cho product cards
    document.querySelectorAll('.product-card, .keyboard-card, .mouse-card, .headphone-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ${index * 0.1}s, transform 0.5s ${index * 0.1}s`;
        observer.observe(card);
    });

    // ===== PRODUCT INTERACTIONS =====
    // Color dots functionality
    document.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            this.parentElement.querySelectorAll('.color-dot').forEach(d => {
                d.style.border = d.style.background === 'rgb(255, 255, 255)' ? '1px solid #ddd' : 'none';
            });
            this.style.border = '2px solid #000';
            console.log('Color selected:', this.style.background);
        });
    });

    // ===== PRODUCTS NAVIGATION =====
    const productsGrid = document.querySelector('.products-grid');
    const navPrev = document.querySelector('.nav-prev');
    const navNext = document.querySelector('.nav-next');

    if (navPrev && navNext && productsGrid) {
        navPrev.addEventListener('click', () => {
            productsGrid.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });

        navNext.addEventListener('click', () => {
            productsGrid.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }

    console.log('🎮 SCYTOL CLX21 Gaming Store loaded successfully!');
    console.log('🛒 Cart system ready!');
    console.log('🔍 Search system ready!');

    // ===== SEARCH FUNCTIONALITY =====
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const searchResults = document.querySelector('.search-results');

    // Sample products database
    const products = [
        { name: 'Mad68R Custom Mechanical Keyboard', price: '$59.99', category: 'keyboard', img: 'images/mad68R.jpg' },
        { name: 'RS7 Pro Wireless Mechanical Keyboard', price: '$89.99', category: 'keyboard', img: 'images/RS7 pro.jpg' },
        { name: 'Mercury K1 Pro Gaming Mechanical Keyboard', price: '$69.99', category: 'keyboard', img: 'images/mercury K1 pro.jpg' },
        { name: 'Wooting 60HE Analog Keyboard', price: '$98.98', category: 'keyboard', img: 'images/Wooting-60HE.png' },
        { name: 'Pro X Wireless Mouse', price: '$79.99', category: 'mouse', img: 'images/mouse1.jpg' },
        { name: 'Viper Ultimate Mouse', price: '$89.99', category: 'mouse', img: 'images/mouse2.jpg' },
        { name: 'G502 Hero Mouse', price: '$59.99', category: 'mouse', img: 'images/mouse3.jpg' },
        { name: 'DeathAdder V3 Mouse', price: '$79.99', category: 'mouse', img: 'images/mouse4.jpg' },
        { name: 'HyperX Cloud II Headphone', price: '$99.99', category: 'headphone', img: 'images/headphone1.jpg' },
        { name: 'SteelSeries Arctis 7 Headphone', price: '$129.99', category: 'headphone', img: 'images/headphone2.jpg' },
        { name: 'Razer BlackShark V2 Headphone', price: '$89.99', category: 'headphone', img: 'images/headphone3.jpg' },
        { name: 'Logitech G Pro X Headphone', price: '$129.99', category: 'headphone', img: 'images/headphone4.jpg' },
        { name: 'Samsung 980 PRO NVMe SSD', price: '$119.99', category: 'accessory', img: 'images/ssd-samsung.jpg' },
        { name: 'WD Black SN850X Gaming SSD', price: '$129.99', category: 'accessory', img: 'images/ssd-wd.jpg' },
        { name: 'Anker PowerCore 20000mAh', price: '$39.99', category: 'accessory', img: 'images/powerbank-anker.jpg' },
        { name: 'Xiaomi Mi Power Bank 3 Pro', price: '$49.99', category: 'accessory', img: 'images/powerbank-xiaomi.jpg' }
    ];

    // Open search overlay
    if (searchToggle) {
        searchToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            searchOverlay.classList.add('active');
            searchInput.focus();
        });
    }

    // Close search overlay
    if (searchClose) {
        searchClose.addEventListener('click', function() {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        });
    }

    // Close on overlay click
    if (searchOverlay) {
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                searchOverlay.classList.remove('active');
                searchInput.value = '';
                searchResults.innerHTML = '';
            }
        });
    }

    // Search function
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) {
            searchResults.innerHTML = '';
            return;
        }

        const results = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        displayResults(results, query);
    }

    // Display search results
    function displayResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <p>😔 No products found for "${query}"</p>
                    <p style="font-size: 16px; margin-top: 10px;">Try searching: keyboards, mice, headphones, mouse, ssd, power bank</p>
                </div>
            `;
            return;
        }

        searchResults.innerHTML = results.map(product => `
            <div class="search-result-item">
                <img src="${product.img}" alt="${product.name}" class="search-result-img" onerror="this.src='images/placeholder.jpg'">
                <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <p>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                    <div class="search-result-price">${product.price}</div>
                </div>
            </div>
        `).join('');

        // Add click events to results
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                showNotification('✅ Opening product details...');
                // Có thể redirect đến trang chi tiết sản phẩm
            });
        });
    }

    // Search on button click
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    // Search on Enter key
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            } else {
                // Live search as typing (debounced)
                clearTimeout(window.searchTimeout);
                window.searchTimeout = setTimeout(performSearch, 300);
            }
        });
    }

    // ===== SUPPORT CHAT WIDGET =====
    const chatButton = document.querySelector('.support-chat-button');
    const chatBox = document.querySelector('.support-chat-box');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input');
    const chatSendBtn = document.querySelector('.chat-send-btn');
    const quickQuestionBtns = document.querySelectorAll('.quick-question-btn');

    // Toggle chat box
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            chatBox.classList.toggle('active');
        });
    }

    // Close chat box
    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatBox.classList.remove('active');
        });
    }

    // Send message
    if (chatSendBtn && chatInput) {
        chatSendBtn.addEventListener('click', function() {
            sendMessage();
        });

        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            console.log('Message sent:', message);
            showNotification('✅ Tin nhắn đã được gửi! Chúng tôi sẽ phản hồi sớm.');
            chatInput.value = '';
        }
    }

    // Quick question buttons
    quickQuestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.textContent;
            console.log('Quick question:', question);
            
            // Hiển thị câu trả lời mẫu
            let answer = '';
            if (question.includes('Driver')) {
                answer = '📥 Bạn có thể tải driver tại: support.scytol.com/drivers';
            } else if (question.includes('Track')) {
                answer = '📦 Kiểm tra đơn hàng tại: scytol.com/tracking';
            } else if (question.includes('shipping')) {
                answer = '🚚 Phí ship: Free cho đơn từ 500k. Giao hàng 2-3 ngày.';
            } else {
                answer = '💬 Cảm ơn câu hỏi! Team support sẽ trả lời bạn sớm nhất.';
            }
            
            showNotification(answer);
        });
    });

});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes zoomIn {
        from {
            transform: translate(-50%, -50%) scale(0.7);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }

    .cart-wrapper {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);
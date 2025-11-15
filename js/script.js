$(document).ready(function() {
    // 页面加载动画
    $('body').addClass('page-loading');
    
    setTimeout(() => {
        $('body').removeClass('page-loading').addClass('page-loaded');
    }, 300);

    // 添加粒子效果canvas
    createParticles();

    // 导航栏滚动效果
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    // 轮播图功能
    let currentSlide = 0;
    const slides = $('.slide');
    const totalSlides = slides.length;
    let slideInterval;
    
    // 初始化轮播状态
    function initSlider() {
        slides.removeClass('active');
        slides.eq(currentSlide).addClass('active');
    }
    
    // 自动轮播
    function startSlider() {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 6000);
    }
    
    // 停止轮播
    function stopSlider() {
        clearInterval(slideInterval);
    }
    
    // 下一张幻灯片
    function nextSlide() {
        slides.eq(currentSlide).removeClass('active');
        currentSlide = (currentSlide + 1) % totalSlides;
        slides.eq(currentSlide).addClass('active');
    }
    
    // 上一张幻灯片
    function prevSlide() {
        slides.eq(currentSlide).removeClass('active');
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        slides.eq(currentSlide).addClass('active');
    }
    
    // 导航按钮事件
    $('.next').click(function() {
        stopSlider();
        nextSlide();
        startSlider();
    });
    
    $('.prev').click(function() {
        stopSlider();
        prevSlide();
        startSlider();
    });
    
    // 鼠标悬停暂停轮播
    $('.hero-slider').hover(
        function() { stopSlider(); },
        function() { startSlider(); }
    );
    
    // 移动端导航菜单
    $('.nav-toggle').click(function() {
        $('.nav').toggleClass('active');
        $(this).toggleClass('active');
    });
    
    // 点击导航链接后关闭移动端菜单
    $('.nav a').click(function() {
        $('.nav').removeClass('active');
        $('.nav-toggle').removeClass('active');
    });
    
    // 平滑滚动
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800, 'easeInOutCubic');
        }
    });
    
    // 自定义缓动函数
    $.easing.easeInOutCubic = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    };
    
    // 滚动动画效果
    function checkScroll() {
        $('.loading').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom - 100) {
                $(this).addClass('show');
            }
        });
    }
    
    // 添加加载类到需要动画的元素
    $('.link-card, .news-card, .stat-item, .feature-card').addClass('loading');
    
    // 初始检查
    checkScroll();
    
    // 滚动时检查
    $(window).scroll(checkScroll);
    
    // 统计数据动画
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;
        
        $('.stat-item').each(function(index) {
            const $this = $(this);
            const target = parseInt($this.find('h3').text().replace(/[^0-9]/g, ''));
            let count = 0;
            const duration = 2000;
            const increment = target / (duration / 16);
            
            setTimeout(() => {
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    $this.find('h3').text(Math.floor(count) + '+');
                }, 16);
            }, index * 200);
        });
    }
    
    // 当统计数据区域进入视图时触发动画
    function checkStats() {
        const statsSection = $('.stats');
        if (statsSection.length === 0) return;
        
        const statsTop = statsSection.offset().top;
        const statsBottom = statsTop + statsSection.outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();
        
        if (statsBottom > viewportTop && statsTop < viewportBottom - 200) {
            animateStats();
        }
    }
    
    $(window).scroll(checkStats);
    
    // 卡片悬停效果
    $('.link-card, .news-card, .feature-card').hover(
        function() {
            $(this).addClass('hovered');
        },
        function() {
            $(this).removeClass('hovered');
        }
    );
    
    // 初始化轮播
    initSlider();
    
    // 开始轮播
    startSlider();
    
    // 响应式调整
    function handleResize() {
        if ($(window).width() > 768) {
            $('.nav').removeClass('active');
            $('.nav-toggle').removeClass('active');
        }
    }
    
    $(window).resize(handleResize);
    
    // 键盘导航支持
    $(document).keydown(function(e) {
        if ($('.hero').length === 0) return;
        
        switch(e.keyCode) {
            case 37: // 左箭头
                stopSlider();
                prevSlide();
                startSlider();
                break;
            case 39: // 右箭头
                stopSlider();
                nextSlide();
                startSlider();
                break;
        }
    });
    
    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    $('.hero-slider').on('touchstart', function(e) {
        touchStartX = e.originalEvent.touches[0].clientX;
        touchStartY = e.originalEvent.touches[0].clientY;
    });
    
    $('.hero-slider').on('touchend', function(e) {
        touchEndX = e.originalEvent.changedTouches[0].clientX;
        touchEndY = e.originalEvent.changedTouches[0].clientY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const verticalThreshold = 100;
        
        const horizontalDistance = Math.abs(touchEndX - touchStartX);
        const verticalDistance = Math.abs(touchEndY - touchStartY);
        
        // 只有水平滑动距离大于垂直滑动距离时才触发轮播
        if (horizontalDistance > verticalDistance && horizontalDistance > swipeThreshold) {
            stopSlider();
            if (touchEndX < touchStartX - swipeThreshold) {
                nextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                prevSlide();
            }
            startSlider();
        }
    }
    
    // 预加载图片
    function preloadImages() {
        const images = [
            'images/picsum_1.jpg',
            'images/picsum_2.jpg',
            'images/picsum_3.jpg',
            'images/picsum_4.jpg',
            'images/picsum_5.jpg',
            'images/picsum_6.jpg',
            'images/unsplash_17.jpg',
            'images/unsplash_18.jpg'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
    
    // 性能优化：延迟加载
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        lazyObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        $('img[data-src]').each(function() {
            lazyObserver.observe(this);
        });
    }
    
    // 表单处理
    $('.contact-form').on('submit', function(e) {
        e.preventDefault();
        
        const $form = $(this);
        const $submitBtn = $form.find('.submit-btn');
        const originalText = $submitBtn.text();
        
        // 表单验证
        let isValid = true;
        $form.find('input[required], textarea[required], select[required]').each(function() {
            const $field = $(this);
            if (!$field.val().trim()) {
                isValid = false;
                $field.addClass('error');
                setTimeout(() => $field.removeClass('error'), 3000);
            }
        });
        
        if (!isValid) {
            showNotification('请填写所有必填字段', 'error');
            return;
        }
        
        // 提交动画
        $submitBtn.text('提交中...').prop('disabled', true);
        
        // 模拟提交
        setTimeout(() => {
            $submitBtn.text('提交成功！').css('background', '#28a745');
            showNotification('表单提交成功！我们会尽快与您联系。', 'success');
            
            setTimeout(() => {
                $submitBtn.text(originalText).prop('disabled', false).css('background', '');
                $form[0].reset();
            }, 2000);
        }, 1500);
    });
    
    // 通知系统
    function showNotification(message, type = 'info') {
        const $notification = $(`
            <div class="notification notification-${type}">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `);
        
        $('body').append($notification);
        
        setTimeout(() => {
            $notification.addClass('show');
        }, 100);
        
        // 自动关闭
        setTimeout(() => {
            $notification.removeClass('show');
            setTimeout(() => $notification.remove(), 300);
        }, 5000);
        
        // 手动关闭
        $notification.find('.notification-close').click(function() {
            $notification.removeClass('show');
            setTimeout(() => $notification.remove(), 300);
        });
    }
    
    // 添加通知样式
    if (!$('#notification-styles').length) {
        $('head').append(`
            <style id="notification-styles">
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    z-index: 10000;
                    transform: translateX(400px);
                    opacity: 0;
                    transition: all 0.3s ease;
                    max-width: 350px;
                    border-left: 4px solid #007bff;
                }
                .notification.show {
                    transform: translateX(0);
                    opacity: 1;
                }
                .notification-success {
                    border-left-color: #28a745;
                    color: #28a745;
                }
                .notification-error {
                    border-left-color: #dc3545;
                    color: #dc3545;
                }
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    opacity: 0.5;
                    margin-left: auto;
                }
                .notification-close:hover {
                    opacity: 1;
                }
                .form-group input.error,
                .form-group textarea.error,
                .form-group select.error {
                    border-color: #dc3545;
                    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
                }
            </style>
        `);
    }
    
    // 页面可见性API - 当页面不可见时暂停轮播
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopSlider();
        } else {
            startSlider();
        }
    });
    
    // 鼠标视差效果
    $(document).mousemove(function(e) {
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        const windowWidth = $(window).width();
        const windowHeight = $(window).height();
        
        // 计算鼠标位置百分比
        const xPercent = (mouseX / windowWidth - 0.5) * 2;
        const yPercent = (mouseY / windowHeight - 0.5) * 2;
        
        // 应用视差效果到轮播背景
        $('.slide.active').css({
            'transform': `scale(1.05) translate(${xPercent * 10}px, ${yPercent * 10}px)`
        });
    });
    
    // 滚动进度条
    function updateScrollProgress() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (!$('.scroll-progress').length) {
            $('body').append('<div class="scroll-progress"></div>');
            $('head').append(`
                <style>
                    .scroll-progress {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 0%;
                        height: 3px;
                        background: linear-gradient(90deg, #C8102E, #FF6B35);
                        z-index: 10001;
                        transition: width 0.1s ease;
                    }
                </style>
            `);
        }
        
        $('.scroll-progress').css('width', scrollPercent + '%');
    }
    
    $(window).scroll(updateScrollProgress);
    
    // 返回顶部按钮
    function initBackToTop() {
        if (!$('.back-to-top').length) {
            $('body').append(`
                <button class="back-to-top">
                    <i class="fas fa-arrow-up"></i>
                </button>
            `);
            
            $('head').append(`
                <style>
                    .back-to-top {
                        position: fixed;
                        bottom: 30px;
                        right: 30px;
                        width: 50px;
                        height: 50px;
                        background: linear-gradient(135deg, #C8102E, #FF6B35);
                        color: white;
                        border: none;
                        border-radius: 50%;
                        cursor: pointer;
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.3s ease;
                        z-index: 1000;
                        box-shadow: 0 4px 20px rgba(200, 16, 46, 0.3);
                    }
                    .back-to-top.show {
                        opacity: 1;
                        visibility: visible;
                    }
                    .back-to-top:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 30px rgba(200, 16, 46, 0.4);
                    }
                </style>
            `);
        }
        
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                $('.back-to-top').addClass('show');
            } else {
                $('.back-to-top').removeClass('show');
            }
        });
        
        $('.back-to-top').click(function() {
            $('html, body').animate({scrollTop: 0}, 800, 'easeInOutCubic');
        });
    }
    
    initBackToTop();
    
    // 初始化所有功能
    checkScroll();
    checkStats();
    updateScrollProgress();

    // ========== 科技感交互效果 ==========

    // 创建粒子背景效果
    function createParticles() {
        const particleCount = 50;
        const particles = [];
        
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        document.body.insertBefore(canvas, document.body.firstChild);
        
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = Math.random() > 0.5 ? 'rgba(0, 212, 255, 0.5)' : 'rgba(157, 0, 255, 0.5)';
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                
                // 添加发光效果
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
            }
        }
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 - distance / 750})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let particle of particles) {
                particle.update();
                particle.draw();
            }
            
            connectParticles();
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // 鼠标移动视差效果
    let mouseX = 0;
    let mouseY = 0;
    
    $(document).mousemove(function(e) {
        mouseX = e.pageX / $(window).width();
        mouseY = e.pageY / $(window).height();
        
        // 应用视差效果到卡片
        $('.link-card, .news-card').each(function() {
            const $card = $(this);
            const rect = this.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const distX = (e.clientX - cardCenterX) / 50;
            const distY = (e.clientY - cardCenterY) / 50;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                $card.css({
                    'transform': `perspective(1000px) rotateY(${distX}deg) rotateX(${-distY}deg)`
                });
            }
        });
    });
    
    // 重置卡片位置
    $('.link-card, .news-card').mouseleave(function() {
        $(this).css({
            'transform': ''
        });
    });

    // 数字计数动画增强
    function animateValue(element, start, end, duration) {
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // 使用缓动函数
            const easeOutQuad = progress * (2 - progress);
            const current = Math.floor(easeOutQuad * (end - start) + start);
            
            $(element).text(current + '+');
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }

    // 添加悬停光晕效果
    $('.link-card, .stat-item').on('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        $(this).css({
            '--mouse-x': x + 'px',
            '--mouse-y': y + 'px'
        });
    });

    // 滚动进度增强
    function updateScrollProgress() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (!$('.scroll-progress').length) {
            $('body').append('<div class="scroll-progress"></div>');
            $('head').append(`
                <style>
                    .scroll-progress {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 0%;
                        height: 3px;
                        background: linear-gradient(90deg, #00d4ff, #9D00FF);
                        z-index: 10001;
                        transition: width 0.1s ease;
                        box-shadow: 0 0 10px rgba(0, 212, 255, 0.8), 0 0 20px rgba(157, 0, 255, 0.6);
                    }
                </style>
            `);
        }
        
        $('.scroll-progress').css('width', scrollPercent + '%');
    }

    // 添加返回顶部按钮增强样式
    function initBackToTop() {
        if (!$('.back-to-top').length) {
            $('body').append(`
                <button class="back-to-top">
                    <i class="fas fa-arrow-up"></i>
                </button>
            `);
            
            $('head').append(`
                <style>
                    .back-to-top {
                        position: fixed;
                        bottom: 30px;
                        right: 30px;
                        width: 55px;
                        height: 55px;
                        background: linear-gradient(135deg, #00d4ff, #9D00FF);
                        color: white;
                        border: 2px solid rgba(0, 212, 255, 0.5);
                        border-radius: 50%;
                        cursor: pointer;
                        opacity: 0;
                        visibility: hidden;
                        transition: all 0.4s ease;
                        z-index: 1000;
                        box-shadow: 0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(157, 0, 255, 0.3);
                        font-size: 1.2rem;
                    }
                    .back-to-top.show {
                        opacity: 1;
                        visibility: visible;
                    }
                    .back-to-top:hover {
                        transform: translateY(-5px) scale(1.1);
                        box-shadow: 0 0 30px rgba(0, 212, 255, 0.8), 0 0 60px rgba(157, 0, 255, 0.5);
                    }
                    .back-to-top::before {
                        content: '';
                        position: absolute;
                        top: -2px;
                        left: -2px;
                        right: -2px;
                        bottom: -2px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #00d4ff, #9D00FF);
                        z-index: -1;
                        filter: blur(10px);
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    .back-to-top:hover::before {
                        opacity: 1;
                    }
                </style>
            `);
        }
        
        $(window).scroll(function() {
            if ($(this).scrollTop() > 300) {
                $('.back-to-top').addClass('show');
            } else {
                $('.back-to-top').removeClass('show');
            }
        });
        
        $('.back-to-top').click(function() {
            $('html, body').animate({scrollTop: 0}, 800, 'easeInOutCubic');
        });
    }
    
    initBackToTop();

    // 添加科技感光标跟随效果
    function createCursorEffect() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(cursorDot);
        
        $('head').append(`
            <style>
                .custom-cursor {
                    position: fixed;
                    width: 40px;
                    height: 40px;
                    border: 2px solid rgba(0, 212, 255, 0.5);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: all 0.15s ease;
                    box-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
                }
                .custom-cursor-dot {
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: #00d4ff;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10000;
                    box-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
                }
                a:hover ~ .custom-cursor,
                button:hover ~ .custom-cursor {
                    transform: scale(1.5);
                    background: rgba(0, 212, 255, 0.1);
                }
            </style>
        `);
        
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;
        
        $(document).mousemove(function(e) {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });
        
        function updateCursor() {
            dotX += (cursorX - dotX) * 0.9;
            dotY += (cursorY - dotY) * 0.9;
            
            $(cursor).css({
                'left': cursorX - 20 + 'px',
                'top': cursorY - 20 + 'px'
            });
            
            $(cursorDot).css({
                'left': dotX - 3 + 'px',
                'top': dotY - 3 + 'px'
            });
            
            requestAnimationFrame(updateCursor);
        }
        
        updateCursor();
    }
    
    // 只在桌面端启用自定义光标
    if ($(window).width() > 768) {
        createCursorEffect();
    }
});
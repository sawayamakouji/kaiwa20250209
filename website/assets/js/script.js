$(document).ready(function() {
    // モバイルナビゲーションの制御
    const mobileMenuButton = $('<button>', {
        class: 'md:hidden p-2',
        html: `
            <span class="sr-only">メニュー</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
        `
    });

    const mobileMenu = $('<div>', {
        class: 'md:hidden hidden bg-white absolute w-full left-0 top-16 shadow-lg',
        html: `
            <a href="/" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">ホーム</a>
            <a href="/pages/project.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">プロジェクト概要</a>
            <a href="/pages/conversation.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">対話記録</a>
            <a href="/pages/characters.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">登場人物</a>
            <a href="/pages/documents.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">成果物</a>
            <a href="/pages/contact.html" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">お問い合わせ</a>
        `
    });

    $('nav .flex').append(mobileMenuButton);
    $('nav').append(mobileMenu);

    mobileMenuButton.on('click', function() {
        mobileMenu.toggleClass('hidden');
    });

    // スクロールアニメーション
    $(window).on('scroll', function() {
        $('.fade-in').each(function() {
            const elementTop = $(this).offset().top;
            const viewportBottom = $(window).scrollTop() + $(window).height();
            
            if (elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    });

    // アクティブなナビゲーションリンクのハイライト
    const currentPath = window.location.pathname;
    $('nav a').each(function() {
        if ($(this).attr('href') === currentPath) {
            $(this).addClass('text-blue-600');
        }
    });

    // スムーズスクロール
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 500);
        }
    });

    // フォームバリデーション（お問い合わせページ用）
    const contactForm = $('#contact-form');
    if (contactForm.length) {
        contactForm.on('submit', function(e) {
            e.preventDefault();
            
            // 入力値の取得
            const name = $('#name').val().trim();
            const email = $('#email').val().trim();
            const message = $('#message').val().trim();
            
            // バリデーション
            let isValid = true;
            const errors = [];

            if (!name) {
                errors.push('お名前を入力してください');
                isValid = false;
            }

            if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                errors.push('有効なメールアドレスを入力してください');
                isValid = false;
            }

            if (!message) {
                errors.push('メッセージを入力してください');
                isValid = false;
            }

            // エラー表示
            const errorContainer = $('#error-messages');
            errorContainer.empty();

            if (!isValid) {
                errors.forEach(error => {
                    errorContainer.append(`<p class="text-red-600">${error}</p>`);
                });
                return;
            }

            // フォーム送信処理（実際のエンドポイントに合わせて実装）
            alert('お問い合わせありがとうございます。\n内容を確認次第、ご連絡させていただきます。');
            this.reset();
        });
    }
});
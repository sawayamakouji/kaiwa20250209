$(document).ready(function() {
    // 会話データの読み込みと表示
    const loadConversations = async () => {
        try {
            const response = await fetch('/assets/data/conversations.json');
            const data = await response.json();
            displayConversations(data.conversations);
            displayMetadata(data.metadata);
        } catch (error) {
            console.error('会話データの読み込みに失敗しました:', error);
            $('#conversation-container').html(
                '<div class="text-red-600 p-4">データの読み込みに失敗しました。ページを更新してください。</div>'
            );
        }
    };

    // メタデータの表示
    const displayMetadata = (metadata) => {
        const metadataHtml = `
            <div class="bg-blue-50 p-4 rounded-lg mb-8">
                <h2 class="text-xl font-bold text-blue-800 mb-2">${metadata.project_name}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-gray-600">開始日: ${metadata.start_date}</p>
                        <p class="text-gray-600">ステータス: ${metadata.status}</p>
                    </div>
                    <div>
                        <p class="text-gray-600">参加者:</p>
                        <ul class="list-disc list-inside">
                            ${metadata.participants.map(p => 
                                `<li>${p.name} (${p.role})</li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
        $('#metadata-container').html(metadataHtml);
    };

    // 会話の表示
    const displayConversations = (conversations) => {
        const conversationsHtml = conversations.map(day => `
            <div class="mb-12 fade-in">
                <div class="flex items-center mb-4">
                    <div class="w-4 h-4 bg-blue-600 rounded-full"></div>
                    <div class="ml-4">
                        <h2 class="text-xl font-bold">${day.date}</h2>
                        <p class="text-gray-600">${day.title}</p>
                    </div>
                </div>
                <div class="ml-8 border-l-2 border-blue-200 pl-8">
                    ${day.entries.map(entry => `
                        <div class="mb-6 ${entry.speaker === 'AI' ? 'ml-8' : ''}">
                            <div class="flex items-start mb-2">
                                <div class="flex-shrink-0">
                                    <div class="w-10 h-10 rounded-full flex items-center justify-center ${
                                        entry.speaker === 'AI' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                    }">
                                        ${entry.speaker === 'AI' ? 'AI' : 'U'}
                                    </div>
                                </div>
                                <div class="ml-4 flex-grow">
                                    <div class="flex justify-between items-center mb-1">
                                        <span class="font-bold">${entry.role}</span>
                                        <span class="text-sm text-gray-500">${entry.timestamp}</span>
                                    </div>
                                    <div class="p-4 rounded-lg ${
                                        entry.speaker === 'AI' ? 'bg-blue-50' : 'bg-gray-50'
                                    }">
                                        <p>${entry.text}</p>
                                        ${entry.attachments ? renderAttachments(entry.attachments) : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        $('#conversation-container').html(conversationsHtml);
    };

    // 添付ファイルの表示
    const renderAttachments = (attachments) => {
        if (!attachments || attachments.length === 0) return '';

        return `
            <div class="mt-3 space-y-2">
                ${attachments.map(attachment => `
                    <div class="flex items-center space-x-2 p-2 bg-white rounded border border-gray-200">
                        <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                        </svg>
                        <span class="text-sm text-blue-600 hover:underline cursor-pointer">
                            ${attachment.name}
                        </span>
                    </div>
                `).join('')}
            </div>
        `;
    };

    // 検索機能
    $('#search-input').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        $('.conversation-entry').each(function() {
            const text = $(this).text().toLowerCase();
            $(this).toggle(text.includes(searchTerm));
        });
    });

    // フィルター機能
    $('#filter-speaker').on('change', function() {
        const selectedSpeaker = $(this).val();
        $('.conversation-entry').each(function() {
            if (selectedSpeaker === 'all') {
                $(this).show();
            } else {
                const speaker = $(this).data('speaker');
                $(this).toggle(speaker === selectedSpeaker);
            }
        });
    });

    // 初期化
    loadConversations();
});
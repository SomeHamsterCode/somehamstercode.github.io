// Данные постов (вместо базы данных)
const blogPosts = [
    {
        id: 1,
        title: "Мой первый статический сайт",
        content: "Сегодня я создал свой первый сайт без бэкенда! Это оказалось проще чем я думал.",
        date: "2024-01-15",
        author: "Я"
    },
    {
        id: 2, 
        title: "Почему я выбрал статический сайт",
        content: "Статические сайты быстрые, безопасные и не требуют обслуживания сервера.",
        date: "2024-01-16",
        author: "Я"
    },
    {
        id: 3,
        title: "Планы на будущее",
        content: "Хочу изучить больше о возможностях чистого JavaScript для интерактивности.",
        date: "2024-01-17", 
        author: "Я"
    }
];

// Функция для отображения постов
function displayPosts() {
    const container = document.getElementById('posts-container');
    
    if (blogPosts.length === 0) {
        container.innerHTML = '<p class="no-posts">Пока нет постов</p>';
        return;
    }
    
    container.innerHTML = blogPosts.map(post => `
        <article class="post">
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div class="post-meta">
                <small>📅 ${post.date} | ✍️ ${post.author}</small>
            </div>
        </article>
    `).join('');
}

// Функция для добавления нового поста (сохраняется только до перезагрузки)
function addNewPost(title, content) {
    const newPost = {
        id: blogPosts.length + 1,
        title: title,
        content: content,
        date: new Date().toISOString().split('T')[0],
        author: "Я"
    };
    
    blogPosts.unshift(newPost); // Добавляем в начало
    displayPosts();
    
    // Сохраняем в LocalStorage (переживет перезагрузку страницы)
    saveToLocalStorage();
}

// Сохранение в LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
}

// Загрузка из LocalStorage
function loadFromLocalStorage() {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
        blogPosts.length = 0; // Очищаем массив
        blogPosts.push(...JSON.parse(savedPosts));
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    displayPosts();
    
    // Простая форма для добавления постов (можно убрать если не нужно)
    console.log('Сайт загружен! Чтобы добавить пост, используй addNewPost("Заголовок", "Текст") в консоли');
});

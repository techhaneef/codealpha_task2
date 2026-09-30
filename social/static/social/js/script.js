// --- CSRF helper (standard Django pattern for AJAX POST requests) ---
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// --- Like / unlike a post via AJAX ---
document.addEventListener('click', function (event) {
    const likeBtn = event.target.closest('.like-btn');
    if (!likeBtn) return;

    const postId = likeBtn.dataset.postId;
    fetch(`/post/${postId}/like/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
        .then((response) => {
            if (!response.ok) throw new Error('Request failed');
            return response.json();
        })
        .then((data) => {
            const heart = likeBtn.querySelector('.heart');
            const count = likeBtn.querySelector('.like-count');
            count.textContent = data.likes_count;
            if (data.liked) {
                likeBtn.classList.add('liked');
                heart.textContent = '♥';
            } else {
                likeBtn.classList.remove('liked');
                heart.textContent = '♡';
            }
        })
        .catch(() => {
            alert('Could not update like. Please try again.');
        });
});

// --- Follow / unfollow a user via AJAX ---
document.addEventListener('click', function (event) {
    const followBtn = event.target.closest('#follow-btn');
    if (!followBtn) return;

    const username = followBtn.dataset.username;
    fetch(`/profile/${username}/follow/`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrftoken,
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
        .then((response) => {
            if (!response.ok) throw new Error('Request failed');
            return response.json();
        })
        .then((data) => {
            const followersCountEl = document.getElementById('followers-count');
            if (followersCountEl) followersCountEl.textContent = data.followers_count;

            if (data.following) {
                followBtn.textContent = 'Unfollow';
                followBtn.classList.remove('btn-primary');
                followBtn.classList.add('btn-secondary');
            } else {
                followBtn.textContent = 'Follow';
                followBtn.classList.remove('btn-secondary');
                followBtn.classList.add('btn-primary');
            }
        })
        .catch(() => {
            alert('Could not update follow status. Please try again.');
        });
});

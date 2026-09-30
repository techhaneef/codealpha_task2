# Mini Social Media Platform — CodeAlpha Task 2

A small full-stack social media app built with **Django** (backend), **SQLite**
(database), and **HTML/CSS/JavaScript** (frontend), built for CodeAlpha
Internship Month 1, Task 2.

## Features (mapped to the task requirements)

| Requirement | Where it's implemented |
|---|---|
| User profiles | `Profile` model (bio, follower/following/post counts) + `/profile/<username>/` page |
| Posts & comments | `Post` and `Comment` models; compose box on the feed; comment form on the post detail page |
| Like system | `Like` model + AJAX like button (`static/social/js/script.js`, no page reload) |
| Follow system | `Follow` model + AJAX follow/unfollow button, "Following" feed tab |
| Frontend: HTML, CSS, JavaScript | Django templates (`social/templates/`), `style.css`, `script.js` (fetch-based AJAX for likes/follows) |
| Backend: Django | `social` app — models, views, forms, urls |
| Database for users, posts, comments, followers | SQLite via Django ORM: `User`/`Profile`, `Post`, `Comment`, `Follow`, `Like` |

## Project structure

```
mini_social/
├── manage.py
├── requirements.txt
├── mini_social/          # project settings, urls
└── social/                # the app
    ├── models.py          # Profile, Post, Comment, Like, Follow
    ├── views.py            # feed, profile, like/follow AJAX endpoints, auth
    ├── forms.py
    ├── urls.py
    ├── admin.py
    ├── signals.py          # auto-creates a Profile when a User registers
    ├── templates/social/
    └── static/social/{css,js}
```

## Setup & run locally

1. **Create a virtual environment (recommended)**
   ```bash
   python -m venv venv
   source venv/bin/activate      # Windows: venv\Scripts\activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Create the database tables**
   ```bash
   python manage.py makemigrations social
   python manage.py migrate
   ```

4. **(Optional) Create an admin user** — lets you view all data at `/admin/`
   ```bash
   python manage.py createsuperuser
   ```

5. **Run the dev server**
   ```bash
   python manage.py runserver
   ```

6. Open **http://127.0.0.1:8000/** — register an account, then post, like,
   comment, and follow other accounts (register a second account in another
   browser/incognito window to test follow/like between two users).

## How to demo it

1. Register **two** accounts (e.g. `alice` and `bob`).
2. As `alice`, create a couple of posts.
3. Log in as `bob`, like one of Alice's posts (heart fills red, count updates
   instantly — that's the AJAX call in `script.js`), and leave a comment.
4. Go to Alice's profile and click **Follow** (button updates without a page
   reload) — then check the **Following** tab on the feed.

## Notes

- This is intentionally a "mini" build matching the task brief — it skips
  things like image uploads or DMs to keep the code easy to read and review.
- `DEBUG = True` and the `SECRET_KEY` in `settings.py` are fine for a local
  demo / internship submission, but shouldn't be reused as-is for a real
  production deployment.
- Check the CodeAlpha Task PDF for the exact submission steps required (it
  usually involves pushing this to a public GitHub repo and sharing a short
  demo — the PDF's other pages will confirm the exact format).

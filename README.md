Absolutely, Irine. Here's a clean, professional, and copy-paste-ready README.md file based entirely on the content you provided:


---

# 🔐 Django Custom Authentication API

A Django REST Framework-based authentication system using a custom user model where email is used as the login ID. This system provides secure user registration, JWT-based login, profile management, and password reset via email.

---

## 📁 Project Structure

backend/ ├── accounts/ │   ├── models.py          # CustomUser model │   ├── serializers.py     # Register, Login, and User serializers │   ├── views.py           # API views (register, login, password reset, etc.) │   └── urls.py            # URL routes for authentication APIs ├── settings.py └── ...

---

## 🚀 Features

- ✅ Custom User Model using email as the login field  
- ✅ JWT Authentication using SimpleJWT  
- ✅ Register/Login APIs  
- ✅ View & Update Profile  
- ✅ Password Reset via Email  
- ✅ Built with Django REST Framework  

---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/yourprojectname.git
   cd yourprojectname

2. Create and activate a virtual environment

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate


3. Install dependencies

pip install -r requirements.txt


4. Apply migrations

python manage.py makemigrations
python manage.py migrate


5. Run the development server

python manage.py runserver




---

🔑 API Endpoints

1. Register

POST /api/register/

{
  "email": "user@example.com",
  "username": "john_doe",
  "password": "yourpassword"
}


---

2. Login (JWT Auth)

POST /api/login/

{
  "email": "user@example.com",
  "password": "yourpassword"
}

Response:

{
  "refresh": "your-refresh-token",
  "access": "your-access-token",
  "email": "user@example.com",
  "username": "john_doe"
}


---

3. Get/Update Profile

GET or PUT /api/profile/
Headers:

Authorization: Bearer <access_token>


---

4. Password Reset – Request Email

POST /api/password-reset/

{
  "email": "user@example.com"
}


---

5. Password Reset – Confirm

POST /api/password-reset-confirm/<uidb64>/<token>/

{
  "password": "new_secure_password"
}


---

⚙️ Configuration

🔧 Custom User Model

In settings.py:

AUTH_USER_MODEL = 'accounts.CustomUser'

🔧 JWT Setup

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}


---

📧 Email Backend (for Development)

Use console backend to print emails to the terminal during testing.

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
FRONTEND_URL = "http://localhost:3000"


---

📌 Dependencies

Django

djangorestframework

djangorestframework-simplejwt


Install using:

pip install django djangorestframework djangorestframework-simplejwt


---

✍️ Author

Irine Milton
Project built with ❤️ using Django.
Feel free to connect on LinkedIn
https://www.linkedin.com/in/irine-milton


---

---




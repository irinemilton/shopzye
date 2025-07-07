# accounts/urls.py

from django.urls import path
from .views import RegisterView, LoginView, user_profile

from .views import PasswordResetRequestView, PasswordResetConfirmView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),   # ✅ Class-based view only
    path('login/', LoginView.as_view(), name='login'),
    path('me/', user_profile, name='profile'),

    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset'),
    path('password-reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('user/profile/', user_profile),

]

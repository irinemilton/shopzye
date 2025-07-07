from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# ✅ JWT Authentication
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # ✅ JWT Auth Endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/accounts/', include('accounts.urls')),
    
    path('api/', include('orders.urls')),

    # ✅ API Routes
    path('api/products/', include('products.urls')),
    path('api/users/', include('accounts.urls')),

    # ❌ Remove duplicated or incorrect routes
    # path('api/accounts', include('accounts.urls')),  ← REMOVE this
]

# ✅ Media files (during development)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

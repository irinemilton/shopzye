from django.urls import path
from .views import (
    product_list,
    product_detail,
    add_to_cart,
    remove_from_cart,
    get_cart_items,
    update_cart_item,
)

urlpatterns = [
    # 🛍️ Product Endpoints
    path('', product_list, name='product-list'),
    path('<int:pk>/', product_detail, name='product-detail'),

    # 🛒 Cart Endpoints
    path('cart/add/', add_to_cart, name='add-to-cart'),
    path('cart/remove/<int:pk>/', remove_from_cart, name='remove-from-cart'),
    path('cart/items/', get_cart_items, name='get-cart-items'),
    path('cart/update/', update_cart_item, name='update-cart-item'),
]

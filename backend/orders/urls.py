from django.urls import path
from .views import (
    MyCartView,
    MyOrdersView,
    UserOrderListView,
    create_order,
    clear_cart,
)

urlpatterns = [
    # ✅ Unified cart view (GET, POST, PUT, DELETE)
    path('cart/', MyCartView.as_view(), name='my-cart'),

    # ✅ Clear cart
    path('cart/clear/', clear_cart, name='clear-cart'),

    # ✅ Orders
    path('orders/', create_order, name='create-order'),
    path('orders/list/', UserOrderListView.as_view(), name='user-order-list'),
    path('orders/mine/', MyOrdersView.as_view(), name='my-orders'),
]

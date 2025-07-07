from django.contrib import admin

# Register your models here.
# orders/admin.py

from .models import Order, OrderItem


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'created_at', 'is_paid', 'shipping_address']
    search_fields = ['user__username', 'shipping_address']
    list_filter = ['is_paid', 'created_at']
    ordering = ['-created_at']

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity']
    search_fields = ['product__name']
    list_filter = ['product']
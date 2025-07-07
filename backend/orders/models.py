from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product
from django.core.exceptions import ValidationError

User = get_user_model()

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if not self.product:
            raise ValidationError("Cart item must have a valid product")

    def save(self, *args, **kwargs):
        if self.product_id and not Product.objects.filter(id=self.product_id).exists():
            raise ValidationError(f"Product with ID {self.product_id} does not exist")
        super().save(*args, **kwargs)

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Order(models.Model):

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='orders'
    )
    shipping_address = models.TextField(
        null=True,
        blank=True,
        help_text="Full shipping address for the order"
    )
    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0.00,
        help_text="Total price of all items in the order"
    )
    is_paid = models.BooleanField(
        default=False,
        help_text="Indicates whether the order has been paid"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when the order was created"
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Order #{self.id} by {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField()

    # Add these with a default to avoid migration issues
    product_name = models.CharField(max_length=255, default="Unknown Product")
    product_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)


    def __str__(self):
        return f"{self.product.name} × {self.quantity}"

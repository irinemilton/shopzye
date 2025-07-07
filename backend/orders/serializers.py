from rest_framework import serializers
from .models import CartItem, Order, OrderItem
from products.serializers import ProductSerializer
from products.models import Product
from orders.models import OrderItem




class CartItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']

    def get_product(self, obj):
        try:
            if obj.product and obj.product_id:
                return ProductSerializer(obj.product).data
            else:
                return None
        except Product.DoesNotExist:
            print(f"⚠️ Serializer: Product {obj.product_id} not found for cart item {obj.id}")
            return None
        except Exception as e:
            print(f"⚠️ Serializer: Error serializing product for cart item {obj.id}: {e}")
            return None

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2, read_only=True)
    class Meta:
        model = OrderItem
        fields = ['id','product_name', 'product_price', 'quantity']
    def get_product_name(self, obj):
        return obj.product.name if obj.product else "Deleted Product"


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = [
            'id',                 # Order ID
            'user',               # Automatically set from request.user (read-only)
            'shipping_address',   # Entered by user during checkout
            'total_price',        # Calculated and passed from frontend
            'created_at',         # Auto timestamp
            'status',             # Order status: Pending / Processing / etc.
            'items',              # Nested OrderItems (if using nested serializer)
    ]

    # 🚫 Fields that should not be writable via API
        read_only_fields = [
            'user',
            'created_at',
            'status',
    ]


def create(self, validated_data):
    items_data = validated_data.pop('items')
    order = Order.objects.create(**validated_data)

    for item in items_data:
        product = item['product']  # This is a Product instance if serializer is set up correctly

        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=item['quantity'],
            product_name=product.name,
            product_price=product.price,
        )

    return order



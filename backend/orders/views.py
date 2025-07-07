from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import permissions
from decimal import Decimal
from orders.models import OrderItem




from rest_framework.decorators import api_view, permission_classes

from .models import CartItem, Order
from .serializers import CartItemSerializer, OrderSerializer


# ✅ GET /api/cart/ - Fetch current user's cart items
# ✅ POST /api/cart/ - Add item to cart
# ✅ PUT /api/cart/ - Update cart item quantity
class MyCartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print(f"🛒 Cart GET request from user: {request.user.id}")
        
        # Simple test response first
        if request.GET.get('test') == 'true':
            return Response({
                'message': 'Cart API is working!',
                'user_id': request.user.id,
                'user_name': request.user.username
            })
        
        # Clean up cart items with missing products
        self.cleanup_invalid_cart_items(request.user)
        
        # Get only cart items with valid products
        from products.models import Product
        cart_items = CartItem.objects.filter(user=request.user)
        
        # Filter out items with missing products
        valid_cart_items = []
        for cart_item in cart_items:
            try:
                if cart_item.product and cart_item.product_id:
                    valid_cart_items.append(cart_item)
                else:
                    print(f"🛒 Excluding cart item {cart_item.id} - product is null")
            except Product.DoesNotExist:
                print(f"🛒 Excluding cart item {cart_item.id} - product was deleted")
                # Remove the invalid cart item
                cart_item.delete()
            except Exception as e:
                print(f"🛒 Error checking cart item {cart_item.id}: {e}")
                cart_item.delete()
        
        print(f"🛒 Found {len(valid_cart_items)} valid cart items for user {request.user.id}")
        
        serializer = CartItemSerializer(valid_cart_items, many=True)
        print(f"🛒 Serialized cart data: {serializer.data}")
        return Response(serializer.data)

    def cleanup_invalid_cart_items(self, user):
        """
        Remove cart items where the associated product is missing or null.
        """
        from products.models import Product
        
        cart_items = CartItem.objects.filter(user=user)
        print(f"🧹 Checking {cart_items.count()} cart items for cleanup for user {user.id}")

        for cart_item in cart_items:
            try:
                # Try to access the product - this will raise Product.DoesNotExist if product is deleted
                product = cart_item.product
                if product:
                    print(f"✅ Cart item ID: {cart_item.id} — Product exists: {product.name}")
                else:
                    print(f"🛒 Removing cart item ID: {cart_item.id} — Product is null")
                    cart_item.delete()
            except Product.DoesNotExist:
                print(f"🛒 Removing cart item ID: {cart_item.id} — Product was deleted")
                cart_item.delete()
            except Exception as e:
                print(f"🛒 Error checking cart item {cart_item.id}: {e}")
                cart_item.delete()

    def post(self, request):
        """Add item to cart"""
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        
        if not product_id:
            return Response({'error': 'product_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if the product exists
        try:
            from products.models import Product
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if item already exists in cart
        cart_item, created = CartItem.objects.get_or_create(
            user=request.user,
            product_id=product_id,
            defaults={'quantity': quantity}
        )
        
        if not created:
            # Item already exists, update quantity
            cart_item.quantity += quantity
            cart_item.save()
        
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    def put(self, request):
        """Update cart item quantity"""
        cart_item_id = request.data.get('cart_item_id')
        quantity = request.data.get('quantity')
        
        if not cart_item_id or quantity is None:
            return Response({'error': 'cart_item_id and quantity are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            cart_item = CartItem.objects.get(id=cart_item_id, user=request.user)
            if quantity <= 0:
                cart_item.delete()
                return Response({'message': 'Item removed from cart'}, status=status.HTTP_200_OK)
            else:
                cart_item.quantity = quantity
                cart_item.save()
                serializer = CartItemSerializer(cart_item)
                return Response(serializer.data)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        """Remove item from cart"""
        cart_item_id = request.data.get('cart_item_id')
        
        if not cart_item_id:
            return Response({'error': 'cart_item_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            cart_item = CartItem.objects.get(id=cart_item_id, user=request.user)
            cart_item.delete()
            return Response({'message': 'Item removed from cart'}, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)


# ✅ GET /api/orders/mine/ - Fetch current user's order history
class MyOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-created_at')

        cleaned_orders = []
        for order in orders:
            if self._order_has_valid_products(order):
                cleaned_orders.append(order)

        serializer = OrderSerializer(cleaned_orders, many=True)
        return Response(serializer.data)

    def _order_has_valid_products(self, order):
        """
        Check if all products in this order still exist.
        You can adjust this based on how your Order model is related to products.
        """
        for item in order.items.all():  # if Order has related `items`
            try:
                _ = item.product  # raises if deleted
            except:
                return False
        return True



class UserOrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        orders = Order.objects.filter(user=self.request.user).order_by('-created_at')
        # Return only orders with valid products
        return [order for order in orders if self._order_has_valid_products(order)]

    def _order_has_valid_products(self, order):
        for item in order.items.all():
            try:
                _ = item.product
            except:
                return False
        return True




# orders/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import OrderSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    cart_items = CartItem.objects.filter(user=user)

    if not cart_items.exists():
        return Response({"error": "No items in cart to place an order."}, status=400)

    shipping_address = request.data.get("shipping_address", "")
    total_price = Decimal('0.00')

    # Calculate total and create order
    for item in cart_items:
        if item.product:
            total_price += item.product.price * item.quantity

    # ✅ Create order
    order = Order.objects.create(
        user=user,
        shipping_address=shipping_address,
        total_price=total_price,
        is_paid=False
    )

    # ✅ Create order items with cached product info
    for item in cart_items:
        if item.product:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                product_name=item.product.name,
                product_price=item.product.price
            )

    # ✅ Clear the user's cart
    cart_items.delete()

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=201)





@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def clear_cart(request):
    user = request.user
    user.cart_items.all().delete()
    return Response({'message': 'Cart cleared successfully'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart_items(request):
    user = request.user
    # Dummy response — replace with actual cart logic
    cart_items = []  # Fetch from your Cart model
    return Response(cart_items)
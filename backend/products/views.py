from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import Product
from .serializers import ProductSerializer, CartItemSerializer
from orders.models import CartItem  # Assuming cart is handled via orders app
from django.core.exceptions import ValidationError
import traceback
# 🛍️ Product Views
@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from orders.models import CartItem
from products.models import Product

from django.core.exceptions import ValidationError


import logging
logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    try:
        print("📦 Incoming Request:", request.data)
        print("🧑 Authenticated User:", request.user)

        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        if not product_id:
            return Response({'error': 'Product ID is required'}, status=400)

        product = Product.objects.get(id=product_id)

        cart_item, created = CartItem.objects.get_or_create(
            user=request.user,
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += int(quantity)
            cart_item.save()

        return Response({'message': 'Item added to cart'}, status=201)

    except Product.DoesNotExist:
        return Response({'error': f'Product with ID {product_id} does not exist'}, status=404)

    except ValidationError as ve:
        return Response({'error': str(ve)}, status=400)

    except Exception as e:
        print("❌ Internal Server Error in add_to_cart")
        import traceback
        traceback.print_exc()
        return Response({'error': str(e)}, status=500)






@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, pk):
    cart_item = get_object_or_404(CartItem, id=pk, user=request.user)
    cart_item.delete()
    return Response({'message': '🗑️ Item removed from cart.'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart_items(request):
    cart_items = CartItem.objects.filter(user=request.user)
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_cart_item(request):
    return Response({"message": "Cart updated"})  # Placeholder for future update logic






from django.core.management.base import BaseCommand
from orders.models import CartItem
from products.models import Product

class Command(BaseCommand):
    help = 'Clean up cart items with missing products'

    def handle(self, *args, **options):
        # Method 1: Find cart items where product doesn't exist
        orphaned_items = []
        
        for item in CartItem.objects.all():
            try:
                # Check if product exists
                if not Product.objects.filter(id=item.product_id).exists():
                    orphaned_items.append(item)
            except Exception as e:
                # Handle any other issues
                orphaned_items.append(item)
                self.stdout.write(f"Error checking cart item {item.id}: {e}")
        
        # Method 2: Also check for null product references
        null_product_items = CartItem.objects.filter(product__isnull=True)
        
        # Method 3: Check for cart items with product_id but no actual product
        invalid_items = CartItem.objects.exclude(product_id__in=Product.objects.values_list('id', flat=True))
        
        # Combine all problematic items
        all_problematic = list(set(list(orphaned_items) + list(null_product_items) + list(invalid_items)))
        
        if all_problematic:
            self.stdout.write(f"Found {len(all_problematic)} problematic cart items:")
            for item in all_problematic:
                self.stdout.write(f"  - CartItem ID: {item.id}, Product ID: {item.product_id}")
                item.delete()
            
            self.stdout.write(self.style.SUCCESS(f"Successfully cleaned up {len(all_problematic)} invalid cart items"))
        else:
            self.stdout.write(self.style.SUCCESS("No invalid cart items found"))
        
        # Show remaining cart items
        remaining = CartItem.objects.count()
        self.stdout.write(f"Remaining cart items: {remaining}")
        
        if remaining > 0:
            self.stdout.write("Remaining cart items:")
            for item in CartItem.objects.all():
                try:
                    product_exists = Product.objects.filter(id=item.product_id).exists()
                    self.stdout.write(f"  - CartItem ID: {item.id}, Product ID: {item.product_id}, Product exists: {product_exists}")
                except Exception as e:
                    self.stdout.write(f"  - CartItem ID: {item.id}, Product ID: {item.product_id}, Error: {e}") 
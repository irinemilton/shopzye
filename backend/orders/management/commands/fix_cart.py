from django.core.management.base import BaseCommand
from orders.models import CartItem

class Command(BaseCommand):
    help = 'Fix cart by removing all items with null products'

    def handle(self, *args, **options):
        # Remove all cart items with null products
        null_items = CartItem.objects.filter(product__isnull=True)
        count = null_items.count()
        
        if count > 0:
            self.stdout.write(f"Found {count} cart items with null products:")
            for item in null_items:
                self.stdout.write(f"  - CartItem ID: {item.id}, User: {item.user_id}, Product: {item.product_id}")
            
            null_items.delete()
            self.stdout.write(self.style.SUCCESS(f"Successfully deleted {count} cart items with null products"))
        else:
            self.stdout.write(self.style.SUCCESS("No cart items with null products found"))
        
        # Show remaining cart items
        remaining = CartItem.objects.count()
        self.stdout.write(f"Remaining cart items: {remaining}")
        
        if remaining > 0:
            self.stdout.write("Remaining cart items:")
            for item in CartItem.objects.all():
                self.stdout.write(f"  - CartItem ID: {item.id}, User: {item.user_id}, Product: {item.product_id}, Product exists: {item.product is not None}")
        
        self.stdout.write(self.style.SUCCESS("Cart fix completed!")) 
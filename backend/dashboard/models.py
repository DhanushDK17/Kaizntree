from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Item(models.Model):
    sku = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='items')
    tags = models.CharField(max_length=100)
    available_stock = models.PositiveIntegerField()
    stock_status = models.BooleanField()

    def __str__(self):
        return self.name

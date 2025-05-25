from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
# Create your models here.

class Customer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    joined_date = models.DateField(auto_now_add=True)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField(blank=True)

class Order(models.Model):
    STATUS_CHOICES = (('Pending', 'Pending'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled'))
    
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    
class Lead(models.Model):
    """docstring for ClassName."""
    STATUS_CHOICES = (('New', 'New'), ('Contacted', 'Contacted'), ('Converted', 'Converted'), ('Lost', 'Lost'))
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    source = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='New')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
class Interaction(models.Model):
    """docstring for ClassName."""
    TYPE_CHOICES = (('email','email'),('phone','phone'),('chat','chat'))
    
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    note = models.TextField()
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)
    
class Task(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.SET_NULL, null=True, blank=True, related_name='tasks')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True, default="")
    priority = models.CharField(max_length=10, choices=(('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')), default='Low')
    due_date = models.DateField()
    completed = models.BooleanField(default=False)

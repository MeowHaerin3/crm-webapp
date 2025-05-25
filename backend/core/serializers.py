from rest_framework import serializers
from .models import Customer, Product, Order, Lead, Interaction, Task
from django.contrib.auth import get_user_model

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model =Customer
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'
   
class InteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interaction
        fields = '__all__'
        
class TaskSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=get_user_model().objects.all(), required=False, allow_null=True)

    class Meta:
        model = Task
        fields = '__all__'


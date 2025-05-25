from django.urls import path, include
from rest_framework import routers
from . import views
from .views import UserListView

router = routers.DefaultRouter()
router.register(r'customers', views.CustomerViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'leads', views.LeadViewSet)
router.register(r'interactions', views.InteractionViewSet)
router.register(r'tasks', views.TaskViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('users/', UserListView.as_view(), name='user-list'),
]
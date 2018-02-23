from django.conf.urls import url
from dashboard.views import get_dashboard

urlpatterns = [
    url(r'^$', get_dashboard, name='dashboard'),
]

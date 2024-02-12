from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'page_size'  # Allows client to specify the page size

    def get_paginated_response(self, data):
        return Response({
            'links': {
               'next': self.get_next_link(),
               'previous': self.get_previous_link()
            },
            'total_items': self.page.paginator.count,
            'page_size': int(self.request.GET.get('page_size', self.page_size)),  # Default to class's page_size
            'items': data
        })

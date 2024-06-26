from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user == obj.user:
            return True
        

class IsOwnerUser(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user == obj:
            return True
# apps/accounts/views.py
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from accounts.serializers import RegisterSerializer

class RegisterView(generics.CreateAPIView):
    queryset = []
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "user": RegisterSerializer(user).data,
                "message": "Compte créé avec succès. Vous pouvez maintenant vous connecter.",
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

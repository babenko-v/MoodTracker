from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'



class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    # programming_area = serializers.ChoiceField(choices=PROGRAMMING_AREAS, required=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'password2')
        extra_kwargs = {
            'email': {'required': True, 'allow_blank': False}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Пароли не совпадают."})

        # Проверка уникальности email
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Пользователь с таким email уже существует."})


        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')

        # Создаем пользователя
        user = User.objects.create(
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
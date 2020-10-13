from rest_framework import serializers
from myshop.models import Category, Real_estate, MyUser, Message

# Serializer는 장고 모델의 출력 결과를 우리가 보다 보기 편하게 만들어 준다.
# model은 우리가 작성한 모델
# fields는 사용할 필드, 제외하고 싶다면 필요한 것만 괄로로 서술
class CateSerializer (serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class RS_Serializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Real_estate
        fields = ('id', 'name', 'detail', 'image', 'price', 'category', 'likecount')

class RS_detail_Serializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url= True)
    class Meta:
        model = Real_estate
        fields = '__all__'

class User_serializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('email', 'name')

class Message_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid

class MyUserManager(BaseUserManager):                                   # 유저 모델을 위한 메소드를 제공
    # 유저 생성
    def _create_user(self, email, name, password=None, **kwargs):       # 유저기본 생성(기본으로 하는 메서드)
        if not email:
            raise ValueError('이메일은 필수입니다.')
        if not name:
            raise ValueError('유저명은 필수입니다.')
        # 이메일에 포함된 대문자를 소문자로 바꿈
        user = self.model(email=self.normalize_email(email), **kwargs)

        user.set_password(password)
        user.save(using=self._db)
    
    # 일반 유저 생성 _create_user를 사용함.
    def create_user(self, email, name, password, **kwargs):             # 일반유저 샣성
        kwargs.setdefault('is_admin', False)
        return self._create_user(email, name, password, **kwargs)
    
    # 관리자 계정 생성
    def create_superuser(self, email, name, password, **kwargs):        # 관리자 유저 생성
        kwargs.setdefault('is_admin', True)
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)

        return self._create_user(email, name, password, **kwargs)


# Create your models here.
class MyUser (AbstractBaseUser, PermissionsMixin):
    # pk 설정
    uuid = models.UUIDField(                                # 유니크한 값을 MyUser에 부여함.
        primary_key= True,
        unique=True,
        editable=False,
        default= uuid.uuid4,
        verbose_name= 'PK'
    )
    # 이메일, 유저이름 필드 설정
    email = models.EmailField(unique= True, verbose_name= "이메일")
    name = models.CharField(max_length= 20, verbose_name= "이름", null=False)
    # 권한설정
    is_active = models.BooleanField(default= True, verbose_name= "계정 활성 여부")
    is_admin = models.BooleanField(default= False, verbose_name= "관리자 권한")
    is_staff = models.BooleanField(default= False, verbose_name= "스태프 권한")
    is_superuser = models.BooleanField(default= False, verbose_name= "super유저 권한")
    # 유저 로그인 ID
    USERNAME_FIELD = "email"                                # 로그인을 할 때 ID로 사용할 필드
    # 가입 시 반드시 필요한 필드 설정
    REQUIRED_FIELDS = ['name', ]                            # 반드시 필요한 필드

    class Meta:
        # 저장할 DB
        db_table = 'db.sqlite3'
        verbose_name = '유저'                               # 주로 관리자 페이지에서 모델을 나타낼 이름
        verbose_name_plural = '유저들'                      # 유저가 여럿일 떄는 유저들로 표현됨
    # 해당 모델을 다루는 메서드는 MyUserManager에 따름
    objects = MyUserManager()
    '''
    <참고1> objects = MyUserManager()
    - MyUser.objects.{{method}}()의 형태로 유저를 생성할 수 있음
    - 따라서, objects에 해당하는 MyUserManager에 메서드를 구현하면 구체적인 커스터마이징 가능
    - 본 코드에서는 일반유저 / 관리자로 나눠서 가입시키기 위해 사용하기 됨
    '''

    def __self__(self):
        return self.email

class Category(models.Model): 
    name = models.CharField(max_length=40, null=False)
    def __str__(self):
        return self.name

class Real_estate(models.Model):
    name = models.CharField(max_length=40, null=False)
    detail = models.TextField(max_length=300, null=False)
    image = models.ImageField(blank=True)   # 나중에 black = False로 수정
    price = models.IntegerField(default=0)
    upload_date = models.DateTimeField(default=timezone.now)    # timezone import
    category = models.ForeignKey(Category, null=False, on_delete=models.CASCADE)
    address = models.TextField(max_length=300, null=False)
    likecount = models.IntegerField(default=0)

    LikeUser = models.ManyToManyField(MyUser, blank=True, related_name="LikeUser",  through="Like", through_fields=('realestate_post', 'user'))
    def __str__(self):
        return self.name
    
class Like(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    realestate_post = models.ForeignKey(Real_estate, on_delete=models.CASCADE)

class Message(models.Model):
    sender = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="sender")
    receiver = models.ForeignKey(MyUser, on_delete=models.CASCADE, related_name="receiver")
    real_estate = models.ForeignKey(Real_estate, on_delete=models.CASCADE)
    message = models.TextField(max_length=300, null=False)
    send_time = models.DateTimeField(default=timezone.now)
    recent_msg = models.BooleanField(default=False)
    def __str(self):
        return ("[{0}]{1} -> {2}(@{3})".format(self.recent_msg, self.sender, self.receiver, self.real_estate))